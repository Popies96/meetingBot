'use client'

import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { Bot, Calendar, Mail, MessageSquare, Share2, Slack } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const features = [
    {
        icon: Bot,
        title: "AI Meeting Summaries",
        description: "Automatic meeting summaries and action items after each meeting",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
    },
    {
        icon: Calendar,
        title: "Smart Calendar Integration",
        description: "Connect Google Calendar and bots automatically join meetings",
        color: "text-green-400",
        bgColor: "bg-green-500/10",
    },
    {
        icon: Mail,
        title: "Automated Email Reports",
        description: "Receive beautiful email summaries with action items",
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
    },
    {
        icon: MessageSquare,
        title: "Chat with Meetings",
        description: "Ask questions about meetings using our RAG pipeline",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
    },
    {
        icon: Share2,
        title: "One-Click Integrations",
        description: "Push action items to Slack, Asana, Jira and Trello",
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
    },
    {
        icon: Slack,
        title: "Slack bot Integration",
        description: "Install our Slack Bot to ask questions and share insights",
        color: "text-pink-400",
        bgColor: "bg-pink-500/10",
    },
]

function FeaturesSection() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is visible
                rootMargin: '0px 0px -100px 0px' // Start animation slightly before section is fully visible
            }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current)
            }
        }
    }, [])

    return (
        <section ref={sectionRef} className='py-20 bg-black'>
            <div className='max-w-6xl mx-auto px-4'>
                <div className='text-center mb-16'>
                    <h2 className={cn(
                        'text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-1000 ease-out',
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}>
                        Everything you need for{' '}
                        <AnimatedGradientText>
                            <span className="bg-clip-text text-transparent">
                                Smarter Meetings
                            </span>
                        </AnimatedGradientText>
                    </h2>
                    <p className={cn(
                        "text-lg max-w-2xl mx-auto bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(156,163,175,0.3)] transition-all duration-1000 ease-out delay-200",
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}>
                        From AI summaries to seamless integrations, we've got every aspect covered.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                'bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 hover:border-gray-700 transition-all duration-700 ease-out hover:scale-105',
                                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                            )}
                            style={{ 
                                transitionDelay: isVisible ? `${400 + index * 100}ms` : '0ms' 
                            }}
                        >
                            <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className='text-xl font-semibold text-white mb-2'>
                                {feature.title}
                            </h3>
                            <p className='text-gray-400'>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection