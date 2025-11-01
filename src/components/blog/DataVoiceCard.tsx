import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface DataVoiceCardProps {
  metric: string;
  metricLabel: string;
  quote: string;
  author: string;
  title: string;
}

const DataVoiceCard: React.FC<DataVoiceCardProps> = ({
  metric,
  metricLabel,
  quote,
  author,
  title
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200 shadow-sm"
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0 text-center md:text-left">
          <div className="text-4xl font-bold text-cyan-700 mb-1">{metric}</div>
          <div className="text-sm text-muted-foreground">{metricLabel}</div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <Quote className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-1" />
            <div>
              <blockquote className="text-foreground leading-relaxed italic mb-3">
                "{quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">{author}</p>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataVoiceCard;
