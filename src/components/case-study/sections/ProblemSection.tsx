
import React from "react";
import { AlertTriangle, TrendingDown, Clock } from "lucide-react";
import MaximizableImage from "@/components/project/MaximizableImage";

interface ProblemSectionProps {
  title: string;
  businessImpact: string;
  userPain: string;
  gapAnalysis: string;
  wireframingImage?: string;
  sectionImage?: string;
  projectId?: string;
  metrics?: Array<{
    label: string;
    value: string;
    trend: "down" | "up" | "neutral";
  }>;
}

const ProblemSection: React.FC<ProblemSectionProps> = ({
  title,
  businessImpact,
  userPain,
  gapAnalysis,
  wireframingImage,
  sectionImage,
  projectId,
  metrics = []
}) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "down":
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case "up":
        return <TrendingDown className="h-5 w-5 text-green-500 rotate-180" />;
      default:
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      {sectionImage && (
        <div className="mb-8">
          <MaximizableImage
            src={sectionImage}
            alt="Problem Analysis"
            caption="Understanding the core challenges users faced when seeking herbalist services."
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            projectId={projectId}
          />
        </div>
      )}

      <div className="prose prose-lg text-gray-700 max-w-none">
        <p className="mb-6">{businessImpact}</p>
      </div>

      {wireframingImage && (
        <div className="mb-8">
          <MaximizableImage
            src={wireframingImage}
            alt="Wireframing Concepts"
            caption="Wireframes established core structure and user flows early."
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
            projectId={projectId}
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">User Pain Points</h4>
          <p className="text-gray-700">{userPain}</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-3">The Real Gap</h4>
          <p className="text-gray-700">{gapAnalysis}</p>
        </div>
      </div>

      {metrics.length > 0 && (
        <div className="bg-red-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Before: Key Problem Metrics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center space-x-3">
                {getTrendIcon(metric.trend)}
                <div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSection;
