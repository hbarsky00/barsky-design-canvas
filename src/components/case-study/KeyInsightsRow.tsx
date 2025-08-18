import React from "react";
import { motion } from "framer-motion";

interface KeyInsight {
  number: number;
  title: string;
  description: string;
}

interface KeyInsightsRowProps {
  insights: KeyInsight[];
}

const KeyInsightsRow: React.FC<KeyInsightsRowProps> = ({ insights }) => {
  return (
    <section 
      id="key-insights" 
      aria-labelledby="key-insights-label"
      className="w-full bg-[hsl(var(--key-insights-bg))] py-16 lg:py-24"
    >
      {/* Alias anchors for backward compatibility */}
      <div id="key-gaps" aria-hidden="true" className="absolute"></div>
      <div id="key-features" aria-hidden="true" className="absolute"></div>
      <div id="solution-features" aria-hidden="true" className="absolute"></div>
      <div id="solution" aria-hidden="true" className="absolute"></div>
      <div id="key-takeaways" aria-hidden="true" className="absolute"></div>
      <div id="solution-key-features" aria-hidden="true" className="absolute"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 
            id="key-insights-label"
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-foreground mb-4"
          >
            Key insights
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="bg-white border border-border/10 rounded-[9999px] py-5 px-6 text-center hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold mb-3">
                  {insight.number}
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70 mb-2">
                  {insight.title}
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInsightsRow;