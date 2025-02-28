import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const language = req.cookies.get("language")?.value || "EN";

    const res = NextResponse.next();

    res.cookies.set("language", language, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, 
    });

    return res;
}

export const config = { matcher: ["/:path*"] };
