import { cookies } from "next/headers";
import { LanguageCodeType } from "./constants";

/**
 * Retrieves the preferred language from cookies.
 * 
 * @returns {Promise<LanguageCodeType>} A promise that resolves to the language code stored in the cookies.
 * If the cookie is not set, it defaults to "EN".
 */
export const getLanguage = async (): Promise<LanguageCodeType> => {
    // Retrieve the cookies object from the request headers
    const cookieStore = await cookies();

    // Get the value of the "language" cookie and cast it to LanguageCodeType, defaulting to "EN" if not found
    return (cookieStore.get("language")?.value as LanguageCodeType) || "EN";
};
