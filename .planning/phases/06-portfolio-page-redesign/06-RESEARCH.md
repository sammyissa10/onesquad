# Phase 6: Portfolio Page Redesign - Research

**Researched:** 2026-02-11
**Domain:** Masonry layouts, video hover interactions, narrative portfolio copy
**Confidence:** HIGH

## Summary

Phase 6 transforms the existing portfolio page from a uniform 2-column grid into a visually dynamic masonry layout with video-on-hover project cards and narrative copy. The current implementation uses 21 templates displayed with TemplateShowcaseCard in a standard grid with category filtering, Framer Motion animations, and extensive tier-based styling.

The research reveals three viable masonry approaches: CSS columns (immediate fallback), CSS Grid with mixed spans (production-ready), and experimental CSS Grid Masonry (future-proof). Video hover requires careful performance optimization with muted autoplay, IntersectionObserver lazy loading, and mobile-specific handling. The existing codebase already has GSAP, Framer Motion, custom cursor system with coral spotlight pattern, and established animation patterns that must be preserved.

**Primary recommendation:** Use CSS Grid with strategic `grid-column: span 2` for featured templates, implement video crossfade on hover using Framer Motion's `whileHover` with IntersectionObserver for lazy loading, disable video on touch devices, and replace generic descriptions with narrative 1-2 sentence stories per template.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Card Layout & Sizing**
- Masonry grid with mixed-size cards — some span 2 columns (featured/popular), others are standard single-column
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Popular templates get large cards (2-col span) to create visual hierarchy
- Card sizes should feel intentional, not random — group by visual weight (large cards spaced apart, not clustered)

**Video Hover Behavior**
- On hover: card thumbnail crossfades to muted autoplay video (screen recording or motion preview of the template)
- On mouse leave: video pauses and resets to start
- Cards without video: use a subtle zoom/parallax on the static screenshot instead (no empty state)
- Videos must be <1MB each — short loops (3-5 seconds), compressed WebM with MP4 fallback
- No video on mobile/touch — static screenshots only (performance)

**Project Card Content**
- Default state: screenshot thumbnail, template name, category tag, price badge
- Hover state: video (or zoom) + overlay with brief narrative tagline + "View Details" CTA
- Narrative copy: each template gets a 1-2 sentence story ("Built for a barbershop that wanted to feel like a brand, not a business")
- Remove the detailed price breakdown panel from cards — keep it for a detail view/modal
- Category color coding stays but shifts to subtle tag chips (not full card tinting)

**Page Structure**
- Dark hero section (navy) with bold display typography — "Our Work Speaks. Loudly."
- Category filter bar: horizontal pill buttons (not dropdown), sticky on scroll
- Masonry grid section on light background (contrast with hero)
- Dark CTA section at bottom — "Don't see what you need? Let's build it."
- Section rhythm: Dark → Light → Dark (3-section structure, not over-segmented)
- Varied spacing matching project patterns (not uniform py-16)

### Claude's Discretion

- Exact masonry implementation approach (CSS columns, CSS grid, or library)
- Card border radius, shadow depth, and spacing values
- Animation timing and easing for video crossfade
- Filter bar design details (active state, transition)
- How to handle the 6 category groups (collapse to fewer filters or keep all)
- Loading skeleton design for images/videos
- Whether to add a "view mode" toggle (grid/list) or just masonry

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Framer Motion | 12.33.0 | Card animations, hover states, viewport detection | Already integrated, handles whileHover, useInView for scroll-triggered animations |
| GSAP | 3.14.2 | Video control timing, complex sequencing | Already integrated for ScrollTrigger and cursor, industry standard for precise animation control |
| Next.js | 16.1.6 | React framework, image optimization | Project foundation, built-in Image component for lazy loading |
| Tailwind CSS | 4 | Layout grid, responsive breakpoints | Project standard for styling, handles responsive masonry breakpoints |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| IntersectionObserver API | Native | Video lazy loading, viewport visibility | Pause videos when off-screen, start autoplay on scroll into view (performance critical) |
| React useRef | Native | Video element references | Direct DOM access for play/pause/reset controls |
| CSS @supports | Native | Feature detection for experimental masonry | Progressive enhancement for CSS Grid Masonry when available |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid (mixed spans) | react-masonry-css | Library adds dependency (no deps in package.json), CSS Grid is native and performs better |
| CSS Grid | CSS columns | Columns break reading order vertically, harder to control card placement for "large cards spaced apart" requirement |
| Native video element | react-player | Overkill for simple muted loops, native element gives better control and smaller bundle |
| Framer Motion viewport | GSAP ScrollTrigger only | Framer Motion useInView already used throughout project, maintains consistency |

