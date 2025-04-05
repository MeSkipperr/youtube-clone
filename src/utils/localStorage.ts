// utils/localStorage.ts

type StorageKey = string;

/**
 * Save data to localStorage.
 * @param key - The key under which the value will be stored.
 * @param value - The value to store, can be any serializable object.
 * 
 * Usage:
 * setLocalStorage("user", { id: 1, name: "Kadek" });
 */
export const setLocalStorage = <T>(key: StorageKey, value: T): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retrieve data from localStorage.
 * @param key - The key of the stored value.
 * @returns The stored value or null if not found.
 * 
 * Usage:
 * const user = getLocalStorage<{ id: number; name: string }>("user");
 * console.log(user);
 */
export function getLocalStorage<T>(key: string): T | null {
    if (typeof window === "undefined") {
        // If we're on the server, return null
        return null;
    }
    
    const item = localStorage.getItem(key);
    if (item) {
        try {
            // Try to parse as JSON, if fails return the item as string
            return JSON.parse(item);
        } catch {
            return item as T;
        }
    }
    return null;
}

/**
 * Remove a specific key from localStorage.
 * @param key - The key to remove.
 * 
 * Usage:
 * removeLocalStorage("user");
 */
export const removeLocalStorage = (key: StorageKey): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.removeItem(key);
};

/**
 * Clear all data from localStorage.
 * 
 * Usage:
 * clearLocalStorage();
 */
export const clearLocalStorage = (): void => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser
    localStorage.clear();
};
