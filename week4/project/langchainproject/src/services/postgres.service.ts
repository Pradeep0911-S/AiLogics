
import { getPostgresTools } from "../mcp/mcp.tools.js";
import { ENV } from "../config/env.config.js";

export const postgresService = {

  connectionId: "",

  connect: async () => {
    const connectTool = await getPostgresTools.connectTool();

    const result = await connectTool.invoke({
      profileId: ENV.POSTGRES_PROFILE_ID,
    });

    const parsedResult =
      typeof result === "string"
        ? JSON.parse(result)
        : result;

    if (!parsedResult.connectionId) {
      throw new Error("Failed to retrieve PostgreSQL connection ID");
    }

    postgresService.connectionId = parsedResult.connectionId;

    return postgresService.connectionId;
  },

  getSchema: async () => {
    const dbContextTool = await getPostgresTools.dbContextTool();

    if (!postgresService.connectionId) {
      throw new Error("PostgreSQL is not connected");
    }

    const result = await dbContextTool.invoke({
      connectionId: postgresService.connectionId,
      objectType: "tables",
    });

    return result;
  },

  executeQuery: async (query: string) => {
    const queryTool = await getPostgresTools.queryTool();

    if (!postgresService.connectionId) {
      throw new Error("PostgreSQL is not connected");
    }

    return await queryTool.invoke({
      connectionId: postgresService.connectionId,
      query,
      maxResultRows: 10,
      validationQueries: [],
    });
  },

  executeModify : async (statement: string)=>{
    const modifyTool = await getPostgresTools.modifyTool();
    if(!postgresService.connectionId){
      throw new Error("PostgreSQL is not connected");
    }
    return await modifyTool.invoke({
      connectionId : postgresService.connectionId,
      statement
    })
  }

};
