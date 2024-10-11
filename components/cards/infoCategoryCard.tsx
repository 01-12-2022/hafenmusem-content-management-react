import TranslatedText from "@/components/TranslatedText";
import React from "react";
import { ArrayElement, AsyncReturnType } from "@/lib/utils";
import { getInfoCategoriesForItem } from "@/app/db/extraInfos_db";
import DisplayCard from "@/components/cards/displaycard";

type InfoCategoryArray = AsyncReturnType<typeof getInfoCategoriesForItem>
type InfoCategoryProps = {
    infoCategory: ArrayElement<InfoCategoryArray>
    locale: string
    itemContext: string
}
export default function InfoCategoryCard({ infoCategory, locale, itemContext }: InfoCategoryProps) {

    return (<DisplayCard>
        <TranslatedText textVariant={"h2"} locale={locale} stringKey={infoCategory.infoType} isEditable
            context={itemContext}
            fieldName={"Info Category"} />

        <TranslatedText locale={locale} stringKey={infoCategory.infoValue} isEditable
            context={itemContext} fieldName={"Info Detail"} />
    </DisplayCard>)
}