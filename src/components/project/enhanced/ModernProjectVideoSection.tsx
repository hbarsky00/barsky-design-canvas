
import React from "react";
import { motion } from "framer-motion";
import { getEmbedUrl } from "@/utils/videoUtils";

interface ModernProjectVideoSectionProps {
  projectId: string;
}

const ModernProjectVideoSection: React.FC<ModernProjectVideoSectionProps> = ({
  projectId
}) => {
  // Only show video section for medication app
  if (projectId !== "medication-app") {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div className="glass-card-elevated p-8 layered-depth">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Project Demo Video
        </h2>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-elevated-lg glass-card p-2">
          <iframe
            src={getEmbedUrl("https://youtu.be/iDbqHuz6d2A?si=d7YH6RWXhH7gIoqA")}
            title="Medication App Demo Video"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </motion.section>
  );
};

export default ModernProjectVideoSection;
