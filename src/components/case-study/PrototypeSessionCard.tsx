import React from "react";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

interface PrototypeSessionCardProps {
  content: string;
  context?: string;
  className?: string;
}

const PrototypeSessionCard: React.FC<PrototypeSessionCardProps> = ({
  content,
  context,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative bg-gradient-to-br from-purple-50/50 via-purple-100/30 to-purple-50/50 rounded-xl p-6 border-2 border-purple-200 shadow-sm ${className}`}
    >
      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <FlaskConical className="w-5 h-5 text-purple-600" />
      </div>
      
      <div className="pl-14">
        <div className="text-base md:text-lg text-foreground leading-relaxed">
          {content}
        </div>
        
        {context && (
          <div className="pt-3 mt-3 border-t border-purple-200">
            <p className="text-xs text-muted-foreground">{context}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PrototypeSessionCard;
