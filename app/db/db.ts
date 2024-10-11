'use server'
import mysql from 'mysql2/promise'

const host = process.env.SQL_URL
const port = +(process.env.SQL_PORT || "0")
const user = process.env.SQL_USER
const password = process.env.SQL_PASS
const database = process.env.SQL_DB

let pool: mysql.Pool

export async function createConnection() {

    if (pool)
        return pool//.getConnection();

    pool = mysql.createPool({
        host,
        port,
        user,
        password,
        database,
        // waitForConnections: true,
    })
    return pool
}