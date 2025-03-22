import en from "@/locales/en.json";
import id from "@/locales/id.json";
import jp from "@/locales/jp.json";
import { useLanguage } from "@/context/language/LanguageContext";

// Object containing translations for supported languages
const translations = { en, id, jp };

/**
 * Custom hook for retrieving translations based on the current language.
 * 
 * @returns {{
 *   language: string;
 *   t: typeof translations[keyof typeof translations];
 * }} An object containing:
 * - `language`: The current selected language.
 * - `t`: The corresponding translation object based on the selected language.
 */
export const useTranslation = () => {
    // Get the current language from the language context
    const { language: locale } = useLanguage();

    // Normalize the locale string to lowercase and ensure it matches a translation key
    const normalizedLocale = locale.toLowerCase() as keyof typeof translations;

    // Retrieve the translation object based on the selected locale, defaulting to English if not found
    const t = translations[normalizedLocale] || translations.en;

    return { language: locale, t };
};
