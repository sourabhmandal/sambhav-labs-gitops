import React from "react";
import { Globe } from "lucide-react";

export interface FooterProps {
    enabledLanguages?: { label: string; href: string; languageTag: string }[];
    currentLanguage?: { label: string; languageTag: string };
}

export const Footer: React.FC<FooterProps> = ({ enabledLanguages, currentLanguage }) => {
    if (!enabledLanguages || enabledLanguages.length <= 1) {
        return null;
    }

    return (
        <footer className="mt-8 pt-4 border-t border-border/50 flex flex-col items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/80">
                <Globe className="h-3.5 w-3.5" />
                <select
                    aria-label="Select Language"
                    value={currentLanguage?.languageTag}
                    onChange={e => {
                        const selected = enabledLanguages.find(
                            l => l.languageTag === e.target.value
                        );
                        if (selected?.href) {
                            window.location.href = selected.href;
                        }
                    }}
                    className="bg-transparent text-xs text-foreground cursor-pointer outline-none hover:underline"
                >
                    {enabledLanguages.map(lang => (
                        <option
                            key={lang.languageTag}
                            value={lang.languageTag}
                            className="bg-card text-card-foreground"
                        >
                            {lang.label}
                        </option>
                    ))}
                </select>
            </div>
        </footer>
    );
};
