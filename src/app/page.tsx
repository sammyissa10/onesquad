import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import {
  Hero,
  Features,
  Comparison,
  ServicesPreview,
  TemplateShowcase,
  Process,
  Stats,
  PricingCalculator,
  Testimonials,
  HomeFAQ,
  CTABanner,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <ServicesPreview />
        <TemplateShowcase />
        <Process />
        <Stats />
        <PricingCalculator />
        <Testimonials />
        <HomeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
