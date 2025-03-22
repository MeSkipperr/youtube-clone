import en from "@/locales/en.json";
import id from "@/locales/id.json";
import jp from "@/locales/jp.json";
import { useLanguage } from "@/context/language/LanguageContext";

const translations = { en, id, jp };

export const useTranslation =  () => {
    const { language: locale } = useLanguage();
    const normalizedLocale = locale.toLowerCase() as keyof typeof translations;
    const t = translations[normalizedLocale] || translations.en;

    return {language:locale, t};
}
