
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOptimizedImageSrc } from "@/utils/imageOptimization";

const AboutPreview: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                About My Design Process
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  I'm a Product Designer and frontend developer based in New York, 
                  passionate about creating digital experiences that solve real user problems.
                </p>
                <p>
                  My approach combines user research, iterative design, and technical 
                  implementation to deliver solutions that users love and businesses depend on. 
                  From wireframes to working prototypes, I bridge the gap between design and development.
                </p>
                <p>
                  I specialize in user-centered design methodology, ensuring every interface 
                  decision is backed by research insights and usability testing results.
                </p>
              </div>
            </div>

            <Button 
              onClick={scrollToAbout}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              Learn More About My Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Right Side - Professional Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={getOptimizedImageSrc("/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png", window.innerWidth <= 768)}
              loading="lazy"
              fetchPriority="low"
              width="208"
              height="208"
              alt="Hiram Barsky - Product Designer"
              className="aspect-square w-80 mx-auto rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
