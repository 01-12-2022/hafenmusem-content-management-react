import {PageParams} from "@/app/constants";
import {getSingleItemFromId} from "@/app/db/items_db";
import {getInformationCategoriesForItem} from "@/app/db/extraInfos_db";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import React from "react";
import TranslatedText from "@/components/TranslatedText";

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

    return (
        <div className="container mx-auto p-4">
            <Link href="/" passHref>
                <Button variant="ghost" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4"/> Back to Items
                </Button>
            </Link>
            <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl mb-2">
                                <TranslatedText locale={locale} stringKey={item.name}/>
                            </CardTitle>
                            <CardDescription className="text-lg">
                                <TranslatedText locale={locale} stringKey={item.description}/>
                            </CardDescription>
                        </div>
                        {/*{item.routeInfo && (*/}
                        {/*    <Badge variant="secondary" className="text-sm">*/}
                        {/*        Location: {item.routeInfo}*/}
                        {/*    </Badge>*/}
                        {/*)}*/}
                    </div>
                </CardHeader>
                {/*<CardContent>*/}
                {/*    <div className="grid gap-4 md:grid-cols-2">*/}
                {/*        {item.infoCategories.map((category, index) => (*/}
                {/*            <div key={index} className="space-y-1">*/}
                {/*                <h3 className="font-semibold text-sm uppercase text-muted-foreground">{category.title}</h3>*/}
                {/*                <p>{category.content}</p>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</CardContent>*/}
            </Card>

            {/*route info card*/}
            {!info.routeData
                ? <Card>No Route Data!!</Card>
                : <Card>
                    <CardHeader><TranslatedText locale={locale} stringKey={info.routeData.key}/></CardHeader>
                    <CardContent><TranslatedText locale={locale} stringKey={info.routeData.value}/></CardContent>
                </Card>
            }

            {/*info category card*/}
            <Card>

            </Card>
        </div>
    )
}