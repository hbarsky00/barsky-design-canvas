
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { NavigationProps } from "@/types/navigation";

interface BioSectionProps extends NavigationProps {}

const BioSection: React.FC<BioSectionProps> = ({ 
  navigateDown, 
  canNavigateDown,
  isMobile 
}) => {
  const handleNavigateDown = () => {
    if (navigateDown) {
      navigateDown();
    }
  };

  return (
    <section 
      id="bio-section"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 relative
                 pt-safe-top pb-safe-bottom cursor-pointer"
      tabIndex={-1}
      onClick={handleNavigateDown}
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="p-8 lg:p-12 bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <div className="space-y-8">
              {/* Header with badge */}
              <div className="text-center">
                <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
                  About Me
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
                  Product Designer & AI Developer
                </h2>
              </div>

              {/* Bio content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl text-center font-medium text-gray-800">
                  I help early-stage startups transform complex problems into intuitive user experiences 
                  that drive real business results.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">My Approach</h3>
                    <p className="text-center">
                      I believe great design happens at the intersection of user needs and business goals. 
                      Every project starts with understanding your users and ends with measurable improvements 
                      to your product's performance.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">What I Bring</h3>
                    <p className="text-center">
                      15+ years of experience in UX/UI design, combined with modern AI development skills. 
                      I create design systems that scale, conduct user research that informs decisions, 
                      and build prototypes that validate concepts.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/50 rounded-lg p-6 mt-8 text-center">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">Recent Focus</h3>
                  <p className="text-center">
                    Currently specializing in AI-enhanced user experiences and helping businesses 
                    integrate intelligent features that genuinely improve user workflows without 
                    adding complexity.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Navigation Arrow */}
      <motion.div 
        className="absolute bottom-8 inset-x-0 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex justify-center w-full">
          <SectionNavigation
            onNavigateDown={handleNavigateDown}
            canNavigateUp={false}
            canNavigateDown={canNavigateDown}
            downLabel="View Case Studies"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BioSection;
