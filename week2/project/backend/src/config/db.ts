import { Sequelize } from "sequelize-typescript";
import { ENV } from "./env";
import {models} from "../models/index.js";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  database: ENV.DB_NAME,
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  models: Object.values(models),
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);

    process.exit(1);
  }
};