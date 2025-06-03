
import React from "react";
import { motion } from "framer-motion";
import { Users, Eye, PenTool, Palette, Monitor, Smartphone } from "lucide-react";

const SkillsShowcase: React.FC = () => {
  const skillCategories = [
    {
      icon: Eye,
      title: "User Research",
      skills: ["User Interviews", "Surveys & Analytics", "Persona Development", "Journey Mapping", "Competitive Analysis"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: PenTool,
      title: "UX Design",
      skills: ["Wireframing", "Information Architecture", "User Flows", "Prototyping", "Usability Testing"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "UI Design",
      skills: ["Visual Design", "Design Systems", "Branding", "Figma", "Adobe Creative Suite"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Monitor,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "HTML5/CSS3", "Responsive Design", "Performance Optimization"],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Smartphone,
      title: "Interaction Design",
      skills: ["Micro-interactions", "Animation", "Mobile UX", "Touch Interfaces", "Accessibility (A11Y)"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Collaboration",
      skills: ["Design Handoff", "Stakeholder Communication", "Agile/Scrum", "Design Reviews", "Cross-functional Teams"],
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Design Skills & Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From user research to frontend implementation, I bring a comprehensive 
            approach to creating user-centered digital experiences that drive results.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Icon with Gradient Background */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-6`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>

                {/* Category Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (skillIndex * 0.05) }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span className="text-gray-700">{skill}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Proficiency Indicator */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Expertise Level</span>
                    <span>Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "88%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