**Installation:**
No new dependencies required — all capabilities available in current stack.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/portfolio/
│   └── page.tsx                    # Main portfolio page (redesign existing)
├── components/ui/
│   ├── TemplateCard.tsx            # Simplify existing TemplateShowcaseCard
│   └── VideoCard.tsx               # NEW: Card variant with video hover
├── lib/
│   ├── templateData.ts             # ADD: video URLs, narrative copy per template
│   └── videoUtils.ts               # NEW: Video lazy loading, hover control helpers
└── public/videos/templates/        # NEW: Optimized WebM/MP4 video files
    ├── modern-agency.webm
    ├── modern-agency.mp4           # Fallback
    └── ...
```

### Pattern 1: CSS Grid Masonry with Strategic Spans

**What:** Use CSS Grid with explicit column spans for popular/featured templates
**When to use:** Need intentional card sizing without randomness, want control over visual hierarchy
**Example:**
```tsx
// Masonry grid container
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
  {sortedTemplates.map((template, index) => {
    const isFeatured = template.popular;
    return (
      <div
        key={template.id}
        className={cn(
          "group relative",
          isFeatured && "md:col-span-2" // Large cards span 2 columns
        )}
      >
        <VideoCard template={template} />
      </div>
    );
  })}
</div>
```

**Why this works:**
- CSS Grid `auto-rows-auto` allows variable heights
- `md:col-span-2` creates mixed-size cards (featured templates are larger)
- Control over placement prevents clustering (sort templates to space out popular ones)
- No JavaScript library needed, native CSS Grid performance
- Mobile (`grid-cols-1`) automatically stacks single column

### Pattern 2: Video Hover with Crossfade

**What:** Muted video autoplays on hover, crossfades with static thumbnail, pauses/resets on leave
**When to use:** Portfolio cards with video previews, performance-critical hover interactions
**Example:**
```tsx
// VideoCard.tsx
function VideoCard({ template }: { template: TemplateData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hasVideo = !!template.videoUrl;

  const handleHoverStart = () => {
    setIsHovering(true);
    if (hasVideo && videoRef.current) {
      videoRef.current.currentTime = 0; // Reset to start
      videoRef.current.play().catch(() => {}); // Autoplay may fail, catch silently
    }
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset for next hover
    }
  };

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative aspect-[16/10] overflow-hidden rounded-t-2xl"
    >
      {/* Static thumbnail - always visible */}
      <img
        src={template.screenshot}
        alt={template.name}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isHovering && hasVideo ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
      />

      {/* Video - crossfades in on hover */}
      {hasVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none" // Lazy load
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isHovering ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={template.videoUrl} type="video/webm" />
          <source src={template.videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      )}

      {/* Fallback for cards without video: subtle zoom */}
      {!hasVideo && (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovering ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
```

**Performance optimizations:**
- `preload="none"` prevents eager video downloads (videos only load on hover approach or IntersectionObserver)
- `muted loop playsInline` ensures autoplay works on mobile browsers (though disabled for touch devices)
- Crossfade duration 500ms balances smoothness and responsiveness
- Reset `currentTime = 0` on hover end ensures video restarts from beginning next time

### Pattern 3: Touch Device Detection

**What:** Disable video autoplay entirely on touch devices, show static screenshots only
**When to use:** Performance optimization, respecting mobile bandwidth and battery
**Example:**
```tsx
// videoUtils.ts
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - Safari quirk
    navigator.msMaxTouchPoints > 0
  );
}

// VideoCard.tsx (updated)
function VideoCard({ template }: { template: TemplateData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  const hasVideo = !!template.videoUrl && !isMobile;
  // ... rest of component (video elements won't render on mobile)
}
```

**Why this pattern:**
- Custom cursor already uses same touch detection pattern (see `CustomCursor.tsx`)
- Prevents unnecessary video file downloads on mobile (saves bandwidth)
- Battery-friendly (no background video processing)
- Static screenshots with subtle zoom still provide visual feedback

### Pattern 4: IntersectionObserver for Video Lazy Loading

**What:** Only load and play videos when cards are near viewport
**When to use:** Pages with many video cards (21 templates), prevent loading all videos at once
**Example:**
```tsx
function VideoCard({ template }: { template: TemplateData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting && videoRef.current) {
          // Pause video when scrolled out of view
          videoRef.current.pause();
        }
      },
      { rootMargin: "100px" } // Start loading 100px before entering viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef}>
      {/* Only render video element if card has been in viewport */}
      {isInView && hasVideo && (
        <video ref={videoRef} {...videoProps}>
          <source src={template.videoUrl} type="video/webm" />
        </video>
      )}
    </div>
  );
}
```

**Benefits:**
- Videos only download when user scrolls near card (100px margin gives time to preload)
- Reduces initial page load by ~21MB (1MB × 21 templates)
- Auto-pauses videos when scrolled away (frees memory)
- Framer Motion's `useInView` could be used instead of native IntersectionObserver for consistency

### Pattern 5: Sticky Filter Bar

**What:** Horizontal pill buttons that stick to top on scroll
**When to use:** Long scrollable content, need persistent filtering without jumping to top
**Example:**
```tsx
<div className="sticky top-0 z-20 bg-muted/95 backdrop-blur-md py-4 -mx-4 px-4 shadow-sm">
  <div className="flex flex-wrap justify-center gap-3">
    {categoryGroups.map((group) => (
      <button
        key={group.id}
        onClick={() => setActiveGroup(group.id)}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
          activeGroup === group.id
            ? "bg-primary text-white shadow-lg"
            : "bg-white text-muted-foreground hover:bg-primary/10"
        )}
      >
        <Icon size={16} />
        {group.label}
      </button>
    ))}
  </div>
