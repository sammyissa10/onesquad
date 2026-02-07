"use client";

import { demoContents } from "@/lib/demoContent";

interface TemplatePreviewProps {
  templateId: string;
  className?: string;
}

export function TemplatePreview({ templateId, className = "" }: TemplatePreviewProps) {
  const content = demoContents[templateId];
  if (!content) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Preview</span>
      </div>
    );
  }

  const { primaryColor, accentColor, businessName, tagline, nav, hero, features, stats } = content;

  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`} style={{ backgroundColor: "#f8fafc" }}>
      {/* Mini Navbar */}
      <div className="flex items-center justify-between px-3 py-1.5" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <span className="text-white text-[5px] font-bold leading-none">{businessName[0]}</span>
          </div>
          <span className="text-white text-[7px] font-semibold">{businessName}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {nav.slice(0, 4).map((item) => (
            <span key={item.label} className="text-white/60 text-[5px]">{item.label}</span>
          ))}
          <span className="text-white text-[5px] px-1.5 py-0.5 rounded-sm" style={{ backgroundColor: accentColor }}>
            {nav[nav.length - 1]?.label || "Contact"}
          </span>
        </div>
      </div>

      {/* Mini Hero */}
      <div className="px-3 py-4 relative" style={{ backgroundColor: primaryColor }}>
        <div className="absolute top-1 right-2 w-8 h-8 rounded-full opacity-10 blur-lg" style={{ backgroundColor: accentColor }} />
        <div className="max-w-[65%]">
          <div className="h-1 w-8 rounded mb-1.5" style={{ backgroundColor: accentColor, opacity: 0.6 }} />
          <p className="text-white text-[8px] font-bold leading-tight mb-1">
            {hero.headline.split(" ").slice(0, 5).join(" ")}
          </p>
          <p className="text-[8px] font-bold leading-tight mb-1.5" style={{ color: accentColor }}>
            {hero.highlightWord}
          </p>
          <p className="text-white/50 text-[5px] leading-tight mb-2 line-clamp-2">
            {hero.subtext.slice(0, 80)}...
          </p>
          <div className="flex gap-1">
            <span className="text-white text-[5px] px-2 py-0.5 rounded-sm" style={{ backgroundColor: accentColor }}>
              {hero.cta}
            </span>
            {hero.secondaryCta && (
              <span className="text-white/60 text-[5px] px-2 py-0.5 rounded-sm border border-white/20">
                {hero.secondaryCta}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mini Stats Bar */}
      <div className="bg-white px-3 py-2 flex justify-between border-b border-gray-100">
        {stats.slice(0, 4).map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-[7px] font-bold" style={{ color: accentColor }}>{stat.value}</p>
            <p className="text-[4px] text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mini Features Grid */}
      <div className="bg-gray-50 px-3 py-2">
        <p className="text-[5px] font-semibold text-center mb-1.5" style={{ color: accentColor }}>SERVICES</p>
        <div className="grid grid-cols-3 gap-1">
          {features.slice(0, 3).map((feature) => (
            <div key={feature.title} className="bg-white rounded-sm p-1 border border-gray-100">
              <div className="w-2 h-2 rounded-sm mb-0.5" style={{ backgroundColor: `${accentColor}20` }} />
              <p className="text-[4.5px] font-semibold text-gray-700 leading-tight">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Footer */}
      <div className="px-3 py-1.5" style={{ backgroundColor: primaryColor }}>
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-[4px]">{businessName} | {tagline}</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: `${accentColor}40` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplatePreviewThumbnail({ templateId, className = "" }: TemplatePreviewProps) {
  const content = demoContents[templateId];
  if (!content) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-xs">Preview</span>
      </div>
    );
  }

  const { primaryColor, accentColor, businessName, tagline } = content;

  return (
    <div className={`overflow-hidden select-none pointer-events-none ${className}`} style={{ backgroundColor: primaryColor }}>
      <div className="h-full flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-10 blur-xl" style={{ backgroundColor: accentColor }} />
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full opacity-10 blur-xl" style={{ backgroundColor: accentColor }} />
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-3 relative z-10" style={{ backgroundColor: accentColor }}>
          {businessName[0]}
        </div>
        <p className="text-white font-bold text-sm text-center relative z-10">{businessName}</p>
        <p className="text-white/50 text-xs text-center mt-1 relative z-10">{tagline}</p>
      </div>
    </div>
  );
}
