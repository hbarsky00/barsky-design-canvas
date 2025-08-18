import React from "react";
import { motion } from "framer-motion";

interface MyThoughtProcessSectionProps {
  projectId: string;
}

const getThoughtProcessContent = (projectId: string) => {
  switch (projectId) {
    case "herbalink":
      return {
        title: "My Thought Process",
        content: [
          "I approached HerbaLink by focusing on trust and credibility first—users needed to feel confident they were connecting with qualified practitioners. This meant prioritizing verification badges, clear credentials, and safety information upfront.",
          "My decision criteria centered on reducing friction while maintaining safety. Every feature was evaluated on whether it built trust or streamlined the booking process without compromising user confidence.",
          "Validation loops were built around user feedback on practitioner profiles and the matching algorithm's accuracy, ensuring we were solving real pain points rather than perceived ones."
        ]
      };
    case "splittime":
      return {
        title: "My Thought Process",
        content: [
          "For Splittime, I approached co-parenting conflict as a design problem—most disputes stemmed from unclear information and poor communication tools. The key was creating neutral, fact-based interfaces that removed emotional triggers.",
          "My criteria focused on transparency and consent. Every interaction needed clear approval flows and change logs so both parents could trust the system and each other's actions.",
          "Validation came through testing with real co-parents in high-conflict situations, measuring both feature usage and reported conflict reduction."
        ]
      };
    case "investor-loan-app":
      return {
        title: "My Thought Process",
        content: [
          "The loan platform required a shift from manual, error-prone processes to guided, validated workflows. I prioritized accuracy and audit trails above all else, since financial compliance was non-negotiable.",
          "My approach centered on progressive disclosure—showing users only what they needed at each step while building in real-time validation to prevent errors before they occurred.",
          "Validation loops included shadowing loan officers, tracking error rates, and measuring processing speed improvements against baseline Excel workflows."
        ]
      };
    case "business-management":
      return {
        title: "My Thought Process",
        content: [
          "The business management platform needed to serve diverse workflows while maintaining simplicity. I focused on dashboard-driven insights that surfaced the most critical information first.",
          "My decision criteria balanced comprehensiveness with usability—features had to serve real business needs without adding cognitive overhead for users managing multiple priorities.",
          "Validation involved working directly with small business owners to understand their daily workflows and measuring how the platform reduced time spent on administrative tasks."
        ]
      };
    default:
      return {
        title: "My Thought Process",
        content: [
          "I approached this project by identifying the core user pain points and designing solutions that addressed both functional and emotional needs.",
          "My decision criteria focused on user outcomes over features, prioritizing simplicity and clarity in complex workflows.",
          "Validation loops included user testing, stakeholder feedback, and measuring success against defined KPIs."
        ]
      };
  }
};

const MyThoughtProcessSection: React.FC<MyThoughtProcessSectionProps> = ({ projectId }) => {
  const { title, content } = getThoughtProcessContent(projectId);

  return (
    <section 
      id="my-thought-process" 
      className="w-full py-16 md:py-24 scroll-mt-24"
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            MY THOUGHT PROCESS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-foreground mb-4">
            {title}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {content.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="text-lg leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyThoughtProcessSection;