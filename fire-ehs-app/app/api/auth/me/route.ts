
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyJwt(token);

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: (decoded as { id: string }).id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({ user: userWithoutPassword });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
