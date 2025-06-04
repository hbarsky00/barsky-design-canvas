
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
  image?: string;
  completed?: boolean;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  steps,
  title = "Design Process"
}) => {
  return (
    <div className="space-y-8">
      {title && (
        <h3 className="text-heading-2 text-navy-primary text-center">{title}</h3>
      )}

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200" />

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex items-start space-x-6"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex-shrink-0">
                {step.completed ? (
                  <CheckCircle className="h-8 w-8 text-success-green bg-white rounded-full" />
                ) : (
                  <Circle className="h-8 w-8 text-neutral-300 bg-white rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <h4 className="text-heading-3 text-navy-primary">
                      {step.title}
                    </h4>
                    <p className="text-body text-neutral-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {step.image && (
                    <div className="process-card">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-auto rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
