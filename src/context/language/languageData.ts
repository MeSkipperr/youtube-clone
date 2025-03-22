/**
 * List of supported languages with their full names and short codes.
 */
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

/**
 * Type representing the valid language short codes.
 * This extracts the "shortCode" values from the LANGUAGES array.
 */
export type LanguageCodeType = typeof LANGUAGES[number]["shortCode"];
