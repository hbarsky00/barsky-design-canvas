import React, { useState } from "react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      {/* Hero Section Image */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div 
          className="w-full h-80 rounded-lg border-2 flex items-center justify-center text-center"
          style={{ background: gradients.hero, borderColor: gradients.textColor, color: gradients.textColor }}
        >
          <div className="p-6">
            <div className="text-6xl mb-4">
              {projectId === 'barskyjoint' && '🍔'}
              {projectId === 'herbalink' && '🌿'}
              {projectId === 'splittime' && '📱'}
              {projectId === 'investor-loan-app' && '📊'}
            </div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-lg">Main Application Interface</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start h-14 bg-transparent border-0 p-0">
              <TabsTrigger 
                value="what-i-did" 
                className="h-14 px-6 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                What I Did
              </TabsTrigger>
              <TabsTrigger 
                value="challenge" 
                className="h-14 px-6 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Challenge
              </TabsTrigger>
              <TabsTrigger 
                value="results" 
                className="h-14 px-6 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Results
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="what-i-did" className="mt-0">
            <div className="space-y-8">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Process & Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{details.process}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Process Step Images (3 images) */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Design Process Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-4xl mb-3">🔍</div>
                      <h4 className="font-bold mb-1">Research</h4>
                      <p className="text-sm">User interviews and market analysis</p>
                    </div>
                  </div>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-4xl mb-3">🎨</div>
                      <h4 className="font-bold mb-1">Design</h4>
                      <p className="text-sm">Wireframes and visual design</p>
                    </div>
                  </div>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-4xl mb-3">⚡</div>
                      <h4 className="font-bold mb-1">Development</h4>
                      <p className="text-sm">Implementation and testing</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Block Images (4 images) */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Key Design Elements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-3xl mb-2">👤</div>
                      <h4 className="font-bold mb-1">User Experience</h4>
                      <p className="text-sm">Intuitive navigation and flow</p>
                    </div>
                  </div>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-3xl mb-2">📱</div>
                      <h4 className="font-bold mb-1">Mobile First</h4>
                      <p className="text-sm">Responsive design approach</p>
                    </div>
                  </div>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-3xl mb-2">🎯</div>
                      <h4 className="font-bold mb-1">Performance</h4>
                      <p className="text-sm">Optimized for speed and efficiency</p>
                    </div>
                  </div>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-3xl mb-2">🔒</div>
                      <h4 className="font-bold mb-1">Security</h4>
                      <p className="text-sm">Data protection and privacy</p>
                    </div>
                  </div>
                </div>
              </div>

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
            </div>
          </TabsContent>

          <TabsContent value="challenge" className="mt-0">
            <div className="space-y-8">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl">The Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{details.challenge}</p>
                    {details.challengeAdditionalText && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-base leading-relaxed whitespace-pre-line">
                          {details.challengeAdditionalText}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Challenge Gallery Images (3 images) */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Challenge Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="h-44 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.medium, borderColor: gradients.textColor, color: '#ffffff' }}
                  >
                    <div>
                      <div className="text-3xl mb-2">⚠️</div>
                      <h4 className="font-bold mb-1">Technical Constraints</h4>
                      <p className="text-sm">Limited resources and timeline</p>
                    </div>
                  </div>
                  <div 
                    className="h-44 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.medium, borderColor: gradients.textColor, color: '#ffffff' }}
                  >
                    <div>
                      <div className="text-3xl mb-2">👥</div>
                      <h4 className="font-bold mb-1">User Adoption</h4>
                      <p className="text-sm">Change management challenges</p>
                    </div>
                  </div>
                  <div 
                    className="h-44 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.medium, borderColor: gradients.textColor, color: '#ffffff' }}
                  >
                    <div>
                      <div className="text-3xl mb-2">🎯</div>
                      <h4 className="font-bold mb-1">Market Position</h4>
                      <p className="text-sm">Competitive differentiation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            <div className="space-y-8">
              <Card className="bg-white shadow-lg border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Results & Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-lg leading-relaxed">{details.result}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Results Images (2 images) */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Key Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-4xl mb-3">📈</div>
                      <h4 className="font-bold mb-2">Performance Metrics</h4>
                      <p className="text-sm">Significant improvement in key KPIs</p>
                    </div>
                  </div>
                  <div 
                    className="h-48 rounded-lg border flex items-center justify-center text-center p-4"
                    style={{ background: gradients.light, borderColor: gradients.textColor, color: gradients.textColor }}
                  >
                    <div>
                      <div className="text-4xl mb-3">⭐</div>
                      <h4 className="font-bold mb-2">User Satisfaction</h4>
                      <p className="text-sm">High ratings and positive feedback</p>
                    </div>
                  </div>
                </div>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseStudyDetail;