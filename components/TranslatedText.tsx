'use server'
import {getTranslation} from "@/app/db/translations_db";
import {EditTextButton} from "@/components/EditTextButton";
import {EditButtonTypes} from "@/app/constants";
import {CSSProperties} from "react";

type TranslationDisplayProps = {
    locale: string,
    stringKey: string,
    maxLength?: number
    isForDisplay: true
    fieldName?: never,
    context?: never
    isEditable?: never
}
type TranslationEditProps = {
    locale: string,
    stringKey: string,
    maxLength?: number
    isEditable: true,
    context: string,
    fieldName: string
}

export type TranslationProps = TranslationDisplayProps | TranslationEditProps
export default async function TranslatedText({
                                                 locale,
                                                 stringKey,
                                                 fieldName,
                                                 context,
                                                 isEditable = true,
                                                 maxLength
                                             }: TranslationProps) {
    const translation = await getTranslation(stringKey, locale);
    const shortenIfMaxLength = (s: string) => (maxLength) ? `${s.substring(0, maxLength)}...` : s;

    const containerStyles: CSSProperties = {display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: 5};

    if (!translation || !translation.success)
        return (<div style={{color: 'red', ...containerStyles}}>
            {isEditable && <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.add}
                                           context={context!!} fieldName={fieldName!!} value={""}/>}
            language:{locale} key:{stringKey}
        </div>)

    return (
        <div style={containerStyles}>
            {isEditable && <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.edit}
                                           context={context!!} fieldName={fieldName!!} value={translation.translated}/>}
            {shortenIfMaxLength(translation.translated)}
        </div>
    )
}