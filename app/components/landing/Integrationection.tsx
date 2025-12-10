"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

const integrations = [
    { name: "Slack", image: "slack.png", screenshot: "ss1.png" },
    { name: "Asana", image: "asana.png", screenshot: "ss2.png" },
    { name: "Jira", image: "jira.png", screenshot: "ss3.png" },
    { name: "Trello", image: "trello.png", screenshot: "ss4.png" },
    { name: "Google Calendar", image: "gcal.png", screenshot: "ss5.png" }
];

function IntegrationsSection() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="py-20 bg-black">
            <div className="max-w-6xl mx-auto px-4">

             
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
                {!selected && (
                    <div className="flex justify-center flex-wrap gap-10">
                        {integrations.map((integration, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(integration)}
                                className="text-center group transition-transform hover:scale-105"
                            >
                                <div className="w-20 h-20 mx-auto mb-3 bg-white/5 p-3 rounded-xl border border-gray-800 group-hover:border-gray-600 transition-colors">
                                    <Image
                                        src={`/${integration.image}`}
                                        alt={integration.name}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-white text-sm">{integration.name}</p>
                            </button>
                        ))}
                    </div>
                )}
                {selected && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10 lg:items-center">
                        <div className="flex flex-col gap-6 items-start">

                            {integrations
                                .filter((i) => i.name !== selected.name)
                                .map((integration, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelected(integration)}
                                        className="flex items-center gap-3 group transition-transform hover:translate-x-1"
                                    >
                                        <div className="w-14 h-14 bg-white/5 rounded-xl border border-gray-800 group-hover:border-gray-600 p-2 transition-colors">
                                            <Image
                                                src={`/${integration.image}`}
                                                alt={integration.name}
                                                width={60}
                                                height={60}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="text-white text-sm">{integration.name}</p>
                                    </button>
                                ))}

                            <button
                                onClick={() => setSelected(null)}
                                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-gray-800 hover:border-gray-600 rounded-lg text-gray-300 hover:text-white text-sm mt-4 transition-all"
                            >
                                ← Back to all integrations
                            </button>
                        </div>

                        <div className="lg:col-span-2 flex flex-col gap-4">
                            <h3 className="text-2xl font-semibold text-white">{selected.name}</h3>
                            <div className="w-full">
                                <Image
                                    src={`/${selected.screenshot}`}
                                    alt={`${selected.name} integration screenshot`}
                                    width={1200}
                                    height={800}
                                    className="rounded-xl border border-gray-700 w-full h-auto shadow-2xl"
                                />
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}

export default IntegrationsSection;