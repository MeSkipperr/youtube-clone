import { NextResponse } from "next/server";

const historyData = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    action: `User action ${i + 1}`,
    timestamp: new Date().toISOString(),
}));

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20; // Jumlah data per halaman
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    if (!user) {
        return NextResponse.json({ error: "User parameter is required" }, { status: 400 });
    }

    return NextResponse.json({
        data: historyData.slice(startIndex, endIndex),
        total: historyData.length,
        page,
    });
}


// import { authUserSession } from "@/libs/auth";

// export async function GET() {
//   const session = await authUserSession();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   console.log("api token value :", session)

//   return NextResponse.json({
//     message: "Data berhasil diambil!",
//     user: session, // Data user dari session
//   });
// }
