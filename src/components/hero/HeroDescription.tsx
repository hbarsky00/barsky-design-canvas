
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
    <div className="relative mb-3">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-lg sm:text-xl mb-4 text-gray-600 dark:text-gray-300 font-medium max-w-4xl mx-auto leading-relaxed"
      >
        From user research to AI-enhanced interfaces that drive measurable business results
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 mb-0"
      >
        {credentials.map((credential, index) => (
          <motion.div
            key={credential.text}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
          >
            <Badge 
              variant="secondary" 
              className={`${credential.color} px-3 py-1.5 font-medium text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <credential.icon className="h-3 w-3" />
              {credential.text}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroDescription;
