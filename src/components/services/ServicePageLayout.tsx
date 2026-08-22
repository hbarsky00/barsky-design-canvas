import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SERVICES_DATA, SERVICE_PACKAGES } from "@/data/services";

const CALENDLY_URL = "https://calendly.com/barskyuxdesignservices/30min";

/** Real shipped work, so the pricing below has something standing behind it. */
const PROOF = [
  {
    href: "/project/stips",
    title: "Stips",
    image: "/images/stips/landing.jpg",
    alt: "Stips prediction markets landing page",
    line: "Play-money prediction markets — designed, built and shipped solo, down to the scheduled jobs that generate the markets.",
  },
  {
    href: "/project/ring-rival",
    title: "Ring-Rival",
    image: "/images/ringrival-hero-title.png",
    alt: "Ring-Rival mobile boxing game title screen",
    line: "Console boxing feel in a mobile browser. Time-to-first-punch cut from 22 seconds to 6 by deleting everything in the way.",
  },
  {
    href: "/project/investor-loan-app",
    title: "Investor Loan Platform",
    image: "/images/investor-loan-app/hero.png",
    alt: "Investor loan analysis dashboard",
    line: "Replaced Excel as the system of record for multi-million-dollar loan deals. Three previous attempts had failed.",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "What are we actually solving, and for whom." },
  { step: "02", title: "Strategy", desc: "The scope, the sequence, and what gets cut." },
  { step: "03", title: "Design", desc: "Real screens and real states, not happy paths." },
  { step: "04", title: "Ship", desc: "Built and launched, then tuned on real use." },
];

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * /services rebuilt in the site's own visual language.
 *
 * It previously used Material-3 surface containers, elevation shadows,
 * gradient-clipped numerals and pill badges — a different design system from
 * the homepage and case studies, with no imagery and a lot of sub-16px text.
 * This uses the same tokens, Space Grotesk scale and editorial rhythm as the
 * rest of the site, and puts real shipped work next to the pricing.
 */
const ServicePageLayout: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? undefined : item;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-4 sm:px-6">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={variants}>
            <Badge variant="secondary" className="mb-5">
              Design &amp; Development
            </Badge>
          </motion.div>

          <motion.h1
            variants={variants}
            className="font-display font-bold text-foreground tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6"
          >
            I design and develop the whole product
          </motion.h1>

          <motion.p
            variants={variants}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
          >
            Most of what I ship, I ship end to end — design, front end, database, auth.
            That removes the handoff round-trip, so decisions get validated in working
            software instead of surviving a translation layer.
          </motion.p>

          <motion.div variants={variants} className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="!w-auto">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="!w-auto">
              <Link to="/#case-studies">See the Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* What I do */}
      <section className="px-4 sm:px-6 mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-10">
            What I do
          </h2>
          <div className="space-y-12">
            {SERVICES_DATA.map((service) => (
              <div key={service.title}>
                <h3 className="font-display font-semibold text-foreground text-xl mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-base text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="px-4 sm:px-6 mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-3">
            Work that shipped
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            All live, all with the full case study on this site.
          </p>

          <div className="space-y-6">
            {PROOF.map((p) => (
              <Link
                key={p.href}
                to={p.href}
                className="group block rounded-xs border border-border overflow-hidden hover:border-primary/40 transition-colors duration-200"
              >
                <div className="grid sm:grid-cols-[220px_1fr]">
                  <div className="bg-muted/40 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.alt}
                      loading="lazy"
                      className="w-full h-full object-cover aspect-[16/10] sm:aspect-auto transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-1.5 mb-2">
                      <h3 className="font-display font-semibold text-foreground text-lg">
                        {p.title}
                      </h3>
                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">{p.line}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="px-4 sm:px-6 mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-3">
            Packages
          </h2>
          <p className="text-base text-muted-foreground mb-8">
            Fixed scope, fixed price. If your project doesn't fit one of these, say so on
            the call and we'll scope it properly.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICE_PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className="flex flex-col rounded-xl border border-border p-6"
              >
                <h3 className="font-display font-semibold text-foreground text-xl mb-1">
                  {pkg.title}
                </h3>
                <div className="font-display font-bold text-foreground text-3xl mb-1">
                  {pkg.price}
                </div>
                <div className="text-sm text-muted-foreground mb-4">{pkg.timeline}</div>
                <p className="text-base text-muted-foreground leading-relaxed mb-5">
                  {pkg.description}
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-base text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <Link to="/contact">Start this</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 sm:px-6 mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-8">
            How it works
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {PROCESS.map((s) => (
              <div key={s.step} className="flex gap-4">
                <span className="font-display font-bold text-primary text-lg tabular-nums pt-0.5">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-1">
                    {s.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 sm:px-6 mt-24">
        <div className="max-w-3xl mx-auto border-t border-border pt-12 text-center">
          <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-3">
            Tell me what you're building
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
            Thirty minutes is usually enough to tell whether this is a fit. If it isn't,
            I'll say so and point you somewhere better.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="!w-auto">
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Book a Call
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="!w-auto">
              <Link to="/contact">Send a Message</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageLayout;
