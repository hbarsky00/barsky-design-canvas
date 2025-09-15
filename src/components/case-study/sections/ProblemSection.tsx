
import React from "react";
import { AlertTriangle, TrendingDown, Clock } from "lucide-react";
import MaximizableImage from "@/components/project/MaximizableImage";
import CaseStudySectionHeader from "../CaseStudySectionHeader";

interface ProblemSectionProps {
  title: string;
  businessImpact: string;
  userPain: string;
  gapAnalysis: string;
  wireframingImage?: string;
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
      <CaseStudySectionHeader
        title={title}
        icon={AlertTriangle}
        variant="problem"
      />

      <div className="prose text-gray-700 max-w-none">
        <p className="mb-6">{businessImpact}</p>
      </div>

      {wireframingImage && (
        <div className="mb-8">
          <MaximizableImage
            src={wireframingImage}
            alt="Splittime Wireframing Concepts"
            caption="Wireframes established core structure and user flows early."
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
            projectId="splittime"
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-3">User Pain Points</h4>
          <p className="text-gray-700">{userPain}</p>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-3">The Real Gap</h4>
          <p className="text-gray-700">{gapAnalysis}</p>
        </div>
      </div>

      {metrics.length > 0 && (
        <div className="bg-red-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Before: Key Problem Metrics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex items-center space-x-3">
                {getTrendIcon(metric.trend)}
                <div>
                  <div className="text-xl font-medium text-gray-900">{metric.value}</div>
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
