
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { NavigationProps } from "@/types/navigation";

interface BioSectionProps extends NavigationProps {}

const BioSection: React.FC<BioSectionProps> = ({ 
  navigateUp, 
  navigateDown, 
  canNavigateUp, 
  canNavigateDown,
  isMobile 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Define the two text sets
  const textSets = [
    // Original text set
    [
      "Product Design Leader with Enterprise and Startup experience since 2012. FinTech, Healthcare, AdTech veteran.",
      "I simplify complex systems and raise the bar of design while delivering measurable business impact."
    ],
    // New text set - removed the last paragraph
    [
      "Lead UX Designer with 15+ years in banking, healthcare, and enterprise tech, delivering measurable results—25% higher customer satisfaction at PNC, 40% more engagement after a mobile redesign, and 15% fewer errors at Bank of America.",
      "I specialize in turning complex workflows into intuitive, accessible experiences using Design Thinking, scalable systems, and data-driven design. My work spans AI-powered apps, ServiceNow redesigns, enterprise dashboards, and mobile banking platforms for companies like PNC, Bank of America, Deloitte, TCS, KPMG, and Express Scripts."
    ]
  ];

  // Switch text every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTexts = textSets[currentTextIndex];

  return (
    <section id="bio-section" className="min-h-screen flex flex-col justify-center px-4 sm:px-6 bg-muted/30 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <div className="space-y-6 md:space-y-12 font-bold text-foreground leading-snug text-xl sm:text-2xl md:text-3xl lg:text-4xl [text-wrap:balance]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-12"
              >
                {currentTexts.map((text, index) => (
                  <AnimatedText
                    key={`${currentTextIndex}-${index}`}
                    text={text}
                    type="word"
                    animation="slide"
                    staggerChildren={0.08}
                    duration={0.5}
                    delay={index * 1000}
                    className="block"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BioSection;
