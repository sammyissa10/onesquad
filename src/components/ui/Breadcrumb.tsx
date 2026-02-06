"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "./Container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-muted border-b border-border pt-20">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 py-3 text-sm"
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
          >
            <Home size={14} />
            Home
          </Link>
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-muted-foreground/50" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </Container>
    </div>
  );
}
