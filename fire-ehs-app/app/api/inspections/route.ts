
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: Request) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token || !verifyJwt(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const inspections = await prisma.inspection.findMany({
            include: {
                equipment: true,
                inspector: {
                    select: { name: true, email: true },
                },
            },
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(inspections);
    } catch (error) {
        console.error("Error fetching inspections:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const decoded = token ? verifyJwt(token) : null;

    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { equipmentId, status, notes, photoUrl, checklist } = body;

        const inspection = await prisma.inspection.create({
            data: {
                equipmentId,
                inspectorId: (decoded as { id: string }).id,
                status,
                notes,
                photoUrl,
                checklist,
            },
        });

        return NextResponse.json(inspection);
    } catch (error) {
        console.error("Error creating inspection:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
