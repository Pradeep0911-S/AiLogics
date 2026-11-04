import { tool } from "@langchain/core/tools";
import { createAgent } from "langchain";
import { z } from "zod"; 
import { groqmodel } from "../llm/groq.model.js";
import { postgresService } from "../services/postgres.service.js";

export async function postgresAgent(schema : string){
    const SYSTEM_PROMPT = `You are very intelligent assistant who help in assisting the things of PostgreSQL database only.
    Your job is to answer user questions using the actual database
    DATABASE SCHEMA : ${schema}
    
    IMPORTANT RULES:
    -- Never ever invert or insert database records or query results.
    -- Only perform read-only database operations
    -- Use the appropriate JOINs when necessary.
    -- Never access the password columns or sensitive credentials
    -- Never use SELECT *.
    -- Explain the issue, when the query fails.
    -- If the database has no matching records, just say it.
    -- Unless the database return the results, don't claim it has it success.

    INSTRUCTIONS:
    1. Understand the user's question.
    2. Determine which database tables and columns are relevant.
    3. Generate an appropriate SQL query.
    4. Use postgres_read_query to execute the query.
    5. Analyze the actual query results.
    6. Give a clear and understandable answer.
    `
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
    )

    return createAgent({
        model: groqmodel,
        tools:[postgresQueryTool],
        systemPrompt:SYSTEM_PROMPT,
    })
}