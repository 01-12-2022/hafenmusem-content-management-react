import {RowDataPacket} from "mysql2/promise";
import {createConnection} from "@/app/db/db";


export async function getRoutesOfItem(itemId: number) {
    const connection = await createConnection();

    const routeInfoQuery = `select 
                                r.id as id,
                                r.route_name as route_name,
                                r.route_key as route_key
                                from route_testdata as rt
                                left join route as r on r.id = rt.route_id
                                where rt.testdata_id = ?`

    const data = (await connection.query<RowDataPacket[]>(routeInfoQuery, [itemId]))[0]

    // connection.release()

    return data.map(d => ({
        id: d.id,
        routeName: d.route_name,
        routeKey: d.route_key,
    }))
}