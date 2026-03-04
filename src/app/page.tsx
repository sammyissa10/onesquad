import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import {
  Hero,
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
        <TrustBadges />
        <StatsSection />
        <WaveDivider fill="#FDF8F5" />
        <Features />
        <WaveDivider fill="#1B2A4A" flip />
        <ServicesPreview />
        <ScrollPromptBanner />
        <WaveDivider fill="#0e1e36" />
        <Comparison />
        <WaveDivider fill="#FDF8F5" flip />
        <Process />
        <Testimonials />
        <HomeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
