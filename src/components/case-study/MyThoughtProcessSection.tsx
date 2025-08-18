import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "@/components/project/MaximizableImage";

interface MyThoughtProcessSectionProps {
  content: string;
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

const MyThoughtProcessSection: React.FC<MyThoughtProcessSectionProps> = ({
  content,
  images
}) => {
  return (
    <section id="my-thought-process" className="scroll-mt-24 section-snap section-spacing">
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
            <h2 className="text-section-title content-rail-center">
              My Thought Process
            </h2>
          </div>

          {images && images.length > 0 && (
            <div className="space-y-4">
              {images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <MaximizableImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full rounded-lg"
                  />
                  {image.caption && (
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="text-xs px-3 py-1">
                        {image.caption}
                      </Badge>
                    </div>
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