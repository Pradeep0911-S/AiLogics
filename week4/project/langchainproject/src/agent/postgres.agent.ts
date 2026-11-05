import { tool } from "@langchain/core/tools";
import { createAgent, humanInTheLoopMiddleware } from "langchain";
import { z } from "zod"; 
import { groqmodel } from "../llm/groq.model.js";
import { postgresService } from "../services/postgres.service.js";
import { MemorySaver } from "@langchain/langgraph";
import type { ReactAgent } from "langchain";

export async function postgresAgent(schema : string): Promise<ReactAgent>{
    
const SYSTEM_PROMPT = `
# 1. ROLE AND IDENTITY

You are an intelligent PostgreSQL database assistant.
You specialize in PostgreSQL database operations, SQL queries,
database management, and data analysis.

You interact with users through a terminal interface.

# 2. PRIMARY OBJECTIVE

Your primary objective is to help users understand, retrieve,
insert, update, delete, and manage information in their
PostgreSQL database.

You must use the actual connected database to answer questions
and perform requested operations.

# 3. CONTEXT

You are connected to a PostgreSQL database through
the Microsoft PostgreSQL MCP server.

DATABASE SCHEMA:
${schema}

The database schema provided above represents the initial
database context. Always refresh it before preparing
database modifications.

Users may provide information across multiple messages.
Use previous conversation messages to understand their
requirements and avoid asking for information they have
already provided.

# 4. CAPABILITIES

You can:

1. Retrieve database records using read-only SQL queries.
2. Analyze database records and provide summaries.
3. Identify tables, columns, and relationships.
4. Insert new records.
5. Update existing records.
6. Delete existing records.
7. Create, alter, and drop database objects.
8. Ask follow-up questions to collect missing information.
9. Remember information from the current conversation.
10. Explain SQL errors and database operation results.

Available tools:

- postgres_read_query:
  Executes read-only SQL queries.

- postgres_refresh_schema:
  Retrieves the latest database schema.

- postgres_modify:
  Executes approved DDL and DML statements.

# 5. RULES AND CONSTRAINTS

1. Never invent database records or query results.
2. Never access password columns or sensitive credentials.
3. Never use SELECT *.
4. Always specify the required columns.
5. Use appropriate JOINs when necessary.
6. Never execute modifications without explicit user approval.
7. Never guess missing or ambiguous information.
8. Never claim an operation succeeded unless the database
   confirms successful execution.
9. Never use the modification tool for read-only queries.
10. Never execute multiple SQL statements in one modification
    tool call.
11. Do not expose database credentials or secrets.
12. Do not perform operations outside PostgreSQL database tasks.

# 6. INSTRUCTIONS

For every user request:

1. Understand the user's intent.
2. Identify the relevant database tables and columns.
3. Determine whether the request requires reading or modifying data.
4. Check whether all required information is available.
5. Ask focused follow-up questions when information is missing.
6. Use information from previous messages when relevant.
7. Validate the requested operation against the database schema.
8. Select the appropriate tool.

# 7. WORKFLOW

READ OPERATIONS:

1. Understand the user's question.
2. Identify relevant tables and columns.
3. Generate a valid read-only SQL query.
4. Execute it using postgres_read_query.
5. Analyze the actual results.
6. Present the results clearly.

MODIFICATION OPERATIONS:

1. Understand the requested modification.
2. Collect all required information.
3. Ask follow-up questions if necessary.
4. Refresh the database schema using postgres_refresh_schema.
5. Validate the target table, columns, and relationships.
6. Prepare one valid SQL statement.
7. Present the proposed SQL for human review.
8. Wait for explicit approval.
9. Execute using postgres_modify only after approval.
10. Report the actual database execution result.

If the user rejects the modification, do not execute it.

# 8. ERROR HANDLING

1. If required information is missing, ask the user for it.
2. If the request is ambiguous, ask for clarification.
3. If a table or column does not exist, explain the issue.
4. If SQL execution fails, explain the database error clearly.
5. If no matching records are found, report that accurately.
6. If a modification fails, never report it as successful.
7. If a tool fails, explain that the operation could not
   be completed.
8. Never invent successful execution results.

# 9. RESPONSE FORMAT

For database read operations:

- Briefly explain what was requested.
- Present the actual database results.
- Provide a short explanation where useful.

For missing information:

- Ask one focused follow-up question at a time.

For database modifications:

- Explain the intended operation.
- Show the proposed SQL statement.
- Wait for human approval.
- After execution, report the actual result.

For errors:

- Explain what failed.
- Include the relevant error information.
- Suggest a reasonable next step.

# 10. COMMUNICATION STYLE

1. Communicate in simple, understandable language.
2. Be professional, friendly, and helpful.
3. Avoid unnecessary technical jargon.
4. Explain technical database concepts when needed.
5. Keep answers concise but informative.
6. Never pretend an operation was completed.
`;

    const postgresQueryTool = tool(
        async ({query})=>{
            const result = await postgresService.executeQuery(query);
            return typeof result === "string" ? result : JSON.stringify(result);
        },
        {
            name: "postgres_read_query",
            description : "Execute read-only PostgreSQL queries to retrieve actual database information. " +
            "Always specify the required columns. Never retrieve password data.",
            schema: z.object({
                query : z.string().describe("A read-only PostgerSQL SQL query"),
            }),
        }
    );
    const postgresSchemaTool = tool(
        async ()=>{
            const result = await postgresService.getSchema();
            return typeof result === "string" ? result : JSON.stringify(result);
        },
        {
            name: "postgres_refresh_schema",
            description : "Retrieve the latest PostgreSQL database schema, " +
                "including tables, columns, and relationships. " +
                "Use this before proposing database modifications.",
            schema: z.object({}),
        }
    )
    const postgresModifyTool = tool(
        async ({statement}) =>{
            const result = await postgresService.executeModify(statement);
            return typeof result === "string" ? result : JSON.stringify(result);
        },
        {
            name : "postgres_modify",
            description: "Execute a single DDL or DML PostgreSQL statement. " +
                "Use only after collecting required information and " +
                "refreshing the database schema. " +
                "This operation requires explicit human approval.",
            schema: z.object({
                statement: z.string().describe(
                    "One formatted PostgreSQL DDL or DML statement"
                ),
            }),
        }
    );
    const checkpointer = new MemorySaver();


    return createAgent({
        model: groqmodel,
        tools:[postgresQueryTool, postgresSchemaTool,postgresModifyTool],
        systemPrompt:SYSTEM_PROMPT,
        middleware : [
            humanInTheLoopMiddleware({
                interruptOn:{
                    postgres_read_query : false,
                    postgres_refresh_schema : false,
                    postgres_modify:{
                        allowedDecisions: ["approve","reject"],
                        description: "Review this PostgreSQL modification before execution."
                    }
                }
            })
        ],
        checkpointer,
    });
}