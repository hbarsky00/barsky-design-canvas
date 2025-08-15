
import React from "react";
import { TrendingUp, Target, Award } from "lucide-react";
import MaximizableImage from "@/components/project/MaximizableImage";

interface ImpactMetric {
  label: string;
  value: string;
  improvement: string;
  category: "revenue" | "efficiency" | "user" | "business";
}

interface ImpactSectionProps {
  overview: string;
  metrics: ImpactMetric[];
  timeframe?: string;
  sectionImage?: string;
  projectId?: string;
}

const ImpactSection: React.FC<ImpactSectionProps> = ({
  overview,
  metrics,
  timeframe = "6 months post-launch",
  sectionImage,
  projectId
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "revenue":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "efficiency":
        return <Target className="h-5 w-5 text-blue-600" />;
      case "user":
        return <Award className="h-5 w-5 text-purple-600" />;
      default:
        return <TrendingUp className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "revenue":
        return "bg-green-50 border-green-200";
      case "efficiency":
        return "bg-blue-50 border-blue-200";
      case "user":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {sectionImage && (
        <div className="mb-8">
          <MaximizableImage
            src={sectionImage}
            alt="Impact Results"
            caption="Measurable improvements achieved through strategic design decisions."
            className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
            projectId={projectId}
          />
        </div>
      )}

      <div className="prose prose-lg text-gray-700 max-w-none">
        <p>{overview}</p>
        {timeframe && (
          <p className="text-sm text-gray-600 italic">Measured {timeframe}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`border rounded-lg p-6 ${getCategoryColor(metric.category)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(metric.category)}
                <h4 className="font-semibold text-gray-900">{metric.label}</h4>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-lg font-medium text-green-700">{metric.improvement}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <TrendingUp className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Bottom Line Impact</h4>
            <p className="text-green-800">
              These improvements directly contributed to measurable business outcomes, 
              validating the design decisions and strategic approach taken.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;