</div>
```

**CSS notes:**
- `sticky top-0` requires parent with scroll container (not `overflow: hidden`)
- `backdrop-blur-md` creates glassmorphism effect when scrolling content underneath
- `z-20` ensures filter bar stays above cards but below header (z-50)
- `-mx-4 px-4` breaks out of container padding for full-width sticky effect

### Anti-Patterns to Avoid

- **Using JavaScript masonry libraries (Masonry.js, react-masonry-css):** Adds dependencies, requires DOM manipulation, slower than CSS Grid, harder to maintain. User constraint allows Claude's discretion on approach — native CSS Grid is superior.

- **Eager video loading:** Loading all 21 videos (~21MB) on page load kills performance. Always use `preload="none"` and IntersectionObserver.

- **Removing existing card styling complexity too aggressively:** TemplateShowcaseCard has 20 category colors, tier-based animations, 3 style variants. User wants simplification but category color coding stays — refactor carefully, don't strip all personality.

- **Breaking mobile-first responsive design:** Current grid uses `md:grid-cols-2` pattern. Masonry must collapse to single column on mobile (required by success criteria).

- **Ignoring custom cursor integration:** Cards use `data-cursor="card"` for coral spotlight (80px, 30% opacity). New VideoCard must preserve this for design consistency.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Video format conversion | Custom FFmpeg wrapper | FFmpeg CLI directly or Cloudinary API | Video compression requires experimentation with CRF values, tile-columns, cpu-used flags. FFmpeg has dozens of VP9 encoder options — pre-built tools (Cloudinary, Handbrake) handle edge cases. |
| Masonry column balancing | JavaScript height calculator | CSS Grid `auto-rows-auto` or CSS `column-count` | Browsers handle layout reflow and height balancing natively with better performance than JS. |
| Touch device detection | Custom UA parser | Standard `ontouchstart` + `maxTouchPoints` check | User agent parsing is fragile (spoofing, new devices). Hardware capability detection is reliable. |
| Video lazy loading | Custom scroll listener | IntersectionObserver API | Scroll listeners cause layout thrashing. IntersectionObserver is passive, doesn't block main thread. |
| Hover state management | Global state (Zustand/Redux) | Local useState + Framer Motion `whileHover` | Video hover is component-scoped, no cross-component coordination needed. Local state is simpler. |

**Key insight:** Video optimization is deceptively complex — container formats (WebM, MP4), codecs (VP9, H.264, AV1), bitrate modes (CRF, VBR, CBR), quality settings (CRF 23 vs 42 vs 56), tile parallelization, frame threading, and mobile playback quirks (playsinline, autoplay policies). Use established tools and test across devices rather than building custom encoding pipelines.

## Common Pitfalls

### Pitfall 1: CSS Grid Masonry Browser Support Confusion

**What goes wrong:** Implementing `grid-template-rows: masonry` expecting it to work, but it only works in Firefox behind a flag and Safari Technology Preview. Production sites fail in Chrome (90%+ of users).

**Why it happens:** CSS Grid Level 3 Masonry spec is experimental. WebKit recently proposed alternative syntax (`grid-lanes`). Browser consensus hasn't been reached.

**How to avoid:**
1. Use CSS Grid with explicit `col-span-2` for featured cards (production-ready, works everywhere)
2. Use CSS `column-count` as true fallback (works but breaks horizontal reading order)
3. Wrap experimental syntax in `@supports (grid-template-rows: masonry)` for progressive enhancement
4. **DO NOT** use experimental masonry as primary layout in production (Feb 2026)

**Warning signs:** Grid items appear in wrong order, gaps appear randomly, layout breaks in Chrome/Edge.

**Code example (progressive enhancement):**
```css
/* Base: CSS Grid with manual spans (works everywhere) */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  auto-rows: auto;
}

