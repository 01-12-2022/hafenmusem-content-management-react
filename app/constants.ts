export type PageParams<T = void> = {
    params: T & {

    },
    searchParams: {
        route?: string,
        locale?: string
    }
}

export type ValueOf<T> = T[keyof T]

export enum EditButtonTypes {
    edit,
    add
}