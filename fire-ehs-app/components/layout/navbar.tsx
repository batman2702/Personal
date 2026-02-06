import { MobileSidebar } from "@/components/layout/mobile-sidebar";

export function Navbar() {
    return (
        <div className="flex items-center p-4 border-b md:hidden">
            <MobileSidebar />
            <div className="ml-4 font-semibold text-lg">Fire Safety EHS</div>
        </div>
    );
}
