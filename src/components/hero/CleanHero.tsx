import React from "react";
import { Mail, Linkedin, Github, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY = "https://calendly.com/barskyuxdesignservices/30min";

const scrollToCaseStudies = () => {
  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
};

const SOCIALS = [
  { Icon: Mail, href: "mailto:hbarsky01@gmail.com", label: "Email Hiram Barsky", external: false },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/hiram-barsky", label: "Hiram Barsky on LinkedIn", external: true },
  { Icon: Github, href: "https://github.com/hbarsky00", label: "Hiram Barsky on GitHub", external: true },
];

const CleanHero: React.FC = () => {
  return (
    <section className="relative bg-background border-b border-border overflow-hidden">
      {/* Fine dot-grid texture — a nod to Swiss-grid structure, not decoration for its own
          sake. Pure CSS radial-gradient tiling, no image asset, no JS. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--foreground) / 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />
      {/* Brand-color glow, layered above the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(680px circle at 50% 0%, hsl(var(--primary) / 0.14), transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-8">
        <div className="flex flex-col items-center text-center gap-7">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 via-purple-500/20 to-transparent blur-md"
            />
            <img
              src="/images/hiram-barsky-profile.png"
              alt="Hiram Barsky"
              width={112}
              height={112}
              loading="eager"
              className="relative w-28 h-28 rounded-full object-cover ring-2 ring-primary/25 ring-offset-4 ring-offset-background"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Product Design × AI
          </div>

          <div>
            <h1 className="text-4xl sm:text-6xl font-display font-bold text-foreground tracking-tight leading-[1.05]">
              Hiram Barsky
            </h1>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground">
              Lead Product &amp; AI Designer · Clifton, NJ
            </p>
          </div>

          <p className="max-w-xl text-lg sm:text-xl text-foreground/90 font-medium">
            I design AI-first products that ship.
          </p>

          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            <Button variant="brand" onClick={scrollToCaseStudies} className="!w-auto">
              See My Work <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-auto items-center justify-center gap-2 h-12 px-6 rounded-2xl border-2 border-primary/30 text-primary font-medium hover:bg-primary/10 hover:border-primary transition-colors"
            >
              Book a Call
            </a>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-10 pb-2">
          <button
            type="button"
            onClick={scrollToCaseStudies}
            aria-label="Scroll to case studies"
            className="flex items-center justify-center w-11 h-11 rounded-full text-muted-foreground
                       hover:text-primary hover:bg-primary/10 transition-colors motion-safe:animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CleanHero;
