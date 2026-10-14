import './env'
import { Pool } from 'pg'


export const pool = new Pool({
    user : process.env.DB_USER,
    host :process.env.DB_HOST,
    database:process.env.DB_DATABASE_NAME,
    password :process.env.DB_PASSWORD,
    port : Number(process.env.DB_PORT) 
})

async function isConnected(){
    try {
        await pool.query("SELECT 1")
        console.log('Database Connected');
    } catch (error) {
        console.error('Database Connection failed : ',error);
    }
}

isConnected();