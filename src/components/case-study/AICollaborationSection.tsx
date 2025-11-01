import React from "react";
import { motion } from "framer-motion";
import { Bot, User, TrendingUp, Zap } from "lucide-react";

interface AICollaborationSectionProps {
  title: string;
  aiHandled: string[];
  humanRefined: string[];
  combinedImpact: {
    timeSaved: string;
    qualityImproved: string;
  };
}

const AICollaborationSection: React.FC<AICollaborationSectionProps> = ({
  title,
  aiHandled,
  humanRefined,
  combinedImpact
}) => {
  return (
    <section id="ai-collaboration" className="py-16 md:py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-1.5 text-eyebrow text-cyan-700 mb-4">
            HUMAN + AI COLLABORATION
          </div>
          <h2 className="text-section-title font-display">{title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            AI accelerated synthesis and variants. Human judgment refined the strategy and emotional resonance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-border/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
                <Bot className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">AI Handled</h3>
            </div>
            <ul className="space-y-4">
              {aiHandled.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-purple-600 text-xl mt-0.5 flex-shrink-0">•</span>
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-border/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Human Refined</h3>
            </div>
            <ul className="space-y-4">
              {humanRefined.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-blue-600 text-xl mt-0.5 flex-shrink-0">•</span>
                  <span className="text-muted-foreground leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 rounded-xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <Zap className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Combined Impact</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/50 rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Time Saved</p>
              <p className="text-3xl font-bold text-foreground">{combinedImpact.timeSaved}</p>
            </div>
            <div className="bg-white/50 rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Quality Improved</p>
              <p className="text-3xl font-bold text-foreground">{combinedImpact.qualityImproved}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AICollaborationSection;
