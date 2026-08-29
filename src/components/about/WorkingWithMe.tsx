
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Users, Zap } from 'lucide-react';

/**
 * Rewritten 2026-08-29.
 *
 * The four cards here were gpt-engineer-app[bot] filler: "AI-Enhanced
 * Solutions" (the AI-first positioning this site retired), "Rapid Delivery"
 * ("fast turnaround times"), "Collaborative Approach", and "Results-Driven"
 * — which promised "measurable outcomes like conversion improvements",
 * an implied metrics claim of exactly the kind the honesty passes removed
 * elsewhere. None of the four said anything a competitor could not have said.
 * Replaced with things that are specific to Hiram and checkable on this site.
 */
const WorkingWithMe: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: "One person, both halves",
      description:
        "You are not handing a design file to a separate engineering team. I design it and I build it, so the thing that ships is the thing that was designed."
    },
    {
      icon: ShieldCheck,
      title: "Regulated-industry experience",
      description:
        "Fifteen years across banking, healthcare and pharma — work that has to clear review before it can ship. I build to WCAG 2.1 AA."
    },
    {
      icon: CheckCircle,
      title: "Shipped, not just designed",
      description:
        "Five of my own products are live. Everything I recommend, I have had to build, launch and then maintain myself."
    },
    {
      icon: Users,
      title: "You talk to the person doing the work",
      description:
        "No account manager and no design-to-development handoff in the middle. Remote, working with teams anywhere."
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Working With Me</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default WorkingWithMe;
