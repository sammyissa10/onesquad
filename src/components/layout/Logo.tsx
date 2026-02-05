import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
  showTagline?: boolean;
}

export function Logo({ className, variant = "default", showTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3", className)}
    >
      {/* OneSquad Logo */}
      <Image
        src="/onesquadlogo.png"
        alt="OneSquad Logo"
        width={40}
        height={40}
        className="w-10 h-10 flex-shrink-0"
        priority
      />

      <div className="flex flex-col">
        <span className={cn(
          "font-bold text-2xl leading-tight whitespace-nowrap",
          variant === "default" ? "text-primary" : "text-white drop-shadow-md"
        )}>
          <span className="text-accent">One</span>Squad
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-xs whitespace-nowrap",
              variant === "default" ? "text-muted-foreground" : "text-white/90"
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
    <Image
      src="/onesquadlogo.png"
      alt="OneSquad Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
