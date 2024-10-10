'use server'
import * as translations from '@/app/db/translations_db'

export async function updateTranslation(locale: string, stringKey: string, newValue: string) {
    translations.updateTranslation(locale, stringKey, newValue)
}

export async function insertTranslation(locale: string, stringKey: string, newValue: string) {
    translations.insertTranslation(locale, stringKey, newValue)
}