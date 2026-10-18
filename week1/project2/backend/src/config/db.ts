import './env'
import { Sequelize } from 'sequelize-typescript';
import { User } from "../models/user.model.js";
import { Session } from "../models/session.model.js";


export const sequelize = new Sequelize({
    dialect: "postgres",
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    models: [User,Session],
});

export async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}
