import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Item } from "@/app/db/dbTypes";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any

export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const getContextForItem = (item: Item) => `Item: ${getItemNameFromNameKey(item)}`
export const getItemNameFromNameKey = (item: Item) => item.name.substring(item.name.indexOf("_") + 1, item.name.lastIndexOf("_"))