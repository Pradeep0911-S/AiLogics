import { pool } from "../config/db.js";

export type NewUser = {
  id: string;
  username: string;
  email: string;
};

export async function createUser(username : string,email : string ,password : string): Promise<> {
    const query = `INSERT INTO users (username, email, hash_pass) VALUES ($1, $2, $3) RETURNING id, username, email`;
    const results = await pool.query(query,[username,email,password])
    return results.rows;
}

export async function getUserbyUsername(username : string) : Promise<>{
    const query = `SELECT * FROM users WHERE username = $1`;
    const results = await pool.query(query,[username]);
    return results.rows
}

export async function getUserbyEmail(email : string) : Promise<>{
    const query = `SELECT * FROM users WHERE email = $1`;
    const results = await pool.query(query,[email]);
    return results.rows
}

