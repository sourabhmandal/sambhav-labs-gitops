import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./Button";
import { useTheme } from "../lib/useTheme";

const THEME_MAP = {
    dark: { Icon: Sun, label: "Light" },
    light: { Icon: Moon, label: "Dark" }
};

export function PreferenceBar() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    if (!mounted) {
        return (
            <div className="group fixed top-0 left-0 right-0 z-50 h-1.5 bg-background/80 backdrop-blur-sm border-b border-border overflow-hidden hover:h-12 focus-within:h-12 transition-all duration-200 ease-in-out">
                <div className="h-full w-full flex items-center justify-end px-4 bg-primary/80" />
            </div>
        );
    }

    const themeUI = resolvedTheme && THEME_MAP[resolvedTheme as keyof typeof THEME_MAP];
    const { Icon, label } = themeUI || { Icon: Sun, label: "Light" };

    return (
        <div className="group fixed top-0 left-0 right-0 z-50 h-1.5 bg-background/80 backdrop-blur-sm border-b border-border overflow-hidden hover:h-12 focus-within:h-12 transition-all duration-200 ease-in-out">
            <div className="h-full w-full flex items-center justify-end px-4 bg-primary/80">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="gap-2 hidden group-hover:inline-flex group-focus-within:inline-flex cursor-pointer"
                    aria-label={`Switch to ${label} mode`}
                >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{label}</span>
                </Button>
            </div>
        </div>
    );
}
