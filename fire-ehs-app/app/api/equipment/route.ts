
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: Request) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token || !verifyJwt(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    try {
        const where = query ? {
            OR: [
                { serialNumber: { contains: query } },
                { type: { contains: query } },
                { location: { name: { contains: query } } }
            ]
        } : {};

        const equipment = await prisma.equipment.findMany({
            where,
            include: {
                location: true,
            },
            orderBy: { updatedAt: 'desc' },
        });

        return NextResponse.json(equipment);
    } catch (error) {
        console.error("Error fetching equipment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
