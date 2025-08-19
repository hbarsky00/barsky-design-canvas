
import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "@/components/project/MaximizableImage";

interface WhatDidntWorkMetric {
  value: string;
  label: string;
  description?: string;
}

interface WhatDidntWorkImage {
  src: string;
  alt: string;
  caption?: string;
}

interface WhatDidntWorkData {
  title: string;
  content: string; // Changed from 'description' to 'content' to match data structure
  eyebrow?: string;
  metrics?: WhatDidntWorkMetric[];
  images?: WhatDidntWorkImage[];
}

interface WhatDidntWorkSectionProps {
  whatDidntWorkData: WhatDidntWorkData;
}

const WhatDidntWorkSection: React.FC<WhatDidntWorkSectionProps> = ({ 
  whatDidntWorkData 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 text-center"
    >
      {/* Header */}
      <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-eyebrow text-orange-700 mb-4">
        {whatDidntWorkData.eyebrow || "WHAT DIDN'T WORK"}
      </div>
      <h2 className="text-section-title text-foreground content-rail-center mb-4">
        {whatDidntWorkData.title}
      </h2>
      
      {/* Description */}
      <div className="content-rail-left mb-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          {whatDidntWorkData.content}
        </p>
      </div>

      {/* Metrics */}
      {whatDidntWorkData.metrics && whatDidntWorkData.metrics.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {whatDidntWorkData.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-lg shadow-sm border border-border/20"
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.label}
              </div>
              {metric.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Images */}
      {whatDidntWorkData.images && whatDidntWorkData.images.length > 0 && (
        <div className="grid gap-6 md:gap-8">
          {whatDidntWorkData.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <MaximizableImage
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                className="w-full rounded-lg shadow-sm"
              />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default WhatDidntWorkSection;
