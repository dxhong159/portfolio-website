"use client"

import { useTheme } from "@/context/theme-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">{theme === "dark" ? t("theme.switchToLight") : t("theme.switchToDark")}</span>
    </Button>
  )
}

