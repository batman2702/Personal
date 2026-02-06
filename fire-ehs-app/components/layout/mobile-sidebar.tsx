"use client";

import { Menu } from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function MobileSidebar() {
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-zinc-900 border-zinc-800 text-white w-72">
                <Sidebar className="h-full" />
            </SheetContent>
        </Sheet>
    );
}
