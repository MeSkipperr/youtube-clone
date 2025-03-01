"use client";

import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type SessionContextType = {
    session: Session | null; 
    status: "authenticated" | "unauthenticated" | "loading";
};

const IsLoginContext = createContext<SessionContextType | undefined>(undefined);

export function IsLoginProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    return (
        <IsLoginContext.Provider value={{ session, status }}>
            {children}
        </IsLoginContext.Provider>
    );
}

export function useIsLogin() {
    const context = useContext(IsLoginContext);
    if (!context) {
        throw new Error("useIsLogin must be used within an IsLoginProvider");
    }
    return context;
}
