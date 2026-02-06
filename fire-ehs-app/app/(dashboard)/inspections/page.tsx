import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, CheckCircle, AlertTriangle } from "lucide-react";

async function getScheduledInspections() {
    // Find equipment due for inspection (nextInspection <= today + 30 days)
    const equipment = await prisma.equipment.findMany({
        where: {
            nextInspection: {
                lte: new Date(new Date().setDate(new Date().getDate() + 30)),
            },
            status: "Active",
        },
        include: {
            location: true
        },
        orderBy: {
            nextInspection: "asc",
        },
    });
    return equipment;
}

export default async function InspectionsPage() {
    const dueEquipment = await getScheduledInspections();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Scheduled Inspections</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {dueEquipment.length === 0 ? (
                    <p className="text-muted-foreground col-span-full">No upcoming inspections due.</p>
                ) : dueEquipment.map((item) => {
                    const isOverdue = item.nextInspection && new Date(item.nextInspection) < new Date();
                    const daysUntil = item.nextInspection
                        ? Math.ceil((new Date(item.nextInspection).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
                        : 0;

                    return (
                        <Card key={item.id} className={isOverdue ? "border-red-200 bg-red-50 dark:bg-red-900/10" : ""}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {item.serialNumber}
                                </CardTitle>
                                {isOverdue ? (
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                ) : (
                                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.type}</div>
                                <p className="text-xs text-muted-foreground mb-4">
                                    {item.location.name}
                                </p>
                                <div className="flex items-center justify-between">
                                    <Badge variant={isOverdue ? "destructive" : "secondary"}>
                                        {isOverdue ? `Overdue by ${Math.abs(daysUntil)} days` : `Due in ${daysUntil} days`}
                                    </Badge>
                                    <Button size="sm" asChild>
                                        <Link href={`/inspections/${item.id}/perform`}>
                                            Inspect Now
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
