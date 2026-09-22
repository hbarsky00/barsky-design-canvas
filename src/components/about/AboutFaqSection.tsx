import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_FAQS } from '@/data/seoData';

// Feeds FAQPage schema via seoData.ts ABOUT_FAQS (single source of truth for
// both this UI and the structured data — schema can never claim content that
// isn't actually on the page). Written 2026-08-06 (AEO lever 2, Cycle 2).
const AboutFaqSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Questions worth answering up front</h2>
        <div className="divide-y divide-gray-200">
          {ABOUT_FAQS.map((faq) => (
            <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AboutFaqSection;
