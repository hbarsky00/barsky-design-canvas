
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectsGrid: React.FC = () => {
  const projects = [
    {
      id: 'herbalink',
      title: 'HerbaLink Mobile App',
      description: 'Mobile herbalist consultation platform with AI-powered plant identification',
      image: '/lovable-uploads/21ed3f67-cf04-4117-b956-425f6a473789.png',
      link: '/case-studies/herbalink-mobile-herbalist-ux-design'
    },
    {
      id: 'splittime',
      title: 'SplitTime Co-parenting App',
      description: 'Collaborative scheduling platform for co-parenting families',
      image: '/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png',
      link: '/case-studies/splittime-coparenting-app-design'
    },
    {
      id: 'investor-loan',
      title: 'Investor Loan Portfolio',
      description: 'Investment management platform with portfolio tracking and analytics',
      image: '/lovable-uploads/eef241e8-8c9a-46bd-a698-6d4cca9880a5.png',
      link: '/case-studies/investor-loan-portfolio-management'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={project.link} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
