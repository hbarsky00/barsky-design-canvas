import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DesignServiceContent } from "@/data/designServices";

const CALENDLY_URL = "https://calendly.com/barskyuxdesignservices/30min";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

interface DesignServicePageProps {
  content: DesignServiceContent;
}

/**
 * Shared layout for the three /design-services/* pages.
 *
 * Each page previously hand-rolled its own markup with hardcoded gray text and
 * a non-responsive `text-4xl` heading, which is why they read as a different
 * site. This uses the same tokens and type scale as the homepage and case
 * studies, and follows a proof-led structure: what it is, what you get, work
 * that shipped, then one CTA.
 */
const DesignServicePage: React.FC<DesignServicePageProps> = ({ content }) => {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? undefined : item;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow pt-[calc(var(--header-height,64px)+32px)] pb-24">
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
                {content.eyebrow}
              </Badge>
            </motion.div>

            <motion.h1
              variants={variants}
              className="font-display font-bold text-foreground tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mb-6"
            >
              {content.title}
            </motion.h1>

            <motion.p
              variants={variants}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              {content.lede}
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

        {/* The problem this service solves */}
        <section className="px-4 sm:px-6 mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl font-display text-foreground leading-snug border-l-2 border-primary pl-6">
              {content.problem}
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section className="px-4 sm:px-6 mt-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-8">
              What you get
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {content.capabilities.map((cap) => (
                <div key={cap.title}>
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                    <h3 className="font-display font-semibold text-foreground text-lg">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof — real shipped work, linked */}
        <section className="px-4 sm:px-6 mt-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-3">
              Work that shipped
            </h2>
            <p className="text-base text-muted-foreground mb-8">
              Every one of these is live, and the full case study is on this site.
            </p>

            <div className="space-y-6">
              {content.proof.map((proof) => (
                <Link
                  key={proof.href}
                  to={proof.href}
                  className="group block rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-colors duration-200"
                >
                  <div className="grid sm:grid-cols-[220px_1fr]">
                    <div className="bg-muted/40 overflow-hidden">
                      <img
                        src={proof.image}
                        alt={proof.alt}
                        loading="lazy"
                        className="w-full h-full object-cover aspect-[16/10] sm:aspect-auto transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-1.5 mb-2">
                        <h3 className="font-display font-semibold text-foreground text-lg">
                          {proof.title}
                        </h3>
                        <ArrowUpRight
                          className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {proof.result}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 mt-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-8">
              Common questions
            </h2>
            <div className="space-y-8">
              {content.faq.map((f) => (
                <div key={f.question}>
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {f.question}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Single closing CTA */}
        <section className="px-4 sm:px-6 mt-24">
          <div className="max-w-3xl mx-auto border-t border-border pt-12 text-center">
            <h2 className="font-display font-semibold text-foreground text-2xl sm:text-3xl mb-3">
              Tell me what you're building
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
              A 30-minute call is usually enough to tell whether this is a fit. If it isn't,
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
      </main>

      <Footer />
    </div>
  );
};

export default DesignServicePage;
