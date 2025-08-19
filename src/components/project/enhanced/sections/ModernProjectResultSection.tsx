
import React from "react";
import { motion } from "framer-motion";
import { ProjectDetails } from "@/data/types/project";
import { useSimplifiedContentEditor } from "@/hooks/useSimplifiedContentEditor";
import EnhancedContentEditor from "@/components/editor/EnhancedContentEditor";
import ProjectContentBox from "@/components/project/ProjectContentBox";
import ProjectMultiImageGallery from "@/components/project/ProjectMultiImageGallery";

interface ModernProjectResultSectionProps {
  details: ProjectDetails;
  projectId: string;
  componentKey: string;
  imageCaptions: Record<string, string>;
}

const ModernProjectResultSection: React.FC<ModernProjectResultSectionProps> = ({
  details,
  projectId,
  componentKey,
  imageCaptions
}) => {
  const { handleSectionContentSave, handleSectionImageUpdate } = useSimplifiedContentEditor({ projectId });

  // Check if this is the investor loan app project
  const isInvestorProject = projectId === 'investor-loan-app';
  // Check if this is the Splittime project
  const isSpittimeProject = projectId === 'splittime';

  return (
    <motion.section
      id="result"
      data-section="result"
      aria-labelledby="result-heading"
      key={`result-${componentKey}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="rounded-2xl bg-card border border-border shadow-elevated p-4 sm:p-8 scroll-mt-[calc(var(--header-height,64px)+2rem)]"
    >
      <h2 id="result-heading" className="sr-only">Result Section</h2>
      
      {/* Eyebrow */}
      <div className="text-center mb-4">
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 tracking-wide uppercase">
          The Outcome
        </span>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-6 lg:mb-8">
        The Result
      </h2>
      
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
        <div className="prose prose-lg text-muted-foreground leading-relaxed max-w-none">
          {details.result.split('\n\n').map((paragraph, index) => {
            // Check if this is a header (like "Next Steps")
            if (paragraph.includes(':') && !paragraph.includes('•') && paragraph.length < 50) {
              return (
                <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-4 first:mt-0">
                  {paragraph.replace(':', '')}
                </h3>
              );
            }
            
            // Check if this is a subheader (like "Immediate Priorities:")
            if (paragraph.endsWith(':') && paragraph.length < 100) {
              return (
                <h4 key={index} className="text-lg font-medium text-foreground mt-6 mb-3">
                  {paragraph}
                </h4>
              );
            }
            
            // Check if this contains bullet points
            if (paragraph.includes('•')) {
              const items = paragraph.split('\n').filter(line => line.trim().startsWith('•'));
              if (items.length > 0) {
                return (
                  <ul key={index} className="list-none space-y-2 mb-6">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span>{item.replace('•', '').trim()}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
            }
            
            // Regular paragraph
            return (
              <p key={index} className="mb-4 text-muted-foreground">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>

      {/* Result Images Gallery - 2 column layout */}
      {details.resultGalleryImages && details.resultGalleryImages.length > 0 && (
        <div className="mt-16">
          <ProjectMultiImageGallery 
            images={details.resultGalleryImages}
            imageCaptions={imageCaptions}
          />
          
          {/* Conclusion text after gallery */}
          <div className="mt-12">
            <ProjectContentBox title="Conclusion">
              {isInvestorProject ? (
                <>
                  <p>
                    This project successfully transformed a manual, error-prone Excel-based system into a modern, efficient digital platform. The key to success was understanding user needs deeply and designing solutions that not only solved technical problems but also improved the daily work experience for banking professionals.
                  </p>
                  <p>
                    The 85% reduction in errors and 40% improvement in processing speed demonstrate the tangible business impact, while the high user satisfaction scores show that the solution truly met user needs. This project positioned the private bank for future growth while making their current operations significantly more efficient and enjoyable.
                  </p>
                </>
              ) : isSpittimeProject ? (
                <>
                  <p>
                    The platform reduced court visits, generated significant legal fee savings, achieved high user satisfaction, and increased productive co-parent communication. One beta user noted: "This app saved my relationship with my ex-partner. We can actually focus on our kids now instead of fighting about logistics."
                  </p>
                  <p>
                    Additional benefits included reduced stress, better coordination, improved documentation, and stronger focus on children's wellbeing over conflict.
                  </p>
                </>
              ) : (
                <p>
                  The project demonstrated the importance of understanding both sides of a marketplace, building trust through design, and creating educational experiences that empower users to make informed wellness decisions.
                </p>
              )}
            </ProjectContentBox>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ModernProjectResultSection;
