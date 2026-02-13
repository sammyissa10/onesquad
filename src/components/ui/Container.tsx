import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  className,
  size = "xl",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

// Section wrapper with consistent padding
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "muted" | "primary" | "gradient";
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "py-10 md:py-14",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

const backgroundStyles = {
  white: "bg-card",
  muted: "bg-muted",
  primary: "bg-primary-brand text-white",
  gradient: "bg-gradient-to-br from-primary-brand to-highlight text-white",
};

export function Section({
  children,
  className,
  id,
  background = "white",
  padding = "md",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        paddingStyles[padding],
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </section>
  );
}
