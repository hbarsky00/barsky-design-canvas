import React from "react";
import { motion } from "framer-motion";
import { FileText, Video, BookOpen, Mail, CheckCircle2 } from "lucide-react";

interface OperationalArtifactsSectionProps {
  title: string;
  deliverables: string[];
}

const getIconForDeliverable = (deliverable: string) => {
  const lower = deliverable.toLowerCase();
  if (lower.includes('video') || lower.includes('loom')) return Video;
  if (lower.includes('email') || lower.includes('launch')) return Mail;
  if (lower.includes('documentation') || lower.includes('guide') || lower.includes('playbook')) return BookOpen;
  return FileText;
};

const OperationalArtifactsSection: React.FC<OperationalArtifactsSectionProps> = ({ title, deliverables }) => {
  return (
    <section id="ops" className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-eyebrow text-slate-700 mb-4">
            OPERATIONAL COMPLETENESS
          </div>
          <h2 className="text-section-title font-display">{title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Design doesn't stop at handoff. Here's what I delivered to ensure successful launch and adoption.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {deliverables.map((deliverable, index) => {
            const Icon = getIconForDeliverable(deliverable);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-border/20 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-foreground leading-relaxed">{deliverable}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-3">Beyond Pixels</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These artifacts enabled teams to launch confidently, support users effectively, and sell the product successfully. Design isn't done until adoption happens.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OperationalArtifactsSection;
