
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import MaximizableImage from "@/components/project/MaximizableImage";
import AnnotatedImage from "./AnnotatedImage";
import CustomerInputCard from "./CustomerInputCard";
import { ImageAnnotation } from "@/data/structuredCaseStudies";

interface WhatDidntWorkMetric {
  value: string;
  label: string;
  description?: string;
}

interface WhatDidntWorkImage {
  src: string;
  alt: string;
  caption?: string;
  annotations?: ImageAnnotation[];
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

// CompareCard component for Before/After comparisons
interface CompareCardProps {
  before: string;
  after: string;
}

const CompareCard: React.FC<CompareCardProps> = ({ before, after }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8" role="note">
      {/* Before Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-red-50/60 border-2 border-red-200/60 rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900">Before</h3>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-red-900 leading-tight">{before}</p>
      </motion.div>

      {/* After Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-emerald-50/60 border-2 border-emerald-200/60 rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 relative"
      >
        <div className="hidden md:flex absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center">
          <ArrowRight className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-emerald-900">After</h3>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-emerald-900 leading-tight">{after}</p>
      </motion.div>
    </div>
  );
};

const WhatDidntWorkSection: React.FC<WhatDidntWorkSectionProps> = ({ 
  whatDidntWorkData 
}) => {
  // Parse content for Before/After patterns
  const parseContentBlocks = (content: string) => {
    const blocks: Array<{ type: 'text' | 'customer' | 'compare', content: any }> = [];
    const paragraphs = content.split('\n\n');
    
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
      
      // Check for Before/After pattern
      const beforeMatch = paragraph.match(/Before:\s*(.+?)(?:\n|$)/i);
      const afterMatch = paragraph.match(/After:\s*(.+?)(?:\n|$)/i);
      
      if (beforeMatch && afterMatch) {
        blocks.push({
          type: 'compare',
          content: { before: beforeMatch[1].trim(), after: afterMatch[1].trim() }
        });
        continue;
      }
      
      // Check for customer input
      const isCustomerInput = paragraph.trim().startsWith('"') || 
        paragraph.toLowerCase().includes('customer:') || 
        paragraph.toLowerCase().includes('user said:');
      
      if (isCustomerInput) {
        let quote = paragraph;
        let context = undefined;
        
        if (paragraph.toLowerCase().includes('customer:')) {
          const parts = paragraph.split(/customer:/i);
          quote = parts[1]?.trim().replace(/^["']|["']$/g, '') || paragraph;
          context = "Customer feedback";
        } else if (paragraph.toLowerCase().includes('user said:')) {
          const parts = paragraph.split(/user said:/i);
          quote = parts[1]?.trim().replace(/^["']|["']$/g, '') || paragraph;
          context = "User feedback";
        } else {
          quote = paragraph.replace(/^["']|["']$/g, '');
        }
        
        blocks.push({ type: 'customer', content: { quote, context } });
        continue;
      }
      
      // Regular text
      blocks.push({ type: 'text', content: paragraph });
    }
    
    return blocks;
  };

  const contentBlocks = parseContentBlocks(whatDidntWorkData.content);

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-16 md:py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-container text-center"
      >
        {/* Header */}
        <div className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-eyebrow text-orange-700 mb-4">
          {whatDidntWorkData.eyebrow || "WHAT DIDN'T WORK"}
        </div>
        <h2 className="text-section-title text-foreground font-display content-rail-center mb-12">
          {whatDidntWorkData.title}
        </h2>
        
        {/* Content Blocks */}
        <div className="content-rail-left mb-8 space-y-6">
          {contentBlocks.map((block, idx) => {
            if (block.type === 'compare') {
              return (
                <CompareCard
                  key={idx}
                  before={block.content.before}
                  after={block.content.after}
                />
              );
            }
            
            if (block.type === 'customer') {
              return (
                <CustomerInputCard
                  key={idx}
                  quote={block.content.quote}
                  context={block.content.context}
                  className="shadow-md"
                />
              );
            }
            
            return (
              <p key={idx} className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                {block.content}
              </p>
            );
          })}
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
                className="bg-gradient-to-br from-white via-white to-orange-50/30 rounded-xl p-8 shadow-md hover:shadow-lg border-2 border-border/20 hover:border-orange-300/30 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="text-xs text-muted-foreground mt-2">
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
                {image.annotations && image.annotations.length > 0 ? (
                  <AnnotatedImage
                    src={image.src}
                    alt={image.alt}
                    annotations={image.annotations}
                    className="w-full rounded-xl shadow-md border border-border/20"
                  />
                ) : (
                  <MaximizableImage
                    src={image.src}
                    alt={image.alt}
                    caption={image.caption}
                    fit="contain"
                    className="w-full rounded-xl shadow-md border border-border/20"
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WhatDidntWorkSection;
