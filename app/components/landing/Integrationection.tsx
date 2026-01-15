"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { PinContainer } from "@/components/ui/3d-pin";
import { cn } from "@/lib/utils";

const integrations = [
    { name: "Slack", image: "slack.png" },
    { name: "Asana", image: "asana.png" },
    { name: "Jira", image: "jira.png" },
    { name: "Trello", image: "trello.png" },
    { name: "Google Calendar", image: "gcal.png" }
];

function IntegrationsSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className={cn(
                        "text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-1000 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        Seamless{" "}
                        <AnimatedGradientText>
                            <span className="bg-clip-text text-transparent">
                                Integrations
                            </span>
                        </AnimatedGradientText>
                    </h2>
                    <p className={cn(
                        "text-lg bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent transition-all duration-1000 ease-out delay-200",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        Connect with the tools you already use and love
                    </p>
                </div>

                {/* Desktop view - horizontal with pin animation */}
                <div className="hidden md:flex justify-center items-center gap-6 flex-nowrap">
                    {integrations.map((integration, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "h-[15rem] flex items-center justify-center flex-shrink-0 transition-all duration-700 ease-out",
                                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-90"
                            )}
                            style={{ 
                                transitionDelay: isVisible ? `${400 + i * 150}ms` : '0ms' 
                            }}
                        >
                            <PinContainer
                                title={integration.name}
                                href="#"
                            >
                                <div className="flex basis-full flex-col p-2 tracking-tight text-slate-100/50 w-[6rem] h-[6rem]">
                                    <div className="flex flex-1 w-full rounded-lg bg-white/5 border border-gray-800 p-3 items-center justify-center hover:bg-white/10 transition-colors">
                                        <Image
                                            src={`/${integration.image}`}
                                            alt={integration.name}
                                            width={60}
                                            height={60}
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                </div>
                            </PinContainer>
                        </div>
                    ))}
                </div>

                {/* Mobile view - vertical cards (non-scrollable) */}
                <div className="md:hidden flex flex-col gap-6 max-w-sm mx-auto px-2">
                    {integrations.map((integration, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-gray-800 transition-all duration-700 ease-out",
                                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                            )}
                            style={{ 
                                transitionDelay: isVisible ? `${400 + i * 100}ms` : '0ms' 
                            }}
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-lg border border-gray-700 p-3 flex items-center justify-center flex-shrink-0">
                                <Image
                                    src={`/${integration.image}`}
                                    alt={integration.name}
                                    width={60}
                                    height={60}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-white text-base font-medium">{integration.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default IntegrationsSection;