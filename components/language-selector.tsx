"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "en", label: "English" },
    { code: "vi", label: "Tiếng Việt" },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t("language.select")}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("language.select")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code)
              setOpen(false)
            }}
            className={language === lang.code ? "bg-primary/10 text-primary" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

