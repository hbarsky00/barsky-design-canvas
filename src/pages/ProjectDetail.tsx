
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectNavigation from "@/components/ProjectNavigation";
import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectSidebar from "@/components/project/ProjectSidebar";
import { projectsData, projectDetails, type ProjectDetails } from "@/data/projectsData";
import { trackPageView } from "@/lib/analytics";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";

// Image captions for each project
const projectImageCaptions: Record<string, Record<string, string>> = {
  "splittime": {
    "/lovable-uploads/716b7cef-a40b-4d2a-a4db-6a360313a63a.png": "Messaging interface of the Splittime co-parenting app showing automated replies and weekly message review",
    "/lovable-uploads/9ff55bb2-a684-40cf-a9e9-6afec3054d7e.png": "Multiple views of the Splittime app showing login, children's profiles, and account settings interfaces",
    "/lovable-uploads/2c2d5cc4-b820-4d42-8470-4b3147ed61be.png": "Web dashboard of Splittime showing notifications, children profiles, and co-parent connection features",
    "/lovable-uploads/7ca9117b-f843-4407-876d-90bbd289f24e.png": "Design process documentation showing UX goals and user flow mapping for the Splittime app",
    "/lovable-uploads/bc71b077-5c56-4ad7-af25-3c11ccacd0d1.png": "School module interface showing educational success tracking and calendar features",
    
    "/lovable-uploads/ae80b9f9-03aa-452c-8e24-ac5474b42350.png": "Messaging interface of the Splittime co-parenting app - designed for clear and neutral communication",
    "/lovable-uploads/6246d44b-1242-4369-95d3-c0e7e579a9fe.png": "Main interface of the co-parenting app showing the calendar and custody schedule view",
    "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png": "User research findings highlighting key pain points for separated parents",
    "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png": "Design process wireframes showing the evolution of the messaging feature",
    "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png": "Final implementation of the co-parenting mobile application on multiple devices",
    "/lovable-uploads/59518d59-73f8-4083-b538-21bdd7215742.png": "Calendar view showing shared custody schedule between parents",
    "/lovable-uploads/044ebd4f-a061-46fd-8668-fef8e8496a16.png": "The platform evolved with new roles and features, maintaining the core design language"
  },
  "herbalink": {
    "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png": "The magic of herbalists in your hands - intuitive mobile interface connecting users with qualified practitioners",
    "/lovable-uploads/e4fb8ea0-be2b-41f7-8d69-d8f8a043c213.png": "User journey map illustrating the consultation booking process",
    "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png": "Final implementation of the secure video consultation interface",
    "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png": "Treatment tracking dashboard with herbal remedy management",
    "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png": "Practitioner profile view showing credentials and specialties",
    "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png": "Mobile view of the appointment scheduling calendar",
    
    "/lovable-uploads/1aff7c3f-ce98-47e7-bc9d-fa69de522425.png": "Market analysis showing growing demand for digital herbal medicine solutions",
    "/lovable-uploads/2d1a328c-29eb-4d8a-97d5-3d6d9977a4f3.png": "User research findings highlighting trust and verification as key concerns for patients",
    "/lovable-uploads/2e27159e-c598-4ad5-a539-7ae7b5d08ed6.png": "Competitive analysis of existing telemedicine platforms and their limitations for herbalists",
    "/lovable-uploads/3a40d97f-0ac6-4fca-92ce-0615c9e6ae92.png": "Practitioner onboarding flow designed to verify credentials and build patient trust",
    "/lovable-uploads/6edd294a-5638-4a33-9e90-34a3341ddeaf.png": "Patient dashboard showing upcoming consultations and treatment plans",
    "/lovable-uploads/84649878-fe81-4d9a-8e4f-59dd99ab25f5.png": "In-app secure messaging feature for practitioner-patient follow-ups",
    "/lovable-uploads/85178a1c-7f22-42f9-929d-1feca4871a87.png": "Early wireframes exploring different approaches to practitioner discovery",
    "/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png": "User testing session with focus group of traditional herbalists",
    "/lovable-uploads/92026191-54bd-457b-9a0d-1a7bd591a2a5.png": "Responsive design implementation across multiple devices",
    "/lovable-uploads/9988e728-a0bb-46c7-8366-5d5ff22ed959.png": "Final design specifications for the treatment tracking feature"
  },
  "gold2crypto": {
    "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png": "Home dashboard of Gold 2 Crypto trading platform",
    "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png": "Market analysis comparing traditional gold investments with cryptocurrency",
    "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png": "User testing sessions with traditional investors exploring the platform",
    "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png": "Final trading interface with real-time price tracking and portfolio analytics",
    "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png": "Security features implementation showing two-factor authentication flow"
  },
  "barskyjoint": {
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png": "Designing beyond the Food - Barsky Joint Food Truck mobile app featuring customizable menu options and real-time delivery tracking",
    "/lovable-uploads/c35498f2-e657-4982-9b9b-8945aaf817d5.png": "Designing beyond the Food - Barsky Joint Food Truck mobile app featuring customizable menu options and real-time delivery tracking",
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

  // Get captions for current project
  const currentProjectCaptions = projectImageCaptions[projectId || ""] || {};
  
  return (
    <ImageMaximizerProvider>
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
                    galleryImages={details.galleryImages}
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
    </ImageMaximizerProvider>
  );
};

export default ProjectDetail;
