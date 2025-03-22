import type { Metadata } from "next";
import "./globals.css";
import "./main.css";
import Navbar from "@/components/navbar";
import { Providers } from "./providers";
import { getLanguage } from "@/utils/getLanguage";
import { LanguageProvider } from "@/context/language/LanguageContext";

export const metadata: Metadata = {
  title: "Youtube Clone ",
  description: "Youtube Clone by I Kadek Yola Andika",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {language} = await getLanguage();
  console.log("language:",language)

  return (
    <html lang="en">
      <body className="bg-primary relative dark:bg-dark">
        <LanguageProvider lang={language}>        
          <Providers>
            <Navbar language={language}>
              {children}
            </Navbar>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
