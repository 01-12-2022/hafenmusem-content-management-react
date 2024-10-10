'use server'
import {getTranslation} from "@/app/db/translations_db";
import EditTextButton from "@/components/EditTextButton";
import {EditButtonTypes} from "@/app/constants";
import {CSSProperties} from "react";

export type TranslationProps = {
    locale: string
    stringKey: string
    fieldName: string
    context: string
}
export default async function TranslatedText({locale, stringKey, fieldName, context}: TranslationProps) {
    const translation = await getTranslation(locale, stringKey);

    const containerStyles: CSSProperties = {display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: 5};

    if (!translation || !translation.success)
        return (<div style={{color: 'red', ...containerStyles}}>
            <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.add}
                            context={context} fieldName={fieldName} value={""}/>
            language:{locale} key:{stringKey}
        </div>)

    return (
        <div style={containerStyles}>
            <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.edit}
                            context={context} fieldName={fieldName} value={translation.translated}/>
            {translation.translated}
        </div>
    )
}