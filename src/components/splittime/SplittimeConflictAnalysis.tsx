import React from "react";
import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { conflictSources } from "@/data/splittimeData";

interface SplittimeConflictAnalysisProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}

const SplittimeConflictAnalysis: React.FC<SplittimeConflictAnalysisProps> = ({ 
  onImageClick, 
  onImageKeypress 
}) => {
  return (
    <section className="communication-conflict-breakdown py-20 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingDown className="h-10 w-10 text-red-500" />
            <span className="text-red-600 font-semibold text-lg">Communication Breakdown</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
            The Hidden Cost of Fragmented Co-Parenting
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Scattered text messages, forgotten pickups, conflicting schedules, and misunderstood communications 
            create stress that ripples through families. When co-parenting lacks structure and clarity, 
            children experience the emotional toll of parental friction and coordination failures.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-neutral-900">Core Communication Barriers:</h3>
            
            {conflictSources.map((source, index) => {
              const IconComponent = source.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.6, delay: index * 0.1 }} 
                  className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-red-500 flex-shrink-0">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-800 mb-2">{source.title}</h4>
                      <p className="text-neutral-600">{source.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8, delay: 0.3 }} 
            className="relative"
          >
            <figure className="project-image-container">
              <img 
                src="/lovable-uploads/8df95f0b-a722-43da-af7d-a3b9e05a1118.png" 
                alt="Communication interface designed to reduce family conflict" 
                className="clickable-image w-full h-[500px] object-cover shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                onClick={() => onImageClick('splittime-conflict-1')}
                tabIndex={0}
                onKeyDown={(e) => onImageKeypress(e, 'splittime-conflict-1')}
                role="button"
                aria-label="Click to view communication interface in full screen"
                id="splittime-conflict-1" 
              />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                Communication interface designed to reduce family conflict
              </figcaption>
            </figure>
            
            <figure className="project-image-container mt-8">
              <img 
                src="/lovable-uploads/448a9776-8ef2-421b-a68c-5451bbc5f823.png" 
                alt="Splittime app interface showing key features and solutions for co-parenting coordination" 
                className="clickable-image w-full h-auto object-contain shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                onClick={() => onImageClick('splittime-features-1')}
                tabIndex={0}
                onKeyDown={(e) => onImageKeypress(e, 'splittime-features-1')}
                role="button"
                aria-label="Click to view Splittime features in full screen"
                id="splittime-features-1" 
              />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                Splittime app interface showing key features and solutions for co-parenting coordination
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SplittimeConflictAnalysis;