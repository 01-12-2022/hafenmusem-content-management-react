import { Item } from "@/app/db/dbTypes";
import { getRouteInfo } from '@/app/db/extraInfos_db';
import TranslatedText from "@/components/TranslatedText";
import { AsyncReturnType } from "@/lib/utils";
import DisplayCard from "./displaycard";

type RouteInfoCardProps = {
    item: Item
    locale: string
    routeData: AsyncReturnType<typeof getRouteInfo>
    routeContext: string
    itemContext: string
}
export default function RouteInfoCard({ locale, routeData, routeContext, itemContext }: RouteInfoCardProps) {

    return (<DisplayCard>
        <TranslatedText textVariant={"h2"} locale={locale}
            stringKey={routeData.key}
            isForDisplay />

        <TranslatedText textVariant={"description"} locale={locale} stringKey={routeData.value}
            context={itemContext + "\n" + routeContext} fieldName="Item route Info"
            isEditable />
    </DisplayCard>)
}