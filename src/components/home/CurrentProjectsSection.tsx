import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/shared/SectionHeader";

interface CurrentProject {
  id: string;
  title: string;
  description: string;
  status: "Work in Progress";
  videoUrl: string;
  thumbnailSrc: string;
}

const currentProjects: CurrentProject[] = [
    {
    id: "qr-code-creator",
    title: "Vibe-Coding a QR Code Maker",
    description: "📱 Mobile-first design (but works everywhere) 🎨 Three simple sections: Content → Style → Export ⚡ No expiration headaches 🔄 Easy customization on the fl",
    status: "Work in Progress",
    videoUrl: "https://www.loom.com/share/d355adb5e73c47de8c56544b963b55c8?sid=2ea042b3-5698-432a-a1d6-7ebd72fc3631",
    thumbnailSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/what-im-working-on/Screenshot%202025-09-26%20at%206.57.52%20PM.png"
  },
  {
    id: "inclusive-shopping-experience",
    title: "Creating an Inclusive Online Shopping Experience",
    description: "Developing an accessible e-commerce platform that promotes community engagement and showcases inclusive design principles through user-friendly checkout processes and community reviews.",
    status: "Work in Progress",
    videoUrl: "https://www.loom.com/share/eb6c7f4ec3984230ab016b61f78e432a?sid=9ba91da6-be61-4fbf-b733-80ff2e826caa",
    thumbnailSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/inclusive/goodvibesshallym.jpg"
  },
  {
    id: "roi-calculator",
    title: "ROI Design Calculator",
    description: "A tool to measure the business value of design in minutes instead of hours of spreadsheet work.",
    status: "Work in Progress",
    videoUrl: "https://www.loom.com/share/f30542a71d55409a99c00e069b26c14b",
    thumbnailSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/what-im-working-on/roi%20design%20calculator%20profile%20image.png"
  },
  {
    id: "nail-salon-platform",
    title: "Multi-Business Nail Salon Platform",
    description: "A booking and payment system that lets clients pay after appointments while giving salon owners a clear, centralized schedule view.",
    status: "Work in Progress",
    videoUrl: "https://www.loom.com/share/3d1713a2a54846cbaa63f40e5fcabac8",
    thumbnailSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/what-im-working-on/nail-salon-demo.png"
  },
  {
    id: "faces-of-hunger",
    title: "Faces of Hunger",
    description: "An awareness platform using design and AI to humanize food insecurity and spark community action.",
    status: "Work in Progress",
    videoUrl: "https://www.loom.com/share/1ad2ef7140384312b9777dc3f557f7ff",
    thumbnailSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/what-im-working-on/faces-of-hunger.png"
  },
  {
    id: "crypto-app-learning",
    title: "Crypto App Learning",
    description: "Designing an intuitive learning section for a crypto app that makes complex blockchain concepts accessible to beginners through interactive education.",
    status: "Work in Progress",
    videoUrl: "https://www.loom.com/share/80a0a13cdf11424bb69be709d8c6aa2d",
    thumbnailSrc: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/what-im-working-on/crypto-learning.jpg"
  }
];

const CurrentProjectsSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null);

  const getEmbedUrl = (url: string) => {
    const videoId = url.split('loom.com/share/')[1]?.split('?')[0];
    return `https://www.loom.com/embed/${videoId}`;
  };


  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <section className="py-8 md:py-12 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            as="h2"
            title="What I'm Working On Now"
            eyebrow="Last Updated Friday September 19th, 2025"
          />
          
          <div className="mb-8 md:mb-12 text-center">
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-4xl mx-auto">
              I keep this section updated with the projects I'm actively building. These aren't polished case studies — they're experiments focused on speed, learning, and real business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="outlined" className="h-full hover:shadow-md transition-shadow duration-300 bg-background/50 backdrop-blur-sm">
                  {/* Video Preview */}
                  <div 
                    className="relative aspect-video bg-muted rounded-t-lg overflow-hidden cursor-pointer group"
                    onClick={() => handleVideoClick(project.videoUrl)}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {hoveredProject === project.id ? (
                      <iframe
                        src={`${getEmbedUrl(project.videoUrl)}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1`}
                        title={`${project.title} preview`}
                        className="w-full h-full border-0"
                        frameBorder="0"
                        allowFullScreen={false}
                        allow="autoplay"
                        style={{ pointerEvents: 'none' }}
                      />
                    ) : (
                      <>
                        <img
                          src={project.thumbnailSrc}
                          alt={`${project.title} video thumbnail`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Play button overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 ml-1 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <CardTitle className="text-subsection-title font-semibold text-foreground flex-1 min-w-0 leading-tight">
                        {project.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-border font-medium px-3 py-1 shrink-0 text-xs">
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentProjectsSection;