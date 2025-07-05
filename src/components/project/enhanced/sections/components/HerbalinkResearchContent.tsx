
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
            <div className="glass-card p-4 layered-depth mb-4">
              <EnhancedContentEditor
                content=""
                contentType="section"
                onSave={() => {}}
                images={["/lovable-uploads/e885cc25-4dee-44c9-bed4-c01c97dfefde.png"]}
                onImageAdd={(imageSrc) => {
                  console.log('➕ Adding user research image:', imageSrc);
                }}
                onImageReplace={(imgIndex, newSrc) => {
                  console.log('🔄 Replacing user research image:', newSrc);
                }}
                onImageRemove={() => {}}
                maxImages={1}
                projectId={projectId}
                imageCaptions={{
                  "/lovable-uploads/e885cc25-4dee-44c9-bed4-c01c97dfefde.png": "User research findings and analysis showing key insights from herbalist and patient interviews"
                }}
                className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
              />
            </div>
            <p className="text-sm text-gray-700">
              Through in-depth interviews with 12 participants—including 6 potential users and 6 practicing herbalists—I uncovered critical pain points within the herbal wellness ecosystem. Users struggled with finding qualified, credentialed herbalists and felt uncertain about practitioner backgrounds and treatment safety, while high costs and limited rural availability created additional barriers. Meanwhile, herbalists faced challenges building their client base, managing time-consuming intake processes, and maintaining remote client relationships without a centralized platform.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">Competitive Analysis</span></h4>
            <div className="glass-card p-4 layered-depth mb-4">
              <EnhancedContentEditor
                content=""
                contentType="section"
                onSave={() => {}}
                images={["/lovable-uploads/fc11dcb5-634f-4317-9585-d8661064189b.png"]}
                onImageAdd={(imageSrc) => {
                  console.log('➕ Adding competitive analysis image:', imageSrc);
                }}
                onImageReplace={(imgIndex, newSrc) => {
                  console.log('🔄 Replacing competitive analysis image:', newSrc);
                }}
                onImageRemove={() => {}}
                maxImages={1}
                projectId={projectId}
                imageCaptions={{
                  "/lovable-uploads/fc11dcb5-634f-4317-9585-d8661064189b.png": "Competitive analysis of wellness platforms showing market gaps and opportunities for herbalist consultation services"
                }}
                className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
              />
            </div>
            <p className="text-sm text-gray-700">
              I analyzed leading wellness platforms including BetterHelp, Headspace Health, and Zocdoc to identify market gaps within the herbal wellness space. The competitive landscape revealed a significant opportunity: no existing platforms specifically serve herbalist consultations. This gap presents unique possibilities for specialized intake forms tailored to herbal needs, educational features that build user confidence in natural wellness approaches, and trust-building elements that address safety concerns while connecting users with qualified practitioners.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-3"><span className="font-bold">Key Findings</span></h4>
            <div className="glass-card p-4 layered-depth mb-4">
              <EnhancedContentEditor
                content=""
                contentType="section"
                onSave={() => {}}
                images={["/lovable-uploads/1f8118aa-5998-40f1-9c7b-09888e31bbdf.png"]}
                onImageAdd={(imageSrc) => {
                  console.log('➕ Adding key findings image:', imageSrc);
                }}
                onImageReplace={(imgIndex, newSrc) => {
                  console.log('🔄 Replacing key findings image:', newSrc);
                }}
                onImageRemove={() => {}}
                maxImages={1}
                projectId={projectId}
                imageCaptions={{
                  "/lovable-uploads/1f8118aa-5998-40f1-9c7b-09888e31bbdf.png": "Key research findings highlighting trust and safety requirements for herbal medicine platform design"
                }}
                className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
              />
            </div>
            <p className="text-sm text-gray-700">
              The research revealed three critical success factors: trust-building features are essential for user adoption in wellness platforms, seamless integration between education and consultation improves user confidence, and mobile-first design ensures accessibility for users seeking herbal wellness solutions across diverse geographic locations.
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
