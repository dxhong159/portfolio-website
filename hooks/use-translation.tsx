"use client"

import { useLanguage } from "@/context/language-context"
import enTranslations from "@/locales/en"
import viTranslations from "@/locales/vi"

export function useTranslation() {
  const { language } = useLanguage()

  const translations = {
    en: enTranslations,
    vi: viTranslations,
  }

  const t = (key: string) => {
    // Split the key by dots to access nested properties
    const keys = key.split(".")
    let translation = translations[language]

    // Navigate through the nested properties
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k]
      } else {
        // Fallback to English if translation not found
        let fallback = translations.en
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk]
          } else {
            return key // Return the key if no translation found
          }
        }
        return fallback
      }
    }

    return translation
  }

  return { t, language }
}

