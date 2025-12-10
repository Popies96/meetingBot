
import OtherFeaturesSection from "./components/landing/OtherFeatures";
import CTASection from "./components/landing/CTASection";
import FeaturesSection from "./components/landing/Features";
import Footer from "./components/landing/Footer";
import HeroSection from "./components/landing/HeroSection";
import HowItWorksSection from "./components/landing/HowitWorks";
import IntegrationsSection from "./components/landing/Integrationection";
import StatsSection from "./components/landing/StatsSection";
import  MacbookScrollD  from "./components/landing/featuresmarquee";
import TestimonialsSection from "./components/landing/testimonials";
;

export default function Home() {
  return (
     <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <MacbookScrollD/>
      <IntegrationsSection />
      <HowItWorksSection />
      <StatsSection />
      <OtherFeaturesSection/>
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
