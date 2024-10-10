import {PageParams} from "@/app/constants";
import {getSingleItemFromId} from "@/app/db/items_db";
import {getInformationCategoriesForItem} from "@/app/db/extraInfos_db";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import React from "react";
import {ItemPageContent} from "@/app/items/[id]/itemPageContent";

export default async function Page({params, searchParams}: PageParams<{ id: string }>) {
    const locale = searchParams.locale || 'de'
    const route = searchParams.route || undefined

    // Handle cases where id might be undefined or an empty string
    const itemId = params && params.id && params.id !== '' ? parseInt(params.id, 10) : 1;

    const item = await getSingleItemFromId(itemId);
    const info = await getInformationCategoriesForItem(item, route)

    if (!item) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Item not found</h1>
                <p>The requested item (ID: {itemId}) could not be found.</p>
                <Link href="/" passHref>
                    <Button variant="ghost" className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4"/> Back to Items
                    </Button>
                </Link>
            </div>
        )
    }

    return <ItemPageContent item={item} info={info} locale={locale} route={route}/>
}