.featured-card {
  grid-column: span 2;
}

/* Future-proof enhancement for Firefox/Safari TP */
@supports (grid-template-rows: masonry) {
  .masonry-grid {
    grid-template-rows: masonry;
  }
  .featured-card {
    grid-column: auto; /* Let masonry handle sizing */
  }
}
```

### Pitfall 2: Video Autoplay Policy Violations

**What goes wrong:** Videos fail to autoplay silently, console shows "play() failed because the user didn't interact with the document first" errors. Works on localhost, fails on production.

**Why it happens:** Browser autoplay policies require muted videos. Unmuted autoplay is blocked unless user has interacted with page. Missing `muted`, `playsInline`, or `loop` attributes breaks autoplay.

**How to avoid:**
1. **ALWAYS** include all three attributes: `<video muted loop playsInline>`
2. Add `preload="none"` to prevent eager loading
3. Wrap `videoRef.current.play()` in `.catch()` to handle autoplay failures gracefully
4. Never attempt unmuted autoplay (browsers will block it)
5. On iOS, `playsInline` is required or video opens fullscreen

**Warning signs:** Videos don't start on hover, console shows DOMException, videos work in Firefox but not Chrome/Safari.

**Code example:**
```tsx
// ✅ CORRECT
<video
  ref={videoRef}
  muted           // Required for autoplay
  loop            // Seamless looping
  playsInline     // Prevents fullscreen on iOS
  preload="none"  // Lazy load
>
  <source src="video.webm" type="video/webm" />
</video>

// Play on hover with error handling
const handleHover = () => {
  if (videoRef.current) {
    videoRef.current.play().catch((error) => {
      // Autoplay failed - likely browser policy or no user interaction yet
      console.warn("Video autoplay blocked:", error);
    });
  }
};

// ❌ WRONG
<video ref={videoRef}> {/* Missing muted, loop, playsInline */}
  <source src="video.webm" />
</video>

