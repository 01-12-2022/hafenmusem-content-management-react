'use server'
import {getAllItems} from "@/app/db/items_db";
import React from "react";
import {PageParams} from "@/app/constants";
import Link from "next/link";
import ItemCard from "@/components/cards/itemcard";

export default async function Page({searchParams}: PageParams) {
    const items = await getAllItems();
    const locale = searchParams.locale || 'de'

    return (<>
        <AddItemButton />
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, padding: 30}}>
            {items.map(i => (
                <Link key={i.id} href={`/items/${i.id}`}>
                    <ItemCard item={i} locale={locale} isForDisplay />
                </Link>
            ))}
        </div>
    </>)
}