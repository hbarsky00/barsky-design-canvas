
import React from 'react';
import { motion } from 'framer-motion';

const ServicesContent: React.FC = () => {
  const services = [
    {
      title: 'UX/UI Design',
      description: 'User-centered design solutions that prioritize usability and accessibility',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
    },
    {
      title: 'Web Development',
      description: 'Modern web applications built with React and cutting-edge technologies',
      features: ['React Development', 'API Integration', 'Performance Optimization', 'Responsive Design']
    },
    {
      title: 'Mobile App Design',
      description: 'Native and cross-platform mobile experiences for iOS and Android',
      features: ['Mobile UX', 'App Design', 'Cross-platform Solutions', 'User Testing']
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesContent;
