import React from "react";
import { X, Lightbulb, ChevronUp } from "lucide-react";
import MaximizableImage from "../../project/MaximizableImage";

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
}

const FailuresSection: React.FC<FailuresSectionProps> = ({
  introduction,
  failures
}) => {
  return (
    <div className="space-y-8">
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
                    Mistake #{index + 1}
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
                  className="w-full h-48 object-cover rounded-lg shadow-elevated glass-card layered-depth"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">What didn't work</h5>
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

      {/* Back to Top Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-gray-900"
        >
          <ChevronUp className="h-4 w-4" />
          <span>Back to Top</span>
        </button>
      </div>
    </div>
  );
};

export default FailuresSection;