import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname, searchParams } = new URL(req.url);
    const language = req.cookies.get("language")?.value || "EN";

    // 1. Handle /watch route validation
    if (pathname === '/watch' && !searchParams.has('v')) {
        const response = NextResponse.redirect(new URL('/', req.url));
        // Cookie akan di-set di akhir fungsi
        return setLanguageCookie(response, language);
    }

    // 2. Continue with normal response
    const response = NextResponse.next();
    return setLanguageCookie(response, language);
}

// Helper function to set language cookie
function setLanguageCookie(response: NextResponse, language: string) {
    response.cookies.set("language", language, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });
    return response;
}

export const config = { 
    matcher: ["/:path*"] 
};