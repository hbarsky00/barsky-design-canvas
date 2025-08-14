
import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

const BioSection: React.FC = () => {
  const { navigateUp, navigateDown, canNavigateUp, canNavigateDown } = useHomepageKeyboardNavigation();

  return (
    <section id="bio-section" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 bg-muted/30 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <div className="space-y-6 md:space-y-12 font-bold text-foreground leading-snug text-display-medium [text-wrap:balance]">
            <AnimatedText
              text="Product Design Leader with Enterprise and Startup experience since 2012. FinTech, Healthcare, AdTech veteran."
              type="word"
              animation="slide"
              staggerChildren={0.08}
              duration={0.5}
              className="block"
            />
            <AnimatedText
              text="I simplify complex systems and raise the bar of design while delivering measurable business impact."
              type="word"
              animation="slide"
              staggerChildren={0.08}
              duration={0.5}
              delay={1000}
              className="block"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioSection;
