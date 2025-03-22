"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LanguageCodeType } from "./languageData";

// Tipe context
interface LanguageContextType {
    language: LanguageCodeType;
    setLanguage: (lang: LanguageCodeType) => void;
}

// Context dengan default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props Provider
interface LanguageProviderProps {
    lang?: LanguageCodeType;
    children: ReactNode;
}

export const LanguageProvider = ({ lang = "EN", children }: LanguageProviderProps) => {
    const router = useRouter();
    const [language, setLanguage] = useState<LanguageCodeType>(lang);
    const isFirstRender = useRef(true); // Gunakan useRef untuk mendeteksi render pertama

    // Fungsi untuk memperbarui bahasa di cookie/server
    const updateLanguage = useCallback(async (lang: LanguageCodeType) => {
        try {
            const res = await fetch("/api/set-language", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language: lang }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Cannot update cookie language value. Error:", errorData.error || "Unknown error");
                return;
            }

            console.log("Language updated successfully!");
            router.refresh(); // Refresh halaman setelah bahasa diperbarui
        } catch (error) {
            console.error("Network error while updating language:", error);
        }
    }, [router]);

    // Effect untuk memantau perubahan language
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Skip pertama kali komponen render
        }

        if (language !== lang) {
            updateLanguage(language);
        }
    }, [language, lang, updateLanguage]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook untuk menggunakan context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
