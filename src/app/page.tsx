import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import {
  Hero,
  MarqueeTicker,
  Features,
  ServicesPreview,
  Comparison,
  ScrollPromptBanner,
  Process,
  Testimonials,
  HomeFAQ,
  CTABanner,
  TrustBadges,
  StatsSection,
} from "@/components/sections";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarqueeTicker />
        <TrustBadges />
        <StatsSection />
        <WaveDivider fill="#F5EFE0" />
        <Features />
        <WaveDivider fill="#1B2A4A" flip />
        <ServicesPreview />
        <ScrollPromptBanner />
        <WaveDivider fill="#0e1e36" />
        <Comparison />
        <WaveDivider fill="#F5EFE0" flip />
        <Process />
        <Testimonials />
        <HomeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
