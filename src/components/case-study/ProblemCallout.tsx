import React from "react";
import { motion } from "framer-motion";

interface ProblemCalloutProps {
  eyebrow: string;
  statement: string;
}

const ProblemCallout: React.FC<ProblemCalloutProps> = ({ eyebrow, statement }) => {
  return (
    <section 
      id="problem" 
      aria-labelledby="problem-label"
      className="w-full bg-[hsl(var(--neutral-band))] py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div 
            id="problem-label"
            className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-primary mb-6"
          >
            {eyebrow}
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-foreground max-w-4xl mx-auto">
            {statement}
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemCallout;