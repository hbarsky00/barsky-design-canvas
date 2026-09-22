import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const HumanConnectionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-pink-600" />
          <span className="text-pink-700 font-semibold">Why This Project Matters</span>
        </div>
        
        <motion.div 
          initial={{
            opacity: 0,
            scale: 0.95
          }} 
          whileInView={{
            opacity: 1,
            scale: 1
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: 0.8
          }} 
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-pink-200"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            The Best Solutions Come from Genuine Relationships
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            This isn't just another portfolio piece. It's proof that the best solutions come from genuine relationships 
            and understanding real human problems, not just following design trends.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-pink-50 p-6 rounded-2xl">
              <p className="text-lg italic text-gray-800 mb-4">
                "Finally, someone who actually listened to what we needed instead of selling us features"
              </p>
              <p className="font-semibold text-pink-700">- Wholesale Distribution Client</p>
            </div>
            <div className="bg-rose-50 p-6 rounded-2xl">
              <p className="text-lg italic text-gray-800 mb-4">
                "This is what happens when you design for actual people doing actual work"
              </p>
              <p className="font-semibold text-rose-700">- Business Owner</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HumanConnectionSection;