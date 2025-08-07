import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/blog/ShareButtons";

const WholesaleHero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Single focal background video/image */}
      <div className="absolute inset-0">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/warehouse-demo.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="/lovable-uploads/warehouse-fallback.jpg" 
            alt="Wholesale distribution warehouse operations"
            className="w-full h-full object-cover object-center"
          />
        </video>
        {/* Strong dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Left-aligned content with subtle background */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Subtle backdrop for text contrast */}
            <div className="bg-black/70 backdrop-blur-md rounded-2xl p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Title case heading with medium weight */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
                  Turning Excel Chaos into AI-Powered Efficiency
                </h1>
                
                {/* High contrast readable subtext */}
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                  Custom automation eliminated 95% of manual data entry.
                </p>
                
                {/* Bold rectangular CTA button */}
                <div className="pt-2">
                  <Button 
                    size="lg" 
                    className="font-bold px-8 py-3 text-base bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-xl rounded-lg"
                  >
                    See the System in Action
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleHero;