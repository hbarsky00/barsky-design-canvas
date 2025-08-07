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
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Left-aligned content layout */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Clean sentence-case heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Turning Excel chaos into AI-powered efficiency
              </h1>
              
              {/* Short high-contrast subtext */}
              <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                Custom automation eliminated 95% of manual data entry.
              </p>
              
              {/* Bold rectangular CTA aligned to headline */}
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="font-semibold px-10 py-4 text-lg bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-lg"
                >
                  See the system in action
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
              
              {/* Minimal share buttons below CTA */}
              <div className="pt-4">
                <ShareButtons 
                  title="Wholesale Distribution: AI-Powered Business Transformation"
                  summary="Custom automation that eliminated 95% of manual data entry for wholesale operations."
                  url={window.location.href}
                  hashtags={["Business", "AI", "Automation"]}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleHero;