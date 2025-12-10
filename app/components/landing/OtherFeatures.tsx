import { Download, Settings, BarChart3 } from 'lucide-react';
import React from 'react';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';

const AnimatedGradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

const features = [
  {
    icon: Download,
    title: 'Complete Meeting Exports',
    description: 'Download audio MP3, transcripts, summaries, and action items.',
  },
  {
    icon: Settings,
    title: 'Full Customization',
    description: 'Customize bot name, image and toggle bot participation',
  },
  {
    icon: BarChart3,
    title: 'Meeting Analytics',
    description: 'Track meeting patterns, participation rates, and productivity.',
  },
];

function OtherFeaturesSection() {
  return (
    <section className="pb-4 bg-black min-h-screen flex items-center">
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plus{' '}
            <AnimatedGradientText>
              <span className="bg-clip-text text-transparent">More Features</span>
            </AnimatedGradientText>
          </h2>
          <p className="text-lg bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(156,163,175,0.3)]">
            Everything you need for complete meeting management
          </p>
        </div>

        <Marquee className="py-8">
         
          <MarqueeContent speed={40}>
            {[...features, ...features].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MarqueeItem key={index}>
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-900/70 hover:border-gray-700 transition-all w-[55vh] h-[35vh]">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </MarqueeItem>
              );
            })}
          </MarqueeContent>
        </Marquee>
      </div>
    </section>
  );
}

export default OtherFeaturesSection;