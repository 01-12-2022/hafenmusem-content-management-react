export type ItemTable = {
    id: string,
    name: string,
    description: string
}

export type RouteTable = {
    route_id: string
    testdata_id: string
}

export type Item = {
    id: number,
    name: string,
    description: string,
    image: Buffer
}

export type TourStop = {
    routeId: number,
    itemId: number,
    stop: number
}