'use server'
import mysql from 'mysql2/promise'

export async function createConnection() {
    const host = process.env.SQL_URL
    const port = +(process.env.SQL_PORT || "0")
    const user = process.env.SQL_USER
    const password = process.env.SQL_PASS
    const database = process.env.SQL_DB

    return mysql.createConnection({
        host,
        port,
        user,
        password,
        database
    });
}