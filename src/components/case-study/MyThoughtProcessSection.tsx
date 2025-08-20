import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "@/components/project/MaximizableImage";
import AnnotatedImage from "./AnnotatedImage";
import { ImageAnnotation } from "@/data/structuredCaseStudies";

interface MyThoughtProcessSectionProps {
  content: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
    annotations?: ImageAnnotation[];
  }>;
}

const MyThoughtProcessSection: React.FC<MyThoughtProcessSectionProps> = ({
  content,
  images
}) => {
  return (
    <section className="section-snap py-12 md:py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-eyebrow text-neutral-700 header-spacing">
              APPROACH & DECISION MAKING
            </div>
            <h2 className="text-section-title font-display content-rail-center">
              My Thought Process
            </h2>
          </div>

          {images && images.length > 0 && (
            <div className="space-y-8">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  {image.annotations && image.annotations.length > 0 ? (
                    <AnnotatedImage
                      src={image.src}
                      alt={image.alt}
                      annotations={image.annotations}
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <MaximizableImage
                      src={image.src}
                      alt={image.alt}
                      caption={image.caption}
                      className="w-full rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="content-rail-left">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyThoughtProcessSection;