"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LanguageCodeType } from "./languageData";

// Context type definition
interface LanguageContextType {
    language: LanguageCodeType;
    setLanguage: (lang: LanguageCodeType) => void;
}

// Create a context with an undefined default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props definition for the LanguageProvider component
interface LanguageProviderProps {
    lang?: LanguageCodeType; // Optional initial language, defaults to "EN"
    children: ReactNode; // React children components
}

/**
 * LanguageProvider component that manages the language state and provides it via context.
 * 
 * @param {LanguageProviderProps} props - Props containing the initial language and children components.
 * @returns {JSX.Element} The context provider wrapping child components.
 */
export const LanguageProvider = ({ lang = "EN", children }: LanguageProviderProps) => {
    const router = useRouter();
    const [language, setLanguage] = useState<LanguageCodeType>(lang);
    const isFirstRender = useRef(true); // Tracks if this is the first render

    /**
     * Updates the language preference on the server via an API request.
     * 
     * @param {LanguageCodeType} lang - The selected language code.
     */
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
            router.refresh(); // Refresh the page after updating the language
        } catch (error) {
            console.error("Network error while updating language:", error);
        }
    }, [router]);

    // Effect to monitor changes in the language state and update the server accordingly
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Skip execution on the first render
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

/**
 * Custom hook to access the language context.
 * 
 * @returns {LanguageContextType} The current language and a function to update it.
 * @throws {Error} If used outside of a LanguageProvider.
 */
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
