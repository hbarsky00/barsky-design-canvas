import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButtons from "@/components/blog/ShareButtons";
interface SplittimeHeroProps {
  onImageClick: (imageId: string) => void;
  onImageKeypress: (event: React.KeyboardEvent, imageId: string) => void;
}
const SplittimeHero: React.FC<SplittimeHeroProps> = ({
  onImageClick,
  onImageKeypress
}) => {
  return <section className="family-harmony-introduction py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Layout: Image First */}
        <div className="lg:hidden space-y-8">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="relative">
            <figure className="project-image-container">
              <img src="/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png" alt="Splittime co-parenting dashboard with shared calendar integration" className="clickable-image w-full h-[400px] object-cover shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02] rounded-3xl" onClick={() => onImageClick('splittime-hero-1')} tabIndex={0} onKeyDown={e => onImageKeypress(e, 'splittime-hero-1')} role="button" aria-label="Click to view Splittime co-parenting dashboard in full screen" id="splittime-hero-1" />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                Splittime co-parenting dashboard with shared calendar integration
              </figcaption>
            </figure>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-10 w-10 text-blue-600" />
              <span className="text-blue-700 font-semibold text-lg">Family Harmony</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
              From Conflict to
              <span className="text-blue-600 block">Collaboration</span>
            </h1>
            
            <p className="text-lg text-neutral-600 leading-relaxed">
              When separated parents struggle with fragmented communication, missed schedules, and emotional 
              tensions, children suffer the consequences. Splittime transforms chaotic co-parenting into 
              coordinated collaboration, putting children's wellbeing first through streamlined digital tools.
            </p>
            
            {/* Share Buttons */}
            <div className="mt-6">
              <ShareButtons title="Splittime: Co-Parenting App Case Study" summary="Transforming co-parenting from conflict to collaboration with AI-powered features that reduce communication stress and improve family coordination." url={window.location.href} hashtags={["UXDesign", "FamilyTech", "CoParenting", "CaseStudy", "MobileUX"]} />
            </div>
            
            <Button size="lg" variant="default" className="font-semibold px-10 py-6 text-lg group bg-blue-600 hover:bg-blue-700" onClick={() => window.open('http://splittime.pro', '_blank')}>
              Visit Live Site
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-blue-200 shadow-lg">
              <div className="flex items-start gap-4">
                <Baby className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium text-neutral-800 mb-2">
                    Child-First Philosophy
                  </p>
                  <p className="text-neutral-600 italic">
                    "Co-parenting tools should reduce conflict, not create more. When parents can communicate 
                    respectfully and coordinate effectively, children thrive in both homes."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-10 w-10 text-blue-600" />
              <span className="text-blue-700 font-semibold text-lg">Family Harmony</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight">
              From Conflict to
              <span className="text-blue-600 block">Collaboration</span>
            </h1>
            
            <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
              When separated parents struggle with fragmented communication, missed schedules, and emotional 
              tensions, children suffer the consequences. Splittime transforms chaotic co-parenting into 
              coordinated collaboration, putting children's wellbeing first through streamlined digital tools.
            </p>
            
            {/* Share Buttons */}
            <div className="mt-6">
              <ShareButtons title="Splittime: Co-Parenting App Case Study" summary="Transforming co-parenting from conflict to collaboration with AI-powered features that reduce communication stress and improve family coordination." url={window.location.href} hashtags={["UXDesign", "FamilyTech", "CoParenting", "CaseStudy", "MobileUX"]} />
            </div>
            
            <Button size="lg" variant="default" className="font-semibold px-10 py-6 text-lg group bg-blue-600 hover:bg-blue-700" onClick={() => window.open('http://splittime.pro', '_blank')}>
              Visit Live Site
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-blue-200 shadow-lg">
              <div className="flex items-start gap-4">
                <Baby className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium text-neutral-800 mb-2">
                    Child-First Philosophy
                  </p>
                  <p className="text-neutral-600 italic object-cover">
                    "Co-parenting tools should reduce conflict, not create more. When parents can communicate 
                    respectfully and coordinate effectively, children thrive in both homes."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative">
            <figure className="project-image-container">
              <img src="/lovable-uploads/5474d2fe-6139-4e5b-8e46-ccc6e40b7417.png" alt="Splittime co-parenting dashboard with shared calendar integration" className="clickable-image w-full h-[500px] object-cover shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02] rounded-3xl" onClick={() => onImageClick('splittime-hero-1')} tabIndex={0} onKeyDown={e => onImageKeypress(e, 'splittime-hero-1')} role="button" aria-label="Click to view Splittime co-parenting dashboard in full screen" id="splittime-hero-1" />
              <figcaption className="text-sm text-gray-600 italic mt-2 text-center">
                Splittime co-parenting dashboard with shared calendar integration
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default SplittimeHero;