'use client'

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import ColorBends from "@/components/Silk/Silk"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { ArrowRight, CheckCircle, ChevronRight, Play, Sparkles, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function HeroSection() {
    const { isSignedIn } = useUser()
    const [mounted, setMounted] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        // Small delay to ensure smooth animation on mount
        const timer = setTimeout(() => {
            setMounted(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            <nav className={cn(
                "border-b border-gray-800/50 sticky top-0 z-50 bg-black/20 backdrop-blur-sm transition-all duration-700 ease-out",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}>
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Image
                                src="/logo.svg"
                                alt="NeuroNote Logo"
                                width={40}
                                height={40}
                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                            />
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">NeuroNote</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-4">
                            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
                                <Link href="/privacy">Privacy</Link>
                            </Button>
                            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
                                <Link href="/terms-of-use">Terms of use</Link>
                            </Button>
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

                        {/* Mobile Hamburger Button */}
                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-800/30 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <Button asChild variant="ghost" className="w-full text-white hover:bg-gray-800 justify-start">
                                <Link href="/privacy" onClick={() => setMobileMenuOpen(false)}>Privacy</Link>
                            </Button>
                            <Button asChild variant="ghost" className="w-full text-white hover:bg-gray-800 justify-start">
                                <Link href="/terms-of-use" onClick={() => setMobileMenuOpen(false)}>Terms of use</Link>
                            </Button>
                            <div className="space-y-2 pt-2">
                                {isSignedIn ? (
                                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 dark:text-white">
                                        <Link href="/home" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                    </Button>
                                ) : (
                                    <>
                                        <SignInButton mode="modal">
                                            <Button variant="outline" className="w-full border-white text-white hover:bg-gray-800 hover:text-white cursor-pointer">
                                                Sign In
                                            </Button>
                                        </SignInButton>
                                        <SignUpButton mode="modal">
                                            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                                                Get Started
                                            </Button>
                                        </SignUpButton>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <section className="relative min-h-screen px-4 w-full -mt-[73px] pt-[101px] flex items-center overflow-hidden">
                <div className={cn(
                    "absolute inset-0 -z-10 w-full min-h-screen bg-black overflow-hidden transition-all duration-1500 ease-out",
                    mounted ? "opacity-100 scale-100" : "opacity-0 scale-110"
                )}>
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
        "group relative mx-auto flex w-fit items-center justify-center rounded-full px-5 py-2 shadow-[inset_0_-8px_10px_#3b82f63f] transition-all duration-1200 ease-out hover:shadow-[inset_0_-5px_10px_#3b82f680] mb-8 bg-blue-950/30 backdrop-blur-sm border border-blue-500/30",
        mounted ? "opacity-100 translate-y-0 scale-100 rotate-0" : "opacity-0 -translate-y-12 scale-75 -rotate-12"
    )}
    style={{ transitionDelay: '200ms' }}
>
    <span
        className={cn(
            "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#3b82f6]/70 via-[#1d4ed8]/70 to-[#3b82f6]/70 bg-[length:300%_100%] p-[1.5px]",
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
    <Sparkles className="w-4 h-4 mr-2 text-blue-300 animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
    <hr className="mx-2 h-4 w-px shrink-0 bg-blue-400/50" />
    <AnimatedGradientText className="text-sm font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        AI-Powered Meeting Assistant
    </AnimatedGradientText>
    <ChevronRight
        className="ml-1 w-4 h-4 stroke-blue-300 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
    />
</div>
                    
                    <h1 
                        className={cn(
                            "text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1200 ease-out",
                            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-16 blur-sm"
                        )}
                        style={{ transitionDelay: '400ms' }}
                    >
                        Transform Your Meetings with{' '}
                        <span className={cn(
                            "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent transition-all duration-1000",
                            mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        )}
                        style={{ transitionDelay: '600ms' }}>
                            AI Magic
                        </span>
                    </h1>
                    
                    <p 
                        className={cn(
                            "text-lg max-w-2xl mx-auto mb-8 bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-white drop-shadow-[0_0_15px_rgba(156,163,175,0.3)] transition-all duration-1000 ease-out",
                            mounted ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"
                        )}
                        style={{ transitionDelay: '800ms' }}
                    >
                        Automatic summaries, action items, and intelligent insights for every meeting.
                        Never miss important details again.
                    </p>
                    
                    <div 
                        className={cn(
                            "flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 ease-out",
                            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
                        )}
                        style={{ transitionDelay: '1000ms' }}
                    >
                        {isSignedIn ? (
                            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 dark:text-white transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                <Link href="/home" className="group">
                                    <span>Dashboard</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        ) : (
                            <SignUpButton mode="modal">
                                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 group cursor-pointer transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </SignUpButton>
                        )}
                        <Button variant="outline" size="lg" className="border-gray-700 text-white hover:bg-gray-800 hover:text-white px-8 py-4 cursor-pointer transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            <Play className="w-5 h-5 mr-2" />
                            <span>Watch Demo</span>
                        </Button>
                    </div>
                    
                    <div 
                        className={cn(
                            "flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white transition-all duration-1000 ease-out",
                            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                        )}
                        style={{ transitionDelay: '1200ms' }}
                    >
                        {[
                            { icon: CheckCircle, text: "No credit card required" },
                            { icon: CheckCircle, text: "Setup in 2 minutes" },
                            { icon: CheckCircle, text: "Free forever plan" }
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className={cn(
                                    "flex items-center space-x-2 transition-all duration-700",
                                    mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                                )}
                                style={{ transitionDelay: `${1400 + index * 100}ms` }}
                            >
                                <item.icon className="w-4 h-4 text-green-400 animate-pulse" style={{ animationDelay: `${index * 200}ms` }} />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}