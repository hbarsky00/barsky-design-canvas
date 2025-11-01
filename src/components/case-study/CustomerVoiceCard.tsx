import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface CustomerVoiceCardProps {
  quote: string;
  author: string;
  title: string;
  metric?: string;
  metricLabel?: string;
}

const CustomerVoiceCard: React.FC<CustomerVoiceCardProps> = ({
  quote,
  author,
  title,
  metric,
  metricLabel
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8 shadow-sm border border-blue-100"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <Quote className="w-6 h-6 text-blue-600" />
        </div>
        <blockquote className="text-lg text-foreground leading-relaxed italic">
          "{quote}"
        </blockquote>
      </div>
      
      <div className="flex items-center justify-between gap-4 border-t border-blue-200 pt-6">
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
        
        {metric && metricLabel && (
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{metric}</div>
            <div className="text-sm text-muted-foreground">{metricLabel}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomerVoiceCard;
