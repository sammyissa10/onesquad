import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface MidPageCTAProps {
  heading: string;
  buttonText: string;
  buttonHref: string;
}

export function MidPageCTA({ heading, buttonText, buttonHref }: MidPageCTAProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-brand to-[#27598E]">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="text-xl md:text-2xl font-bold text-white text-center sm:text-left">
            {heading}
          </h3>
          <Link href={buttonHref} className="flex-shrink-0">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              className="text-primary"
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
