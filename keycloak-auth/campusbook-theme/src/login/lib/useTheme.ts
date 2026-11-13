import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function getSystemTheme(): Theme {
    if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }
    return "light";
}

function getStoredTheme(): Theme | null {
    if (typeof window === "undefined") return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") {
            return stored;
        }
    } catch {
        // Handle localStorage access exceptions in sandbox/private modes
    }
    return null;
}

export function applyTheme(theme: Theme) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
    } else {
        root.classList.remove("dark");
        root.classList.add("light");
    }
}

// Immediate initial execution on module load
if (typeof window !== "undefined") {
    const initial = getStoredTheme() || getSystemTheme();
    applyTheme(initial);
}

function isTypingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    return (
        target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
    );
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(
        () => getStoredTheme() || getSystemTheme()
    );

    const setTheme = useCallback((newTheme: Theme) => {
        try {
            localStorage.setItem(STORAGE_KEY, newTheme);
        } catch {
            // Ignore storage write error
        }
        applyTheme(newTheme);
        setThemeState(newTheme);
    }, []);

    // Sync across storage events (e.g. other tabs/windows)
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (
                e.key === STORAGE_KEY &&
                (e.newValue === "dark" || e.newValue === "light")
            ) {
                applyTheme(e.newValue);
                setThemeState(e.newValue);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // Listen for OS theme changes if user hasn't explicitly set a preference
    useEffect(() => {
        if (!window.matchMedia) return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => {
            if (!getStoredTheme()) {
                const sys = mediaQuery.matches ? "dark" : "light";
                applyTheme(sys);
                setThemeState(sys);
            }
        };
        mediaQuery.addEventListener?.("change", onChange);
        return () => mediaQuery.removeEventListener?.("change", onChange);
    }, []);

    // Campusbook 'd' hotkey listener
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.defaultPrevented || event.repeat) {
                return;
            }
            if (event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }
            if (event.key.toLowerCase() !== "d") {
                return;
            }
            if (isTypingTarget(event.target)) {
                return;
            }
            setTheme(theme === "dark" ? "light" : "dark");
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [theme, setTheme]);

    return {
        theme,
        resolvedTheme: theme,
        setTheme
    };
}
