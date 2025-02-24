"use client"
import { createContext, useContext } from "react";

const login = false;

const IsLoginContext = createContext({ login });

export function IsLoginProvider({ children }: { children: React.ReactNode }) {
    return (
        <IsLoginContext.Provider value={{ login }}>
            {children}
        </IsLoginContext.Provider>
    );
}

export function useIsLogin() {
    return useContext(IsLoginContext);
}
