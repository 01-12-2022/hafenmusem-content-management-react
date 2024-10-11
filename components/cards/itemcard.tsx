import { Item } from "@/app/db/dbTypes";
import DisplayCard from "@/components/cards/displaycard";
import TranslatedText from "@/components/TranslatedText";
import React from "react";
import DeleteItemButton from "../deleteItemButton";

type ItemCardProps = {
    item: Item
    locale: string
    isForDisplay?: boolean
    maxLength?: number
}
export default function ItemCard({ item, locale, isForDisplay = false, maxLength }: ItemCardProps) {
    const itemContext = `Item ${item.name}`

    const editProps = (fieldName: string) => (isForDisplay)
        ? { isForDisplay: true as const }
        : { context: itemContext, fieldName, isEditable: true as const }

    return (<DisplayCard>
        {!isForDisplay && <div className='w-full relative top-0 right-0'>
            <DeleteItemButton item={item} />
        </div>}
        <TranslatedText textVariant={"h1"} locale={locale} stringKey={item.name}
            {...editProps("Name")} />
        <TranslatedText textVariant={"description"} locale={locale} stringKey={item.description}
            maxLength={maxLength}
            {...editProps("Description")} />
    </DisplayCard>)
}