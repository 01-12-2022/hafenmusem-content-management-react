import {Card} from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import React from "react";
import {Item} from "@/app/db/dbTypes";
import {AsyncReturnType} from "@/lib/utils";
import {getRouteInfo} from '@/app/db/extraInfos_db'

type RouteInfoCardProps = {
    item: Item
    locale: string
    routeData: AsyncReturnType<typeof getRouteInfo>
    routeContext: string
    itemContext: string
}
export default function RouteInfoCard({locale, routeData, routeContext, itemContext}: RouteInfoCardProps) {

    return (<Card>
        <TranslatedText textVariant={"h2"} locale={locale} stringKey={routeData.key} isForDisplay/>

        <TranslatedText textVariant={"description"} locale={locale} stringKey={routeData.value}
                        context={itemContext + "\n" + routeContext} fieldName="Item route Info"
                        isEditable/>
    </Card>)
}