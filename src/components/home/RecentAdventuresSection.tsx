import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";

interface Experience {
  role: string;
  company: string;
  description: string;
  duration: string;
  companyLogo?: string;
}

const experiences: Experience[] = [
  {
    role: "Senior Product Designer",
    company: "Amazon",
    description: "Led design for Prime Video's recommendation engine, increasing user engagement by 34%",
    duration: "2023 - Present"
  },
  {
    role: "Lead UX Designer",
    company: "Acorns",
    description: "Redesigned investment onboarding flow, reducing drop-off rates by 42%",
    duration: "2022 - 2023"
  },
  {
    role: "Design Researcher",
    company: "Stanford University",
    description: "Conducted user research for AI-assisted learning platforms",
    duration: "2021 - 2022"
  },
  {
    role: "Product Designer",
    company: "Tesla",
    description: "Designed in-vehicle user interfaces for Model S and Model 3",
    duration: "2020 - 2021"
  },
  {
    role: "UX Designer",
    company: "Airbnb",
    description: "Improved host onboarding experience across web and mobile platforms",
    duration: "2019 - 2020"
  }
];

const RecentAdventuresSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-6">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
              Experience
            </div>
          </div>
          <SectionHeader
            title={
              <div className="flex items-center gap-3 justify-center">
                Recent adventures
                <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
            }
            subtitle="A journey through innovative product design and user experience at leading tech companies"
          />
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6 md:space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 p-6 rounded-lg border border-border/50 bg-surface/50 hover:bg-surface/80 hover:border-primary/20 transition-all duration-300">
                
                {/* Content */}
                <div className="flex-1 grid md:grid-cols-2 gap-4 md:gap-8">
                  {/* Left: Role and Company */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">
                      {experience.role}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-primary">
                        {experience.company}
                      </span>
                      <span className="text-sm text-on-surface-variant">
                        {experience.duration}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right: Description */}
                  <div>
                    <p className="text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors duration-300">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-on-surface-variant mb-4">
            Want to learn more about my experience?
          </p>
          <a
            href="#bio"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors duration-300 font-medium"
          >
            Read my full story
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default RecentAdventuresSection;