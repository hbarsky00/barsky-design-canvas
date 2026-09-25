
import React from "react";
import { motion } from "framer-motion";
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

const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({
  title = "Frequently Asked Questions",
  faqs,
  className = ""
}) => {
  return (
    <section id="faq-section" className={`min-h-screen flex flex-col justify-center py-16 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative ${className}`}>
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            as="h2"
            title={title}
            subtitle="Common questions about AI-Enhanced UX Design and Frontend Gen AI Development"
          />
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 layered-depth"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <div className="prose prose-lg text-gray-700 max-w-none">
                {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {faq.keywords && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {faq.keywords.map((keyword, kIndex) => (
                    <span
                      key={kIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQPage JSON-LD removed. Two reasons:
          1. Google restricted FAQ rich results to government and health sites in
             August 2023, so it rendered no SERP feature.
          2. It was invalid anyway — answers in seoFaqs.ts contain literal
             newlines, and this template interpolated them straight into a JSON
             string. It only escaped notice because the section sits inside a
             LazySection that never hydrated during prerender.
          The visible accordion below is the part that has value; it stays. */}
    </section>
  );
};

export default SeoFaqSection;
