"use client";

import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {
    console.warn('ThemeProvider not mounted yet');
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    // Check if inline script already applied dark class
    const isDark = document.documentElement.classList.contains("dark");
    const stored = localStorage.getItem("onesquad-theme") as Theme | null;
    const resolvedTheme = stored || (isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    return resolvedTheme;
  });

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("onesquad-theme", next);

    // Add transitioning class for smooth animation
    document.documentElement.classList.add("transitioning");
    document.documentElement.classList.toggle("dark", next === "dark");

    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("transitioning");
    }, 300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
