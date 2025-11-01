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

        <div className="grid gap-8 md:grid-cols-2">
          {decisions.map((decision, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-border/20 hover:shadow-md transition-shadow"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">What I Chose</h3>
                    <p className="text-muted-foreground leading-relaxed">{decision.chose}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">What I Sacrificed</h3>
                    <p className="text-muted-foreground leading-relaxed">{decision.sacrificed}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <h3 className="font-semibold text-blue-900 text-lg">Impact</h3>
                  </div>
                  <p className="text-blue-700 leading-relaxed mb-3">{decision.impact}</p>
                  {decision.metrics && (
                    <div className="text-3xl font-bold text-blue-900 tracking-tight">{decision.metrics}</div>
                  )}
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">Learning</h3>
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
