import { cookies } from "next/headers";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import jp from "@/locales/jp.json";
import { LanguageCodeType } from "@/context/language/languageData";

const translations = { en, id, jp };


export const getLanguage = async (): Promise<{ language: LanguageCodeType; t: typeof en }> => {
    // Tunggu cookies() agar tidak ada Promise yang menggantung
    const cookieStore = await cookies(); // Tidak perlu await karena ini bukan async function

    // Ambil nilai cookie "language", default ke "EN" jika tidak ada
    const language = (cookieStore.get("language")?.value as LanguageCodeType) || "EN";

    // Pilih terjemahan berdasarkan bahasa
    const t = translations[language.toLowerCase() as keyof typeof translations] || translations.en;

    return { language, t };
};
