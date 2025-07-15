import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import MaximizableImage from "../MaximizableImage";
import ShareButtons from "@/components/blog/ShareButtons";
import { getOptimizedImageSrc } from "@/utils/imageOptimization";

const HeroSection: React.FC = () => {
  const [heroImageSrc, setHeroImageSrc] = useState("/lovable-uploads/340a0484-22a4-4c70-bf1e-4ec47c317bfb.png");

  const handleImageReplace = (newSrc: string) => {
    setHeroImageSrc(newSrc);
  };
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Mobile Layout: Content First, Then Image */}
        <div className="lg:hidden space-y-8">
          <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="h-8 w-8 text-amber-600" />
              <span className="text-amber-700 font-semibold">The Story Hook</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              From Restaurant Chat to Business Solution
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              A wholesale distribution business was trapped by software that looked professional but failed at every critical moment. 
              Clickable buttons that did nothing, endless screens hiding simple tasks, and hours of manual work that modern tools should automate - 
               all while paying premium prices for the frustration.
             </p>
             
             {/* Share Buttons */}
             <div className="mt-6">
               <ShareButtons 
                 title="Wholesale Distribution: Excel to Custom App Case Study"
                 summary="From Excel spreadsheets to AI-powered business solution. See how custom app development transformed wholesale operations with 95% reduction in manual data entry."
                 url={window.location.href}
                 hashtags={["BusinessAutomation", "CustomSoftware", "AI", "CaseStudy", "WorkflowOptimization"]}
               />
             </div>
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
          }} className="relative space-y-6">
            <MaximizableImage
              src={getOptimizedImageSrc(heroImageSrc)}
              alt="QuickFlow Business Dashboard - Full interface showing comprehensive sales analytics and business management features"
              caption="QuickFlow Business Dashboard - Complete Interface"
              className="w-full h-auto object-contain shadow-xl mx-auto rounded-lg"
              projectId="wholesale-distribution"
              onImageReplace={handleImageReplace}
              width={1200}
              height={800}
              aspectRatio="3/2"
              priority={true}
            />
            
            <iframe 
              src="https://www.loom.com/embed/7b6a6a8e7ecc4c29b39b35d9be1ad3a3" 
              frameBorder="0" 
              allowFullScreen 
              className="w-full h-[300px] shadow-2xl rounded-lg"
            ></iframe>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200">
              <p className="text-lg italic text-gray-800">
                "Sometimes the best projects come from genuine conversations, not cold pitches."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout: Content First, Then Image */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-8 w-8 text-amber-600" />
                <span className="text-amber-700 font-semibold">The Story Hook</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                From Restaurant Chat to Business Solution
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                A wholesale distribution business was trapped by software that looked professional but failed at every critical moment. 
                Clickable buttons that did nothing, endless screens hiding simple tasks, and hours of manual work that modern tools should automate - 
                 all while paying premium prices for the frustration.
               </p>
               
               {/* Share Buttons */}
               <div className="mt-6">
                 <ShareButtons 
                   title="Wholesale Distribution: Excel to Custom App Case Study"
                   summary="From Excel spreadsheets to AI-powered business solution. See how custom app development transformed wholesale operations with 95% reduction in manual data entry."
                   url={window.location.href}
                   hashtags={["BusinessAutomation", "CustomSoftware", "AI", "CaseStudy", "WorkflowOptimization"]}
                 />
               </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-amber-200">
              <p className="text-lg italic text-gray-800">
                "Sometimes the best projects come from genuine conversations, not cold pitches."
              </p>
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
          }} className="relative space-y-6">
            <MaximizableImage
              src={getOptimizedImageSrc(heroImageSrc)}
              alt="QuickFlow Business Dashboard - Full interface showing comprehensive sales analytics and business management features"
              caption="QuickFlow Business Dashboard - Complete Interface"
              className="w-full h-auto object-contain shadow-xl mx-auto rounded-lg max-w-md"
              projectId="wholesale-distribution"
              onImageReplace={handleImageReplace}
              width={1200}
              height={800}
              aspectRatio="3/2"
              priority={true}
            />
            
            <iframe 
              src="https://www.loom.com/embed/7b6a6a8e7ecc4c29b39b35d9be1ad3a3" 
              frameBorder="0" 
              allowFullScreen 
              className="w-full h-[400px] shadow-2xl rounded-lg"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;