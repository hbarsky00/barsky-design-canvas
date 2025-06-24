
import React from "react";
import { motion } from "framer-motion";

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
    <section className={`py-16 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">
            Common questions about Product Design Services and Frontend Gen AI Development
          </p>
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
      </div>
    </section>
  );
};

export default SeoFaqSection;
