import { LanguageCodeType } from "./constants";

/**
 * Calculates the time difference between a given date and the current time,
 * returning a human-readable string in the specified language.
 *
 * @param {Date} date - The date to compare with the current time.
 * @param {LanguageCodeType} [lang="EN"] - The language for the output string (default is English).
 * @returns {string} - A formatted string representing the time difference.
 */


export const timeDifference = ( date:Date, lang : LanguageCodeType = "EN"): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const timeUnits: Record<string, number> = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    const translations: Record<string, Record<string, string>> = {
        EN: { year: "year", month: "month", day: "day", hour: "hour", minute: "minute", second: "second", ago: "ago" },
        ID: { year: "tahun", month: "bulan", day: "hari", hour: "jam", minute: "menit", second: "detik", ago: "yang lalu" },
        JP: { year: "年", month: "ヶ月", day: "日", hour: "時間", minute: "分", second: "秒", ago: "前" },
    };

    for (const unit in timeUnits) {
        const interval = Math.floor(diffInSeconds / timeUnits[unit]);
        if (interval >= 1) {
            const unitText = translations[lang]?.[unit] || unit;
            const agoText = translations[lang]?.["ago"] || "ago";
            const pluralSuffix = interval > 1 && lang === "EN" ? "s" : "";
            return `${interval} ${unitText}${pluralSuffix} ${agoText}`;
        }
    }

    // Return default strings for cases where the time difference is very small
    const defaultMessages: Record<string, string> = {
        EN: "just now",
        ID: "baru saja",
        JP: "たった今",
    };
    return defaultMessages[lang] || defaultMessages["EN"];
};