import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";
import TerminalTypingText from "@/components/effects/TerminalTypingText";

const BioSection: React.FC = () => {
  const [showApproach, setShowApproach] = useState(false);
  const [showBring, setShowBring] = useState(false);
  const [showFocus, setShowFocus] = useState(false);

  const introBio = "I help early-stage startups transform complex problems into intuitive user experiences that drive real business results.";
  
  const approachText = "I believe great design happens at the intersection of user needs and business goals. Every project starts with understanding your users and ends with measurable improvements to your product's performance.";
  
  const bringText = "15+ years of experience in UX/UI design, combined with modern AI development skills. I create design systems that scale, conduct user research that informs decisions, and build prototypes that validate concepts.";
  
  const focusText = "Currently specializing in AI-enhanced user experiences and helping businesses integrate intelligent features that genuinely improve user workflows without adding complexity.";

  return (
    <section 
      id="bio-section"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 relative
                 pt-safe-top pb-safe-bottom"
      tabIndex={-1}
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="p-8 lg:p-12 bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="space-y-8">
              {/* Header with badge */}
              <SectionHeader
                eyebrow="About Me"
                title="Product Designer & AI Developer"
                className="text-center"
              />

              {/* Terminal-style Bio content */}
              <div className="space-y-6">
                {/* Terminal Header */}
                <div className="bg-gray-900 rounded-t-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="ml-4 text-gray-400 text-sm font-mono">hiram@portfolio ~ bio.generate()</span>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="p-6 font-mono text-sm md:text-base leading-relaxed">
                    {/* Prompt line */}
                    <div className="flex items-start gap-2 text-gray-400 mb-4">
                      <span className="text-green-400 shrink-0">❯</span>
                      <span className="text-cyan-400">generateBio</span>
                      <span className="text-gray-500">(</span>
                      <span className="text-amber-400">&quot;Hiram Barsky&quot;</span>
                      <span className="text-gray-500">)</span>
                    </div>
                    
                    {/* Main bio output */}
                    <div className="pl-4 border-l-2 border-primary/30 mb-6">
                      <TerminalTypingText
                        text={introBio}
                        speed={15}
                        delay={500}
                        className="text-white/90"
                        onComplete={() => setShowApproach(true)}
                      />
                    </div>

                    {/* Approach section */}
                    {showApproach && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <div className="flex items-start gap-2 text-gray-400 mb-2">
                          <span className="text-green-400 shrink-0">❯</span>
                          <span className="text-purple-400">approach</span>
                          <span className="text-gray-500">:</span>
                        </div>
                        <div className="pl-4 border-l-2 border-purple-500/30">
                          <TerminalTypingText
                            text={approachText}
                            speed={12}
                            delay={200}
                            className="text-gray-300"
                            onComplete={() => setShowBring(true)}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* What I Bring section */}
                    {showBring && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <div className="flex items-start gap-2 text-gray-400 mb-2">
                          <span className="text-green-400 shrink-0">❯</span>
                          <span className="text-cyan-400">expertise</span>
                          <span className="text-gray-500">:</span>
                        </div>
                        <div className="pl-4 border-l-2 border-cyan-500/30">
                          <TerminalTypingText
                            text={bringText}
                            speed={12}
                            delay={200}
                            className="text-gray-300"
                            onComplete={() => setShowFocus(true)}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Recent Focus section */}
                    {showFocus && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-start gap-2 text-gray-400 mb-2">
                          <span className="text-green-400 shrink-0">❯</span>
                          <span className="text-amber-400">currentFocus</span>
                          <span className="text-gray-500">:</span>
                        </div>
                        <div className="pl-4 border-l-2 border-amber-500/30">
                          <TerminalTypingText
                            text={focusText}
                            speed={12}
                            delay={200}
                            className="text-gray-300"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Status indicator */}
                    <motion.div 
                      className="mt-6 pt-4 border-t border-gray-700/50 flex items-center gap-2 text-gray-500 text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span>LLM response • streaming complete</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BioSection;
