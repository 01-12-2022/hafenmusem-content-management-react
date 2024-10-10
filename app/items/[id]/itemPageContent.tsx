'use server'
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import React from "react";
import {Item} from "@/app/db/dbTypes";
import {getInformationCategoriesForItem} from "@/app/db/extraInfos_db";
import {AsyncReturnType, getContextForItem} from "@/lib/utils";

type ItemPageContentProps = {
    locale: string
    item: Item
    route?: string
    info: AsyncReturnType<typeof getInformationCategoriesForItem>
}

export async function ItemPageContent({locale, item, route, info}: ItemPageContentProps) {
    const itemContext = getContextForItem(item);
    const routeContext = `Route ${route}`

    return (<>
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-3xl mb-2">
                            <TranslatedText locale={locale} stringKey={item.name} context={itemContext}
                                            fieldName="Name" isEditable/>
                        </CardTitle>
                        <CardDescription className="text-lg">
                            <TranslatedText locale={locale} stringKey={item.description} context={itemContext}
                                            fieldName="Description" isEditable/>
                        </CardDescription>
                    </div>

                </div>
            </CardHeader>
        </Card>

        {/*route info card*/
        }
        {
            !info.routeData
                ? <Card>No Route Data!!</Card>
                : <Card>
                    <CardHeader>
                        <TranslatedText locale={locale} stringKey={info.routeData.key} isForDisplay/>
                    </CardHeader>
                    <CardContent>
                        <TranslatedText locale={locale} stringKey={info.routeData.value}
                                        context={itemContext + "\n" + routeContext} fieldName="Item route Info"
                                        isEditable
                        />
                    </CardContent>
                </Card>
        }

        {/*info category card*/
        }
        {
            info.infoCategories.map((ic, i) => (
                <Card key={ic.infoType + i}>
                    <CardHeader>{ic.infoType}</CardHeader>
                    <CardDescription>{ic.infoValue}</CardDescription>
                </Card>
            ))
        }
    </>)
}