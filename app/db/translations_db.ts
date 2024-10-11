'use server'
import { RowDataPacket } from "mysql2";
import { createConnection } from "./db";

export async function getTranslationFromDb(key: string, locale: string) {
    const connection = await createConnection()

    const query = `select 
                        *
                    from t001 
                    where spras=? and text_key=?;`
    const values = [locale, key]

    const data = (await connection.query<RowDataPacket[]>(query, values))[0]
    connection.release()

    return {
        success: !!data[0],
        translated: (data[0] || { text_value: key }).text_value as string
    }
}

export async function insertTranslation(key: string, locale: string, value: string) {
    const connection = await createConnection()

    const query = `INSERT INTO t001 (spras, text_key, text_value) VALUES (?, ?, ?);`
    const values = [locale, key, value]
    const res = await connection.execute(query, values)

    connection.release()
    return res
}

export async function updateTranslation(key: string, locale: string, newValue: string) {
    const connection = await createConnection()

    const query = `UPDATE t001 set text_value = ? where spras = ? and text_key = ?;`
    const values = [newValue, locale, key]
    const res = await connection.execute(query, values)

    connection.release()
    return res
}