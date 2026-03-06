import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import {
  Hero,
  MarqueeTicker,
  Features,
  ServicesPreview,
  Comparison,
  Process,
  Testimonials,
  PortfolioPreview,
  HomeFAQ,
  CTABanner,
  TrustBadges,
  StatsSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarqueeTicker />
        <TrustBadges />
        <StatsSection />
        <Features />
        <ServicesPreview />
        <Comparison />
        <Process />
        <Testimonials />
        <PortfolioPreview />
        <HomeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
