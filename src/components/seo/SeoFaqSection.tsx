
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

interface FAQ {
  question: string;
  answer: string;
}

interface SeoFaqSectionProps {
  title: string;
  faqs: FAQ[];
  showNavigation?: boolean;
}

const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({ 
  title, 
  faqs, 
  showNavigation = false 
}) => {
  const { navigateUp, navigateDown, canNavigateUp, canNavigateDown } = useHomepageKeyboardNavigation();

  return (
    <section className="py-8 md:py-12 bg-muted/30 relative">
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {showNavigation && (
        <SectionNavigation
          onNavigateUp={navigateUp}
          onNavigateDown={navigateDown}
          canNavigateUp={canNavigateUp}
          canNavigateDown={canNavigateDown}
          upLabel="Back to blog"
          downLabel="View related links"
        />
      )}
    </section>
  );
};

export default SeoFaqSection;
