"use client";
import React from 'react'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import CountUp from '@/components/count/count'

function StatsSection() {
    return (
        <section className='py-20 bg-black relative'>
            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                @keyframes scroll-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
                
                .animate-scroll-left {
                    animation: scroll-left 20s linear infinite;
                }
                
                .animate-scroll-right {
                    animation: scroll-right 20s linear infinite;
                }
            `}</style>

            <div className='max-w-6xl mx-auto px-4'>
                <div className='grid md:grid-cols-4 gap-8 mb-20 pb-16'>
                    <div className='text-center group'>
                       <div className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2'>
                             <CountUp from={0} to={2} separator="%" direction="up" duration={1} className="count-up-text text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2"></CountUp> +
                       </div>
                        <p className='text-gray-400'>Happy Users</p>
                    </div>
                    <div className='text-center group'>
                        <div className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2'>
                             <CountUp from={0} to={99.69} separator="%" direction="up" duration={1} className="count-up-text text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2"></CountUp> %
                       </div>
                        <p className='text-gray-400'>Uptime</p>
                    </div>
                    <div className='text-center group'>
                        <div className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2'>
                           <CountUp from={0} to={2} separator="%" direction="up" duration={1} className="count-up-text text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2"></CountUp> min
                        </div>
                        <p className='text-gray-400'>Setup Time</p>
                    </div>
                    <div className='text-center group'>
                        <div className='text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2'>
                           <CountUp from={0} to={50} separator="%" direction="up" duration={1} className="count-up-text text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent mb-2"></CountUp> hrs
                       </div>
                        <p className='text-gray-400'>Saved Per Month</p>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/50 pointer-events-none'></div>
        
        


         <div className='overflow-hidden mb-12 space-y-4'>
                    {/* imin ---> issar */}
                    <div className='flex whitespace-nowrap animate-scroll-left'>
                        <span className='text-4xl md:text-6xl font-bold text-white mx-8'>
                            Start in seconds <AnimatedGradientText><AnimatedGradientText>•</AnimatedGradientText></AnimatedGradientText> Start in seconds <AnimatedGradientText><AnimatedGradientText>•</AnimatedGradientText></AnimatedGradientText> Start in seconds <AnimatedGradientText><AnimatedGradientText>•</AnimatedGradientText></AnimatedGradientText> Start in seconds <AnimatedGradientText><AnimatedGradientText>•</AnimatedGradientText></AnimatedGradientText>
                        </span>
                        <span className='text-4xl md:text-6xl font-bold text-white mx-8'>
                           Start in seconds <AnimatedGradientText><AnimatedGradientText>•</AnimatedGradientText></AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText>
                        </span>
                    </div>
                    {/* issar --->  imin */}
                    <div className='flex whitespace-nowrap animate-scroll-right'>
                        <span className='text-4xl md:text-6xl font-bold text-white mx-8'>
                            Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText>
                        </span>
                        <span className='text-4xl md:text-6xl font-bold text-white mx-8'>
                            Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText> Start in seconds <AnimatedGradientText>•</AnimatedGradientText>
                        </span>
                    </div>
                </div>
        
        
        </section>

        
    )
}

export default StatsSection