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
    <section id="my-thought-process" className="scroll-mt-24 section-snap py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <Badge variant="outline" className="uppercase text-xs font-semibold tracking-wide">
              My Thought Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-left">
              Approach & Decision Making
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

          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
              {content}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyThoughtProcessSection;