import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { coordinationFeatures } from "@/data/splittimeData";

interface SplittimeCoordinationSolutionProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}

const SplittimeCoordinationSolution: React.FC<SplittimeCoordinationSolutionProps> = ({ 
  onImageClick, 
  onImageKeypress 
}) => {
  return (
    <section className="coordination-streamlining-system py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="h-10 w-10 text-blue-500" />
            <span className="text-blue-600 font-semibold text-lg">Coordination Solution</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
            Streamlined Co-Parenting Communication
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Our platform centralizes all co-parenting coordination in one respectful space, 
            reducing friction and keeping children's needs at the center of every interaction.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {coordinationFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: index * 0.2 }} 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-6 text-center">{feature.visual}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">{feature.title}</h3>
              <p className="text-neutral-600 text-center leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Promo Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.4 }} 
          className="mt-12"
        >
          <figure className="project-video-container">
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl bg-gray-100">
              <img
                src="https://barskyux.com/wp-content/uploads/2025/08/mobilepromo.png"
                alt="SplitTime mobile application promotional image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
              SplitTime mobile application promotional image
            </figcaption>
          </figure>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.6 }} 
          className="mt-16 bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-3xl text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4 !text-white">Conflict Reduction Approach</h3>
          <p className="text-lg max-w-3xl mx-auto font-normal white-text-nuclear">
            By providing structure, transparency, and child-focused communication tools, 
            parents spend less time arguing and more time supporting their children's wellbeing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SplittimeCoordinationSolution;
