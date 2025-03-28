"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "vi"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Check for user preference in localStorage
    const storedLanguage = localStorage.getItem("language") as Language | null

    // Check for browser language if no stored preference
    if (!storedLanguage) {
      const browserLanguage = navigator.language.startsWith("vi") ? "vi" : "en"
      setLanguage(browserLanguage)
      return
    }

    setLanguage(storedLanguage)
  }, [])

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem("language", language)

    // Update document lang attribute
    document.documentElement.lang = language
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

