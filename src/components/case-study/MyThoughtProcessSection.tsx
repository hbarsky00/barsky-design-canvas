import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "@/components/project/MaximizableImage";
import AnnotatedImage from "./AnnotatedImage";
import ProjectVideo from "@/components/project/ProjectVideo";
import CustomerInputCard from "./CustomerInputCard";
import { ImageAnnotation } from "@/data/structuredCaseStudies";
import { Bot, User, Zap, CheckCircle2 } from "lucide-react";

interface MyThoughtProcessSectionProps {
  content: string;
  video?: {
    src: string;
    title: string;
    caption?: string;
  };
  images?: Array<{
    src: string;
    alt: string;
    caption?: string;
    annotations?: ImageAnnotation[];
  }>;
}

interface ContentBlock {
  type: 'text' | 'ai-collaboration' | 'customer';
  content: any;
}

const extractBulletPoints = (text: string): string[] => {
  return text
    .split('\n')
    .filter(line => line.trim().match(/^[•●\-*]/))
    .map(line => line.replace(/^[•●\-*]\s*/, '').trim())
    .filter(line => line.length > 0);
};

const parseContentBlocks = (content: string): ContentBlock[] => {
  const blocks: ContentBlock[] = [];
  
  // Check if content contains AI collaboration pattern
  const aiHandledMatch = content.match(/AI handled:\s*([\s\S]*?)(?=Humans refined:|$)/i);
  const humansRefinedMatch = content.match(/Humans refined:\s*([\s\S]*?)(?=Combined impact:|$)/i);
  const combinedImpactMatch = content.match(/Combined impact:\s*([\s\S]*?)$/i);
  
  if (aiHandledMatch && humansRefinedMatch) {
    // Extract bullet points
    const aiItems = extractBulletPoints(aiHandledMatch[1]);
    const humanItems = extractBulletPoints(humansRefinedMatch[1]);
    const impactText = combinedImpactMatch?.[1]?.trim() || '';
    
    blocks.push({
      type: 'ai-collaboration',
      content: {
        aiHandled: aiItems,
        humanRefined: humanItems,
        combinedImpact: impactText
      }
    });
  } else {
    // Process as regular paragraphs with customer quote detection
    const paragraphs = content.split('\n\n');
    
    for (let paragraph of paragraphs) {
      if (!paragraph.trim()) continue;
      
      // Check if paragraph contains customer input
      const isCustomerInput = paragraph.trim().startsWith('"') || 
                             paragraph.toLowerCase().includes('customer:') || 
                             paragraph.toLowerCase().includes('user said:');
      
      if (isCustomerInput) {
        let quote = paragraph;
        let context = undefined;
        
        if (paragraph.toLowerCase().includes('customer:')) {
          const parts = paragraph.split(/customer:/i);
          quote = parts[1]?.trim().replace(/^["']|["']$/g, '') || paragraph;
          context = "Customer feedback";
        } else if (paragraph.toLowerCase().includes('user said:')) {
          const parts = paragraph.split(/user said:/i);
          quote = parts[1]?.trim().replace(/^["']|["']$/g, '') || paragraph;
          context = "User feedback";
        } else {
          quote = paragraph.replace(/^["']|["']$/g, '');
        }
        
        blocks.push({
          type: 'customer',
          content: { quote, context }
        });
      } else {
        blocks.push({
          type: 'text',
          content: paragraph
        });
      }
    }
  }
  
  return blocks;
};

const MyThoughtProcessSection: React.FC<MyThoughtProcessSectionProps> = ({
  content,
  video,
  images
}) => {
  const contentBlocks = parseContentBlocks(content);
  const hasAICollaboration = contentBlocks.some(block => block.type === 'ai-collaboration');
  
  return (
    <section className={`section-snap py-12 md:py-16 ${hasAICollaboration ? 'bg-gradient-to-br from-cyan-50/30 via-teal-50/30 to-emerald-50/30' : ''}`}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-eyebrow text-neutral-700 header-spacing">
              APPROACH & DECISION MAKING
            </div>
            <h2 className="text-section-title font-display content-rail-center">
              My Thought Process
            </h2>
          </div>

          {video && (
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <ProjectVideo
                  src={video.src}
                  title={video.title}
                  caption={video.caption}
                  className="w-full rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          )}

          {images && images.length > 0 && (
            <div className="space-y-8">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  {image.annotations && image.annotations.length > 0 ? (
                    <AnnotatedImage
                      src={image.src}
                      alt={image.alt}
                      annotations={image.annotations}
                      className="w-full rounded-lg"
                    />
                  ) : (
                    <MaximizableImage
                      src={image.src}
                      alt={image.alt}
                      caption={image.caption}
                      className="w-full rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="content-rail-left space-y-8">
            {contentBlocks.map((block, idx) => {
              if (block.type === 'ai-collaboration') {
                return (
                  <div key={idx} className="space-y-8">
                    {/* AI Handled + Human Refined Cards */}
                    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                      {/* AI Handled Card */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-white via-white to-purple-50/20 rounded-xl p-8 md:p-10 shadow-md hover:shadow-xl border-2 border-border/20 hover:border-purple-300/30 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground">AI Handled</h3>
                        </div>
                        <ul className="space-y-4">
                          {block.content.aiHandled.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Human Refined Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-white via-white to-blue-50/20 rounded-xl p-8 md:p-10 shadow-md hover:shadow-xl border-2 border-border/20 hover:border-blue-300/30 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <User className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground">Human Refined</h3>
                        </div>
                        <ul className="space-y-4">
                          {block.content.humanRefined.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base text-muted-foreground leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    {/* Combined Impact Section */}
                    {block.content.combinedImpact && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 rounded-xl p-8 md:p-10 shadow-md border-2 border-purple-200/50"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-100 flex items-center justify-center shadow-md flex-shrink-0">
                            <Zap className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                          </div>
                          <h3 className="text-xl md:text-3xl font-semibold text-foreground">Combined Impact</h3>
                        </div>
                        <div className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-line">
                          {block.content.combinedImpact}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              }
              
              if (block.type === 'customer') {
                return (
                  <CustomerInputCard
                    key={idx}
                    quote={block.content.quote}
                    context={block.content.context}
                  />
                );
              }
              
              // Regular text
              return (
                <p key={idx} className="text-lg text-muted-foreground leading-relaxed">
                  {block.content}
                </p>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyThoughtProcessSection;