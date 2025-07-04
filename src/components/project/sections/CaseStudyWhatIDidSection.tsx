import React from "react";
import MaximizableImage from "../MaximizableImage";
import { Badge } from "@/components/ui/badge";
import { ProjectDetails } from "@/data/types/project";

interface CaseStudyWhatIDidSectionProps {
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

const CaseStudyWhatIDidSection: React.FC<CaseStudyWhatIDidSectionProps> = ({
  details,
  projectId,
  images,
  gradients
}) => {
  return (
    <section id="what-i-did" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What I Did</h2>
      </div>

      {/* Process Steps - 3 cards horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: gradients.textColor }}>
            1
          </div>
          <div 
            className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
            style={{ 
              background: gradients.light,
              borderColor: gradients.textColor + '40',
              color: gradients.textColor
            }}
          >
            🔍 Research
          </div>
          <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
            Discovery & Research
          </h4>
          <p className="text-gray-600 leading-relaxed">
            Conducted user interviews and analyzed existing workflows to understand pain points
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: gradients.textColor }}>
            2
          </div>
          <MaximizableImage
            src={images.process}
            alt="Design process"
            caption={details.imageCaptions?.[images.process]}
            className="w-full h-48 object-cover rounded-xl mb-6"
            projectId={projectId}
          />
          <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
            Design & Prototype
          </h4>
          <p className="text-gray-600 leading-relaxed">
            Created wireframes, mockups, and interactive prototypes to test solutions
          </p>
        </div>

        <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative">
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: gradients.textColor }}>
            3
          </div>
          {details.processBottomImage ? (
            <MaximizableImage
              src={details.processBottomImage}
              alt="Process details"
              caption={details.imageCaptions?.[details.processBottomImage]}
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
              🚀 Launch
            </div>
          )}
          <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
            Test & Iterate
          </h4>
          <p className="text-gray-600 leading-relaxed">
            Validated designs with users and refined based on feedback
          </p>
        </div>
      </div>

      {/* Process Description */}
      <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] mb-12">
        <p className="text-lg leading-relaxed text-gray-700 mb-8">
          {details.process}
        </p>
        
        {/* Tech Stack */}
        {details.technologies && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold" style={{ color: gradients.textColor }}>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {details.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="text-sm px-3 py-1"
                  style={{ 
                    backgroundColor: gradients.textColor + '10',
                    color: gradients.textColor,
                    border: `1px solid ${gradients.textColor}20`
                  }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Additional Process Images - 2x2 grid */}
      {details.availableImages && details.availableImages.length > 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.availableImages.slice(1, 5).map((image, index) => (
            <div key={index} className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
              <MaximizableImage
                src={image}
                alt={`Process step ${index + 1}`}
                caption={details.imageCaptions?.[image]}
                className="w-full h-48 object-cover rounded-xl mb-6"
                projectId={projectId}
              />
              <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
                Process Step {index + 1}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Detailed view of the design and development process
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CaseStudyWhatIDidSection;