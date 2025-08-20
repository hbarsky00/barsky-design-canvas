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
      className="w-full bg-background py-16 md:py-20"
    >
      {/* Alias anchors for backward compatibility */}
      <div id="key-gaps" aria-hidden="true" className="absolute"></div>
      <div id="key-features" aria-hidden="true" className="absolute"></div>
      <div id="solution-features" aria-hidden="true" className="absolute"></div>
      <div id="solution" aria-hidden="true" className="absolute"></div>
      <div id="key-takeaways" aria-hidden="true" className="absolute"></div>
      <div id="solution-key-features" aria-hidden="true" className="absolute"></div>
      
      <div className="section-container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            id="key-insights-label"
            className="text-section-title text-foreground font-display content-rail-center"
          >
            Key insights
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="group h-full bg-white border border-border rounded-[20px] p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:outline-none"
              tabIndex={0}
              role="article"
              aria-labelledby={`insight-${insight.number}-title`}
            >
              <div className="h-full flex flex-col">
                {/* Number pill */}
                <div className="flex items-start mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-muted text-muted-foreground text-sm font-medium rounded-full shrink-0">
                    {insight.number}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-1 justify-center">
                  <h3 
                    id={`insight-${insight.number}-title`}
                    className="text-base md:text-lg font-medium text-foreground font-display mb-3 leading-tight tracking-[var(--letter-spacing-normal)]"
                  >
                    {insight.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInsightsRow;