import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";

interface CurrentProject {
  id: string;
  title: string;
  description: string;
  status: "Work in Progress";
}

const currentProjects: CurrentProject[] = [
  {
    id: "roi-calculator",
    title: "ROI Design Calculator",
    description: "A tool to measure the business value of design in minutes instead of hours of spreadsheet work.",
    status: "Work in Progress"
  },
  {
    id: "nail-salon-platform",
    title: "Multi-Business Nail Salon Platform",
    description: "A booking and payment system that lets clients pay after appointments while giving salon owners a clear, centralized schedule view.",
    status: "Work in Progress"
  },
  {
    id: "faces-of-hunger",
    title: "Faces of Hunger",
    description: "An awareness platform using design and AI to humanize food insecurity and spark community action.",
    status: "Work in Progress"
  }
];

const CurrentProjectsSection: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            as="h2"
            title="What I'm Working On Now"
            className="mb-8 md:mb-12"
          />
          
          <div className="mb-8 md:mb-12 text-center">
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-4xl mx-auto">
              I keep this section updated with the projects I'm actively building. These aren't polished case studies — they're experiments focused on speed, learning, and real business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="outlined" className="h-full hover:shadow-md transition-shadow duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="relative pb-4">
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                        {project.status}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-semibold text-on-surface pr-24">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-on-surface-variant leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentProjectsSection;