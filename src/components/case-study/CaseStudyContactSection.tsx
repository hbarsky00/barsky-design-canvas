import React from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";

const CaseStudyContactSection: React.FC = () => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle } = useScroll3DTilt(cardRef, { maxTilt: 2.5, yDistance: 10, childParallax: 6, scaleRange: [0.996, 1, 0.998] });
  return (
    <motion.section
      id="contact-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50 rounded-lg p-4 md:p-8 mt-16 scroll-mt-24"
    >

      <motion.div ref={cardRef} style={{ ...containerStyle, transformStyle: "preserve-3d", willChange: "transform" }} className="bg-background/80 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-sm border border-border/30">
        <ContactForm />
      </motion.div>
    </motion.section>
  );
};

export default CaseStudyContactSection;