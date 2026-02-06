"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  X,
  Check,
  Clock,
  DollarSign,
  Users,
  TrendingDown,
  TrendingUp,
  Frown,
  Smile,
  AlertTriangle,
  Shield,
  Zap,
  Heart,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

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
    description: "Low conversion rates, no traffic growth, and campaigns that don't deliver ROI",
  },
  {
    icon: AlertTriangle,
    title: "Constant Stress",
    description: "Dealing with technical issues, security vulnerabilities, and site crashes",
  },
  {
    icon: Users,
    title: "No Support",
    description: "Left alone when things break, waiting days for freelancers to respond",
  },
  {
    icon: Frown,
    title: "Frustration",
    description: "Watching competitors succeed while your online presence stagnates",
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
    description: "Data-driven strategies that increase traffic, leads, and revenue consistently",
  },
  {
    icon: Shield,
    title: "Peace of Mind",
    description: "Enterprise-grade security, daily backups, and 99.9% uptime guaranteed",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Your own squad of experts available 24/7 to help you succeed",
  },
  {
    icon: Heart,
    title: "Success Stories",
    description: "Join hundreds of businesses thriving with our partnership",
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`flex items-start gap-4 p-4 rounded-xl ${
        isWithout ? "bg-red-50" : "bg-accent/5"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWithout ? "bg-red-100" : "bg-accent/10"
        }`}
      >
        <item.icon
          className={`w-6 h-6 ${isWithout ? "text-red-500" : "text-accent"}`}
        />
      </div>
      <div>
        <h4
          className={`font-bold mb-1 ${
            isWithout ? "text-red-700" : "text-primary"
          }`}
        >
          {item.title}
        </h4>
        <p className={`text-sm ${isWithout ? "text-red-600/80" : "text-muted-foreground"}`}>
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
    <Section background="white" className="overflow-hidden">
      <Container>
        <div ref={containerRef}>
          {/* Section Header */}
          <motion.div
            style={{ opacity, scale }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              The Difference
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              See What Changes{" "}
              <span className="text-accent">With OneSquad</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Stop struggling alone. Partner with us and transform your digital presence
              from a source of stress into your competitive advantage.
            </p>
          </motion.div>

          {/* Comparison Grid */}
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-start">
            {/* Without Us Column */}
            <motion.div style={{ x: leftX }} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-600">Without OneSquad</h3>
                  <p className="text-sm text-red-500">The struggle is real</p>
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
              <div className="w-px h-full bg-gradient-to-b from-red-200 via-muted to-accent/30 relative">
                <motion.div
                  style={{ height: dividerHeight }}
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-red-500 via-accent to-accent"
                />
              </div>
            </div>

            {/* With Us Column */}
            <motion.div style={{ x: rightX }} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent">With OneSquad</h3>
                  <p className="text-sm text-accent/80">Success made simple</p>
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

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "500+", label: "Happy Clients" },
              { value: "98%", label: "Client Retention" },
              { value: "3x", label: "Average ROI" },
              { value: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-secondary/5"
              >
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
