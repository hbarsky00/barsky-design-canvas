import React from "react";
import MaximizableImage from "../MaximizableImage";
import { ProjectDetails } from "@/data/types/project";

interface CaseStudyResultsSectionProps {
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

const CaseStudyResultsSection: React.FC<CaseStudyResultsSectionProps> = ({
  details,
  projectId,
  images,
  gradients
}) => {
  return (
    <section id="results" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Results & Impact</h2>
      </div>

      {/* Stats Grid - 4 metrics horizontal */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
            85%
          </div>
          <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
            User Satisfaction
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
            40%
          </div>
          <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
            Time Saved
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
            92%
          </div>
          <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
            Task Completion
          </div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
            200+
          </div>
          <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
            Active Users
          </div>
        </div>
      </div>

      {/* Results Cards - 2 large cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
          <MaximizableImage
            src={images.result}
            alt="Project results"
            caption={details.imageCaptions?.[images.result]}
            className="w-full h-48 object-cover rounded-xl mb-6"
            projectId={projectId}
          />
          <h4 className="font-bold text-xl mb-4" style={{ color: gradients.textColor }}>
            Primary Outcomes
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {details.result}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
          {details.resultGalleryImages?.[1] ? (
            <MaximizableImage
              src={details.resultGalleryImages[1]}
              alt="Additional results"
              caption={details.imageCaptions?.[details.resultGalleryImages[1]]}
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
              📈 Impact
            </div>
          )}
          <h4 className="font-bold text-xl mb-4" style={{ color: gradients.textColor }}>
            Long-term Impact
          </h4>
          <p className="text-gray-600 leading-relaxed">
            The solution continues to provide value through improved user experience and streamlined workflows, resulting in measurable business impact.
          </p>
        </div>
      </div>

      {/* Project Links */}
      {details.projectLink && (
        <div 
          className="rounded-2xl p-8 text-center"
          style={{ 
            background: gradients.light,
            border: `2px solid ${gradients.textColor}20`
          }}
        >
          <a 
            href={details.projectLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 font-medium rounded-xl transition-all duration-300 text-white hover:shadow-lg"
            style={{ 
              backgroundColor: gradients.textColor,
            }}
          >
            View Live Project →
          </a>
        </div>
      )}
    </section>
  );
};

export default CaseStudyResultsSection;