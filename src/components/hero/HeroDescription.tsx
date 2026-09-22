
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Sparkles } from "lucide-react";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  isVisible
}) => {
  const credentials = [
    { icon: Award, text: "Google UX Certificate", color: "bg-blue-100 text-blue-800" },
    { icon: Shield, text: "WCAG 2.1 Certified", color: "bg-green-100 text-green-800" },
    { icon: Sparkles, text: "AI Integration Expert", color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="relative">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-xl sm:text-2xl lg:text-3xl mb-6 lg:mb-8 text-gray-600 dark:text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed"
      >
        From user research to AI-enhanced interfaces that drive measurable business results
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 lg:gap-4"
      >
        {credentials.map((credential, index) => (
          <motion.div
            key={credential.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <Badge 
              variant="secondary" 
              className={`${credential.color} px-4 py-2 lg:px-5 lg:py-3 font-medium text-sm lg:text-base flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm`}
            >
              <credential.icon className="h-4 w-4 lg:h-5 lg:w-5" />
              {credential.text}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroDescription;
