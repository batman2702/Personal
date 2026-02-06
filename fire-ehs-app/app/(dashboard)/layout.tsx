import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <Sidebar className="h-full border-r border-zinc-800 bg-zinc-900" />
            </div>
            <main className="md:pl-64 h-full relative">
                <Navbar />
                {children}
            </main>
        </div>
    );
}
