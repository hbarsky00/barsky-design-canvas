
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProfessionalJourney: React.FC = () => {
  const milestones = [
    {
      year: "2024 - July 2025",
      title: "Senior Lead Product Designer - PNC",
      description: "Redesigned mobile banking interface, boosting engagement by 40% and raising satisfaction scores by 25%"
    },
    {
      year: "2023 - 2024", 
      title: "Senior UX/UI Designer - Bank of America",
      description: "Led UX for Loan Central and ServiceNow IRM, cutting errors by 15% and lifting engagement by 10%"
    },
    {
      year: "2021 - 2023",
      title: "Senior User Experience Designer - Deloitte", 
      description: "Elevated platform engagement by 20% through user-centered prototypes and innovative design solutions"
    },
    {
      year: "2019 - 2021",
      title: "UX Strategist & Design Lead - Tata Consultancy Services",
      description: "Designed fintech apps that drove a 15% revenue lift; built a document manager app reducing support workload by 10%"
    },
    {
      year: "2014 - 2019",
      title: "Senior UX Designer - KPMG",
      description: "Created dashboards and data visualizations that reduced client costs by 10% and increased platform revenue by 14%"
    },
    {
      year: "2013 - 2014",
      title: "Senior UX Designer - Express Scripts",
      description: "Led design initiatives that improved satisfaction and engagement by 30%, while cutting project turnaround by 20%"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-display">Professional Journey</h2>
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="w-4 h-4 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="text-sm text-blue-600 font-medium mb-1">{milestone.year}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">{milestone.title}</h3>
                <p className="text-gray-700">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProfessionalJourney;
