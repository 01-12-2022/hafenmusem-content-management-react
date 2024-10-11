'use server'
import { getAllItems } from "@/app/db/items_db";
import React from "react";
import { PageParams } from "@/app/constants";
import Link from "next/link";
import ItemCard from "@/components/cards/itemcard";
import AddItemButton from '@/components/addItemButton'

export default async function Page({ searchParams }: PageParams) {
    const items = await getAllItems();
    const locale = searchParams.locale || 'de'

    return (<>
        <div className="flex flex-row justify-end p-5">
            <h1 className="flex-grow text-center text-3xl">Items</h1>
            <AddItemButton locale={locale} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
            {items.map(i => (
                <Link key={i.id} style={{ width: 'auto' }} href={`/items/${i.id}`}>
                    <ItemCard item={i} locale={locale} isForDisplay maxLength={250} />
                </Link>
            ))}
        </div>
    </>)
}