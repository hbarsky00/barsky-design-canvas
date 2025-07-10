import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }}>
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="h-8 w-8 text-amber-600" />
              <span className="text-amber-700 font-semibold">The Story Hook</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              From Restaurant Chat to Business Solution
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              A wholesale distribution business was trapped by software that looked professional but failed at every critical moment. 
              Clickable buttons that did nothing, endless screens hiding simple tasks, and hours of manual work that modern tools should automate - 
              all while paying premium prices for the frustration.
            </p>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200">
              <p className="text-lg italic text-gray-800">
                "Sometimes the best projects come from genuine conversations, not cold pitches."
              </p>
            </div>
          </motion.div>
          
          <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="relative">
            <iframe 
              src="https://www.loom.com/embed/7b6a6a8e7ecc4c29b39b35d9be1ad3a3" 
              frameBorder="0" 
              allowFullScreen 
              className="w-full h-[400px] shadow-2xl"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;