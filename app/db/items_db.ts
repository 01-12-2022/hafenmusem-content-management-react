'use server'
import {RowDataPacket} from "mysql2"
import {createConnection} from "./db"
import {Item} from "./dbTypes"

const rowDataPacketToItem = (d: RowDataPacket): Item => ({
    id: d.id,
    description: d.description,
    image: d.image,
    name: d.name
})

export async function getSingleItemFromId(id: number): Promise<Item> {
    const connection = await createConnection()

    const query = `select 
                        t.id as id,
                        t.name as name,
                        t.description as description,
                        i.image as image
                    from testdata as t
                    left join item_image as i on t.id = i.item_id 
                    where t.id=?;`
    const values = [id]

    const data = (await connection.query<RowDataPacket[]>(query, values))[0]
    connection.release()

    return rowDataPacketToItem(data[0])
}

export async function getItemsFromIds(itemIds: number[]): Promise<Item[]> {
    const connection = await createConnection()

    const query = `select 
                        t.id as id,
                        t.name as name,
                        t.description as description,
                        i.image as image
                    from testdata as t
                    left join item_image as i on t.id = i.item_id 
                    where t.id in (${itemIds.map(() => "?").join(",")});`
    const values = [...itemIds]

    const data = (await connection.query<RowDataPacket[]>(query, values))[0]
    connection.release()

    return data.map(d => rowDataPacketToItem(d))
}

export async function getAllItems(): Promise<Item[]> {
    const connection = await createConnection()

    const query = `select 
                        t.id as id,
                        t.name as name,
                        t.description as description,
                        i.image as image
                    from testdata as t
                    left join item_image as i on t.id = i.item_id;`

    const data = (await connection.query<RowDataPacket[]>(query))[0]
    connection.release()

    return data.map(d => rowDataPacketToItem(d))
}