import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price for display
 */
export function formatPrice(price: number | "custom"): string {
  if (price === "custom") {
    return "Custom";
  }
  return `$${price}`;
}

