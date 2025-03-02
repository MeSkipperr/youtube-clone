"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export const themeValue = ["System" , "Dark" , "Light"]
export type ThemeType = typeof themeValue[number]


interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    setTheme: (theme: ThemeType) => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);


export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mode: ThemeType = (localStorage.getItem("theme") as ThemeType) ?? "Light";
    
        if (mode === "Light") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else if (mode === "Dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(prefersDark);
            document.documentElement.classList.toggle("dark", prefersDark);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            document.documentElement.classList.toggle("dark", newMode);
            localStorage.setItem("theme", newMode ? "Dark" : "Light");
            return newMode;
        });
    };

    const setTheme = (theme: ThemeType) => {
        if (theme === "Dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "Dark");
        } else if (theme === "Light") {
            setIsDarkMode(false);
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "Light");
        } else {
            // Gunakan tema perangkat (sistem)
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setIsDarkMode(prefersDark);
            document.documentElement.classList.toggle("dark", prefersDark);
            localStorage.setItem("theme", "System");
        }
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, setTheme }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
};
