'use client'

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function NavBar() {
    const { user } = useUser()

    return (
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-background px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                <SidebarTrigger className="h-8 w-8" />
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 pr-4 h-9 bg-muted border-0 rounded-lg"
                    />
                </div>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="Documentation"
                >
                    <BookOpen className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full overflow-hidden p-0"
                    title="User Profile"
                >
                    {user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt="profile"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                        </div>
                    )}
                </Button>
            </div>
        </header>
    )
}