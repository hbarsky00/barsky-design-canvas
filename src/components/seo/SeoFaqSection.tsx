
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

interface FaqItem {
  question: string;
  answer: string;
  keywords?: string[];
}

interface SeoFaqSectionProps {
  title?: string;
  faqs: FaqItem[];
  className?: string;
}

/**
 * The site FAQ.
 *
 * Rewritten 2026-11-16 (CRAFT). It used to render every answer expanded at once
 * — eight cards, each a full multi-paragraph answer plus a row of keyword chips.
 * On a phone that is a wall of text several screens deep, which is almost
 * certainly why the homepage wrapped this section in `hidden md:block` and so
 * removed it from the version Google indexes first.
 *
 * Hiding it was treating the symptom. The cause was that the section had no
 * progressive disclosure, so this now uses native `<details>`/`<summary>`:
 *
 *   - the answer text stays in the DOM whether open or closed, so crawlers and
 *     answer engines still read all of it — which a JS accordion that unmounts
 *     its collapsed panel would not;
 *   - it is keyboard accessible and screen-reader correct with no ARIA wiring
 *     and no JavaScript;
 *   - closed by default, so eight questions are a scannable list instead of a
 *     wall, and the section can finally be shown on mobile.
 *
 * The keyword chips are gone from the display. They were SEO residue with
 * nothing in them for a reader — eight cards' worth of blue pills competing with
 * the questions. The `keywords` field stays on the data for anything that wants
 * it.
 *
 * `min-h-screen flex flex-col justify-center` also went: with eight answers the
 * section is far past one viewport, so it only ever constrained the collapsed
 * state it was never written for.
 *
 * No FAQPage JSON-LD here, and it should not come back:
 *   1. Google restricted FAQ rich results to government and health sites in
 *      August 2023, so it rendered no SERP feature.
 *   2. The old implementation was invalid anyway — answers in seoFaqs.ts contain
 *      literal newlines and the template interpolated them straight into a JSON
 *      string. It escaped notice only because this section sat inside a
 *      LazySection that never hydrated during prerender.
 */
const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({
  title = "Frequently Asked Questions",
  faqs,
  className = ""
}) => {
  return (
    <section
      id="faq-section"
      className={`py-12 md:py-16 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative ${className}`}
    >
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <SectionHeader
            as="h2"
            title={title}
            subtitle="What people ask before hiring me."
          />
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              /* Stagger capped at 6 steps. At 0.1 per item an eight-item list
                 left the last question fading in 0.8s after the first, which
                 reads as lag rather than sequence. */
              transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
              className="group glass-card overflow-hidden"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4
                           px-5 py-4 md:px-6 md:py-5 min-h-[56px]
                           focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-primary focus-visible:ring-offset-2
                           [&::-webkit-details-marker]:hidden"
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-900 text-balance">
                  {faq.question}
                </h3>
                <ChevronDown
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200
                             group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>

              <div className="px-5 pb-5 md:px-6 md:pb-6 text-gray-700">
                {faq.answer.split("\n\n").map((paragraph, pIndex, all) => (
                  <p
                    key={pIndex}
                    className={`leading-relaxed ${pIndex < all.length - 1 ? "mb-4" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoFaqSection;
