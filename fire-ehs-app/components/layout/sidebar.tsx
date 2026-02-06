"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FireExtinguisher,
    ClipboardCheck,
    Package,
    Settings,
    LogOut
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/",
            active: pathname === "/",
        },
        {
            label: "Inventory",
            icon: FireExtinguisher,
            href: "/inventory",
            active: pathname === "/inventory",
        },
        {
            label: "Inspections",
            icon: ClipboardCheck,
            href: "/inspections",
            active: pathname.startsWith("/inspections"),
        },
        {
            label: "Stock",
            icon: Package,
            href: "/stock",
            active: pathname === "/stock",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/settings",
            active: pathname === "/settings",
        },
    ];

    return (
        <div className={cn("pb-12 bg-zinc-900 text-white min-h-screen", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Fire Safety EHS
                    </h2>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800",
                                    route.active && "bg-zinc-800 text-white"
                                )}
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 px-3 w-full">
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-zinc-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
