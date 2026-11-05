
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
  
  modifyTool : async() =>{
    const tools = await mcpAdapter.listTools();
    const queryTool = tools.find((tool) => tool.name === "postgres__postgres_mcp_modify");
    if(!queryTool){
      throw new Error("Modifying tool is missing in PostgreSQL MCP");
    }
    return queryTool;
  },

  list: async ()=>{
    const tools = await mcpAdapter.listTools();
    const queryToolsinfo = tools.map((tool)=>({
        name: tool.name,
        description : tool.description,
        schema : tool.schema,
    }));
    console.dir(queryToolsinfo, { depth: null });
    return tools;
  },
  listTools: async () => {
    const tools = await mcpAdapter.listTools();

    const modifyTool = tools.find(
        (tool) => tool.name === "postgres__postgres_mcp_modify"
    );

    console.dir(modifyTool, { depth: null });

    return tools;
},
};

// getPostgresTools.list();




