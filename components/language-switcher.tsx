"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { useLanguage } from "@/contexts/language-context"
import { Language } from "@/lib/translations"

type LanguageOption = {
    code: Language
    name: string
    flag: string
}

const languages: LanguageOption[] = [
    {
        code: "en",
        name: "English",
        flag: "🇬🇧"
    },
    {
        code: "fr",
        name: "Français",
        flag: "🇫🇷"
    }
]

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
    const { language, setLanguage } = useLanguage()

    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === language) || languages[0]
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={`${className} w-[140px] cursor-pointer justify-start gap-2 font-normal`}
                >
                    <span className="text-lg leading-none">{getCurrentLanguage().flag}</span>
                    <span>{getCurrentLanguage().name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[140px]">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        className="gap-2"
                        onClick={() => setLanguage(lang.code)}
                    >
                        <span className="text-lg leading-none">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {language === lang.code && (
                            <Check className="h-4 w-4 ml-auto" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

