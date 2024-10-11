'use server'
import { RowDataPacket } from "mysql2"
import { createConnection } from "./db"
import { Item } from "./dbTypes"
import { revalidatePath } from "next/cache"

const rowDataPacketToItem = (d: RowDataPacket): Item => ({
    id: d.id,
    description: d.description,
    image: d.image,
    name: d.name
})

export async function deleteItemFromDb(id: number) {
    const connection = await createConnection()
    const values = [id]

    const query = `delete from testdata where id=?;`
    await connection.execute(query, values)

    const query3 = `delete from item_extra_info where item_id = ?`
    await connection.execute(query3, values)

    const query2 = `delete from route_item_info where item_id = ?`
    await connection.execute(query2, values)

    revalidatePath('/')

    // connection.release()
}

export async function insertItemIntoDb(itemName: string) {
    const connection = await createConnection()
    const prefix = `item_${itemName}`

    const query = `insert into testdata (name, description) values (?, ?);`
    connection.execute(query, [`${prefix}_name`, `${prefix}_description`])
    revalidatePath('/')

    // connection.release()
}

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
    // connection.release()

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
    // connection.release()

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
    // connection.release()

    return data.map(d => rowDataPacketToItem(d))
}