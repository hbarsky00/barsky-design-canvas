
import React from "react";
import { motion } from "framer-motion";
import { generateProjectImages } from "@/utils/projectImageGenerator";
import { projectDetails } from "@/data/project-details";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ChallengeSolutionSectionProps {
  challenge: string;
  result: string;
  projectId: string;
}

const ChallengeSolutionSection: React.FC<ChallengeSolutionSectionProps> = ({
  challenge,
  result,
  projectId
}) => {
  const { challengeImage, solutionImage } = generateProjectImages(projectId);
  const details = projectDetails[projectId];
  const challengeGalleryImages = details?.challengeGalleryImages || [];
  const resultGalleryImages = details?.resultGalleryImages || [];

  return (
    <section className="case-study-section">
      {/* Challenge Image - Only show if image exists */}
      {challengeImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img
            src={challengeImage}
            alt="Challenge illustration"
            className="w-full max-w-4xl mx-auto h-64 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="process-card"
        >
          <h2 className="text-heading-2 text-navy-primary mb-6">The Challenge</h2>
          <p className="text-body text-neutral-500 leading-relaxed mb-6">
            {challenge}
          </p>
          
          {/* Challenge Gallery Images */}
          {challengeGalleryImages && challengeGalleryImages.length > 0 && (
            <div className="mt-6">
              <ProjectMultiImageGallery 
                images={challengeGalleryImages}
                captions={{}}
              />
            </div>
          )}
        </motion.div>
        
        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="process-card"
        >
          <h2 className="text-heading-2 text-navy-primary mb-6">The Solution</h2>
          
          {/* Solution Image - Only show if image exists */}
          {solutionImage && (
            <div className="mb-6">
              <img
                src={solutionImage}
                alt="Solution illustration"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          <p className="text-body text-neutral-500 leading-relaxed mb-6">
            {result}
          </p>

          {/* Result Gallery Images */}
          {resultGalleryImages && resultGalleryImages.length > 0 && (
            <div className="mt-6">
              <ProjectMultiImageGallery 
                images={resultGalleryImages}
                captions={{}}
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ChallengeSolutionSection;
