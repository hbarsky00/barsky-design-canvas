
import React from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

const BioSection: React.FC = () => {
  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="bio-section" className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-muted/30 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="space-y-12 text-5xl md:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
            <AnimatedText
              text="Product Design Leader with Enterprise and Startup experience since 2012. FinTech, Healthcare, AdTech veteran."
              type="word"
              animation="slide"
              staggerChildren={0.08}
              duration={0.5}
              className="block"
            />
            <AnimatedText
              text="I simplify complex systems and raise the bar of design while delivering measurable business impact."
              type="word"
              animation="slide"
              staggerChildren={0.08}
              duration={0.5}
              delay={1000}
              className="block"
            />
          </div>
        </motion.div>
      </div>

      {/* Up Navigation Arrow */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToHero}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronUp size={24} />
        </motion.div>
        <p className="text-sm mt-2">Back to top</p>
      </motion.div>

      {/* Down Navigation Arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollToProjects}
      >
        <p className="text-sm mb-2">View projects</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BioSection;
