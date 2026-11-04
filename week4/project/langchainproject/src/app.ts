import { postgresService } from "./services/postgres.service.js";
import { postgresAgent } from "./agent/postgres.agent.js";

export async function initializeApp() {
    await postgresService.connect();

    const schemaResult = await postgresService.getSchema();

    const schema = typeof schemaResult === "string"? schemaResult: JSON.stringify(schemaResult);
    const agent = await postgresAgent(schema);

    return agent;
}