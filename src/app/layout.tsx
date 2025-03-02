import type { Metadata } from "next";
import "./globals.css";
import "./main.css";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import { LanguageCodeType } from "@/utils/constants";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Youtube Clone ",
  description: "Youtube Clone by I Kadek Yola Andika",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies();
  const language = (cookieStore.get("language")?.value as LanguageCodeType) || "EN";

  return (
    <html lang="en">
      <body className="bg-primary relative dark:bg-dark">
        <Providers>
          <Navbar language={language}>
            {children}
          </Navbar>
        </Providers>
      </body>
    </html>
  );
}
