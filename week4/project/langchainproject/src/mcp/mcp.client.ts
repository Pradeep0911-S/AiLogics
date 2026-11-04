import { MCPAdapter } from "@langchain/mcp-adapters";
import { MCP_SERVERS } from "./mcp.config.js";

export const mcpAdapter = new MCPAdapter({
  servers: MCP_SERVERS,
});