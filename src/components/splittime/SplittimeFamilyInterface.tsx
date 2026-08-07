import React from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { familyInterface } from "@/data/splittimeData";

interface SplittimeFamilyInterfaceProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}

const SplittimeFamilyInterface: React.FC<SplittimeFamilyInterfaceProps> = ({ 
  onImageClick, 
  onImageKeypress 
}) => {
  return (
    <section className="child-centered-platform-design py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Home className="h-10 w-10 text-green-500" />
            <span className="text-green-600 font-semibold text-lg">Family-First Interface</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
            Designed with Children's Wellbeing in Mind
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Every feature prioritizes what's best for the children, making co-parenting coordination 
            feel supportive rather than adversarial through thoughtful, family-centered design.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {familyInterface.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: index * 0.1 }} 
              className="bg-gradient-to-br from-blue-50 to-slate-50 p-8 rounded-3xl border border-blue-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{item.step}</span>
                  <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                </div>
              </div>
              
              <figure className="project-image-container">
                <img 
                  src={item.image} 
                  alt={`${item.title} - family-centered co-parenting platform interface`} 
                  className="clickable-image w-full h-48 object-cover mb-6 cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                  onClick={() => onImageClick(`splittime-interface-${index + 1}`)}
                  tabIndex={0}
                  onKeyDown={(e) => onImageKeypress(e, `splittime-interface-${index + 1}`)}
                  role="button"
                  aria-label={`Click to view ${item.title} in full screen`}
                  id={`splittime-interface-${index + 1}`}
                />
                <figcaption className="text-sm text-gray-600 italic mt-2 text-center">{item.description}</figcaption>
              </figure>
              
              <p className="text-neutral-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SplittimeFamilyInterface;