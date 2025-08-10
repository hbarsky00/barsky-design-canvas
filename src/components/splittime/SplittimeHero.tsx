import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/blog/ShareButtons";

interface SplittimeHeroProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}

const SplittimeHero: React.FC<SplittimeHeroProps> = ({ onImageClick, onImageKeypress }) => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Single focal background image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png" 
          alt="Splittime co-parenting dashboard"
          className="w-full h-full object-cover object-center"
        />
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
                  Helping Co-Parents Communicate with Clarity
                </h1>
                
                {/* High contrast readable subtext */}
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                  Streamlined tools that reduce conflict and put children first.
                </p>
                
                {/* Bold rectangular CTA button */}
                <div className="pt-2">
                  <Button 
                    size="lg" 
                    variant="brand"
                    className="font-bold"
                    onClick={() => window.open('http://splittime.pro', '_blank')}
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
    </section>
  );
};

export default SplittimeHero;