export const LANGUAGES = [
    {
        fullName: "Indonesian",
        shortCode: "ID",
    },
    {
        fullName: "English",
        shortCode: "EN",
    },
    {
        fullName: "Japanese",
        shortCode: "JP",
    },
] as const;

export type LanguageCodeType = typeof LANGUAGES[number]["shortCode"];
