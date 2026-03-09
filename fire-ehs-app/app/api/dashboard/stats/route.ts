
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req: Request) {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token || !verifyJwt(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const totalEquipment = await prisma.equipment.count();

        const overdueInspections = await prisma.equipment.count({
            where: {
                nextInspection: {
                    lte: new Date(),
                },
            },
        });

        const upcomingInspections = await prisma.equipment.count({
            where: {
                nextInspection: {
                    gt: new Date(),
                    lte: new Date(new Date().setDate(new Date().getDate() + 30)),
                },
            },
        });

        const recentInspections = await prisma.inspection.findMany({
            take: 5,
            orderBy: { date: "desc" },
            include: {
                equipment: {
                    select: { serialNumber: true }
                },
                inspector: {
                    select: { name: true }
                }
            },
        });

        return NextResponse.json({
            stats: {
                totalEquipment,
                overdueInspections,
                upcomingInspections,
                complianceRate: 98 // Hardcoded for now as per web
            },
            recentInspections
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
