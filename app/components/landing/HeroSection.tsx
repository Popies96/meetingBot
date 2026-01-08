'use client'

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import ColorBends from "@/components/Silk/Silk"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { ArrowRight, Bot, CheckCircle, ChevronRight, Play, Sparkles } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HeroSection() {
    const { isSignedIn } = useUser()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            <nav className="border-b border-gray-800/50 sticky top-0 z-50 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">NeuroNote</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {isSignedIn ? (
                                <Button asChild className="bg-blue-600 hover:bg-blue-700 dark:text-white">
                                    <Link href="/home">Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <Button variant="outline" className="border-white text-white hover:bg-gray-800 hover:text-white cursor-pointer">
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                                            Get Started
                                        </Button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <section className="relative min-h-screen px-4 w-full -mt-[73px] pt-[101px] flex items-center">
                <div className="absolute inset-0 -z-10 w-full min-h-screen bg-black overflow-hidden">
                    <div className="blur-md w-full h-full min-h-screen">
                    <ColorBends
                        colors={["#ff4d00", "#8a5cff", "#00ffd1"]}
                        rotation={0}
                        speed={0.3}
                        scale={1.3}
                        frequency={1}
                        warpStrength={1}
                        mouseInfluence={1}
                        parallax={2}
                        noise={0}
                        transparent
                    />
                    </div>
                </div>
                <div className="max-w-4xl mx-auto text-center w-full py-10 md:py-20">
                    <div 
                        className={cn(
                            "group relative mx-auto flex w-fit items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#3b82f61f] transition-all duration-1000 ease-out hover:shadow-[inset_0_-5px_10px_#3b82f63f] mb-8",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                        )}
                    >
                        <span
                            className={cn(
                                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#3b82f6]/50 via-[#1d4ed8]/50 to-[#3b82f6]/50 bg-[length:300%_100%] p-[1px]",
                            )}
                            style={{
                                WebkitMask:
                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "destination-out",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                maskComposite: "subtract",
                                WebkitClipPath: "padding-box",
                            }}
                        />
                        <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                        <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                        <AnimatedGradientText className="text-sm font-medium text-gray-300">
                            AI-Powered Meeting Assistant
                        </AnimatedGradientText>
                        <ChevronRight
                            className="ml-1 w-4 h-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
                        />
                    </div>
                    
                    <h1 
                        className={cn(
                            "text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 ease-out delay-200",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        Transform Your Meetings with{' '}
                        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">AI Magic</span>
                    </h1>
                    
                    <p 
                        className={cn(
                            "text-lg max-w-2xl mx-auto mb-8 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-white drop-shadow-[0_0_15px_rgba(156,163,175,0.3)] transition-all duration-1000 ease-out delay-500",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        Automatic summaries, action items, and intelligent insights for every meeting.
                        Never miss important details again.
                    </p>
                    
                    <div 
                        className={cn(
                            "flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 ease-out delay-700",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        {isSignedIn ? (
                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 dark:text-white">
                                <Link href="/home" className="group">
                                    <span>Dashboard</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        ) : (
                            <SignUpButton mode="modal">
                                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 group cursor-pointer">
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </SignUpButton>
                        )}
                        <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800 hover:text-white px-8 py-4 cursor-pointer">
                            <Play className="w-5 h-5 mr-2" />
                            <span>Watch Demo</span>
                        </Button>
                    </div>
                    
                    <div 
                        className={cn(
                            "flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white transition-all duration-1000 ease-out delay-1000",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Setup in 2 minutes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Free forever plan</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}