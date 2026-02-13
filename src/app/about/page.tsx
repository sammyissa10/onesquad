"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, slideFromLeft, slideFromRight, TRIGGERS } from "@/lib/scrollAnimations";

export default function AboutPage() {
  // Hero animations (dramatic entrance)
  const { scope: heroScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.about-hero-headline', {
      ...fadeUp({ y: 60, duration: 1.0, ease: 'power3.out' }),
      scrollTrigger: {
        trigger: '.about-hero',
        start: TRIGGERS.hero,
      },
    });

    gsap.from('.about-hero-subtitle', {
      ...fadeUp({ y: 60, duration: 1.0, ease: 'power3.out' }),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.about-hero',
        start: TRIGGERS.hero,
      },
    });
  });

  // Story section animations (directional slide)
  const { scope: storyScope } = useScrollAnimation(({ gsap }) => {
    // Story text slides from left
    gsap.from('.about-story-text', {
      ...slideFromLeft({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.about-story',
        start: TRIGGERS.standard,
      },
    });

    // Brand mark slides from right
    gsap.from('.about-story-brand', {
      ...slideFromRight({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.about-story',
        start: TRIGGERS.standard,
      },
    });
  });

  // Vision/mission section animations (fadeUp for heading and body)
  const { scope: visionScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.about-vision-eyebrow', {
      ...fadeUp({ duration: 0.6 }),
      scrollTrigger: {
        trigger: '.about-vision',
        start: TRIGGERS.early,
      },
    });

    gsap.from('.about-vision-headline', {
      ...fadeUp({ y: 60, duration: 1.0, ease: 'power3.out' }),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.about-vision',
        start: TRIGGERS.early,
      },
    });

    gsap.from('.about-vision-body', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.about-vision',
        start: TRIGGERS.standard,
      },
    });
  });

  // Values section animations (dramatic typography statements)
  const { scope: valuesScope } = useScrollAnimation(({ gsap }) => {
    // Each value block gets its own dramatic entrance
    const valueBlocks = gsap.utils.toArray('.about-value');
    valueBlocks.forEach((block) => {
      const headline = (block as HTMLElement).querySelector('.about-value-headline');
      const subtitle = (block as HTMLElement).querySelector('.about-value-subtitle');

      if (headline) {
        gsap.from(headline, {
          opacity: 0,
          y: 80,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headline,
            start: 'top 75%',
          },
        });
      }

      if (subtitle) {
        gsap.from(subtitle, {
          ...fadeUp(),
          delay: 0.3,
          scrollTrigger: {
            trigger: subtitle,
            start: 'top 80%',
          },
        });
      }
    });
  });

  // Editorial section animations (subtle)
  const { scope: editorialScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.about-editorial-heading', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.about-editorial',
        start: TRIGGERS.early,
      },
    });

    const paragraphs = gsap.utils.toArray('.about-editorial-paragraph');
    paragraphs.forEach((p, i) => {
      gsap.from(p as HTMLElement, {
        ...fadeUp(),
        delay: 0.15 * (i + 1),
        scrollTrigger: {
          trigger: '.about-editorial',
          start: TRIGGERS.standard,
        },
      });
    });
  });

  // CTA section animations
  const { scope: ctaScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.about-cta-heading', {
      ...fadeUp({ scale: 0.9, duration: 0.7 }),
      scrollTrigger: {
        trigger: '.about-cta',
        start: TRIGGERS.early,
      },
    });

    gsap.from('.about-cta-text', {
      ...fadeUp(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.about-cta',
        start: TRIGGERS.early,
      },
    });

    gsap.from('.about-cta-buttons', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.about-cta',
        start: TRIGGERS.early,
      },
    });
  });

  return (
    <>
      <Header />
      <main>
        {/* Section 1: Dark Hero - Mission First */}
        <section
          ref={heroScope}
          className="about-hero bg-navy-section py-28 md:py-40"
          data-cursor="text"
          data-cursor-text="Read On"
          data-animate
        >
          <Container size="xl">
            <div>
              <h1
                className="about-hero-headline text-4xl md:text-5xl lg:text-6xl xl:text-display font-black text-white leading-[0.9] tracking-tight"
                data-animate
              >
                We Don&apos;t Do Average.
              </h1>
              <p
                className="about-hero-subtitle text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mt-8"
                data-animate
              >
                We&apos;re a small team building websites for businesses that deserve better than templates. No shortcuts. No cookie-cutter designs. Just solid work.
              </p>
            </div>
          </Container>
        </section>

        {/* Section 2: Logo Origin Story */}
        <section
          ref={storyScope}
          className="about-story bg-card py-24 md:py-36"
          data-animate
        >
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              {/* Left column - Story */}
              <div className="about-story-text lg:col-span-7" data-animate>
                <p className="text-sm font-semibold text-coral uppercase tracking-widest mb-6">
                  The Story
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-navy leading-[0.9] tracking-tight mb-8">
                  Two Become One.
                </h2>
                <div className="space-y-6 text-lg text-navy/70 leading-relaxed">
                  <p>
                    Our logo tells the story of who we are. Two number 1s merge together to form the letter S in negative space — symbolizing the union of two teams becoming one.
                  </p>
                  <p>
                    When you work with OneSquad, we&apos;re on your team. Not a vendor sending invoices — we&apos;re the people you call when something needs to get done.
                  </p>
                  <p>
                    This philosophy drives everything — how we communicate, how we approach projects, and how we measure success. Hint: we measure it by yours.
                  </p>
                  <p>
                    We started as locals from Northwest Indiana — graduates who saw businesses in our backyard getting ripped off by agencies that didn&apos;t understand them. So we became the team we wished existed. Local roots, digital expertise, no pretense.
                  </p>
                </div>
              </div>

              {/* Right column - Decorative brand mark */}
              <div className="about-story-brand lg:col-span-5" data-animate>
                <div
                  className="aspect-square bg-gradient-to-br from-coral to-peach rounded-3xl flex items-center justify-center"
                  data-cursor="card"
                >
                  <div className="text-[5rem] md:text-[7rem] font-black text-white/20 select-none">
                    1S
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 3: Vision / Mission */}
        <section
          ref={visionScope}
          className="about-vision bg-navy-section py-24 md:py-36"
          data-animate
        >
          <Container size="xl">
            <div className="max-w-4xl">
              <p className="about-vision-eyebrow text-sm font-semibold text-coral uppercase tracking-widest mb-6" data-animate>
                Our Vision
              </p>
              <h2 className="about-vision-headline text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight mb-8" data-animate>
                Your Personalized Digital Team.
              </h2>
              <p className="about-vision-body text-xl text-white/70 max-w-3xl leading-relaxed" data-animate>
                We exist to be the digital team your business deserves but could never afford to hire. Not a vendor. Not an agency. Your squad — building a platform where your business reaches its digital potential without the enterprise price tag.
              </p>
            </div>
          </Container>
        </section>

        {/* Section 4: Values - Typography Statements */}
        <section
          ref={valuesScope}
          className="about-values bg-navy-section py-28 md:py-40 border-t border-white/10"
          data-animate
        >
          <Container size="xl">
            <div className="space-y-20 md:space-y-28">
              {/* Value 1 */}
              <div className="about-value" data-animate>
                <h3 className="about-value-headline text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight" data-animate>
                  We Remember <span className="text-coral">Your Name.</span>
                </h3>
                <p className="about-value-subtitle text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mt-6" data-animate>
                  You&apos;re not a ticket number. Your account manager knows your business, your goals, and what keeps you up at night. We build relationships, not just websites.
                </p>
              </div>

              {/* Value 2 */}
              <div className="about-value" data-animate>
                <h3 className="about-value-headline text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight" data-animate>
                  We&apos;d Rather <span className="text-coral">Say No.</span>
                </h3>
                <p className="about-value-subtitle text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mt-6" data-animate>
                  If something won&apos;t work for your business, we&apos;ll tell you straight. We&apos;d rather lose a sale than waste your money on something that won&apos;t deliver. That&apos;s not noble — it&apos;s just good business.
                </p>
              </div>

              {/* Value 3 */}
              <div className="about-value" data-animate>
                <h3 className="about-value-headline text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight" data-animate>
                  We Never Stop <span className="text-coral">Learning.</span>
                </h3>
                <p className="about-value-subtitle text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mt-6" data-animate>
                  The digital world moves fast and we move with it. What worked last year might not work today. We stay sharp so you don&apos;t have to — and we bring those insights to every project.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 5: What Makes Us Different */}
        <section
          ref={editorialScope}
          className="about-editorial bg-peach/10 py-20 md:py-28"
          data-animate
        >
          <Container size="xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="about-editorial-heading text-3xl md:text-4xl lg:text-5xl font-black text-navy leading-[0.9] tracking-tight text-center mb-10" data-animate>
                Small Team. Big Standards.
              </h2>
              <div className="space-y-6">
                <p className="about-editorial-paragraph text-lg md:text-xl text-navy/70 leading-relaxed" data-animate>
                  We&apos;re deliberately small. No account managers playing telephone. No junior devs learning on your dime. When you hire OneSquad, you get the people who actually do the work.
                </p>
                <p className="about-editorial-paragraph text-lg md:text-xl text-navy/70 leading-relaxed" data-animate>
                  We take on fewer projects so we can give each one the attention it deserves. Your business isn&apos;t a line item — it&apos;s our focus.
                </p>
                <p className="about-editorial-paragraph text-lg md:text-xl text-navy/70 leading-relaxed" data-animate>
                  And yeah, we remember your name. Every single time.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 6: Manifesto Closer / CTA */}
        <section
          ref={ctaScope}
          className="about-cta bg-navy-section py-24 md:py-36"
          data-animate
        >
          <Container size="xl">
            <div className="text-center">
              <h2 className="about-cta-heading text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.9] tracking-tight" data-animate>
                Ready to Join <span className="text-coral">the Squad</span>?
              </h2>
              <p className="about-cta-text text-xl text-white/60 mt-6 mb-10" data-animate>
                Let&apos;s stop talking about what we could build and start building it.
              </p>
              <div className="about-cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4" data-animate>
                <Link href="/contact">
                  <Button variant="accent" size="lg" data-cursor="button">
                    Start a Project
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-navy"
                    data-cursor="button"
                  >
                    See Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
