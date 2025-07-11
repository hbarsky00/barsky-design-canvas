import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import MaximizableImage from "../MaximizableImage";
import expensiveSoftwareImage from "@/assets/frustration-expensive-software.jpg";
import manualWorkImage from "@/assets/frustration-manual-work.jpg";

const ProblemSection: React.FC = () => {
  const painPoints = [
    {
      text: "Grid actions that looked clickable but did nothing (pure frustration)",
      image: "/lovable-uploads/a5f7cbb4-e20e-42ac-af22-f9611e5994e4.png",
      alt: "Frustrated business owner overwhelmed by chaotic software and manual processes"
    },
    {
      text: "Endless screens that buried simple tasks in complexity",
      image: "/lovable-uploads/98c02902-7f36-4c8a-b29e-0dace089c297.png",
      alt: "Developer surrounded by overwhelming code interfaces and digital complexity"
    },
    {
      text: "A system designed by people who never ran a distribution business",
      image: "/lovable-uploads/82339ea3-2074-4095-83b2-c52489b602ef.png",
      alt: "Business professional and warehouse worker collaborating with digital technology"
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
        
        <div className="grid lg:grid-cols-1 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Their Daily Frustrations:</h3>
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
                className="bg-red-50 p-8 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed text-lg font-medium mb-4">{pain.text}</p>
                  </div>
                  <div className="w-full md:w-80 flex-shrink-0">
                    <MaximizableImage
                      src={pain.image}
                      alt={pain.alt}
                      className="w-full h-48 object-contain shadow-xl rounded-lg"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;