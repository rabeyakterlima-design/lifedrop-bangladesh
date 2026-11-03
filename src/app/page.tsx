import { HeroSection } from "@/components/home/HeroSection";
import { DonorSearchPanel } from "@/components/home/DonorSearchPanel";
import { LiveStatsSection } from "@/components/home/LiveStatsSection";
import { QuickActionCards } from "@/components/home/QuickActionCards";
import { EmergencyRequestsSection } from "@/components/home/EmergencyRequestsSection";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { FeaturesSection } from "@/components/home/FeaturesSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <DonorSearchPanel />
      <LiveStatsSection />
      <QuickActionCards />
      <EmergencyRequestsSection />
      <PlatformShowcase />
      <FeaturesSection />
    </div>
  );
}
