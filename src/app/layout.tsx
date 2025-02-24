import type { Metadata } from "next";
import "./globals.css";
import "./main.css";
import Navbar from "@/components/navbar";

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
        <Navbar>
          {children}
        </Navbar>
      </body>
    </html>
  );
}
