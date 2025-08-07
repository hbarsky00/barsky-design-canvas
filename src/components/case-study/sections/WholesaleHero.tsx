import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/blog/ShareButtons";

const WholesaleHero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Full-width hero image with overlay */}
      <div className="absolute inset-0">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/warehouse-demo.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="/lovable-uploads/warehouse-fallback.jpg" 
            alt="Wholesale distribution warehouse operations"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        {/* Play Demo Overlay */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-20">
          <button 
            className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-8 hover:bg-white/30 transition-all duration-300 group"
            aria-label="View demo"
          >
            <div className="flex items-center gap-4 text-white">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-8 h-8 ml-1" />
              </div>
              <span className="text-xl font-medium hidden sm:block">View Demo</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-center min-h-[80vh] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Turning Excel Chaos into AI-Powered Efficiency
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed">
                Custom automation that eliminated 95% of manual data entry for wholesale operations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="font-medium px-8 py-4 text-lg bg-white text-blue-600 hover:bg-white/90"
                >
                  See the System in Action
                </Button>
                
                <div className="sm:mt-0">
                  <ShareButtons 
                    title="Wholesale Distribution: AI-Powered Business Transformation"
                    summary="Custom automation that eliminated 95% of manual data entry for wholesale operations."
                    url={window.location.href}
                    hashtags={["Business", "AI", "Automation"]}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleHero;