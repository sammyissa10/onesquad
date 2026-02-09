import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import {
  Hero,
  Features,
  Comparison,
  ServicesPreview,
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
