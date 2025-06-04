
import React from "react";
import { motion } from "framer-motion";

interface ChallengeSolutionSectionProps {
  challenge: string;
  result: string;
}

const ChallengeSolutionSection: React.FC<ChallengeSolutionSectionProps> = ({
  challenge,
  result
}) => {
  return (
    <section className="case-study-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="process-card"
        >
          <h2 className="text-heading-2 text-navy-primary mb-6">The Challenge</h2>
          <p className="text-body text-neutral-500 leading-relaxed">
            {challenge}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="process-card"
        >
          <h2 className="text-heading-2 text-navy-primary mb-6">The Solution</h2>
          <p className="text-body text-neutral-500 leading-relaxed">
            {result}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengeSolutionSection;
