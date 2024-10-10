import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {Item} from "@/app/db/dbTypes";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
    T extends (...args: any) => Promise<infer R> ? R : any

export const getContextForItem = (item: Item) => `Item: ${item.name.substring(item.name.indexOf("_") + 1, item.name.lastIndexOf("_"))}`