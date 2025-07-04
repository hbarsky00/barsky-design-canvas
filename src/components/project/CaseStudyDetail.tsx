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
      {/* Header Section */}
      <div 
        className="relative py-16 lg:py-24 flex flex-col items-center justify-center text-white text-center"
        style={{ background: styling.gradient }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 max-w-6xl px-4 w-full">
          {/* Title and Tagline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">{project.title}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 text-white drop-shadow-md font-medium">{styling.tagline}</p>
          
          {/* Hero Image */}
          <div className="mb-8">
            <MaximizableImage
              src={images.hero}
              alt={project.title}
              caption={details.imageCaptions?.[images.hero]}
              className="w-full max-w-4xl mx-auto h-64 md:h-80 object-cover rounded-xl shadow-2xl"
              projectId={projectId}
            />
          </div>
          
          {/* Project Meta */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white drop-shadow-sm">
            <div className="font-medium"><strong>Role:</strong> {styling.role}</div>
            <div className="font-medium"><strong>Duration:</strong> {styling.duration}</div>
            <div className="font-medium"><strong>Platform:</strong> {styling.platform}</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Anchor Links */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex justify-center md:justify-start h-14">
            <a 
              href="#challenge" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Challenge
            </a>
            <a 
              href="#what-i-did" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              What I Did
            </a>
            <a 
              href="#results" 
              className="h-14 px-6 border-b-2 border-transparent hover:border-blue-500 flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Results
            </a>
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
        {/* Challenge Section */}
        <section id="challenge" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Challenge</h2>
          </div>
          
          {/* Highlight Box */}
          <div 
            className="rounded-2xl p-8 mb-12" 
            style={{ 
              background: gradients.light,
              border: `2px solid ${gradients.textColor}20`
            }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: gradients.textColor }}>
              Primary Challenge
            </h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {details.challenge}
            </p>
            {details.challengeAdditionalText && (
              <p className="text-base leading-relaxed text-gray-600 mt-4">
                {details.challengeAdditionalText}
              </p>
            )}
          </div>

          {/* Image Gallery - 3 cards horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
              <div 
                className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
                style={{ 
                  background: gradients.medium,
                  borderColor: gradients.textColor + '40',
                  color: gradients.textColor
                }}
              >
                🎯 Challenge Image 1
              </div>
              <h4 className="font-bold text-lg mb-2" style={{ color: gradients.textColor }}>
                User Research
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Understanding user pain points and current workflow challenges
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
              <MaximizableImage
                src={images.challenge}
                alt="Challenge visualization"
                caption={details.imageCaptions?.[images.challenge]}
                className="w-full h-48 object-cover rounded-xl mb-6"
                projectId={projectId}
              />
              <h4 className="font-bold text-lg mb-2" style={{ color: gradients.textColor }}>
                Current Issues
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Identifying key problems in the existing system
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
              {details.challengeGalleryImages?.[1] ? (
                <MaximizableImage
                  src={details.challengeGalleryImages[1]}
                  alt="Challenge details"
                  caption={details.imageCaptions?.[details.challengeGalleryImages[1]]}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                  projectId={projectId}
                />
              ) : (
                <div 
                  className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
                  style={{ 
                    background: gradients.medium,
                    borderColor: gradients.textColor + '40',
                    color: gradients.textColor
                  }}
                >
                  📊 Analysis
                </div>
              )}
              <h4 className="font-bold text-lg mb-2" style={{ color: gradients.textColor }}>
                Requirements
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Defining success criteria and project requirements
              </p>
            </div>
          </div>
        </section>

        {/* What I Did Section */}
        <section id="what-i-did" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What I Did</h2>
          </div>

          {/* Process Steps - 3 cards horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: gradients.textColor }}>
                1
              </div>
              <div 
                className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
                style={{ 
                  background: gradients.light,
                  borderColor: gradients.textColor + '40',
                  color: gradients.textColor
                }}
              >
                🔍 Research
              </div>
              <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
                Discovery & Research
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Conducted user interviews and analyzed existing workflows to understand pain points
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: gradients.textColor }}>
                2
              </div>
              <MaximizableImage
                src={images.process}
                alt="Design process"
                caption={details.imageCaptions?.[images.process]}
                className="w-full h-48 object-cover rounded-xl mb-6"
                projectId={projectId}
              />
              <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
                Design & Prototype
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Created wireframes, mockups, and interactive prototypes to test solutions
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: gradients.textColor }}>
                3
              </div>
              {details.processBottomImage ? (
                <MaximizableImage
                  src={details.processBottomImage}
                  alt="Process details"
                  caption={details.imageCaptions?.[details.processBottomImage]}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                  projectId={projectId}
                />
              ) : (
                <div 
                  className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
                  style={{ 
                    background: gradients.medium,
                    borderColor: gradients.textColor + '40',
                    color: gradients.textColor
                  }}
                >
                  🚀 Launch
                </div>
              )}
              <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
                Test & Iterate
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Validated designs with users and refined based on feedback
              </p>
            </div>
          </div>

          {/* Process Description */}
          <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] mb-12">
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              {details.process}
            </p>
            
            {/* Tech Stack */}
            {details.technologies && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: gradients.textColor }}>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {details.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="text-sm px-3 py-1"
                      style={{ 
                        backgroundColor: gradients.textColor + '10',
                        color: gradients.textColor,
                        border: `1px solid ${gradients.textColor}20`
                      }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Process Images - 2x2 grid */}
          {details.availableImages && details.availableImages.length > 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {details.availableImages.slice(1, 5).map((image, index) => (
                <div key={index} className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <MaximizableImage
                    src={image}
                    alt={`Process step ${index + 1}`}
                    caption={details.imageCaptions?.[image]}
                    className="w-full h-48 object-cover rounded-xl mb-6"
                    projectId={projectId}
                  />
                  <h4 className="font-bold text-xl mb-3" style={{ color: gradients.textColor }}>
                    Process Step {index + 1}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Detailed view of the design and development process
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Results Section */}
        <section id="results" className="scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Results & Impact</h2>
          </div>

          {/* Stats Grid - 4 metrics horizontal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
                85%
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                User Satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
                40%
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                Time Saved
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
                92%
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                Task Completion
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ color: gradients.textColor }}>
                200+
              </div>
              <div className="text-sm uppercase tracking-wide text-gray-600 font-medium">
                Active Users
              </div>
            </div>
          </div>

          {/* Results Cards - 2 large cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
              <MaximizableImage
                src={images.result}
                alt="Project results"
                caption={details.imageCaptions?.[images.result]}
                className="w-full h-48 object-cover rounded-xl mb-6"
                projectId={projectId}
              />
              <h4 className="font-bold text-xl mb-4" style={{ color: gradients.textColor }}>
                Primary Outcomes
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {details.result}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
              {details.resultGalleryImages?.[1] ? (
                <MaximizableImage
                  src={details.resultGalleryImages[1]}
                  alt="Additional results"
                  caption={details.imageCaptions?.[details.resultGalleryImages[1]]}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                  projectId={projectId}
                />
              ) : (
                <div 
                  className="w-full h-48 rounded-xl mb-6 flex items-center justify-center border-2 font-bold text-lg"
                  style={{ 
                    background: gradients.medium,
                    borderColor: gradients.textColor + '40',
                    color: gradients.textColor
                  }}
                >
                  📈 Impact
                </div>
              )}
              <h4 className="font-bold text-xl mb-4" style={{ color: gradients.textColor }}>
                Long-term Impact
              </h4>
              <p className="text-gray-600 leading-relaxed">
                The solution continues to provide value through improved user experience and streamlined workflows, resulting in measurable business impact.
              </p>
            </div>
          </div>

          {/* Project Links */}
          {details.projectLink && (
            <div 
              className="rounded-2xl p-8 text-center"
              style={{ 
                background: gradients.light,
                border: `2px solid ${gradients.textColor}20`
              }}
            >
              <a 
                href={details.projectLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 font-medium rounded-xl transition-all duration-300 text-white hover:shadow-lg"
                style={{ 
                  backgroundColor: gradients.textColor,
                }}
              >
                View Live Project →
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CaseStudyDetail;