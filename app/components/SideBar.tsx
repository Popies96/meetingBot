import { Bot, DollarSign, Home, Layers3, Settings, Coffee, Heart, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
        badge: null,
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon: Layers3,
        badge: "New",
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
        badge: null,
    },
    {
        title: "Chat with AI",
        url: "/chat",
        icon: Bot,
        badge: null,
    },
    {
        title: "Pricing",
        url: "/pricing",
        icon: DollarSign,
        badge: null,
    },
]

const funMessages = [
    { icon: Coffee, text: "Powered by coffee & AI ☕" },
    { icon: Heart, text: "Made with ❤️ in Tunisia" },
    { icon: Sparkles, text: "✨ Neural notes for everyone" },
]

export function AppSidebar() {
    const pathname = usePathname()
    const { state } = useSidebar()
    const { theme } = useTheme()
    const isCollapsed = state === "collapsed"
    const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)]
    const logoSrc = theme === 'light' ? '/logo-light.svg' : '/logo.svg'

    return (
        <Sidebar collapsible="icon" className="border-r">
    <SidebarHeader className="border-b ">
                <div className="flex items-center justify-between gap-2">
                    <Link href="/" className="flex items-center gap-2 min-w-0 cursor-pointer hover:opacity-80 transition-opacity">
                        <Image
                            src={logoSrc}
                            alt="Logo"
                            width={20}
                            height={20}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                        />
                        <span className="text-lg font-semibold text-sidebar-foreground truncate group-data-[collapsible=icon]:hidden">
                            NeuroNote
                        </span>
                    </Link>
                    
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        {isCollapsed ? (
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={isActive}
                                                        className={isActive ? 'bg-primary/10 text-primary' : ''}
                                                    >
                                                        <Link href={item.url}>
                                                            <item.icon className="h-5 w-5" />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                <TooltipContent side="right" className="font-medium">
                                                    {item.title}
                                                    {item.badge && (
                                                        <Badge 
                                                            variant="secondary" 
                                                            className="ml-2 text-xs px-1.5 py-0 h-4 bg-primary/10 text-primary border-primary/20"
                                                        >
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                </TooltipContent>
                                            </Tooltip>
                                        ) : (
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className={isActive ? 'bg-primary/10 text-primary font-medium' : ''}
                                            >
                                                <Link href={item.url} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className="h-5 w-5" />
                                                        <span>{item.title}</span>
                                                    </div>
                                                    {item.badge && (
                                                        <Badge 
                                                            variant="secondary" 
                                                            className="text-xs px-2 py-0 h-5 bg-primary/10 text-primary border-primary/20"
                                                        >
                                                            {item.badge}
                                                        </Badge>
                                                    )}
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                {!isCollapsed ? (
                    <div className="flex flex-col items-center gap-2 text-center">
                        <randomMessage.icon className="h-5 w-5 text-primary animate-pulse" />
                        <p className="text-xs text-muted-foreground font-medium">
                            {randomMessage.text}
                        </p>
                        <p className="text-[10px] text-muted-foreground/60">
                            v1.0.0 • © 2025 NeuroNote
                        </p>
                    </div>
                ) : (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center justify-center">
                                <randomMessage.icon className="h-5 w-5 text-primary animate-pulse" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p className="text-xs">{randomMessage.text}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}