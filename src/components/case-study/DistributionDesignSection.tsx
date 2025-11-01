import React from "react";
import { motion } from "framer-motion";
import { Share2, Users, ArrowRight } from "lucide-react";

interface DistributionMoment {
  feature: string;
  mechanism: string;
  result: string;
}

interface DistributionDesignSectionProps {
  title: string;
  moments: DistributionMoment[];
}

const DistributionDesignSection: React.FC<DistributionDesignSectionProps> = ({ title, moments }) => {
  return (
    <section id="distribution" className="py-16 md:py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-pink-100 px-4 py-1.5 text-eyebrow text-pink-700 mb-4">
            GROWTH & DISTRIBUTION
          </div>
          <h2 className="text-section-title font-display">{title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Features that spread themselves. Viral loops designed into the core experience.
          </p>
        </div>

        <div className="grid gap-8">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm border border-border/20"
            >
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      Feature
                    </h3>
                    <p className="text-lg font-semibold text-foreground">{moment.feature}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      Mechanism
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{moment.mechanism}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide text-muted-foreground">
                      Result
                    </h3>
                    <p className="text-lg font-semibold text-green-700">{moment.result}</p>
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

export default DistributionDesignSection;
