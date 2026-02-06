import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { PricingCalculator } from "@/components/sections";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function PricingCalculatorPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumb items={[{ label: "Price Calculator" }]} />
        <PricingCalculator />
      </main>
      <Footer />
    </>
  );
}
