"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useState } from "react";

export interface UseThemeReturn {
  /** The current theme name */
  theme: string | undefined;
  /** The system theme (light/dark) */
  systemTheme: "light" | "dark" | undefined;
  /** The resolved theme (resolves 'system' to actual theme) */
  resolvedTheme: "light" | "dark" | undefined;
  /** Function to change the theme */
  setTheme: (theme: string) => void;
  /** Available theme names */
  themes: string[];
  /** Whether the theme has been loaded (for SSR) */
  isLoaded: boolean;
  /** Cycle to the next theme */
  cycleTheme: () => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const { theme, setTheme, resolvedTheme, systemTheme, themes }
    = useNextTheme();

  const [isLoaded, _setIsLoaded] = useState(true);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme || "system");
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    }
    else {
      setTheme("dark");
    }
  };

  return {
    theme,
    systemTheme,
    resolvedTheme: resolvedTheme as "light" | "dark" | undefined,
    setTheme,
    themes,
    isLoaded,
    cycleTheme,
    toggleTheme,
  };
}
