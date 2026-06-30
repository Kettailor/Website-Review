"use client";

import { useEffect, useState } from "react";

type Language = "vi" | "en";
type Theme = "light" | "dark";

export function SiteControls() {
  const [language, setLanguage] = useState<Language>("vi");
  const [theme, setTheme] = useState<Theme>("light");
  const themeLabel =
    language === "vi" ? (theme === "light" ? "Tối" : "Sáng") : theme === "light" ? "Dark" : "Light";
  const themeAriaLabel =
    language === "vi"
      ? theme === "light"
        ? "Chuyển sang giao diện tối"
        : "Chuyển sang giao diện sáng"
      : theme === "light"
        ? "Switch to dark mode"
        : "Switch to light mode";

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("ubpet-language") as Language | null;
    const savedTheme = window.localStorage.getItem("ubpet-theme") as Theme | null;
    const preferredLanguage = navigator.language.toLowerCase().startsWith("en") ? "en" : "vi";
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    setLanguage(savedLanguage ?? preferredLanguage);
    setTheme(savedTheme ?? preferredTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lang = language;
    document.documentElement.lang = language;
    window.localStorage.setItem("ubpet-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("ubpet-theme", theme);
  }, [theme]);

  return (
    <div className="site-controls" aria-label="Display controls">
      <div className="segmented-control" aria-label="Language">
        <button
          type="button"
          className={language === "vi" ? "active" : ""}
          onClick={() => setLanguage("vi")}
          aria-pressed={language === "vi"}
        >
          VI
        </button>
        <button
          type="button"
          className={language === "en" ? "active" : ""}
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
        >
          EN
        </button>
      </div>
      <button
        className="theme-toggle"
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={themeAriaLabel}
        aria-pressed={theme === "dark"}
      >
        {themeLabel}
      </button>
    </div>
  );
}
