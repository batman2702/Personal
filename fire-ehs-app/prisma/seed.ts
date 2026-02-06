import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Clean up
    await prisma.inspection.deleteMany();
    await prisma.equipment.deleteMany();
    await prisma.location.deleteMany();
    await prisma.user.deleteMany();

    // Create Locations
    const loc1 = await prisma.location.create({
        data: { name: "Bangalore Site 1", address: "Electronic City" },
    });
    const loc2 = await prisma.location.create({
        data: { name: "Bangalore Site 2", address: "Whitefield" },
    });

    // Create Users
    const admin = await prisma.user.create({
        data: { name: "Admin User", email: "admin@syngene.com", role: "ADMIN" },
    });
    const inspector = await prisma.user.create({
        data: { name: "Inspector John", email: "john@syngene.com", role: "EMPLOYEE" },
    });

    // Create Equipment
    await prisma.equipment.create({
        data: {
            type: "Fire Extinguisher",
            serialNumber: "FE-001",
            qrCode: "QR-FE-001",
            locationId: loc1.id,
            status: "Active",
            capacity: "5kg",
            nextInspection: new Date(new Date().setDate(new Date().getDate() + 30)), // Due into 30 days
        },
    });

    await prisma.equipment.create({
        data: {
            type: "Fire Extinguisher",
            serialNumber: "FE-002",
            qrCode: "QR-FE-002",
            locationId: loc1.id,
            status: "Active",
            capacity: "10kg",
            nextInspection: new Date(new Date().setDate(new Date().getDate() - 5)), // Overdue
        },
    });

    await prisma.equipment.create({
        data: {
            type: "Hydrant",
            serialNumber: "HY-001",
            locationId: loc2.id,
            status: "Maintenance",
            nextInspection: new Date(), // Due today
        },
    });

    console.log("Seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
