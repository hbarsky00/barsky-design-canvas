
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
          src="https://barskyux.com/wp-content/uploads/2025/08/signupscree.png" 
          alt="Splittime co-parenting dashboard showing neutral communication tools"
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
                  40% Less Conflict in Co-Parenting Communication
                </h1>
                
                {/* High contrast readable subtext */}
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                  Neutral communication tools and stress-aware design that puts children first, reducing conflict by 40% in the first three months.
                </p>
                
                {/* Bold rectangular CTA button */}
                <div className="pt-2">
                  <Button 
                    size="lg" 
                    variant="brand"
                    className="font-bold"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.open('http://splittime.pro', '_blank');
                      }
                    }}
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