videoRef.current.play(); // No error handling - throws uncaught promise rejection
```

### Pitfall 3: Video File Size Explosion

**What goes wrong:** Each portfolio video ends up 3-5 MB instead of <1MB target. Page loads 21 videos totaling 63-105 MB. Users on slower connections see blank cards for 30+ seconds. Mobile users burn through data caps.

**Why it happens:** Default video export settings prioritize quality over size. 1920×1080 resolution + high bitrate + 10-second duration = massive files. Designers export at "high quality" without compression.

**How to avoid:**
1. Target resolution: 1280×720 or lower (portfolio cards are small, 1080p is overkill)
2. Duration: 3-5 seconds max (seamless loops, not full demos)
3. FFmpeg settings for <1MB WebM:
   ```bash
   ffmpeg -i input.mp4 \
     -c:v libvpx-vp9 \          # VP9 codec (better compression than VP8)
     -crf 42 \                   # Quality 0-63 (42 = good for motion, 56 for static)
     -b:v 0 \                    # VBR mode (variable bitrate)
     -an \                       # Remove audio track
     -vf scale=1280:720 \        # Resize to 720p
     -t 4 \                      # Trim to 4 seconds
     -tile-columns 2 \           # Parallel encoding (faster)
     -frame-parallel 1 \         # Frame threading
     -threads 4 \                # Use 4 CPU threads
     output.webm
   ```
4. Always create MP4 fallback (Safari < 14.1 doesn't support WebM):
   ```bash
   ffmpeg -i input.mp4 \
     -c:v libx264 \              # H.264 codec
     -crf 28 \                   # Quality for H.264
     -preset medium \            # Encoding speed vs. compression
     -an \                       # Remove audio
     -vf scale=1280:720 \
     -t 4 \
     output.mp4
   ```
5. Test file sizes: `ls -lh videos/*.webm` — each should be under 1024 KB

**Warning signs:** Slow page loads, browser DevTools Network tab shows 50+ MB video downloads, users complain about data usage.

**Quality checkpoints:**
- CRF 42 (VP9): Good for screen recordings with movement
- CRF 56 (VP9): Acceptable for static UI slides/text
- If file > 1MB: increase CRF (+5), reduce duration (-1s), or lower resolution (720p → 540p)

### Pitfall 4: Sticky Filter Bar with Overflow Conflicts

**What goes wrong:** Filter bar doesn't stick, or sticks but breaks layout (overlaps content, creates gaps, scroll jumps).

**Why it happens:** `position: sticky` has strict parent requirements. Any parent with `overflow: hidden`, `overflow-x: hidden`, or `overflow-y: auto` breaks sticky behavior. Container padding/margin issues cause layout shifts.

**How to avoid:**
1. Ensure sticky element's parent is the scroll container (no `overflow` restrictions between sticky element and scroll container)
2. Use `backdrop-blur` for glassmorphism instead of solid background (content scrolls underneath)
3. Apply negative margins to break out of container padding for full-width effect:
   ```tsx
   <div className="sticky top-0 z-20 bg-muted/95 backdrop-blur-md -mx-4 px-4">
     {/* Filter pills */}
   </div>
   ```
4. Test sticky behavior: scroll page and verify filter bar stays at top of viewport
5. If sticky fails, check DevTools: inspect parent elements for `overflow` properties

**Warning signs:** Filter bar scrolls away with content, layout shifts when scrolling, gap appears at top of page.

**Debugging checklist:**
```tsx
// ✅ CORRECT structure
<main> {/* Scroll container, no overflow restrictions */}
  <Section> {/* No overflow: hidden */}
    <Container> {/* Has padding but no overflow */}
      <div className="sticky top-0 -mx-4 px-4"> {/* Sticky works */}
        Filter pills
      </div>
    </Container>
  </Section>
</main>

// ❌ WRONG structure
<main>
  <Section className="overflow-hidden"> {/* Breaks sticky! */}
    <Container>
      <div className="sticky top-0"> {/* Won't stick */}
        Filter pills
      </div>
    </Container>
  </Section>
</main>
```

### Pitfall 5: Breaking Existing Custom Cursor Integration

**What goes wrong:** Redesigned portfolio cards don't trigger custom cursor states (coral spotlight missing on hover). User sees default browser cursor instead of branded experience.

**Why it happens:** Custom cursor uses event delegation with `data-cursor` attributes. If new components forget `data-cursor="card"`, cursor system doesn't detect hover state.

**How to avoid:**
1. Review `CustomCursor.tsx` implementation: cursor states are `"default"`, `"button"`, `"card"`, `"text"`
2. **Always** add `data-cursor="card"` to portfolio card containers:
   ```tsx
   <motion.div
     data-cursor="card"  // Triggers 80px coral spotlight on hover
     className="group relative"
   >
     <VideoCard template={template} />
   </motion.div>
   ```
3. Use `data-cursor-text="View"` if cursor should show text label (optional)
4. Test: hover over cards and verify coral spotlight (80px circle, rgba(226, 121, 94, 0.3)) appears

**Warning signs:** Cards show default cursor arrow, no coral spotlight effect, cursor animations don't trigger.

**Custom cursor states reference:**
- `data-cursor="card"` → 80px coral spotlight, fades out dot, smooth expand
- `data-cursor="button"` → Compact follower with white fill + invert blend mode
- `data-cursor="text"` → 80px navy circle with white text label
- No attribute → Default state (8px dot + 32px coral ring)

**Code example:**
```tsx
// VideoCard.tsx
function VideoCard({ template }: { template: TemplateData }) {
  return (
    <motion.div
      data-cursor="card"        // ✅ Triggers custom cursor on hover
      data-cursor-text="View"   // Optional: show "View" label in cursor
      whileHover={{ y: -6 }}
      className="group"
    >
      {/* Card content */}
    </motion.div>
  );
}
```

## Code Examples

Verified patterns from official sources and project codebase:

### Video Element with Hover Control (Framer Motion + Refs)
```tsx
import { motion } from "framer-motion";
import { useRef, useState } from "react";

