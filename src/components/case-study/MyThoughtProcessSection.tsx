import React from "react";
import { motion } from "framer-motion";

interface MyThoughtProcessSectionProps {
  projectId: string;
}

const thoughtProcessContent: Record<string, { subhead: string; content: string[] }> = {
  "herbalink": {
    subhead: "Exploring trust-building mechanisms and AI-powered matching algorithms",
    content: [
      "I started by mapping user journey touchpoints where trust could be built or broken. The biggest insight was that users needed transparency before, during, and after interactions with practitioners.",
      "For the matching algorithm, I tested progressive disclosure—showing basic compatibility first, then deeper credential details on demand. This reduced cognitive load while maintaining user control.",
      "Validation loops with real herbalists helped refine the booking flow. Their feedback on practitioner onboarding directly influenced how we structured verification badges and profile completeness indicators."
    ]
  },
  "splittime": {
    subhead: "Balancing emotional neutrality with functional efficiency",
    content: [
      "Co-parenting apps face unique challenges—high emotions and legal implications. I focused on language that stayed neutral while being actionable, testing phrases like 'expense shared' vs 'expense split.'",
      "The calendar became the central hub after research showed parents needed visual confirmation of agreements. I iterated on color coding and notification timing to reduce conflict triggers.",
      "Validation with family law consultants ensured our features aligned with court requirements. This shaped our audit trail design and helped prioritize features that reduce legal disputes."
    ]
  },
  "investor-loan-app": {
    subhead: "Transforming chaotic Excel workflows into predictive, guided experiences",
    content: [
      "I shadowed loan officers to understand their Excel pain points—formulas breaking, version conflicts, and manual data entry errors. This informed our progressive workflow design.",
      "The predictive search became crucial after seeing how much time officers spent hunting for similar deals. I designed smart suggestions that learned from past loan patterns and officer preferences.",
      "Compliance validation loops were constant. Every feature had to pass regulatory scrutiny while maintaining speed. This tension drove our modular design approach—compliance checks that didn't block progress."
    ]
  },
  "business-management": {
    subhead: "Consolidating scattered tools into unified workflows",
    content: [
      "I mapped the current tool ecosystem for small businesses—often 6-8 different apps for basic operations. The key insight was creating bridges between related tasks rather than forcing everything into one view.",
      "The dashboard design went through many iterations, balancing information density with actionability. I settled on contextual widgets that surfaced relevant tasks based on time of day and business patterns.",
      "Pilot feedback sessions revealed that migration anxiety was huge. This led to our import wizard design and the decision to maintain export capabilities—reducing lock-in fears increased adoption."
    ]
  },
  "wholesale-distribution": {
    subhead: "Streamlining complex inventory and order management workflows",
    content: [
      "I observed warehouse operations to understand the physical constraints that digital tools must accommodate. This informed mobile-first design decisions and offline capability requirements.",
      "The ordering system needed to handle complex pricing tiers and bulk discounts. I designed progressive disclosure patterns that kept simple orders fast while supporting advanced configurations when needed.",
      "Validation with distributors and suppliers revealed communication gaps that led to order errors. This drove our real-time status system and automated notification design."
    ]
  }
};

const MyThoughtProcessSection: React.FC<MyThoughtProcessSectionProps> = ({ projectId }) => {
  const content = thoughtProcessContent[projectId];

  if (!content) return null;

  return (
    <section id="my-thought-process" className="py-16 md:py-24 scroll-mt-24">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold tracking-wide text-neutral-700 uppercase">
            MY THOUGHT PROCESS
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-[2.5rem] font-semibold leading-tight tracking-[-0.01em]">
            Exploration approach
          </h2>
          <p className="mt-3 md:mt-4 text-neutral-600 max-w-3xl mx-auto text-lg md:text-xl">
            {content.subhead}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {content.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-neutral-700 leading-relaxed text-base md:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyThoughtProcessSection;