import { cookies } from "next/headers";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import jp from "@/locales/jp.json";
import { LanguageCodeType } from "@/context/language/languageData";

// Object containing translations for supported languages.
// const translations = { en };
const translations = { en, id, jp };

/**
 * Retrieves the user's language preference from cookies and returns the corresponding translations.
 * 
 * This function reads the "language" cookie and determines which translation file to use.
 * If the cookie is missing or contains an invalid value, the default language "EN" is used.
 * 
 * @returns {Promise<{ language: LanguageCodeType; t: typeof translations.en }>} 
 * An object containing the selected language code and its corresponding translation data.
 */
export const getLanguage = async (): Promise<{ language: LanguageCodeType; t: typeof translations.en }> => {
    // Retrieve cookies from the request headers.
    const cookieStore = await cookies();

    // Get the language from the "language" cookie, defaulting to "EN" if not found.
    const language = (cookieStore.get("language")?.value as LanguageCodeType) || "EN";

    // Select the appropriate translation file based on the detected language.
    // If the language is not recognized, fallback to English translations.
    const t = translations[language.toLowerCase() as keyof typeof translations] || translations.en;

    return { language, t };
};
