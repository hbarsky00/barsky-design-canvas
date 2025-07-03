
import React from "react";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";

interface HerbalinkResearchContentProps {
  projectId: string;
  imageCaptions: Record<string, string>;
}

const HerbalinkResearchContent: React.FC<HerbalinkResearchContentProps> = ({
  projectId,
  imageCaptions
}) => {
  return (
    <div className="p-6 bg-blue-50/50 rounded-lg border border-blue-100">
      <div className="prose prose-lg text-gray-700 leading-relaxed">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Research & Discovery</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">User Research</span></h4>
            <p className="text-sm text-gray-700">
              Through in-depth interviews with 12 participants—including 6 potential users and 6 practicing herbalists—I uncovered critical pain points within the herbal wellness ecosystem. Users struggled with finding qualified, credentialed herbalists and felt uncertain about practitioner backgrounds and treatment safety, while high costs and limited rural availability created additional barriers. Meanwhile, herbalists faced challenges building their client base, managing time-consuming intake processes, and maintaining remote client relationships without a centralized platform.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">Competitive Analysis</span></h4>
            <p className="text-sm text-gray-700">
              I analyzed leading wellness platforms including BetterHelp, Headspace Health, and Zocdoc to identify market gaps within the herbal wellness space. The competitive landscape revealed a significant opportunity: no existing platforms specifically serve herbalist consultations. This gap presents unique possibilities for specialized intake forms tailored to herbal needs, educational features that build user confidence in natural wellness approaches, and trust-building elements that address safety concerns while connecting users with qualified practitioners.
            </p>
          </div>

          {/* Design System Image */}
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">Design System</span></h4>
            <p className="text-sm text-gray-700 mb-3">
              Created a comprehensive design system built for natural wellness experiences, emphasizing trust, accessibility, and user empowerment through carefully chosen color palettes and typography that reflect the organic nature of herbal wellness.
            </p>
            <div className="glass-card p-4 layered-depth">
              <EnhancedContentEditor
                content=""
                contentType="section"
                onSave={() => {}}
                images={["/lovable-uploads/a8ef8ea7-ae55-4f15-8f9b-13dcf5efe9d1.png"]}
                onImageAdd={(imageSrc) => {
                  console.log('➕ Adding design system image:', imageSrc);
                }}
                onImageReplace={(imgIndex, newSrc) => {
                  console.log('🔄 Replacing design system image:', newSrc);
                }}
                onImageRemove={() => {}}
                maxImages={1}
                projectId={projectId}
                imageCaptions={{
                  "/lovable-uploads/a8ef8ea7-ae55-4f15-8f9b-13dcf5efe9d1.png": "Herbalink comprehensive design system emphasizing trust, accessibility, and natural wellness through calming colors and user-friendly typography"
                }}
                className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbalinkResearchContent;
