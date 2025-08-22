import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, Users } from "lucide-react";
import { familyImpact } from "@/data/splittimeData";

interface SplittimeImpactMetricsProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}

const SplittimeImpactMetrics: React.FC<SplittimeImpactMetricsProps> = ({ 
  onImageClick, 
  onImageKeypress 
}) => {
  return (
    <section className="positive-family-outcomes py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="h-10 w-10 text-yellow-500" />
            <span className="text-yellow-600 font-semibold text-lg">Positive Family Outcomes</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
            Measurable Improvements in Family Harmony
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Real families report significant reductions in co-parenting conflicts and improvements 
            in communication, coordination, and overall satisfaction with their co-parenting relationship.
          </p>
        </motion.div>
        
        {/* Family Harmony Images - Two Column Layout */}
        <div className="mb-16 grid lg:grid-cols-2 gap-8 items-center">
          <figure className="project-image-container">
            <img 
              src="/lovable-uploads/cd385ebc-e187-4a1e-b0af-58bcbbd17fdb.png" 
              alt="Happy family showing successful co-parenting collaboration and family harmony" 
              className="clickable-image w-full h-96 object-cover shadow-xl mx-auto cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => onImageClick('splittime-harmony-1')}
              tabIndex={0}
              onKeyDown={(e) => onImageKeypress(e, 'splittime-harmony-1')}
              role="button"
              aria-label="Click to view family harmony image in full screen"
              id="splittime-harmony-1" 
            />
            <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
              Happy family showing successful co-parenting collaboration and family harmony
            </figcaption>
          </figure>
          
          <figure className="project-image-container">
            <img 
              src="/lovable-uploads/7c381aef-4b14-4b6e-ab5d-00248808e4dc.png" 
              alt="Splittime results and impact metrics showing measurable improvements in co-parenting outcomes" 
              className="clickable-image w-full h-96 object-cover shadow-xl mx-auto cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => onImageClick('splittime-results-1')}
              tabIndex={0}
              onKeyDown={(e) => onImageKeypress(e, 'splittime-results-1')}
              role="button"
              aria-label="Click to view results and impact metrics in full screen"
              id="splittime-results-1" 
            />
            <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
              Splittime results and impact metrics showing measurable improvements in co-parenting outcomes
            </figcaption>
          </figure>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {familyImpact.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.8, delay: index * 0.1 }} 
                className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl text-center shadow-lg border border-blue-200"
              >
                <div className="flex justify-center mb-4 text-blue-500">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div className="text-impact-metric-neutral-xl text-blue-600 mb-2">{impact.metric}</div>
                <div className="text-sm text-neutral-600 uppercase tracking-wide">{impact.label}</div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Family Success Story */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.4 }} 
          className="bg-white/70 backdrop-blur-sm p-12 rounded-3xl text-center max-w-5xl mx-auto border border-blue-200 shadow-xl"
        >
          <div className="mb-8">
            <Heart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <p className="text-2xl text-neutral-700 italic leading-relaxed mb-6">
              "Splittime changed everything for our family. Instead of constant arguments about schedules, 
              we now coordinate seamlessly. Our kids see us working together, not fighting. 
              This app gave us our peace back."
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-neutral-900 text-lg">Sarah & Michael</p>
              <p className="text-blue-600 font-medium">Co-parents of two</p>
              <p className="text-sm text-neutral-500">Using Splittime for 18 months</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SplittimeImpactMetrics;