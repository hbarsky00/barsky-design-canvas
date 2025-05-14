
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectImageCarousel from "@/components/project/ProjectImageCarousel";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import { projectsData, projectDetails, type ProjectDetails } from "@/data/projectsData";
import { trackPageView } from "@/lib/analytics";

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reset loading state when project ID changes
    setIsLoading(true);
    
    // Find the project based on the URL parameter
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      const projectDetail = projectDetails[projectId as string];
      
      if (!projectDetail) {
        console.error(`Project details not found for ID: ${projectId}`);
      } else {
        setDetails(projectDetail);
      }
      
      // Track page view
      trackPageView(`/project/${projectId}`, `${foundProject.title} | Hiram Barsky Portfolio`);
    } else {
      console.error(`Project not found with ID: ${projectId}`);
      // If project not found, redirect to all projects page
      navigate("/projects");
    }
    
    setIsLoading(false);
  }, [projectId, navigate]);
  
  if (isLoading || !project || !details) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <p className="text-barsky-text">Loading project details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{project.title} | Hiram Barsky Portfolio</title>
        <meta name="description" content={`${project.title} - ${project.tags.join(', ')} | Professional Product Design by Hiram Barsky`} />
        <meta property="og:title" content={`${project.title} | Hiram Barsky Portfolio`} />
        <meta property="og:description" content={`${project.title} - ${project.tags.join(', ')} | Professional Product Design by Hiram Barsky`} />
        <meta property="og:image" content={project.image} />
        <meta property="og:url" content={`https://hirambarsky.com/project/${projectId}`} />
        <meta name="twitter:title" content={`${project.title} | Hiram Barsky Portfolio`} />
        <meta name="twitter:description" content={`${project.title} - ${project.tags.join(', ')} | Professional Product Design`} />
        <meta name="twitter:image" content={project.image} />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="section-container">
            <ProjectHeader title={project.title} tags={project.tags} />
            
            <ProjectImageCarousel 
              mainImage={project.image}
              title={project.title}
              extraImages={details.extraImages || []}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <ProjectOverview 
                  challenge={details.challenge}
                  process={details.process}
                  result={details.result}
                  technologies={details.technologies}
                  projectLink={project.link}
                  caseStudyLink={details.caseStudyLink}
                />
              </div>
              
              <div>
                <ProjectSidebar 
                  duration={details.duration}
                  client={details.client}
                  role={details.role}
                />
              </div>
            </div>
            
            <ProjectNavigation 
              currentProjectId={projectId || ""} 
              projectsData={projectsData.map(p => ({
                id: p.id,
                title: p.title,
                image: p.image
              }))} 
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
