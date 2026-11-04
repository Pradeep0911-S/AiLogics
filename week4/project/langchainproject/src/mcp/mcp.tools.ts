
import { mcpAdapter } from "./mcp.client.js";

export const getPostgresTools = {

  connectTool: async () => {
    const tools = await mcpAdapter.listTools();
    const connectTool = tools.find((tool) =>tool.name === "postgres__postgres_mcp_connect");
    if (!connectTool) {
      throw new Error("Connect tool is missing in PostgreSQL MCP");
    }
    return connectTool;
  },

  dbContextTool: async () => {
    const tools = await mcpAdapter.listTools();
    const dbContextTool = tools.find((tool) =>tool.name === "postgres__postgres_mcp_db_context");
    if (!dbContextTool) {
      throw new Error("Database context tool is missing in PostgreSQL MCP");
    }
    return dbContextTool;
  },

  queryTool: async () => {
    const tools = await mcpAdapter.listTools();
    const queryTool = tools.find((tool) =>tool.name === "postgres__postgres_mcp_query");

    if (!queryTool) {
      throw new Error("Query tool is missing in PostgreSQL MCP");
    }

    return queryTool;
  },

  listtools: async ()=>{
    const tools = await mcpAdapter.listTools();
    return tools.map((tool)=>({
        name: tool.name,
        description : tool.description,
    }));
  }

};

getPostgresTools.listtools();


