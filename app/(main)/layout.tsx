'use client'

import { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AppSidebar } from "../components/SideBar";
import { NavBar } from "../components/NavBar";
import { SearchProvider } from "../contexts/SearchContext";
import { Toaster } from "sonner";


const ConditionalLayout = ({ children }: { children: React.ReactNode }) =>{
    const pathname = usePathname()
    const { isSignedIn } = useAuth()
    const { setTheme } = useTheme()

    // Restore user's saved theme preference when entering dashboard
    useEffect(() => {
        const savedPreferences = localStorage.getItem('userPreferences');
        try {
            if (savedPreferences) {
                const parsed = JSON.parse(savedPreferences);
                if (parsed.darkMode !== undefined) {
                    setTheme(parsed.darkMode ? 'dark' : 'light');
                }
            }
        } catch (error) {
            console.error('Error restoring theme preference:', error);
        }
    }, [setTheme]);

    const showSidebar = pathname !== "/" && !(pathname.startsWith("/meeting/") && !isSignedIn)

    if (!showSidebar) {
        return <div className="min-h-screen">{children}</div>
    }

    return (
        <SearchProvider>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                
                <SidebarInset>
                    <NavBar />
                    <main className="flex-1">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </SearchProvider>
    )
}
export default ConditionalLayout