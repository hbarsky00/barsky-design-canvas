import React from "react";
import { Brain, Compass, Zap, Scale } from "lucide-react";

interface DecisionPoint {
  situation: string;
  options: string[];
  chosenPath: string;
  reasoning: string;
  tradeoffs: string[];
}

interface ProcessSectionProps {
  overview: string;
  mentalModels: string[];
  keyPrinciples: string[];
  decisions: DecisionPoint[];
  personalInsight: string;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  overview,
  mentalModels,
  keyPrinciples,
  decisions,
  personalInsight
}) => {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg text-gray-700 max-w-none">
        <p>{overview}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Brain className="h-6 w-6 text-blue-600 mt-0.5" />
            <h4 className="text-lg font-semibold text-blue-900 leading-tight">Mental Models Used</h4>
          </div>
          <ul className="space-y-2">
            {mentalModels.map((model, index) => (
              <li key={index} className="text-blue-800 flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>{model}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <Compass className="h-6 w-6 text-purple-600 mt-0.5" />
            <h4 className="text-lg font-semibold text-purple-900 leading-tight">Guiding Principles</h4>
          </div>
          <ul className="space-y-2">
            {keyPrinciples.map((principle, index) => (
              <li key={index} className="text-purple-800 flex items-center space-x-2">
                <span className="text-purple-600">•</span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-gray-900 flex items-start space-x-2">
          <Zap className="h-6 w-6 text-yellow-600 mt-1" />
          <span className="leading-tight">Key Decision Points</span>
        </h4>

        {decisions.map((decision, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-6">
              <h5 className="font-semibold text-gray-900 mb-3">
                Decision #{index + 1}: {decision.situation}
              </h5>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">Options Considered:</h6>
                  <ul className="space-y-1">
                    {decision.options.map((option, optIndex) => (
                      <li key={optIndex} className="text-gray-600 text-sm">
                        • {option}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h6 className="font-medium text-gray-700 mb-2">Chosen Path:</h6>
                  <p className="text-gray-800 font-medium">{decision.chosenPath}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h6 className="font-medium text-gray-900 mb-2">My Reasoning:</h6>
                <p className="text-gray-700">{decision.reasoning}</p>
              </div>

              <div className="flex items-center space-x-3">
                <Scale className="h-5 w-5 text-gray-600" />
                <div>
                  <h6 className="font-medium text-gray-900 mb-2">Tradeoffs Accepted:</h6>
                  <ul className="space-y-1">
                    {decision.tradeoffs.map((tradeoff, tradeoffIndex) => (
                      <li key={tradeoffIndex} className="text-gray-600 text-sm">
                        • {tradeoff}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-blue-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start space-x-3">
          <Brain className="h-6 w-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 leading-tight">Personal Insight</h4>
            <p className="text-gray-900 font-medium">{personalInsight}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
