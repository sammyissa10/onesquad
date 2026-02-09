import { Container, Section } from "@/components/ui/Container";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We hop on a call. You tell us what's working, what's not, and where you want to be.",
    icon: Search,
    color: "#E2795E",
    bgColor: "rgb(226 121 94 / 0.1)",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We come back with a plan — what we'll build, what it costs, how long it takes.",
    icon: Lightbulb,
    color: "#FFBD83",
    bgColor: "rgb(255 189 131 / 0.1)",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "We build. You get updates. If something looks off, say so and we fix it.",
    icon: Rocket,
    color: "#27598E",
    bgColor: "rgb(39 89 142 / 0.1)",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "Once it's live, we watch the numbers and tweak what isn't working.",
    icon: BarChart3,
    color: "#E2795E",
    bgColor: "rgb(226 121 94 / 0.1)",
  },
];

export function Process() {
  return (
    <Section background="white" padding="sm">
      <Container size="md">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg">
            Four steps. No surprises.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {processSteps.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-20 md:pl-0 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <span className="text-sm font-bold text-muted-foreground/40">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-primary mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Icon node on the line */}
                  <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-2xl flex items-center justify-center z-10 border-4 border-white"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