function VideoCard({ videoUrl, posterUrl }: { videoUrl: string; posterUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleHoverStart = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reset to start
      videoRef.current.play().catch(() => {
        // Autoplay blocked - fail silently
      });
    }
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative aspect-video overflow-hidden"
    >
      {/* Static poster - crossfades out on hover */}
      <img
        src={posterUrl}
        alt="Video preview"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isHovering ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
      />

      {/* Video - crossfades in on hover */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl.replace(".webm", ".mp4")} type="video/mp4" />
      </video>
    </motion.div>
  );
}
```
**Source:** [Framer Motion gestures documentation](https://www.framer.com/motion/gestures/), project's `CustomCursor.tsx` GSAP animation patterns

### CSS Grid Masonry with Strategic Spans
```tsx
import { cn } from "@/lib/utils";

function PortfolioGrid({ templates }: { templates: TemplateData[] }) {
  // Sort: popular first, then by tier, then alphabetical
  const sortedTemplates = [
    ...templates.filter((t) => t.popular).sort((a, b) => getPriceTier(b) - getPriceTier(a)),
    ...templates.filter((t) => !t.popular),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
      {sortedTemplates.map((template, index) => {
        const isFeatured = template.popular;
        const isEveryThirdFeatured = isFeatured && index % 3 === 0;

        return (
          <div
            key={template.id}
            className={cn(
              "group relative",
              // Large cards span 2 columns on desktop, spaced intentionally
              isFeatured && isEveryThirdFeatured && "lg:col-span-2"
            )}
            data-cursor="card"
          >
            <VideoCard template={template} />
          </div>
        );
      })}
    </div>
  );
}
```
**Source:** [CSS Grid Complete Guide 2026](https://devtoolbox.dedyn.io/blog/css-grid-complete-guide), project's `WebSolutionsGrid.tsx` bento layout pattern

### IntersectionObserver for Video Lazy Loading
```tsx
import { useEffect, useRef, useState } from "react";

