import React from "react";
import { motion } from "framer-motion";
import { Blocks, Zap, TrendingUp } from "lucide-react";

interface SystemBuilt {
  name: string;
  description: string;
  impact: string;
}

interface SystemsBuiltSectionProps {
  title: string;
  systems: SystemBuilt[];
}

const SystemsBuiltSection: React.FC<SystemsBuiltSectionProps> = ({ title, systems }) => {
  return (
    <section id="systems" className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-indigo-100 px-4 py-1.5 text-eyebrow text-indigo-700 mb-4">
            SYSTEMS & LEVERAGE
          </div>
          <h2 className="text-section-title font-display">{title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Reusable systems that compound velocity. One-time work that pays dividends forever.
          </p>
        </div>

        <div className="grid gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-border/20"
            >
              <div className="grid md:grid-cols-[2fr,3fr,2fr] gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Blocks className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      System
                    </h3>
                    <p className="text-xl font-semibold text-foreground">{system.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{system.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      Compounding Impact
                    </h3>
                    <p className="text-lg font-semibold text-green-700">{system.impact}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-3">Velocity That Compounds</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These systems eliminated entire classes of bugs, reduced QA time, and enabled teams to ship features 4× faster. Upfront investment in systems beats ongoing operational cost.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemsBuiltSection;
