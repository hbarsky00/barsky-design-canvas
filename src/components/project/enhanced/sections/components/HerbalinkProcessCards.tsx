import React from "react";
import { motion } from "framer-motion";

const HerbalinkProcessCards: React.FC = () => {
  const processSteps = [
    {
      number: "1",
      emoji: "🔍",
      title: "User Research & Interviews",
      subtitle: "Research & Discovery",
      description: "Conducted interviews with 12 participants to understand pain points in herbal wellness access"
    },
    {
      number: "2", 
      emoji: "🎨",
      title: "Design System & Prototypes",
      subtitle: "Design & Prototyping",
      description: "Created design system, wireframes, and high-fidelity prototypes in Figma"
    },
    {
      number: "3",
      emoji: "🧪", 
      title: "User Testing & Validation",
      subtitle: "Testing & Iteration",
      description: "Conducted usability testing and refined the experience based on user feedback"
    }
  ];

  const detailedSteps = [
    {
      emoji: "👥",
      title: "User Interview Sessions",
      subtitle: "User Research & Discovery",
      description: "I conducted interviews with 12 participants (6 potential users, 6 practicing herbalists) to understand pain points and opportunities in the herbal wellness space.",
      details: "Key findings revealed users struggled with finding qualified herbalists and felt uncertain about practitioner backgrounds. High costs and limited rural availability created barriers to accessing herbal care."
    },
    {
      emoji: "📊",
      title: "Herbalist Discovery User Flows", 
      subtitle: "Information Architecture",
      description: "I mapped out core user journeys focusing on trust-building and education. The architecture prioritized herbalist discovery as the primary entry point, with consultation booking and educational content easily accessible.",
      details: "This approach ensured users could find qualified practitioners while learning about herbal wellness throughout their journey."
    },
    {
      emoji: "🎨",
      title: "Design System & Components",
      subtitle: "Design System & Prototyping", 
      description: "Using Figma, I developed a comprehensive design system featuring earthy colors that conveyed natural trustworthiness. I created high-fidelity prototypes for key user flows:",
      details: "Herbalist Discovery: Browse and filter certified practitioners\nTrust Building: Detailed profiles with credentials and reviews\nConsultation Flow: Booking, video calls, and follow-up care"
    },
    {
      emoji: "🛡️",
      title: "Trust-Building Features",
      subtitle: "Trust-Building Solutions",
      description: "I designed comprehensive herbalist profiles featuring detailed certification displays, educational backgrounds, verified testimonials, and specialization areas to build user confidence.",
      details: "The solution included a smart matching algorithm considering health goals, consultation preferences, and herbalist specializations for optimal pairing."
    }
  ];

  return (
    <div className="mt-12 space-y-8">
      {/* Main Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {processSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 layered-depth hover:shadow-elevated-lg transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl mb-2">{step.emoji}</div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-primary font-medium mb-2">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Process Steps */}
      <div className="space-y-6">
        {detailedSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 layered-depth"
          >
            <div className="flex items-start space-x-4">
              <div className="text-3xl flex-shrink-0">{step.emoji}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {step.details}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HerbalinkProcessCards;