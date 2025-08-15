
import React from "react";
import { X, AlertCircle, Lightbulb } from "lucide-react";
import MaximizableImage from "@/components/project/MaximizableImage";

interface Failure {
  assumption: string;
  attempt: string;
  whyItFailed: string;
  lesson: string;
  image?: string;
}

interface FailuresSectionProps {
  introduction: string;
  failures: Failure[];
  sectionImage?: string;
  projectId?: string;
}

const FailuresSection: React.FC<FailuresSectionProps> = ({
  introduction,
  failures,
  sectionImage,
  projectId
}) => {
  return (
    <div className="space-y-8">
      {sectionImage && (
        <div className="mb-8">
          <MaximizableImage
            src={sectionImage}
            alt="Failed Approaches"
            caption="Learning from iterations that didn't work led to better solutions."
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            projectId={projectId}
          />
        </div>
      )}

      <div className="prose prose-lg text-gray-700 max-w-none">
        <p>{introduction}</p>
      </div>

      <div className="space-y-6">
        {failures.map((failure, index) => (
          <div key={index} className="border border-red-200 rounded-lg overflow-hidden">
            <div className="bg-red-50 p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-red-100 rounded-lg">
                  <X className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-red-900 mb-2">
                    Failed Assumption #{index + 1}
                  </h4>
                  <p className="text-red-800 font-medium mb-2">{failure.assumption}</p>
                  <p className="text-red-700">{failure.attempt}</p>
                </div>
              </div>
            </div>

            {failure.image && (
              <div className="px-6 py-4 bg-gray-50">
                <MaximizableImage
                  src={failure.image}
                  alt={`Failed approach ${index + 1}`}
                  caption={`Iteration ${index + 1} that didn't work as expected.`}
                  className="w-full h-48 object-cover rounded-lg"
                  projectId={projectId}
                />
              </div>
            )}

            <div className="p-6 space-y-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Why It Failed</h5>
                  <p className="text-gray-700">{failure.whyItFailed}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">What I Learned</h5>
                  <p className="text-gray-700">{failure.lesson}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-6 w-6 text-amber-600 mt-1" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Key Takeaway</h4>
            <p className="text-amber-800">
              These failures weren't setbacks—they were essential data points that led to the right solution. 
              Each "no" got us closer to the "yes" that actually worked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailuresSection;
