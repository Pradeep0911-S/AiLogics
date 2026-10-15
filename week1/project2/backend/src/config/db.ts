import './env'
import { Sequelize } from 'sequelize-typescript';


export const sequelize = new Sequelize({
    dialect: 'postgres',
    username : process.env.DB_USER,
    host :process.env.DB_HOST,
    database:process.env.DB_DATABASE_NAME,
    password :process.env.DB_PASSWORD,
    port : Number(process.env.DB_PORT),
});

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
}
}

