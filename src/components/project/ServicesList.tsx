
import React from "react";
import { motion } from "framer-motion";

const ServicesList: React.FC = () => {
  const services = [
    "Product Design Consultation",
    "User Research & Testing",
    "Design System Creation",
    "Cross-Platform Optimization",
    "Mobile and Desktop Interface Design",
    "User Flow Optimization",
    "Accessibility Implementation",
    "Responsive Web Development"
  ];

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-barsky-dark mb-4 text-center mx-auto max-w-5xl [text-wrap:balance]">Services Provided</h2>
      <ul className="list-disc pl-5 space-y-2 text-barsky-text">
        {services.map((service, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
          >
            {service}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ServicesList;
