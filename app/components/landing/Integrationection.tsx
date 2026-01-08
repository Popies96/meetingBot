"use client";
import Image from "next/image";
import React from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { PinContainer } from "@/components/ui/3d-pin";

const integrations = [
    { name: "Slack", image: "slack.png" },
    { name: "Asana", image: "asana.png" },
    { name: "Jira", image: "jira.png" },
    { name: "Trello", image: "trello.png" },
    { name: "Google Calendar", image: "gcal.png" }
];

function IntegrationsSection() {
    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Seamless{" "}
                        <AnimatedGradientText>
                            <span className="bg-clip-text text-transparent">
                                Integrations
                            </span>
                        </AnimatedGradientText>
                    </h2>
                    <p className="text-lg bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                        Connect with the tools you already use and love
                    </p>
                </div>

                {/* Desktop view - horizontal with pin animation */}
                <div className="hidden md:flex justify-center items-center gap-6 flex-nowrap">
                    {integrations.map((integration, i) => (
                        <div key={i} className="h-[15rem] flex items-center justify-center flex-shrink-0">
                            <PinContainer
                                title={integration.name}
                                href="#"
                            >
                                <div className="flex basis-full flex-col p-2 tracking-tight text-slate-100/50 w-[6rem] h-[6rem]">
                                    <div className="flex flex-1 w-full rounded-lg bg-white/5 border border-gray-800 p-3 items-center justify-center">
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
                            className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-gray-800"
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