'use client'

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { AppSidebar } from "../components/SideBar";
import { NavBar } from "../components/NavBar";


const ConditionalLayout = ({ children }: { children: React.ReactNode }) =>{
    const pathname = usePathname()
    const { isSignedIn } = useAuth()

    const showSidebar = pathname !== "/" && !(pathname.startsWith("/meeting/") && !isSignedIn)

    if (!showSidebar) {
        return <div className="min-h-screen">{children}</div>
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            
            <SidebarInset>
                <NavBar />
                <main className="flex-1">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
export default ConditionalLayout