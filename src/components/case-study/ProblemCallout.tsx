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
      className="w-full bg-[hsl(190_60%_96%)] py-16 lg:py-24"
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
            className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-700 uppercase mb-6"
          >
            {eyebrow}
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold leading-tight text-foreground max-w-4xl mx-auto tracking-[-0.01em]">
            {statement}
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemCallout;