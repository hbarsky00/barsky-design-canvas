
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import IdentityBadge from "@/components/shared/IdentityBadge";
import { EditableVideo } from "./EditableVideo";
import ProjectLinks from "@/components/project/ProjectLinks";
import { useScroll3DTilt } from "@/hooks/useScroll3DTilt";
import { shouldShowEditingControls } from "@/utils/devModeDetection";

interface HeroVideo {
  poster?: string;
  videoSrc?: string;
  fallbackImage?: string;
}

interface ProjectLink {
  live?: string;
  github?: string;
  behance?: string;
  figma?: string;
}

interface Section {
  id: string;
  type: string;
  title: string;
  content: string;
  image?: string;
  imageCaption?: string;
}

interface StructuredCaseStudyLayoutProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo?: HeroVideo;
  sections: Section[];
  projectLink?: ProjectLink;
  gradientClasses?: string;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  tags,
  heroVideo,
  sections,
  projectLink,
  gradientClasses = "from-blue-600 via-purple-600 to-teal-600"
}) => {
  const textRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLDivElement>(null);
  const { containerStyle: textStyle } = useScroll3DTilt(textRef, { maxTilt: 2.5, yDistance: 10, childParallax: 6 });
  const { containerStyle: videoStyle } = useScroll3DTilt(videoRef, { maxTilt: 2, yDistance: 8, childParallax: 4, scaleRange: [0.996, 1, 0.998] });
  
  const showEditingControls = shouldShowEditingControls();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="pt-8 pb-16 bg-gradient-to-br from-background to-muted" style={{ perspective: "1000px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <IdentityBadge
              to="/"
              imageSrc="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
              name="Hiram Barsky"
              subtitle="Product Designer & Gen AI Developer"
              size="md"
              subtitleStyle="text"
            />
          </motion.div>

          <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
            style={{ ...textStyle, transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            {projectLink && (
              <div className="flex justify-center">
                <ProjectLinks projectLink={projectLink} />
              </div>
            )}
          </motion.div>

          {/* FIXED: Hero Video with proper context */}
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
            style={{ ...videoStyle, transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <EditableVideo 
              src={heroVideo?.videoSrc || ""}
              poster={heroVideo?.poster}
              alt="Case study hero video"
              caption="Case study demonstration"
              editable={showEditingControls}
              imageContext="hero"
            />
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <Badge variant="outline" className="px-3 py-1">
                      {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>

                {section.image && (
                  <div className="flex-1">
                    {/* FIXED: Pass proper context to prevent cross-contamination */}
                    <EditableVideo
                      src={section.image}
                      alt={section.imageCaption || `${section.title} illustration`}
                      caption={section.imageCaption}
                      editable={showEditingControls}
                      imageContext={section.type}
                      className="w-full"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StructuredCaseStudyLayout;
