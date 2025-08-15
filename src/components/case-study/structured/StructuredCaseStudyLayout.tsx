
import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/seo/SEO";

interface StructuredCaseStudyLayoutProps {
  title: string;
  description: string;
  tags: string[];
  heroVideo?: string;
  sections: any[];
  projectLink?: string;
  gradientClasses?: string;
}

const StructuredCaseStudyLayout: React.FC<StructuredCaseStudyLayoutProps> = ({
  title,
  description,
  tags,
  heroVideo,
  sections,
  projectLink,
  gradientClasses = "from-blue-50 to-purple-50"
}) => {
  // Extract project ID from current URL for SEO
  const currentPath = window.location.pathname;
  const projectId = currentPath.split('/').pop() || '';
  
  // Generate hero image from video or use fallback
  const heroImage = heroVideo ? 
    heroVideo.replace('.mp4', '-thumbnail.jpg') : 
    '/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png';

  return (
    <>
      <SEO
        type="article"
        title={`${title} | Hiram Barsky Case Study`}
        description={description}
        url={`https://barskydesign.pro${currentPath}`}
        image={heroImage}
        tags={tags}
      />
      
      <div className="min-h-screen bg-white">
        <Navigation />
        
        {/* Hero Section */}
        <section className={`bg-gradient-to-br ${gradientClasses} py-20 px-4`}>
          <div className="container mx-auto max-w-4xl">
            <Link to="/projects" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-white/70 text-gray-700 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
            
            {projectLink && (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <a href={projectLink} target="_blank" rel="noopener noreferrer">
                  View Live Project <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            )}
          </div>
        </section>

        {/* Hero Video */}
        {heroVideo && (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={heroVideo} type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        )}

        {/* Content Sections */}
        {sections.map((section, index) => (
          <section key={index} className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg text-gray-700">
                    {section.content}
                  </div>
                </div>
                
                <div className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                  {section.image && (
                    <div className="relative">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  {section.video && (
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={section.video} type="video/mp4" />
                      </video>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        <Footer />
      </div>
    </>
  );
};

export default StructuredCaseStudyLayout;
