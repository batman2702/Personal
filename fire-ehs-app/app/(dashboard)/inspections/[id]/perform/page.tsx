"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Need to install switch
import { Textarea } from "@/components/ui/textarea"; // Need to install textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Need to install select
import { useRouter } from "next/navigation";
import { Camera, Upload } from "lucide-react";

// Mock server action for demo
async function submitInspection(formData: FormData) {
    // In a real app, this would be a Server Action
    console.log("Submitting inspection...", formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
}

export default function PerformInspectionPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Checklist state
    const [pressureGauge, setPressureGauge] = useState(false);
    const [safetyPin, setSafetyPin] = useState(false);
    const [hostCondition, setHostCondition] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert("Inspection Submitted Successfully!");
        router.push("/inspections");
        setLoading(false);
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => router.back()}>
                    &larr; Back
                </Button>
                <h2 className="text-2xl font-bold tracking-tight">Perform Inspection</h2>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Checklist: Fire Extinguisher</CardTitle>
                    <CardDescription>Verify all points below.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6">

                        <div className="flex items-center justify-between space-x-2 border-b pb-4">
                            <Label htmlFor="pressure" className="flex flex-col space-y-1">
                                <span>Pressure Gauge in Green Zone?</span>
                                <span className="font-normal text-xs text-muted-foreground">Ensure needle is in the green area.</span>
                            </Label>
                            <Switch id="pressure" checked={pressureGauge} onCheckedChange={setPressureGauge} />
                        </div>

                        <div className="flex items-center justify-between space-x-2 border-b pb-4">
                            <Label htmlFor="pin" className="flex flex-col space-y-1">
                                <span>Safety Pin Intact?</span>
                                <span className="font-normal text-xs text-muted-foreground">Check if seal is unbroken.</span>
                            </Label>
                            <Switch id="pin" checked={safetyPin} onCheckedChange={setSafetyPin} />
                        </div>

                        <div className="flex items-center justify-between space-x-2 border-b pb-4">
                            <Label htmlFor="hose" className="flex flex-col space-y-1">
                                <span>Hose/Nozzle Condition</span>
                                <span className="font-normal text-xs text-muted-foreground">No cracks or blockage.</span>
                            </Label>
                            <Switch id="hose" checked={hostCondition} onCheckedChange={setHostCondition} />
                        </div>

                        <div className="space-y-2">
                            <Label>Overall Status</Label>
                            <Select required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pass">Pass</SelectItem>
                                    <SelectItem value="NeedsAttention">Needs Attention</SelectItem>
                                    <SelectItem value="Fail">Fail (Replace)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Photo Proof</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer">
                                <Camera className="h-8 w-8 mb-2" />
                                <span className="text-sm">Tap to take photo</span>
                                <Input type="file" accept="image/*" className="hidden" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea id="notes" placeholder="Any additional observations..." />
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Inspection"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
