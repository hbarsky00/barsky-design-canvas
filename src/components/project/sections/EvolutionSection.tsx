import React from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import MaximizableImage from "../MaximizableImage";

const EvolutionSection: React.FC = () => {
  const phases = [
    {
      step: "1",
      title: "Excel Scripts",
      description: "Started with quick automation to solve immediate pain",
      image: "/lovable-uploads/5dbc55b5-23eb-4f33-a9c7-152110769b20.png",
      color: "green"
    },
    {
      step: "2",
      title: "Custom Foundation",
      description: "Built proper app interface on the Excel foundation",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      color: "blue"
    },
    {
      step: "3",
      title: "AI-Enhanced Development",
      description: "Used AI to evolve from designer to full-stack developer",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      color: "purple"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-blue-700 font-semibold">The Evolution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Excel → Custom App → AI-Powered Development
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div 
              key={index} 
              initial={{
                opacity: 0,
                y: 50
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.8,
                delay: index * 0.2
              }} 
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className={`w-12 h-12 bg-${phase.color}-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-6`}>
                  {phase.step}
                </div>
                {phase.step === "2" ? (
                  <iframe 
                    src="https://www.loom.com/embed/f746677f541647d8934010a1a5dfa5c2" 
                    frameBorder="0" 
                    allowFullScreen 
                    className="w-full h-48 mb-6"
                  ></iframe>
                ) : (
                  <MaximizableImage 
                    src={phase.image} 
                    alt={phase.title} 
                    className="w-full h-48 object-cover mb-6" 
                    aspectRatio="16/9"
                  />
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
              {index < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300"></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvolutionSection;