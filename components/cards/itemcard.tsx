import {Item} from "@/app/db/dbTypes";
import DisplayCard from "@/components/cards/displaycard";
import TranslatedText from "@/components/TranslatedText";
import React from "react";

type ItemCardProps = {
    item: Item
    locale: string
    isForDisplay?: boolean
    maxLength?: number
}
export default function ItemCard({item, locale, isForDisplay = false, maxLength}: ItemCardProps) {
    const itemContext = `Item ${item.name}`

    const editProps = (fieldName: string) => (isForDisplay)
        ? {isForDisplay: true as const}
        : {context: itemContext, fieldName, isEditable: true as const}

    return (<DisplayCard>
        <TranslatedText textVariant={"h1"} locale={locale} stringKey={item.name}
                        {...editProps("Name")}/>
        <TranslatedText textVariant={"description"} locale={locale} stringKey={item.description}
                        maxLength={maxLength}
                        {...editProps("Description")}/>
    </DisplayCard>)
}