
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPreview: React.FC = () => {
  const stats = [
    { icon: Eye, label: "Design Projects", value: "7+" },
    { icon: Users, label: "Happy Clients", value: "8+" },
    { icon: Clock, label: "Years Experience", value: "5+" },
    { icon: Award, label: "Design Tools", value: "10+" },
  ];

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
                  I'm a UX/UI designer and frontend developer based in New York, 
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

          {/* Right Side - Stats & Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Professional Photo */}
            <div className="relative">
              <div className="aspect-square w-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
                  alt="Hiram Barsky - UX/UI Designer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating Accent */}
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center"
                >
                  <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
