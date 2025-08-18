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
      className="w-full bg-[hsl(var(--key-insights-bg))] section-spacing"
    >
      {/* Alias anchors for backward compatibility */}
      <div id="key-gaps" aria-hidden="true" className="absolute"></div>
      <div id="key-features" aria-hidden="true" className="absolute"></div>
      <div id="solution-features" aria-hidden="true" className="absolute"></div>
      <div id="solution" aria-hidden="true" className="absolute"></div>
      <div id="key-takeaways" aria-hidden="true" className="absolute"></div>
      <div id="solution-key-features" aria-hidden="true" className="absolute"></div>
      
      <div className="max-w-[1120px] mx-auto px-6 md:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 
            id="key-insights-label"
            className="text-section-title text-foreground mb-4 max-w-[72ch] mx-auto text-center"
          >
            Key insights
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className={`h-full flex flex-col justify-center min-h-[132px] rounded-[24px] border p-6 md:p-7 shadow-none transition-all duration-200 ${
                index === insights.length - 1 
                  ? 'bg-[#F3FBFB] border-[#D7F0F0]' 
                  : 'bg-white border-neutral-200'
              }`}
            >
              <div className="text-left">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-semibold tabular-nums mr-3 text-neutral-500">
                    {insight.number}.
                  </span>
                  <h3 className="tracking-[0.18em] uppercase text-xs font-semibold text-neutral-600">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-neutral-800">
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