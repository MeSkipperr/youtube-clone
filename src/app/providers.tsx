"use client";

import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { IsLoginProvider } from "@/context/is-login";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
        <IsLoginProvider>
          <DarkModeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </DarkModeProvider>
        </IsLoginProvider>
      </SessionProvider>
  )
}
