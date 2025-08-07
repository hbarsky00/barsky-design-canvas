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
                Helping co-parents communicate with clarity
              </h1>
              
              {/* Short high-contrast subtext */}
              <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                Streamlined tools that reduce conflict and put children first.
              </p>
              
              {/* Bold rectangular CTA aligned to headline */}
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="font-semibold px-10 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg" 
                  onClick={() => window.open('http://splittime.pro', '_blank')}
                >
                  See the app in action
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
              
              {/* Minimal share buttons below CTA */}
              <div className="pt-4">
                <ShareButtons 
                  title="Splittime: Co-Parenting App Case Study"
                  summary="Helping co-parents communicate with clarity through streamlined digital tools."
                  url={window.location.href}
                  hashtags={["UXDesign", "FamilyTech", "CoParenting"]}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplittimeHero;