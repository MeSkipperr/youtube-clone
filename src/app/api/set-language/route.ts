import { NextResponse } from "next/server";
import { LANGUAGES } from "@/utils/constants";

// Tipe untuk kode bahasa
export type LanguageCode = typeof LANGUAGES[number]["shortCode"];

// Ambil semua kode bahasa dari LANGUAGES
const validLanguages: LanguageCode[] = LANGUAGES.map(lang => lang.shortCode);

export async function POST(req: Request) {
    const { language } = await req.json();

    // Validasi apakah bahasa termasuk dalam daftar
    if (!validLanguages.includes(language as LanguageCode)) {
        return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    // Set cookie dengan expiration 30 hari
    const response = NextResponse.json({ message: "Language updated", language });
    response.cookies.set("language", language, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, 
    });

    return response;
}
