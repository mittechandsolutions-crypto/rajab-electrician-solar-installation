"use client";

import React, { createContext, useContext, useState } from "react";
import { en } from "./en";
import { ur } from "./ur";

type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  t: typeof en;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem("rajab_lang");
    return saved === "ur" ? "ur" : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("rajab_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ur" : "en";
    setLanguage(nextLang);
  };

  const dir = language === "ur" ? "rtl" : "ltr";
  const t = language === "ur" ? (ur as unknown as typeof en) : en;

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage, dir }}>
      <div dir={dir} className={language === "ur" ? "font-urdu" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
