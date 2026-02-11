"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  X,
  Check,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const withoutUsItems = [
  {
    icon: Clock,
    title: "Wasted Time",
    description: "Endless hours trying to figure out DIY website builders and marketing tools",
  },
  {
    icon: DollarSign,
    title: "Hidden Costs",
    description: "Unexpected fees, premium plugins, and expensive freelancers that blow your budget",
  },
  {
    icon: TrendingDown,
    title: "Poor Results",
    description: "Few visitors turning into customers, flat traffic, and marketing that doesn't pay off",
  },
  {
    icon: AlertTriangle,
    title: "Constant Stress",
    description: "Dealing with technical problems, security scares, and unexpected site outages",
  },
];

const withUsItems = [
  {
    icon: Zap,
    title: "Fast Launch",
    description: "Your professional website live in weeks, not months, with expert guidance",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear, upfront costs with no surprises—everything included in your plan",
  },
  {
    icon: TrendingUp,
    title: "Real Growth",
    description: "Proven strategies that bring in more visitors, more inquiries, and more revenue",
  },
  {
    icon: Shield,
    title: "Peace of Mind",
    description: "Reliable security, daily backups, and 99.9% uptime — all handled for you",
  },
];

function ComparisonCard({
  item,
  type,
  index,
}: {
  item: typeof withoutUsItems[0];
  type: "without" | "with";
  index: number;
}) {
  const isWithout = type === "without";

  return (
    <motion.div
      initial={{ opacity: 0, x: isWithout ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex items-start gap-4 p-4 rounded-xl hover:shadow-lg transition-all duration-300 ${
        isWithout
          ? "bg-red-500/10 border border-red-500/20 hover:shadow-red-500/10"
          : "bg-coral/10 border border-coral/20 hover:shadow-coral/10"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWithout ? "bg-red-500/20" : "bg-coral/20"
        }`}
      >
        <item.icon
          className={`w-6 h-6 ${isWithout ? "text-red-300" : "text-coral"}`}
        />
      </div>
      <div>
        <h4
          className={`font-bold mb-1 ${
            isWithout ? "text-red-300" : "text-coral"
          }`}
        >
          {item.title}
        </h4>
        <p className={`text-sm ${isWithout ? "text-red-200/70" : "text-white/70"}`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Comparison() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const dividerHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section className="bg-navy text-white py-24 md:py-36 overflow-hidden">
      <Container>
        <div ref={containerRef}>
          {/* Section Header */}
          <motion.div
            style={{ opacity, scale }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              What Changes When You Stop{" "}
              <span className="text-coral">Doing It Alone</span>
            </h2>
            <p className="text-white/60 text-lg">
              You've tried doing it all yourself. Here's what changes when you hand it off to a team that does this every day.
            </p>
          </motion.div>

          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-start">
            {/* Without Us Column */}
            <motion.div style={{ x: leftX }} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-300">Without OneSquad</h3>
                  <p className="text-sm text-red-200/70">Sound familiar?</p>
                </div>
              </div>

              {withoutUsItems.map((item, index) => (
                <ComparisonCard
                  key={item.title}
                  item={item}
                  type="without"
                  index={index}
                />
              ))}
            </motion.div>

            {/* Center Divider */}
            <div className="hidden lg:flex flex-col items-center py-8">
              <div className="w-px h-full bg-gradient-to-b from-red-300/20 via-white/10 to-coral/20 relative">
                <motion.div
                  style={{ height: dividerHeight }}
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-300 via-coral to-coral"
                />
              </div>
            </div>

            {/* With Us Column */}
            <motion.div style={{ x: rightX }} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-coral" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-coral">With OneSquad</h3>
                  <p className="text-sm text-white/70">What working with us looks like</p>
                </div>
              </div>

              {withUsItems.map((item, index) => (
                <ComparisonCard
                  key={item.title}
                  item={item}
                  type="with"
                  index={index}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
