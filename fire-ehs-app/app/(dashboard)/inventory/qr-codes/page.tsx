"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

// Mock data generator for demo since we can't easily fetch all in client component without context/props
// In real app this would take props or use SWR
const MOCK_QR_DATA = [
    { id: "fe-001", label: "FE-001 | Loc A" },
    { id: "fe-002", label: "FE-002 | Loc A" },
    { id: "hy-001", label: "HY-001 | Loc B" },
    { id: "fe-003", label: "FE-003 | Loc C" },
];

export default function QRCodesPage() {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">QR Code Generation</h2>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => handlePrint()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Labels
                    </Button>
                </div>
            </div>

            <div className="border p-8 rounded-lg bg-white overflow-auto max-h-[600px]">
                <div
                    ref={componentRef}
                    className="grid grid-cols-3 gap-8 p-8 bg-white print:grid-cols-3 print:gap-4"
                    style={{ width: "100%" }}
                >
                    {MOCK_QR_DATA.map((item) => (
                        <div key={item.id} className="flex flex-col items-center justify-center border p-4 rounded-lg break-inside-avoid">
                            <QRCodeSVG value={`https://syngene-ehs.com/equipment/${item.id}`} size={128} />
                            <p className="mt-2 text-sm font-bold text-center">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.id.toUpperCase()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-muted-foreground text-sm">
                * This preview uses mock data. In production, this would render selected items from inventory.
            </p>
        </div>
    );
}
