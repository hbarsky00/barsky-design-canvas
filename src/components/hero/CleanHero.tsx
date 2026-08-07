import React from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY = "https://calendly.com/barskyuxdesignservices/30min";

// Real, shipped, routed products only — matches App.tsx's actual routes.
// "catchbuddy" intentionally excluded: Hiram asked for it to be pulled
// from every featured surface while that case study gets reworked.
const SHIPPED = [
  { label: "HerbaLink", desc: "Verified herbalist platform", to: "/project/herbalink" },
  { label: "DAE Search", desc: "Enterprise data search", to: "/project/dae-search" },
  { label: "Email Creation AI", desc: "AI-assisted email drafting", to: "/project/email-creation-ai" },
];

const CONCEPTS = [
  { label: "Ring-Rival", desc: "Mobile web boxing", to: "/project/ring-rival" },
  { label: "Fire Lion", desc: "Word-casting arcade game", to: "/project/fire-lion" },
];

const scrollToCaseStudies = () => {
  document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
};

const CleanHero: React.FC = () => {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center gap-6">
          <img
            src="/images/hiram-barsky-profile.png"
            alt="Hiram Barsky"
            width={96}
            height={96}
            loading="eager"
            className="w-24 h-24 rounded-full object-cover border border-border"
          />

          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Hiram Barsky
            </h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground">
              Lead Product &amp; AI Designer · Clifton, NJ
            </p>
          </div>

          <p className="max-w-xl text-lg text-foreground/90">
            I design AI-first products that ship.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button variant="brand" onClick={scrollToCaseStudies}>
              See My Work <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border-2 border-primary/30 text-primary font-medium hover:bg-primary/10 hover:border-primary transition-colors w-full sm:w-auto"
            >
              Book a Call
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:hbarsky01@gmail.com"
              aria-label="Email Hiram Barsky"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hiram-barsky"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hiram Barsky on LinkedIn"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/hbarsky00"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hiram Barsky on GitHub"
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Shipped Products
            </h2>
            <ul className="space-y-2">
              {SHIPPED.map((p) => (
                <li key={p.label}>
                  <Link
                    to={p.to}
                    className="group flex items-baseline gap-2 py-1 text-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-medium">{p.label}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary/80">
                      {p.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Concept Games
            </h2>
            <ul className="space-y-2">
              {CONCEPTS.map((p) => (
                <li key={p.label}>
                  <Link
                    to={p.to}
                    className="group flex items-baseline gap-2 py-1 text-foreground hover:text-primary transition-colors"
                  >
                    <span className="font-medium">{p.label}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-primary/80">
                      {p.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanHero;
