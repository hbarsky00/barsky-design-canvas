import React from "react";
import { motion } from "framer-motion";
import { Check, X, TrendingUp } from "lucide-react";

interface TradeOffDecisionBoxProps {
  title: string;
  chose: string;
  sacrificed: string;
  learning: string;
}

const TradeOffDecisionBox: React.FC<TradeOffDecisionBoxProps> = ({
  title,
  chose,
  sacrificed,
  learning
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm"
    >
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        {title}
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-800">Chose</p>
          </div>
          <p className="text-on-surface leading-relaxed">{chose}</p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <X className="w-5 h-5 text-red-600" />
            <p className="font-semibold text-red-800">Sacrificed</p>
          </div>
          <p className="text-on-surface leading-relaxed">{sacrificed}</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-4 border border-blue-300">
        <p className="font-semibold text-blue-900 mb-2">💡 Learning</p>
        <p className="text-on-surface leading-relaxed italic">{learning}</p>
      </div>
    </motion.div>
  );
};

export default TradeOffDecisionBox;
