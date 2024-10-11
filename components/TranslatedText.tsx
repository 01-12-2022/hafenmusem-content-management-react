'use server'
import { EditButtonTypes } from "@/app/constants";
import { getTranslationFromDb } from "@/app/db/translations_db";
import { EditTextButton } from "@/components/EditTextButton";
import { CSSProperties, ReactNode } from "react";

type TextVariants = "default" | "h1" | "h2" | "h3" | "description"
type TranslationDisplayProps = {
    locale: string,
    stringKey: string,
    textVariant?: TextVariants
    maxLength?: number
    isForDisplay: true
    fieldName?: never,
    context?: never
    isEditable?: never
}
type TranslationEditProps = {
    locale: string,
    stringKey: string,
    textVariant?: TextVariants
    maxLength?: number
    isEditable: true,
    context: string,
    fieldName: string
}

export type TranslationProps = TranslationDisplayProps | TranslationEditProps
export default async function TranslatedText({
    locale, stringKey,
    fieldName, context,
    textVariant = "default",
    isEditable,
    maxLength
}: TranslationProps) {
    const translation = await getTranslationFromDb(stringKey, locale);
    const shortenIfMaxLength = (s: string) => (maxLength && s.length > maxLength) ? `${s.substring(0, maxLength)}...` : s;

    const containerStyles: CSSProperties = { display: 'flex', flexDirection: 'row', justifyItems: 'center', gap: 5 };

    if (!translation || !translation.success)
        return (<div style={{ color: 'red', ...containerStyles }}>
            {isEditable && <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.add}
                context={context} fieldName={fieldName} value={""} />}
            <TextTypeWrapper textVariant={textVariant}>
                language:{locale} key:{stringKey}
            </TextTypeWrapper>
        </div>)

    return (
        <div style={containerStyles}>
            {isEditable && <EditTextButton locale={locale} stringKey={stringKey} variant={EditButtonTypes.edit}
                context={context} fieldName={fieldName} value={translation.translated} />}


            <TextTypeWrapper textVariant={textVariant}>
                {shortenIfMaxLength(translation.translated)}
            </TextTypeWrapper>
        </div>
    )
}

function TextTypeWrapper({ textVariant, children }: { textVariant: TextVariants, children: ReactNode }) {
    switch (textVariant) {
        case "h1":
            return <h1 className="text-3xl mb-2">{children}</h1>
        case "h2":
            return <h2 style={{ fontWeight: '600' }}>{children}</h2>;
        case "h3":
            return <h3>{children}</h3>
        case "description":
            return <p className="text-lg">{children}</p>
        case "default":
            return <p>{children}</p>
    }
}