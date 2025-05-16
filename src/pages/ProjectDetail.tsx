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
import ImageMaximizer from "@/components/project/ImageMaximizer";

// Image captions for each project
const projectImageCaptions: Record<string, Record<string, string>> = {
  "splittime": {
    "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png": "Main interface of the co-parenting app showing the calendar and custody schedule view",
    "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png": "User research findings highlighting key pain points for separated parents",
    "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png": "Design process wireframes showing the evolution of the messaging feature"
  },
  "herbalink": {
    "/lovable-uploads/f2440dd3-da7f-4191-9f06-9efb7ec29d40.png": "The magic of herbalists in your hands - intuitive mobile interface connecting users with qualified practitioners",
    "/lovable-uploads/e4fb8ea0-be2b-41f7-8d69-d8f8a043c213.png": "User journey map illustrating the consultation booking process",
    "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png": "Final implementation of the secure video consultation interface",
    "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png": "Treatment tracking dashboard with herbal remedy management",
    "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png": "Practitioner profile view showing credentials and specialties",
    "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png": "Mobile view of the appointment scheduling calendar"
  },
  "gold2crypto": {
    "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png": "Home dashboard of Gold 2 Crypto trading platform",
    "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png": "Market analysis comparing traditional gold investments with cryptocurrency",
    "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png": "User testing sessions with traditional investors exploring the platform",
    "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png": "Final trading interface with real-time price tracking and portfolio analytics",
    "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png": "Security features implementation showing two-factor authentication flow"
  },
  "barskyjoint": {
    "/lovable-uploads/2a322354-503a-4e82-baec-f3ebf3e8f097.png": "Main screen of Barsky Joint Food Truck app featuring the burger menu",
    "/lovable-uploads/27fba121-19a6-475b-977a-925861f25ff2.png": "Customer journey mapping session analyzing the ordering experience",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png": "Final app interface showing real-time order tracking and loyalty program"
  },
  "spectrum": {
    "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png": "Homepage of Spectrum Apparel showing featured autism awareness clothing",
    "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png": "Accessibility testing with users to ensure inclusive design",
    "/lovable-uploads/e65cf5f1-62f3-4412-b533-fdfc0e59aae3.png": "Custom shirt designer with drag-and-drop functionality and real-time preview",
    "/lovable-uploads/6544f03a-2e0f-4adb-b382-521741cdf807.png": "Blog section featuring autism awareness content and community stories"
  }
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [maximizedImage, setMaximizedImage] = useState<string | null>(null);
  const [maximizedTitle, setMaximizedTitle] = useState("");
  
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
  
  const handleImageClick = (image: string, title: string) => {
    setMaximizedImage(image);
    setMaximizedTitle(title);
  };
  
  const handleCloseMaximizer = () => {
    setMaximizedImage(null);
    setMaximizedTitle("");
  };
  
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

  // Get captions for current project
  const currentProjectCaptions = projectImageCaptions[projectId || ""] || {};
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{project.title} | Hiram Barsky Portfolio</title>
        <meta name="description" content={`${project.title} - ${project.tags.join(', ')} | Professional Product Design by Hiram Barsky`} />
        <meta property="og:title" content={`${project.title} | Hiram Barsky Portfolio`} />
        <meta property="og:description" content={`${project.title} - ${project.tags.join(', ')} | Professional Product Design by Hiram Barsky`} />
        <meta property="og:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
        <meta property="og:url" content={`https://hirambarsky.com/project/${projectId}`} />
        <meta name="twitter:title" content={`${project.title} | Hiram Barsky Portfolio`} />
        <meta name="twitter:description" content={`${project.title} - ${project.tags.join(', ')} | Professional Product Design`} />
        <meta name="twitter:image" content="https://hirambarsky.com/lovable-uploads/file-c4fc0432-7896-442d-980d-133d9c7442e9" />
      </Helmet>
      
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="section-container">
            <ProjectHeader title={project.title} tags={project.tags} />
            
            {/* Keeping the component but not displaying the main image */}
            <ProjectImageCarousel 
              mainImage={project.image}
              title={project.title}
              extraImages={[]}
              onImageClick={handleImageClick}
              captions={currentProjectCaptions}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <ProjectOverview 
                  challenge={details.challenge}
                  process={details.process}
                  result={details.result}
                  technologies={details.technologies}
                  projectLink={project.link}
                  challengeImage={details.challengeImage}
                  processImage={details.processImage}
                  resultImage={details.resultImage}
                  imageCaptions={currentProjectCaptions}
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
            
            {/* Image Maximizer Component */}
            {maximizedImage && (
              <ImageMaximizer
                image={maximizedImage}
                title={maximizedTitle}
                isOpen={!!maximizedImage}
                onClose={handleCloseMaximizer}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
