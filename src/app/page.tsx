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
  Testimonials,
  HomeFAQ,
  CTABanner,
  MidPageCTA,
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
        <MidPageCTA
          heading="Ready to Build Something Great? Let's Talk."
          buttonText="Get a Free Quote"
          buttonHref="/contact"
        />
        <TemplateShowcase />
        <Process />
        <Stats />
        <MidPageCTA
          heading="Join 500+ Growing Businesses"
          buttonText="See Our Plans"
          buttonHref="/pricing"
        />
        <Testimonials />
        <HomeFAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
