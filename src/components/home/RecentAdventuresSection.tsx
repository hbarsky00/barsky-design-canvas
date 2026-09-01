import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/SectionHeader";
import { careerHistory } from "@/data/careerHistory";

const RecentAdventuresSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Experience"
            title="Recent Adventures"
            subtitle="A journey through innovative product design and user experience at leading tech companies"
          />
          <div className="flex justify-center mb-8">
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6 md:space-y-8">
          {careerHistory.map((experience, index) => (
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