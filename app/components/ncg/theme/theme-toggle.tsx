"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";

interface ThemeToggleProps {
  variant?: "button" | "dropdown";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function ThemeToggle({
  variant = "dropdown",
  size = "icon",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <Button variant="outline" size={size} disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    );
  }

  const currentThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case "system":
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={toggleTheme}
        className="relative"
      >
        {currentThemeIcon()}
        {showLabel && (
          <span className="ml-2 capitalize">{theme || "system"}</span>
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size}>
          {currentThemeIcon()}
          {showLabel && (
            <span className="ml-2 capitalize">{theme || "system"}</span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
