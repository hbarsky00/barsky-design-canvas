
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import MaximizableImage from "./MaximizableImage";

interface ProjectMultiImageGalleryProps {
  images: string[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ProjectMultiImageGallery: React.FC<ProjectMultiImageGalleryProps> = ({
  images,
  imageCaptions = {},
}) => {
  const [isGridView, setIsGridView] = useState(true);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Project Gallery</h3>
        <div className="flex gap-2">
          <Button
            variant={isGridView ? "default" : "outline"}
            size="sm"
            onClick={() => setIsGridView(true)}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={!isGridView ? "default" : "outline"}
            size="sm"
            onClick={() => setIsGridView(false)}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-4 layered-depth"
            >
              <MaximizableImage
                src={image}
                alt={`Gallery image ${index + 1}`}
                caption={imageCaptions[image]}
                imageList={images}
                currentIndex={index}
                className="rounded-lg shadow-elevated w-full"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 layered-depth"
            >
              <MaximizableImage
                src={image}
                alt={`Gallery image ${index + 1}`}
                caption={imageCaptions[image]}
                imageList={images}
                currentIndex={index}
                className="rounded-lg shadow-elevated w-full"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectMultiImageGallery;