function LazyVideoCard({ template }: { template: TemplateData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true); // Load video when card enters viewport
        } else if (videoRef.current) {
          // Pause and cleanup when card leaves viewport
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      {
        rootMargin: "100px", // Start loading 100px before card enters viewport
        threshold: 0.1,      // Trigger when 10% of card is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="relative">
      {/* Static poster always visible */}
      <img src={template.screenshot} alt={template.name} loading="lazy" />

      {/* Video only renders when card has been in viewport */}
      {isInView && template.videoUrl && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0"
        >
          <source src={template.videoUrl} type="video/webm" />
          <source src={template.videoUrl.replace(".webm", ".mp4")} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
```
**Source:** [Best Practices for Video Playback (Mux 2025)](https://www.mux.com/articles/best-practices-for-video-playback-a-complete-guide-2025), [Video performance (web.dev)](https://web.dev/learn/performance/video-performance)

### Touch Device Detection (matches existing custom cursor pattern)
```tsx
// lib/videoUtils.ts
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    (navigator.maxTouchPoints || 0) > 0 ||
    // @ts-ignore - IE/Edge fallback
    (navigator.msMaxTouchPoints || 0) > 0
  );
}

// Usage in component
import { useEffect, useState } from "react";
import { isTouchDevice } from "@/lib/videoUtils";

function VideoCard({ template }: { template: TemplateData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  // Disable video on touch devices, use static screenshot + zoom instead
  const hasVideo = !!template.videoUrl && !isMobile;

  return (
    <motion.div
      whileHover={{ scale: hasVideo ? 1 : 1.05 }} // Zoom static image if no video
    >
      {hasVideo ? (
        <video {...videoProps} />
      ) : (
        <img src={template.screenshot} alt={template.name} />
      )}
    </motion.div>
  );
}
```
**Source:** Project's `CustomCursor.tsx` lines 18-24 (identical touch detection pattern)

### Sticky Filter Bar with Backdrop Blur
```tsx
import { cn } from "@/lib/utils";

function PortfolioFilters({
  activeGroup,
  onGroupChange,
}: {
  activeGroup: string;
  onGroupChange: (groupId: string) => void;
}) {
  return (
    <div className="sticky top-0 z-20 bg-muted/95 backdrop-blur-md py-4 -mx-4 px-4 shadow-sm transition-shadow">
      <div className="flex flex-wrap justify-center gap-3">
        {categoryGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => onGroupChange(group.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all",
              activeGroup === group.id
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-white text-muted-foreground hover:bg-primary/10 hover:text-primary"
            )}
          >
            <Icon size={16} />
            {group.label}
            <span className="text-xs opacity-50">{group.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```
**Source:** [CSS position: sticky tutorial](https://www.testmu.ai/blog/css-position-sticky-tutorial/), project's existing filter bar in `portfolio/page.tsx` lines 140-169

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript masonry libraries (Masonry.js, Isotope) | CSS Grid with `auto-rows-auto` + strategic `col-span` | 2021-2024 | Native CSS eliminates 30KB library, better performance, no layout recalculation on resize |
| VP8 WebM codec | VP9 WebM codec | 2020-2025 | 30-50% smaller file sizes at same quality, better mobile support |
| CSS columns (`column-count`) for masonry | CSS Grid Level 3 masonry (experimental) | 2023-2026 (experimental) | True masonry with horizontal reading order, but browser support still limited |
| Eager video loading | IntersectionObserver lazy loading | 2019-2025 | Reduced initial page load from 63MB to ~3MB (only loads visible videos) |
| Unmuted autoplay (pre-2018) | Muted autoplay with `playsInline` | 2018 (Chrome 66, iOS 11) | Browser autoplay policies require muted, mobile needs playsinline |
| H.264 MP4 only | WebM VP9 primary + MP4 fallback | 2022-2025 | Better compression (WebM) with universal compatibility (MP4 fallback) |

**Deprecated/outdated:**
- **Masonry.js library:** Use CSS Grid instead. Native CSS is faster, smaller, and responsive by default.
- **VP8 codec:** Use VP9 for WebM videos. VP8 is outdated, VP9 offers 30-50% better compression.
- **Unmuted autoplay:** Browsers block it. Always use `muted` attribute for autoplay videos.
- **CSS `column-count` for primary masonry:** Works but breaks horizontal reading order (items flow vertically down columns). Use CSS Grid with `col-span` for intentional placement.
- **react-masonry-css:** Adds dependency for CSS-only problem. Native CSS Grid `auto-rows-auto` achieves same result.

## Open Questions

1. **Video source files: Who creates them?**
   - What we know: Each template needs 3-5 second loop, <1MB WebM + MP4 fallback
   - What's unclear: Are screen recordings created from live demos? Do designers export from Figma with motion? Is this a manual or automated process?
   - Recommendation: Create video capture workflow using browser screen recording (Chrome DevTools) or Loom. Batch process with FFmpeg script to ensure consistency.

2. **Narrative copy: Do existing templates already have story-based descriptions?**
   - What we know: Current `templateData.ts` has generic descriptions ("Clean and professional template for digital agencies")
   - What's unclear: Does client have narrative copy ready, or do we write it as part of this phase?
   - Recommendation: Audit existing `description` field. If generic, create narrative template and populate 2-3 examples. Get user approval before writing all 21.

3. **Filter bar: All 6 category groups or collapse to fewer?**
   - What we know: User wants horizontal pill buttons (not dropdown). Currently 6 groups: All, Business, Services, Lifestyle, Creative, Shopping.
   - What's unclear: Will 6 pills + sub-filters feel cluttered? User gave Claude discretion on filter count.
   - Recommendation: Keep all 6 (current implementation already uses 6 groups). Test on mobile — if wraps to 3 rows, consider merging groups or adding horizontal scroll container.

4. **Loading skeleton: Simple shimmer or content-aware placeholders?**
   - What we know: Videos lazy load with IntersectionObserver, need loading state
   - What's unclear: User preference for loading skeleton design (simple gray box vs. detailed placeholder matching card layout)
   - Recommendation: Start with simple approach (gray box with shimmer, Tailwind `animate-pulse`). Upgrade to content-aware skeleton only if user requests.

5. **Price breakdown removal: Modal, separate page, or accordion?**
   - What we know: User wants price breakdown removed from cards ("keep it for detail view/modal")
   - What's unclear: Implementation approach — modal overlay, dedicated `/templates/[slug]` page, or inline accordion?
   - Recommendation: Use existing template detail page (`/templates/[slug]/page.tsx` already exists). Link "View Details" button to it. No modal needed.

## Sources

### Primary (HIGH confidence)
- [Framer Motion gestures documentation](https://www.framer.com/motion/gestures/) - `whileHover`, `onHoverStart`, `onHoverEnd` for video control
- [Masonry layout - CSS Grid (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout) - Experimental CSS Grid Masonry syntax and browser support
- [Best Practices for Video Playback (Mux 2025)](https://www.mux.com/articles/best-practices-for-video-playback-a-complete-guide-2025) - Autoplay policies, muted requirement, IntersectionObserver patterns
- [Video performance (web.dev)](https://web.dev/learn/performance/video-performance) - Lazy loading, poster images, preload strategies
- [FFmpeg VP9 Encoding Guide (WebM Project Wiki)](https://wiki.webmproject.org/ffmpeg/vp9-encoding-guide) - CRF values, bitrate modes, tile-columns settings
- [CSS Grid Complete Guide 2026](https://devtoolbox.dedyn.io/blog/css-grid-complete-guide) - Auto-rows, column spans, responsive breakpoints
- Project source: `src/components/CustomCursor/CustomCursor.tsx` (lines 18-24) - Touch device detection pattern
- Project source: `src/app/portfolio/page.tsx` (lines 140-169) - Existing filter bar implementation
- Project source: `src/lib/templateData.ts` - Template data structure, 21 templates with categories

### Secondary (MEDIUM confidence)
- [Autoplay policy in Chrome (Chrome Developers)](https://developer.chrome.com/blog/autoplay) - Browser autoplay restrictions, muted requirement
- [CSS position: sticky tutorial (TestMu AI)](https://www.testmu.ai/blog/css-position-sticky-tutorial/) - Sticky positioning requirements, overflow conflicts
- [CSS Masonry layouts: Responsive, Lightweight, and EASY! (W3Bits)](https://w3bits.com/css-masonry/) - CSS columns fallback, browser support comparison
- [Masonry Layout is Now grid-lanes (CSS-Tricks)](https://css-tricks.com/masonry-layout-is-now-grid-lanes/) - WebKit's grid-lanes proposal, syntax differences
- [react-masonry-css (npm)](https://www.npmjs.com/package/react-masonry-css) - React library evaluation (decided against using)
- [Masonic (GitHub)](https://github.com/jaredLunde/masonic) - Virtualized masonry option (overkill for 21 items)
- [Crafting a Narrative: Mastering Storytelling in Your Design Portfolio (Dribbble)](https://dribbble.com/stories/2024/03/18/crafting-a-narrative-mastering-storytelling-in-your-design-portfolio) - Portfolio narrative structure, storytelling patterns
- [4 Do's and Don'ts When Using Video Autoplay in HTML (Cloudinary)](https://cloudinary.com/guides/video-effects/video-autoplay-in-html) - Mobile considerations, playsinline requirement

### Tertiary (LOW confidence)
- [kota.co.uk/work](https://kota.co.uk/work) - Inspiration site mentioned in context (unable to fetch implementation details via WebSearch)
- [Creating CSS masonry-style layouts (LogRocket)](https://blog.logrocket.com/creating-css-masonry-style-layouts/) - Additional masonry patterns, historical context

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in package.json, no new dependencies
- Architecture: HIGH - Patterns verified in project source, official docs, and web.dev guides
- Pitfalls: HIGH - Based on browser autoplay policies (Chrome, MDN), video performance research (Mux, web.dev), and project's existing cursor/animation patterns
- Video optimization: MEDIUM - FFmpeg settings require testing with actual screen recordings, CRF values may need adjustment per template
- Narrative copy: LOW - User didn't specify if copy exists or needs to be written, recommendation is to create examples and get approval

**Research date:** 2026-02-11
**Valid until:** 2026-03-15 (~30 days, stable domain — CSS Grid and video APIs are established, masonry spec is experimental but syntax stable)
