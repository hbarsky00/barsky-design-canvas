import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES_CTA, SERVICES_HERO } from "@/data/services";
import { SERVICES_OVERVIEW } from "@/data/serviceContent";
import { services } from "@/data/servicesDetail";
import { Link } from "react-router-dom";
import SectionTransition from "@/components/transitions/SectionTransition";

/**
 * The /services index.
 *
 * It used to be a brochure: a "Gen-AI First Approach" pill, two cards whose
 * feature lists said "UI/UX Design" and "Machine Learning Models", and a
 * four-step process ending in "Creating intuitive experiences". None of that
 * described this business, and every competitor's page said the same words.
 *
 * Meanwhile the four real service pages — ported from barsky.design, carrying
 * the definitions, the engagement shape and the "not for" lines — were
 * reachable only by typing the URL. So the index now indexes them: the grid is
 * the four engagements, in their own words, each a door into the long page.
 */
const ServicePageLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <SectionTransition variant="fade" className="px-4 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-display-small md:text-display-medium lg:text-display-large font-bold tracking-tight text-foreground">
              {SERVICES_HERO.title}
            </h1>
            <p className="max-w-2xl text-body-large md:text-title-large leading-relaxed text-muted-foreground">
              {SERVICES_HERO.description}
            </p>
            <div className="pt-2">
              <Button asChild variant="brand" size="lg">
                <Link to="/contact">
                  {SERVICES_HERO.buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </SectionTransition>

      {/* The citable answer passage — written to stand alone if an answer
          engine lifts it, so it is the first prose on the page. */}
      <SectionTransition variant="fade" delay={0.05} className="px-4 pb-14">
        <div className="mx-auto max-w-4xl">
          <p className="border-l-4 border-md-sys-primary py-2 pl-6 text-body-large md:text-title-medium leading-relaxed text-foreground">
            {SERVICES_OVERVIEW.answer}
          </p>
        </div>
      </SectionTransition>

      {/* The four engagements. Each card is the service's own blurb and facets,
          not a feature list written to fill a card. */}
      <SectionTransition
        variant="fade"
        delay={0.1}
        className="bg-md-sys-surface-container-low/40 px-4 py-16 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-headline-medium md:text-headline-large font-bold text-foreground">
            Four ways this usually starts
          </h2>
          <p className="mt-3 max-w-2xl text-body-large leading-relaxed text-muted-foreground">
            Most projects are one of these, or two of them in sequence. Each page
            says what the engagement includes, how it runs, and who it is not for.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(index, 3) * 0.08 }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-md-sys-outline-variant/40 bg-background/70 p-6 transition-colors duration-200 hover:border-md-sys-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-sys-primary md:p-8"
                >
                  <h3 className="text-title-large font-bold text-foreground group-hover:text-md-sys-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-body-medium leading-relaxed text-muted-foreground">
                    {service.blurb}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-md-sys-outline-variant/50 px-3 py-1 text-label-medium text-muted-foreground"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-body-medium font-semibold text-md-sys-primary">
                    What this includes
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionTransition>

      {/* Long-form sections. This page was 195 words with "design" at 10.31%
          density — the thinnest commercial page on the site. */}
      <SectionTransition variant="fade" delay={0.15} className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl space-y-14">
          {SERVICES_OVERVIEW.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="mb-5 text-headline-small md:text-headline-medium font-bold text-foreground">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.body.map((para, i) => (
                  <p key={i} className="text-body-large leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section id="service-detail-pages">
            <h2 className="mb-5 text-headline-small md:text-headline-medium font-bold text-foreground">
              By discipline
            </h2>
            <ul className="space-y-3">
              <li className="leading-relaxed">
                <Link to="/design-services/ux-ui-design" className="font-semibold text-md-sys-primary underline underline-offset-2">Product design</Link>
                <span className="text-muted-foreground"> — research, interface design, design systems, and the front end that ships them.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/design-services/mobile-app-design" className="font-semibold text-md-sys-primary underline underline-offset-2">Mobile app design</Link>
                <span className="text-muted-foreground"> — phone-first products, and the states that make one feel finished.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/design-services/web-development" className="font-semibold text-md-sys-primary underline underline-offset-2">Web development</Link>
                <span className="text-muted-foreground"> — React front ends, the database behind them, and the deploy.</span>
              </li>
            </ul>
          </section>

          <section id="selected-work">
            <h2 className="mb-5 text-headline-small md:text-headline-medium font-bold text-foreground">
              Selected work
            </h2>
            <ul className="space-y-3">
              <li className="leading-relaxed">
                <Link to="/project/herbalink" className="font-semibold text-md-sys-primary underline underline-offset-2">HerbaLink</Link>
                <span className="text-muted-foreground"> — designing credential trust into a practitioner marketplace.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/project/dae-search" className="font-semibold text-md-sys-primary underline underline-offset-2">DAE Search</Link>
                <span className="text-muted-foreground"> — enterprise data discovery, where research reframed the problem.</span>
              </li>
              <li className="leading-relaxed">
                <Link to="/project/business-management" className="font-semibold text-md-sys-primary underline underline-offset-2">One System Instead of Six</Link>
                <span className="text-muted-foreground"> — one system replacing a stack of disconnected tools.</span>
              </li>
            </ul>
          </section>
        </div>
      </SectionTransition>

      {/* CTA */}
      <SectionTransition
        variant="fade"
        delay={0.2}
        className="bg-gradient-to-br from-md-sys-primary-container/30 via-background to-md-sys-tertiary-container/20 px-4 py-20 md:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-headline-large md:text-display-small font-bold text-foreground">
            {SERVICES_CTA.title}
          </h2>
          <p className="mt-4 max-w-2xl text-body-large md:text-title-large leading-relaxed text-muted-foreground">
            {SERVICES_CTA.description}
          </p>
          <div className="flex flex-col gap-4 pt-7 sm:flex-row">
            <Button asChild variant="brand" size="lg">
              <Link to="/contact">
                {SERVICES_CTA.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/#case-studies">See the work first</Link>
            </Button>
          </div>
        </div>
      </SectionTransition>
    </div>
  );
};

export default ServicePageLayout;
