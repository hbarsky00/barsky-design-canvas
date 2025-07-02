
import React from "react";

const SpittimeResearchContent: React.FC = () => {
  return (
    <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
      <div className="prose prose-lg text-gray-700 leading-relaxed">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Research & User Insights</h3>
        
        <div className="space-y-6">
          <div className="text-sm text-gray-700">
            <p>
              Based on comprehensive research methodology that included 12 in-depth interviews with divorced and separated parents, 8 interviews with family counselors and mediators, a survey of over 150 parents currently using existing co-parenting tools, and competitive analysis of 8 existing co-parenting applications, several critical pain points emerged. The research revealed that parents consistently struggle with emotional triggers embedded in standard messaging systems, face scheduling chaos without centralized coordination systems, encounter ongoing financial disputes over child-related expenses, experience documentation issues that lead to critical information loss, and worry about their children being caught in the middle of parental conflicts.
            </p>
            <p className="mt-4">
              Three distinct user personas crystallized from this research: the Overwhelmed Parent who struggles to balance demanding work schedules with complex childcare coordination needs, the Detail-Oriented Parent who requires comprehensive tracking and documentation capabilities to manage every aspect of co-parenting arrangements, and the Conflict-Avoidant Parent who desperately seeks solutions that minimize direct communication with their ex-partner while still maintaining effective coordination for their children's wellbeing.
            </p>
          </div>
          
          {/* Research Video */}
          <div className="mt-6">
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.loom.com/embed/0bf47ee2418c46dd9196ec72afad5a39?sid=c5f0df22-3e30-4ac2-8ffe-39e5cfb4b08d"
                  className="absolute inset-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                  title="Splittime Research Process Video"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpittimeResearchContent;
