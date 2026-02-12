import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import {
  Hero,
  Features,
  ServicesPreview,
  Comparison,
  ScrollPromptBanner,
  PortfolioPreview,
  Process,
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
        <ServicesPreview />
        <ScrollPromptBanner />
        <Comparison />
        <PortfolioPreview />
        <Process />
        <Testimonials />
        <HomeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
