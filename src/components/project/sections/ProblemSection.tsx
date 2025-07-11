import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import MaximizableImage from "../MaximizableImage";
import brokenButtonsImage from "@/assets/frustration-broken-buttons.jpg";
import complexScreensImage from "@/assets/frustration-complex-screens.jpg";
import disconnectImage from "@/assets/frustration-disconnect.jpg";
import expensiveSoftwareImage from "@/assets/frustration-expensive-software.jpg";
import manualWorkImage from "@/assets/frustration-manual-work.jpg";

const ProblemSection: React.FC = () => {
  const painPoints = [
    {
      text: "Grid actions that looked clickable but did nothing (pure frustration)",
      image: brokenButtonsImage,
      alt: "Frustrated user clicking broken interface buttons"
    },
    {
      text: "Endless screens that buried simple tasks in complexity",
      image: complexScreensImage,
      alt: "Overwhelming complex software interface"
    },
    {
      text: "A system designed by people who never ran a distribution business",
      image: disconnectImage,
      alt: "Disconnect between software developers and actual users"
    },
    {
      text: "Paying for software that actively worked against their workflow",
      image: expensiveSoftwareImage,
      alt: "Expensive software bills with poor workflow"
    },
    {
      text: "Hours of manual work that could be automated with basic scripts",
      image: manualWorkImage,
      alt: "Person doing tedious manual data entry work"
    }
  ];

  return (
    <section className="py-16 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lightbulb className="h-8 w-8 text-red-600" />
            <span className="text-red-700 font-semibold">The Real Problem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            What They Were Actually Struggling With
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Their Daily Frustrations:</h3>
            {painPoints.map((pain, index) => (
              <motion.div 
                key={index} 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                whileInView={{
                  opacity: 1,
                  y: 0
                }} 
                viewport={{
                  once: true
                }} 
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }} 
                className="flex items-start gap-4 bg-red-50 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <img 
                  src={pain.image} 
                  alt={pain.alt}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 shadow-md"
                />
                <div className="flex-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full mb-2"></div>
                  <p className="text-gray-800 leading-relaxed">{pain.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{
              opacity: 0,
              scale: 0.95
            }} 
            whileInView={{
              opacity: 1,
              scale: 1
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8
            }} 
            className="relative space-y-6"
          >
            <MaximizableImage
              src="/lovable-uploads/a5f7cbb4-e20e-42ac-af22-f9611e5994e4.png"
              alt="Frustrated business owner overwhelmed by chaotic software and manual processes"
              caption="The daily chaos of inefficient business software"
              className="w-full h-[300px] shadow-xl object-contain"
            />
            
            <MaximizableImage
              src="/lovable-uploads/82339ea3-2074-4095-83b2-c52489b602ef.png"
              alt="Business professional and warehouse worker collaborating with digital technology"
              caption="Bridging the gap between business needs and operational reality"
              className="w-full h-[300px] shadow-xl object-contain"
            />
            
            <MaximizableImage
              src="/lovable-uploads/98c02902-7f36-4c8a-b29e-0dace089c297.png"
              alt="Developer surrounded by overwhelming code interfaces and digital complexity"
              caption="The overwhelming complexity of traditional software development"
              className="w-full h-[300px] shadow-xl object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;