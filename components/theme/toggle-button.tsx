"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  return theme === "light" ? (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => setTheme("dark")}
    >
      <Sun />
    </Button>
  ) : (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={() => setTheme("light")}
    >
      <Moon />
    </Button>
  );
};
