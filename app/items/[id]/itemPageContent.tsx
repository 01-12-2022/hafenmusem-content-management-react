'use server'
import {Card} from "@/components/ui/card";
import React from "react";
import {Item} from "@/app/db/dbTypes";
import {getInformationCategoriesForItem} from "@/app/db/extraInfos_db";
import {AsyncReturnType, getContextForItem} from "@/lib/utils";
import ItemCard from "@/components/itemcard";
import RouteInfoCard from "@/components/routeInfoCard";
import InfoCategoryCard from "@/components/infoCategoryCard";

type ItemPageContentProps = {
    locale: string
    item: Item
    route?: string
    info: AsyncReturnType<typeof getInformationCategoriesForItem>
}

export async function ItemPageContent({locale, item, route, info}: ItemPageContentProps) {
    const itemContext = getContextForItem(item);
    const routeContext = `Route ${route}`

    return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30}}>
        <ItemCard item={item} locale={locale}/>

        {
            !info.routeData
                ? <Card>No Route Data!!</Card>
                : <RouteInfoCard item={item} locale={locale}
                                 itemContext={itemContext} routeContext={routeContext}
                                 routeData={info.routeData}/>
        }


        {
            info.infoCategories.map((ic, i) => (
                <InfoCategoryCard key={ic.infoType + i} infoCategory={ic} locale={locale} itemContext={itemContext}/>
            ))
        }
    </div>)
}