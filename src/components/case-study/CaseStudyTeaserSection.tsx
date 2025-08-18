import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface CaseStudyTeaserProps {
  targetProject: {
    title: string;
    description: string;
    path: string;
    image: string;
    tags: string[];
  };
}

const CaseStudyTeaserSection: React.FC<CaseStudyTeaserProps> = ({ targetProject }) => {
  return (
    <section className="py-16 border-t border-border/20">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Explore More Work
          </h3>
          <p className="text-muted-foreground">
            Discover another project from my portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link 
            to={targetProject.path}
            className="group block bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-xl bg-muted">
                <img
                  src={targetProject.image}
                  alt={targetProject.title}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {targetProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h4 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {targetProject.title}
                </h4>

                <p className="text-muted-foreground leading-relaxed">
                  {targetProject.description}
                </p>

                <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyTeaserSection;