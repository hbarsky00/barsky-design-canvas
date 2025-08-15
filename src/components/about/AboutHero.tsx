
import React from "react";
import { motion } from "framer-motion";

const AboutHero: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
            alt="Hiram Barsky"
            className="w-32 h-32 rounded-full mx-auto mb-8 object-cover"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Hi, I'm Hiram Barsky
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Product Designer & Gen AI Developer with 15+ years of experience creating 
            AI-enhanced digital experiences that drive real business results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
