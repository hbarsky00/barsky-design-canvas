import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Lightbulb, Target } from "lucide-react";

interface Decision {
  chose: string;
  sacrificed: string;
  impact: string;
  learning: string;
  metrics?: string;
}

interface StrategicDecisionsSectionProps {
  title: string;
  decisions: Decision[];
}

const StrategicDecisionsSection: React.FC<StrategicDecisionsSectionProps> = ({ title, decisions }) => {
  return (
    <section id="strategic-decisions" className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5 text-eyebrow text-purple-700 mb-4">
            STRATEGIC DECISIONS
          </div>
          <h2 className="text-section-title font-display">{title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Every design decision involves trade-offs. Here's what I bet on and why it mattered.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          {decisions.map((decision, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white via-white to-gray-50/30 rounded-xl p-10 md:p-12 shadow-md hover:shadow-xl border-2 border-border/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Decision</h3>
                    <p className="text-muted-foreground leading-relaxed">{decision.chose}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
                    <TrendingDown className="w-7 h-7 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Trade-off</h3>
                    <p className="text-muted-foreground leading-relaxed">{decision.sacrificed}</p>
                  </div>
                </div>

                <motion.div 
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8 border-2 border-blue-100/50 shadow-sm"
                  initial={{ opacity: 0.8 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Target className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <h3 className="font-semibold text-blue-900 text-lg">Impact</h3>
                  </div>
                  <p className="text-blue-700 leading-relaxed mb-4">{decision.impact}</p>
                  {decision.metrics && (
                    <div className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight">{decision.metrics}</div>
                  )}
                </motion.div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Lightbulb className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Key Takeaway</h3>
                    <p className="text-muted-foreground italic leading-relaxed">{decision.learning}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicDecisionsSection;
