'use server'
import { Item } from "@/app/db/dbTypes";
import { getInformationCategoriesForItem } from "@/app/db/extraInfos_db";
import AddInfoCategoryButton from "@/components/addInfoCategoryButton";
import DisplayCard from "@/components/cards/displaycard";
import InfoCategoryCard from "@/components/cards/infoCategoryCard";
import ItemCard from "@/components/cards/itemcard";
import RouteInfoCard from "@/components/cards/routeInfoCard";
import { AsyncReturnType, getContextForItem } from "@/lib/utils";

type PreQueriedTextType = {
    infoTypes: { infoType: string, infoValue: string }[]
}

type ItemPageContentProps = {
    locale: string
    item: Item
    route?: string
    info: AsyncReturnType<typeof getInformationCategoriesForItem>
}

export async function ItemPageContent({ locale, item, route, info }: ItemPageContentProps) {
    const itemContext = getContextForItem(item);
    const routeContext = `Route ${route}`

    return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
        <ItemCard item={item} locale={locale} />

        <div>
            <h1>Route Info</h1>
            <hr className='mb-2'/>
            {
                !info.routeData
                    ? <DisplayCard>No Route Selected.</DisplayCard>
                    : <RouteInfoCard item={item} locale={locale}
                        itemContext={itemContext} routeContext={routeContext}
                        routeData={info.routeData} />
            }
        </div>

        <div>
            <h1>Info Categories</h1>
            <hr className='mb-2' />
            <AddInfoCategoryButton item={item} locale={locale} />
            {
                info.infoCategories.map((ic, i) => (
                    <InfoCategoryCard key={ic.infoType + i} infoCategory={ic} locale={locale} itemContext={itemContext} />
                ))
            }
        </div>
    </div>)
}