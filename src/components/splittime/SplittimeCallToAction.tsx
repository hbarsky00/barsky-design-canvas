import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const SplittimeCallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="h-10 w-10 text-white" />
            <span className="font-semibold text-lg white-text-nuclear">Supporting Families</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
            Ready to Transform Family Coordination?
          </h2>
          
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed white-text-nuclear">
            Let's create digital experiences that support families through life transitions. 
            Your family-centered platform deserves the same thoughtful, empathetic approach.
          </p>
          
          <Button 
            size="lg" 
            variant="brand" 
            className="font-semibold px-10 py-6 text-lg group" 
            onClick={() => window.location.href = '/contact'}
          >
            Start Your Family Project
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SplittimeCallToAction;