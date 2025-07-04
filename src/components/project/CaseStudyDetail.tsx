import React, { useState } from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MaximizableImage from "./MaximizableImage";

interface CaseStudyDetailProps {
  project: ProjectProps;
  details: ProjectDetails;
  projectId: string;
}

const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({
  project,
  details,
  projectId,
}) => {
  const [activeTab, setActiveTab] = useState("what-i-did");
  
  console.log('🎯 CaseStudyDetail: Rendering for project:', projectId);

  // Get project-specific styling and content
  const getProjectStyling = () => {
    switch (projectId) {
      case 'barskyjoint':
        return {
          gradient: 'linear-gradient(135deg, #d73502, #ff6b35)',
          heroText: '🍔 Barsky Joint Mobile App / Food Truck Ordering Platform',
          role: 'UX Designer & Developer',
          duration: '4 Weeks',
          platform: 'Mobile App',
          tagline: 'Designing the Future of Street Food Ordering'
        };
      case 'herbalink':
        return {
          gradient: 'linear-gradient(135deg, #2d5016, #4a7c59, #6b8e23)',
          heroText: '🌿 Herbalink App Interface / Herbal Wellness Platform',
          role: 'UX/UI Designer',
          duration: '4 Weeks',
          platform: 'Solo Project',
          tagline: 'Connecting People with Certified Herbalists'
        };
      case 'splittime':
        return {
          gradient: 'linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)',
          heroText: '📱 SplitTime App Interface / Co-Parenting Management Platform',
          role: 'Lead UX Designer',
          duration: '3 Weeks',
          platform: 'Mobile App',
          tagline: 'Simplifying Co-Parenting Through Thoughtful Design'
        };
      case 'investor-loan-app':
        return {
          gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6, #60a5fa)',
          heroText: '📊 Banking Platform Interface / Loan Management System',
          role: 'Lead UX Designer',
          duration: '1.5 Years',
          platform: 'Web Application',
          tagline: 'Modernizing Excel-based Banking Workflows'
        };
      default:
        return {
          gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
          heroText: '📱 Project Interface',
          role: 'Designer',
          duration: 'Variable',
          platform: 'Digital',
          tagline: 'Digital Experience Design'
        };
    }
  };

  const styling = getProjectStyling();

  // Get project-specific gradient colors for image placeholders
  const getImageGradients = () => {
    switch (projectId) {
      case 'barskyjoint':
        return {
          hero: 'linear-gradient(135deg, #fff5f2, #ffebe6)',
          light: 'linear-gradient(135deg, #fef7f0, #fdf2f8)',
          medium: 'linear-gradient(135deg, #fed7aa, #fdba74)',
          textColor: '#dc2626'
        };
      case 'herbalink':
        return {
          hero: 'linear-gradient(135deg, #e8f5e8, #f0f8f0)',
          light: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
          medium: 'linear-gradient(135deg, #bbf7d0, #86efac)',
          textColor: '#15803d'
        };
      case 'splittime':
        return {
          hero: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
          light: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
          medium: 'linear-gradient(135deg, #d8b4fe, #c084fc)',
          textColor: '#7c3aed'
        };
      case 'investor-loan-app':
        return {
          hero: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
          light: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
          medium: 'linear-gradient(135deg, #93c5fd, #60a5fa)',
          textColor: '#2563eb'
        };
      default:
        return {
          hero: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
          light: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
          medium: 'linear-gradient(135deg, #cbd5e1, #94a3b8)',
          textColor: '#475569'
        };
    }
  };

  const gradients = getImageGradients();

  // Get actual images from project details
  const getProjectImages = () => {
    switch (projectId) {
      case 'barskyjoint':
        return {
          hero: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
          challenge: details.challengeGalleryImages?.[0] || "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png",
          process: details.processImage || "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png",
          result: details.resultGalleryImages?.[0] || "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png"
        };
      case 'herbalink':
        return {
          hero: "/lovable-uploads/6c4ed77d-1ea7-4da1-8c3e-ad25cd792518.png",
          challenge: "/lovable-uploads/fc11dcb5-634f-4317-9585-d8661064189b.png",
          process: "/lovable-uploads/4c84b548-940e-4558-b931-f1e4d509d852.png",
          result: "/lovable-uploads/20f98d85-8b95-4a08-ab8e-7396a8cb7138.png"
        };
      case 'splittime':
        return {
          hero: details.availableImages?.[0] || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
          challenge: details.challengeGalleryImages?.[0] || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
          process: details.processImage || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png",
          result: details.resultGalleryImages?.[0] || "/lovable-uploads/647c00bd-470d-4fc5-8c5e-34c8d1c42676.png"
        };
      case 'investor-loan-app':
        return {
          hero: "/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png",
          challenge: "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
          process: "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png",
          result: "/lovable-uploads/7a8b4364-8a51-4c15-9e30-ab0352103ba1.png"
        };
      default:
        return {
          hero: project.image,
          challenge: project.image,
          process: project.image,
          result: project.image
        };
    }
  };

  const images = getProjectImages();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div 
        className="relative h-96 flex items-center justify-center text-white text-center"
        style={{ background: styling.gradient }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">{styling.tagline}</p>
          <div className="text-lg font-medium">{styling.heroText}</div>
          
          {/* Project Meta */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
            <div><strong>Role:</strong> {styling.role}</div>
            <div><strong>Duration:</strong> {styling.duration}</div>
            <div><strong>Platform:</strong> {styling.platform}</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Anchor Links */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex justify-start h-14">
            <a 
              href="#challenge" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              Challenge
            </a>
            <a 
              href="#what-i-did" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              What I Did
            </a>
            <a 
              href="#results" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              Results
            </a>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <MaximizableImage
          src={images.hero}
          alt={project.title}
          caption={details.imageCaptions?.[images.hero]}
          className="w-full h-80 object-cover rounded-lg shadow-lg"
          projectId={projectId}
        />
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
        {/* Challenge Section */}
        <section id="challenge" className="scroll-mt-20">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-3xl">The Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none mb-8">
                <p className="text-lg leading-relaxed">{details.challenge}</p>
                {details.challengeAdditionalText && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-base leading-relaxed whitespace-pre-line">
                      {details.challengeAdditionalText}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Challenge Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MaximizableImage
                  src={images.challenge}
                  alt="Challenge visualization"
                  caption={details.imageCaptions?.[images.challenge]}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  projectId={projectId}
                />
                {details.challengeGalleryImages?.[1] && (
                  <MaximizableImage
                    src={details.challengeGalleryImages[1]}
                    alt="Challenge details"
                    caption={details.imageCaptions?.[details.challengeGalleryImages[1]]}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                    projectId={projectId}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What I Did Section */}
        <section id="what-i-did" className="scroll-mt-20">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-3xl">What I Did</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none mb-8">
                <p className="text-lg leading-relaxed">{details.process}</p>
              </div>
              
              {/* Process Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <MaximizableImage
                  src={images.process}
                  alt="Design process"
                  caption={details.imageCaptions?.[images.process]}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  projectId={projectId}
                />
                {details.processBottomImage && (
                  <MaximizableImage
                    src={details.processBottomImage}
                    alt="Process details"
                    caption={details.imageCaptions?.[details.processBottomImage]}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                    projectId={projectId}
                  />
                )}
              </div>

              {/* Additional Process Images */}
              {details.availableImages && details.availableImages.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {details.availableImages.slice(1, 4).map((image, index) => (
                    <MaximizableImage
                      key={index}
                      src={image}
                      alt={`Process step ${index + 1}`}
                      caption={details.imageCaptions?.[image]}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                      projectId={projectId}
                    />
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              {details.technologies && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {details.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Results Section */}
        <section id="results" className="scroll-mt-20">
          <Card className="bg-white shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-3xl">Results & Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none mb-8">
                <p className="text-lg leading-relaxed">{details.result}</p>
              </div>
              
              {/* Results Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <MaximizableImage
                  src={images.result}
                  alt="Project results"
                  caption={details.imageCaptions?.[images.result]}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  projectId={projectId}
                />
                {details.resultGalleryImages?.[1] && (
                  <MaximizableImage
                    src={details.resultGalleryImages[1]}
                    alt="Additional results"
                    caption={details.imageCaptions?.[details.resultGalleryImages[1]]}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                    projectId={projectId}
                  />
                )}
              </div>

              {/* Project Links */}
              {details.projectLink && (
                <Card className="bg-blue-50 border border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <a 
                        href={details.projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Live Project →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default CaseStudyDetail;