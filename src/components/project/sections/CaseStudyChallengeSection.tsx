import React from "react";
import MaximizableImage from "../MaximizableImage";
import { ProjectDetails } from "@/data/types/project";

interface CaseStudyChallengeSectionProps {
  details: ProjectDetails;
  projectId: string;
  images: {
    hero: string;
    challenge: string;
    process: string;
    result: string;
  };
  gradients: {
    hero: string;
    light: string;
    medium: string;
    textColor: string;
  };
}

const CaseStudyChallengeSection: React.FC<CaseStudyChallengeSectionProps> = ({
  details,
  projectId,
  images,
  gradients
}) => {
  return (
    <section id="challenge" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">The Challenge</h2>
      </div>
      
      {/* Highlight Box */}
      <div 
        className="rounded-2xl p-8 mb-12" 
        style={{ 
          background: gradients.light,
          border: `2px solid ${gradients.textColor}20`
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ color: gradients.textColor }}>
          Primary Challenge
        </h3>
        <p className="text-lg leading-relaxed text-gray-700">
          {details.challenge}
        </p>
        {details.challengeAdditionalText && (
          <p className="text-base leading-relaxed text-gray-600 mt-4">
            {details.challengeAdditionalText}
          </p>
        )}
      </div>

      {/* Image Gallery - 3 cards horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
          <div 
            className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
            style={{ 
              background: gradients.medium,
              borderColor: gradients.textColor + '40',
              color: gradients.textColor
            }}
          >
            🎯 Challenge Image 1
          </div>
          <h4 className="font-bold text-lg mb-2" style={{ color: gradients.textColor }}>
            User Research
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Understanding user pain points and current workflow challenges
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
          <MaximizableImage
            src={images.challenge}
            alt="Challenge visualization"
            caption={details.imageCaptions?.[images.challenge]}
            className="w-full h-48 object-cover rounded-xl mb-6"
            projectId={projectId}
          />
          <h4 className="font-bold text-lg mb-2" style={{ color: gradients.textColor }}>
            Current Issues
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Identifying key problems in the existing system
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
          {details.challengeGalleryImages?.[1] ? (
            <MaximizableImage
              src={details.challengeGalleryImages[1]}
              alt="Challenge details"
              caption={details.imageCaptions?.[details.challengeGalleryImages[1]]}
              className="w-full h-48 object-cover rounded-xl mb-6"
              projectId={projectId}
            />
          ) : (
            <div 
              className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
              style={{ 
                background: gradients.medium,
                borderColor: gradients.textColor + '40',
                color: gradients.textColor
              }}
            >
              📊 Analysis
            </div>
          )}
          <h4 className="font-bold text-lg mb-2" style={{ color: gradients.textColor }}>
            Requirements
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Defining success criteria and project requirements
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyChallengeSection;