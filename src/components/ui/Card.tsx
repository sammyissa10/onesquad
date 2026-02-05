"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "elevated" | "outlined" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-white",
  elevated: "bg-white shadow-xl shadow-primary/5",
  outlined: "bg-white border border-border",
  gradient: "bg-gradient-to-br from-primary to-highlight text-white",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  variant = "elevated",
  padding = "md",
  hover = false,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl",
        variantStyles[variant],
        paddingStyles[padding],
        hover && "cursor-pointer transition-shadow hover:shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Card Header
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

// Card Title
interface CardTitleProps {
  as?: "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ as: Tag = "h3", children, className }: CardTitleProps) {
  return (
    <Tag className={cn("text-xl font-bold text-primary", className)}>
      {children}
    </Tag>
  );
}

// Card Description
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground mt-1", className)}>
      {children}
    </p>
  );
}

// Card Content
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

// Card Footer
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("mt-6 flex items-center gap-4", className)}>
      {children}
    </div>
  );
}
