
import OtherFeaturesSection from "./components/landing/AutherFeatures";
import CTASection from "./components/landing/CTASection";
import FeaturesSection from "./components/landing/Features";
import Footer from "./components/landing/Footer";
import HeroSection from "./components/landing/HeroSection";
import HowItWorksSection from "./components/landing/HowitWorks";
import IntegrationsSection from "./components/landing/Integrationection";
import StatsSection from "./components/landing/StatsSection";

export default function Home() {
  return (
     <div className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <HowItWorksSection />
      <StatsSection />
      <OtherFeaturesSection/>
      <CTASection />
      <Footer />
    </div>
  );
}
