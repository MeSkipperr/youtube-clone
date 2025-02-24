import type { Metadata } from "next";
import "./globals.css";
import "./main.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
