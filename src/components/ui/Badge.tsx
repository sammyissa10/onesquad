import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "secondary" | "outline" | "success";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default: "bg-primary/10 text-primary",
  accent: "bg-accent text-white",
  secondary: "bg-secondary text-primary",
  outline: "border border-primary text-primary",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
