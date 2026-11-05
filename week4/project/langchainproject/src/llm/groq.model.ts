import { ChatGroq } from "@langchain/groq";
import { ENV } from "../config/env.config.js";
import PER_CONSTANTS from "../constants/permanant.constants.js";

export const groqmodel = new ChatGroq({
    apiKey : ENV.GROQ_API_KEY,
    model : PER_CONSTANTS.MODEL_NAME
})

