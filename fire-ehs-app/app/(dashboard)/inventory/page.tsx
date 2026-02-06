import prisma from "@/lib/prisma";
import { EquipmentWithLocation, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<EquipmentWithLocation[]> {
    const data = await prisma.equipment.findMany({
        include: {
            location: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return data;
}

export default async function InventoryPage() {
    const data = await getData();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
