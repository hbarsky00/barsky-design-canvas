import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { homepageCaseStudyPreviews } from "@/data/caseStudies";

const VideoCaseStudiesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Case Studies That Drive Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real projects. Measurable outcomes. See how I transform business challenges into digital solutions.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {homepageCaseStudyPreviews.map((study, index) => {
            const handleMouseEnter = () => {
              setHoveredIndex(index);
              const video = videoRefs.current[index];
              if (video && window.innerWidth > 768) { // Only on non-mobile devices
                video.currentTime = 0;
                video.play().catch(() => {
                  // Silently handle autoplay failures
                });
              }
            };

            const handleMouseLeave = () => {
              setHoveredIndex(null);
              const video = videoRefs.current[index];
              if (video) {
                video.pause();
                video.currentTime = 0;
              }
            };

            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  to={study.url}
                  className="group block h-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:scale-[1.02]">
                  {/* Video Preview */}
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      poster={`/images/${study.videoThumbnail}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      muted
                      loop
                      playsInline
                      preload="none"
                    >
                      <source src={`/videos/${study.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Impact Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900 font-semibold">
                        Case Study
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                      {study.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-primary font-semibold group-hover:text-primary/80 transition-colors">
                      <span>Read Case Study</span>
                      <ArrowRight 
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                          hoveredIndex === index ? 'translate-x-1' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            View All Case Studies
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoCaseStudiesSection;