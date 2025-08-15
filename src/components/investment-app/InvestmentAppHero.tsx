
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const InvestmentAppHero: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] overflow-hidden rounded-3xl">
      {/* Single focal background image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png" 
          alt="Investment app interface showing simplified portfolio tracking with clean design and educational elements for beginner investors" 
          className="w-full h-full object-cover object-center" 
        />
        {/* Strong dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Left-aligned content with subtle background */}
      <div className="relative z-10 flex items-center min-h-[80vh]">
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
                  Making Investing Accessible to Everyone
                </h1>
                
                {/* High contrast readable subtext */}
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                  Educational design that turns investment complexity into confidence.
                </p>
                
                {/* Bold rectangular CTA button */}
                <div className="pt-2">
                  <Button 
                    size="lg" 
                    variant="brand"
                    className="font-bold"
                  >
                    See the App in Action
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAppHero;
