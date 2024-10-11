'use server'
import * as translations from '@/app/db/translations_db'
import { revalidatePath } from "next/cache";

export async function updateTranslationFromForm(locale: string, stringKey: string, formData: FormData) {
    const newValue = formData.get('newValue')
    if (!newValue) throw new Error("No value found in form data")

    const newString = newValue.toString()
    await translations.updateTranslation(stringKey, locale, newString)
    revalidatePath('/')
}

export async function insertTranslationFromForm(locale: string, stringKey: string, formData: FormData) {
    const newValue = formData.get('newValue')
    if (!newValue) throw new Error("No value found in form data")

    const newString = newValue.toString()

    await translations.insertTranslation(stringKey, locale, newString)
    revalidatePath('/')
}