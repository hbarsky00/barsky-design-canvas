import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface WhatWentWrongBoxProps {
  title: string;
  mistake: string;
  learning: string;
  howToAvoid: string;
}

const WhatWentWrongBox: React.FC<WhatWentWrongBoxProps> = ({
  title,
  mistake,
  learning,
  howToAvoid
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-red-800 mb-2">❌ The Mistake</p>
          <p className="text-on-surface leading-relaxed">{mistake}</p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm font-semibold text-yellow-900 mb-2">💡 The Learning</p>
          <p className="text-on-surface leading-relaxed">{learning}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm font-semibold text-green-900 mb-2">✅ How to Avoid</p>
          <p className="text-on-surface leading-relaxed">{howToAvoid}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WhatWentWrongBox;
