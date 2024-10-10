'use server'
import {getAllItems} from "@/app/db/items_db";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import TranslatedText from "@/components/TranslatedText";
import React from "react";
import {PageParams} from "@/app/constants";
import {Item} from "@/app/db/dbTypes";
import {getContextForItem} from "@/lib/utils";
import Link from "next/link";

export default async function Page({searchParams}: PageParams) {
    const items = await getAllItems();
    const locale = searchParams.locale || 'de'

    return (<>
        <div style={{display: 'flex', flexDirection: 'column', gap: 30, padding: 30}}>
            {items.map(i => (
                <Link href={`/items/${i.id}`}>
                    <Card key={i.id} className="w-full max-w-3xl mx-auto">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-3xl mb-2">
                                        <TranslatedText locale={locale} stringKey={i.name}
                                                        context={getContextForItem(i)}
                                                        isEditable={false}
                                                        fieldName="Name"/>
                                    </CardTitle>
                                    <CardDescription className="text-lg">
                                        <TranslatedText locale={locale} stringKey={i.description}
                                                        context={getContextForItem(i)}
                                                        isEditable={false}
                                                        maxLength={500}
                                                        fieldName="Description"/>
                                    </CardDescription>
                                </div>

                            </div>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    </>)
}