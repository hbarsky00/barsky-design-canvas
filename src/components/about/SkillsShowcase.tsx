
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const SkillsShowcase: React.FC = () => {
  const skillCategories = [
    {
      category: "Design & Research",
      skills: ["Product Design", "User Research", "Design Systems", "Prototyping", "Accessibility"]
    },
    {
      category: "AI & Development", 
      skills: ["Gen AI Integration", "React Development", "TypeScript", "Supabase", "API Design"]
    },
    {
      category: "Tools & Platforms",
      skills: ["Figma", "ChatGPT", "Claude AI", "Webflow", "Adobe Creative Suite"]
    },
    {
      category: "Business Impact",
      skills: ["Conversion Optimization", "A/B Testing", "Analytics", "SEO", "Performance"]
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-16"
    >
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsShowcase;
