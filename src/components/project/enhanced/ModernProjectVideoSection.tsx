
import React from "react";
import { motion } from "framer-motion";
import { getEmbedUrl } from "@/utils/videoUtils";

interface ModernProjectVideoSectionProps {
  projectId: string;
}

const ModernProjectVideoSection: React.FC<ModernProjectVideoSectionProps> = ({
  projectId
}) => {
  // Define which projects have videos and their URLs
  const projectVideos: Record<string, { url: string; title: string }> = {
    "medication-app": {
      url: "https://youtu.be/iDbqHuz6d2A?si=d7YH6RWXhH7gIoqA",
      title: "Medication App Demo Video"
    },
    "investor-loan-app": {
      url: "https://youtu.be/iUT_tUwJeD8?si=adGE7dhq6a4Q6BCZ",
      title: "Investor Loan App Demo Video"
    }
  };

  const videoData = projectVideos[projectId];

  // Only show video section if project has a video
  if (!videoData) {
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
            src={getEmbedUrl(videoData.url)}
            title={videoData.title}
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
