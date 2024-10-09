import {createConnection} from "./db";
import {RowDataPacket} from "mysql2";

export async function getTranslation(key: string, locale: string){
    const connection = await createConnection()

    const query = `select 
                        *
                    from t001 
                    where spras=? and text_key=?;`
    const values = [locale, key]

    const data = (await connection.query<RowDataPacket[]>(query, values))[0]
    await connection.end()

    return (data[0] || {text_value: key}).text_value as string
}