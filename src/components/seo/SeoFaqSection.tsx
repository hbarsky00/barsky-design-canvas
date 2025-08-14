
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

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
  const { navigateUp, navigateDown, canNavigateUp, canNavigateDown } = useHomepageKeyboardNavigation();

  return (
    <section id="faq-section" className={`min-h-screen flex flex-col justify-center py-16 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative ${className}`}>
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
            titleClassName="w-full max-w-none"
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-6">
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

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <SectionNavigation
            onNavigateUp={navigateUp}
            onNavigateDown={navigateDown}
            canNavigateUp={canNavigateUp}
            canNavigateDown={canNavigateDown}
            upLabel="Blog preview"
            downLabel="Explore more"
          />
        </div>

        {/* Structured Data for FAQ */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                ${faqs.map(faq => `
                {
                  "@type": "Question",
                  "name": "${faq.question}",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${faq.answer.replace(/"/g, '\\"')}"
                  }
                }`).join(',')}
              ]
            }
          `}
        </script>
    </section>
  );
};

export default SeoFaqSection;
