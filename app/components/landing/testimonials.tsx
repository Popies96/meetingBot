'use client'

import React, { useEffect, useRef, useState } from 'react';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { cn } from '@/lib/utils';

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Product Manager",
        company: "TechCorp",
        image: "/avatar1.jpg",
        content: "Meeting Bot has completely transformed how our team handles meetings. The AI summaries are incredibly accurate and save us hours every week.",
        rating: 5
    },
    {
        name: "Michael Rodriguez",
        role: "CEO",
        company: "StartupXYZ",
        image: "/avatar2.jpg",
        content: "I can finally focus on the conversation instead of frantically taking notes. The transcriptions are spot-on and the action items are automatically extracted.",
        rating: 5
    },
    {
        name: "Emily Thompson",
        role: "Engineering Lead",
        company: "DevHouse",
        image: "/avatar3.jpg",
        content: "The integration with our existing tools was seamless. Meeting Bot just works, and our team adopted it immediately.",
        rating: 5
    },
    {
        name: "David Park",
        role: "Sales Director",
        company: "SalesPro",
        image: "/avatar4.jpg",
        content: "Game changer for client meetings. I can review key moments and share highlights with my team instantly. Absolutely essential tool.",
        rating: 5
    },
    {
        name: "Jessica Wu",
        role: "Marketing Manager",
        company: "BrandCo",
        image: "/avatar5.jpg",
        content: "The search functionality is incredible. I can find any discussion from months ago in seconds. It's like having a photographic memory.",
        rating: 5
    },
    {
        name: "Alex Johnson",
        role: "Operations Manager",
        company: "LogisticsPro",
        image: "/avatar6.jpg",
        content: "Best investment we've made this year. The ROI is immediate - our team is more productive and nothing falls through the cracks anymore.",
        rating: 5
    }
];

function TestimonialsSection() {
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
                rootMargin: '0px 0px -50px 0px'
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
        <section ref={sectionRef} className="pb-20 bg-black relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left side - Header */}
                    <div className="lg:col-span-1 mt-8 lg:mt-40">
                        <div className={cn(
                            "lg:sticky lg:top-8 text-center lg:text-left transition-all duration-1000 ease-out",
                            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                        )}>
                            <h2 className="font-bold mb-4 text-3xl">
                                <AnimatedGradientText>Testimonials</AnimatedGradientText>   
                            </h2>
                            
                            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                                What our users says about us
                            </h2>
                            <p className="text-gray-500 text-base mb-8">
                                knowledge, expertise, advices & confidence
                            </p>
                            <button className="text-blue-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all group text-sm mx-auto lg:mx-0">
                                View all testimonials
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Middle - First testimonial */}
                    <div className="lg:col-span-1 mt-8 lg:mt-40">
                        <div className={cn(
                            "bg-gray-900/40 rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700 transition-all duration-700 ease-out h-full flex flex-col",
                            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        )}
                        style={{ transitionDelay: '300ms' }}>
                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-500 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-gray-400 text-base mb-8 leading-relaxed flex-grow">
                                {testimonials[0].content}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-800/50">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {testimonials[0].name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-white font-semibold text-base">
                                        {testimonials[0].name}
                                    </div>
                                    <div className="text-blue-500 font-medium text-sm">
                                        {testimonials[0].role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Two testimonials stacked */}
                    <div className="lg:col-span-1 space-y-6">
                        {testimonials.slice(1, 3).map((testimonial, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "bg-gray-900/40 rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700 transition-all duration-700 ease-out",
                                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                                )}
                                style={{ transitionDelay: `${500 + index * 200}ms` }}
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-500 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Content */}
                                <p className="text-gray-400 text-base mb-6 leading-relaxed">
                                    {testimonial.content}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-800/50">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-base">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-blue-500 font-medium text-sm">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;