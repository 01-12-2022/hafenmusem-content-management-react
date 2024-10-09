import {getTranslation} from "@/app/db/translations_db";
import EditTextButton from "@/components/EditTextButton";
import {EditButtonTypes} from "@/app/constants";
import {CSSProperties} from "react";

export type TranslationProps = {
    locale: string
    stringKey: string
}
export default async function TranslatedText({locale, stringKey}: TranslationProps) {
    const res = await getTranslation(stringKey, locale)

    const containerStyles: CSSProperties = {display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: 5};

    if (!res.success)
        return (<div style={{color: 'red', ...containerStyles}}>
            <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.add}/>
            language:{locale} key:{stringKey}
        </div>)

    return (
        <div style={containerStyles}>
            <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.edit}/>
            {res.translated}
        </div>
    )
}