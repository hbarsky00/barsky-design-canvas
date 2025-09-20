import React from "react";
import { motion } from "framer-motion";
import { Calendar, Users, DollarSign, Building, Target } from "lucide-react";
import { ProjectContext } from "@/data/structuredCaseStudies";

interface ProjectContextSectionProps {
  context: ProjectContext;
}

const ProjectContextSection: React.FC<ProjectContextSectionProps> = ({ context }) => {
  const contextItems = [
    { icon: Calendar, label: "Timeline", value: context.timeline },
    { icon: Users, label: "Team", value: context.team },
    { icon: DollarSign, label: "Budget", value: context.budget },
    { icon: Building, label: "Company", value: context.companySize },
    { icon: Target, label: "Industry", value: context.industry },
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
            PROJECT CONTEXT
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            The Real-World Constraints
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {contextItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 text-center shadow-sm border border-border/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectContextSection;