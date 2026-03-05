"use client";

const keywords =
  "Web Design · SEO · Social Media · E-Commerce · Branding · Digital Ads";

// Duplicate 4x so the loop fills and cycles seamlessly
const items = Array(4).fill(keywords);

export function MarqueeTicker() {
  return (
    <section className="bg-[#0d1525] py-5 overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <div className="flex whitespace-nowrap marquee-track">
        {/* Two identical halves — translateX(-50%) snaps back seamlessly */}
        {[0, 1].map((half) => (
          <span key={half} className="flex items-center shrink-0">
            {items.map((text, i) => (
              <span
                key={i}
                className="text-coral text-sm md:text-base font-semibold uppercase tracking-[0.2em] px-8"
              >
                {text}
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
