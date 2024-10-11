import { Item } from "@/app/db/dbTypes";
import { getInfoCategoriesForItem } from "@/app/db/extraInfos_db";
import DisplayCard from "@/components/cards/displaycard";
import TranslatedText from "@/components/TranslatedText";
import { ArrayElement, AsyncReturnType, getContextForItem } from "@/lib/utils";
import DeleteInfoCategoryButton from "../deleteInfoCategoryButton";

type InfoCategoryArray = AsyncReturnType<typeof getInfoCategoriesForItem>
export type InfoCategory = ArrayElement<InfoCategoryArray>

type InfoCategoryProps = {
    infoCategory: InfoCategory
    locale: string
    item: Item
}
export default function InfoCategoryCard({ infoCategory, locale, item }: InfoCategoryProps) {
    const itemContext = getContextForItem(item)

    return (<DisplayCard>
        <DeleteInfoCategoryButton category={infoCategory} itemId={item.id} />

        <TranslatedText textVariant={"h2"} locale={locale} stringKey={infoCategory.infoType} isEditable
            context={itemContext}
            fieldName={"Info Category"} />

        <TranslatedText locale={locale} stringKey={infoCategory.infoValue} isEditable
            context={itemContext} fieldName={"Info Detail"} />
    </DisplayCard>)
}