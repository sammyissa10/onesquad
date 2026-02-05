import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  showTagline?: boolean;
}

export function Logo({ className, variant = "default", showTagline = false }: LogoProps) {
  const textPrimary = variant === "default" ? "text-primary" : "text-white";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3", className)}
    >
      {/* Logo Icon */}
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0",
        variant === "default"
          ? "bg-gradient-to-br from-accent to-secondary text-white"
          : "bg-white/10 text-white border border-white/20"
      )}>
        <span>1S</span>
      </div>

      <div className="flex flex-col">
        <span className={cn("font-bold text-2xl leading-tight whitespace-nowrap", textPrimary)}>
          <span className="text-accent">One</span>Squad
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-xs whitespace-nowrap",
              variant === "default" ? "text-muted-foreground" : "text-white/70"
            )}
          >
            <span className="text-accent">Unlock your</span> digital potential
          </span>
        )}
      </div>
    </Link>
  );
}

// Standalone logo icon for favicon or small displays
export function LogoIcon({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center font-bold bg-gradient-to-br from-accent to-secondary text-white",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      1S
    </div>
  );
}
