
import React from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

const InvestmentJourneySection: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

  const investmentJourney = [
    {
      step: "Learn",
      title: "Educational Onboarding",
      description: "Interactive tutorials introduce investing basics with simple language and visual examples to build confidence.",
      image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png"
    },
    {
      step: "Plan",
      title: "Goal Setting & Strategy",
      description: "Users define financial goals and receive personalized investment recommendations based on their timeline and risk tolerance.",
      image: "/lovable-uploads/fb6ed4d4-7b7a-4d99-9eac-be0b810e97f0.png"
    },
    {
      step: "Invest",
      title: "Simplified Investment Process",
      description: "One-tap investing with clear explanations of each decision, removing complexity while maintaining transparency.",
      image: "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png"
    },
    {
      step: "Track",
      title: "Progress Monitoring",
      description: "Visual progress tracking with achievement milestones that celebrate investment success and encourage continued engagement.",
      image: "/lovable-uploads/210badcf-5da6-47c5-9e9c-c4ba3a0c9102.png"
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Smartphone className="h-10 w-10 text-purple-500" />
            <span className="text-purple-600 font-semibold text-lg">Platform Experience</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-8">
            Guided Investment Learning Journey
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            Designed specifically for investment beginners, the platform guides users through 
            learning, planning, investing, and tracking progress with confidence-building design.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {investmentJourney.map((journey, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">{journey.step}</span>
                  <h3 className="text-xl font-bold text-neutral-900">{journey.title}</h3>
                </div>
              </div>
              
              <figure className="project-image-container mb-6">
                <img 
                  src={journey.image} 
                  alt={`${journey.title} - investment education platform interface`} 
                  className="w-full h-64 object-cover rounded-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                  onClick={() => maximizeImage(journey.image, `${journey.title} - investment education platform interface`)}
                />
                <figcaption className="text-sm text-neutral-600 italic mt-2 text-center">
                  {journey.title} - {journey.description}
                </figcaption>
              </figure>
              
              <p className="text-neutral-600 leading-relaxed">{journey.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentJourneySection;
