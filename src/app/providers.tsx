"use client";

import { SidebarProvider } from "@/components/sidebar/SidebarContext";
import { IsLoginProvider } from "@/context/is-login";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <SessionProvider>
        <IsLoginProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </IsLoginProvider>
      </SessionProvider>
  )
}
