'use server'
import * as translations from '@/app/db/translations_db'
import {revalidatePath} from "next/cache";

export async function updateTranslationFromForm(locale: string, stringKey: string, formData: FormData) {
    const newString = formData.get('newValue')!!.toString()
    const result = await translations.updateTranslation(stringKey, locale, newString)
    console.log("res: ", result)
    revalidatePath('/')
}

export async function insertTranslationFromForm(locale: string, stringKey: string, formData: FormData) {
    const newString = formData.get('newValue')!!.toString()
    await translations.insertTranslation(stringKey, locale, newString)
    revalidatePath('/')
}