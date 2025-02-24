import type { Metadata } from "next";
import "./globals.css";
import "./main.css";
import Navbar from "@/components/navbar";
import { IsLoginProvider } from "@/context/is-login";

export const metadata: Metadata = {
  title: "Youtube Clone ",
  description: "Youtube Clone by I Kadek Yola Andika",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary relative">
        <IsLoginProvider>
          <Navbar>
            {children}
          </Navbar>
        </IsLoginProvider>
      </body>
    </html>
  );
}
