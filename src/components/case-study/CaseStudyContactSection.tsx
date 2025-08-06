import React from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

const CaseStudyContactSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50 rounded-lg p-8 mt-16"
    >
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Mail className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Interested in Similar Work?</h3>
        </div>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          I specialize in creating user-centered digital experiences that solve real problems. 
          Whether you need product design, development, or strategic consultation, let's discuss 
          how we can bring your vision to life.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
          <span>Available for new projects</span>
          <ArrowRight className="h-4 w-4" />
          <span className="text-primary font-medium">Let's connect</span>
        </div>
      </div>

      <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-border/30">
        <ContactForm />
      </div>
    </motion.section>
  );
};

export default CaseStudyContactSection;