import { Header, Footer } from "@/components/layout";
import { PricingCalculator } from "@/components/sections";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function PricingCalculatorPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Price Calculator" }]} />
      <main>
        <PricingCalculator />
      </main>
      <Footer />
    </>
  );
}
