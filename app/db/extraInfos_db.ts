'use server'
import {Connection, RowDataPacket} from "mysql2/promise";
import {Item} from "./dbTypes";
import {createConnection} from '@/app/db/db'

export async function getInformationCategoriesForItem(item: Item, routeKey?: string) {
    const connection = await createConnection()

    const routeData = (!!routeKey) ? await getRouteInfo(connection, item.id, routeKey) : undefined

    const infoCategories = await getInfoCategoriesForItem(connection, item.id)

    connection.release()

    return {
        routeData,
        infoCategories
    }
}

async function getInfoCategoriesForItem(connection: Connection, itemId: number) {
    const infoQuery = `select info_type, info_value
                            from item_extra_info
                            where item_id = ?`
    const data = (await connection.query<RowDataPacket[]>(infoQuery, [itemId]))[0]
    return data.map(c => ({
        infoType: c.info_type as string,
        infoValue: c.info_value as string
    }))
}

async function getRouteInfo(connection: Connection, itemId: number, routeKey: string) {
    const routeInfoQuery = `select info.info 
                                from route_item_info as info 
                                left join route on info.route_id = route.id
                                where info.item_id = ? and route.route_key = ?`

    const data = (await connection.query<RowDataPacket[]>(routeInfoQuery, [itemId, routeKey]))[0]
    return {
        key: routeKey + "_title",
        value: data[0]?.info || "" as string
    }
}