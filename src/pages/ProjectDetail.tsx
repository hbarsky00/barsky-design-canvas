
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
    "/lovable-uploads/cb589912-0dc5-44e5-bd32-f5d177296cc3.png": "Anticipated Impact: Measurable Outcomes showing 60% court visit reduction, $25K average savings in legal fees, 85% user satisfaction, and 3.5X increase in productive communication",
    
    "/lovable-uploads/ae80b9f9-03aa-452c-8e24-ac5474b42350.png": "Messaging interface of the Splittime co-parenting app - designed for clear and neutral communication",
    "/lovable-uploads/6246d44b-1242-4369-95d3-c0e7e579a9fe.png": "Main interface of the co-parenting app showing the calendar and custody schedule view",
    "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png": "User research findings highlighting key pain points for separated parents",
    "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png": "Design process wireframes showing the evolution of the messaging feature",
    "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png": "Final implementation of the co-parenting mobile application on multiple devices",
    "/lovable-uploads/59518d59-73f8-4083-b538-21bdd7215742.png": "Calendar view showing shared custody schedule between parents",
    "/lovable-uploads/044ebd4f-a061-46fd-8668-fef8e8496a16.png": "The platform evolved with new roles and features, maintaining the core design language",
    "/lovable-uploads/b8f653d9-0253-43e1-94c8-f4890f48d414.png": "Key challenges in co-parenting coordination: adoption by high-conflict parents, professional integration, and robust security & privacy features",
    "/lovable-uploads/57188cd2-5ba4-4a9e-8a57-c70016dd2566.png": "Key Challenges: Solving the Hard Problems - Adoption by High-Conflict Parents, Professional Integration, and Security & Privacy",
    "/lovable-uploads/lovable-uploads.png": "Final implementation showing the comprehensive co-parenting solution with all major features integrated"
  },
  "herbalink": {
    "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png": "The magic of herbalists in your hands - intuitive mobile interface connecting users with qualified practitioners",
    "/lovable-uploads/e4fb8ea0-be2b-41f7-8d69-d8f8a043c213.png": "User journey map illustrating the consultation booking process",
    "/lovable-uploads/ada2ad24-f156-4851-b6e8-572404ccb959.png": "Design Process: From Concept to Solution - Timeline showing low-fidelity wireframes, interactive prototyping, usability testing, and visual design system development",
    "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png": "User journey mapping and persona development workshop materials from the Herbalink design process",
    "/lovable-uploads/8316c4d1-1eb7-4bbb-b3d5-5c449dbc9e84.png": "Design Process: From Concept to Solution - Showing our rigorous user-centered approach with wireframes, prototyping, testing, and visual design system development",
    "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png": "Final implementation of the secure video consultation interface",
    "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png": "Treatment tracking dashboard with herbal remedy management",
    "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png": "Practitioner profile view showing credentials and specialties",
    "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png": "Mobile view of the appointment scheduling calendar",
    "/lovable-uploads/90cbccae-4660-4e76-8218-1164bbeb0883.png": "Connect with Certified Herbalists for Personalized Wellness - Mobile and responsive web interfaces showing the main features",
    
    "/lovable-uploads/8e4b58bb-b896-4e18-b86d-1fae7fcc576e.png": "HerbaLink: Connecting You to Holistic Wellness - App overview showing personalized care features",
    "/lovable-uploads/a332bc93-8bd7-42b3-b4f9-0f24270eb9ab.png": "Design Implementation - Visual identity and UI components for the Herb Library feature",
    "/lovable-uploads/41442407-7956-48f5-88bd-f68b4d0ce485.png": "Track Your Wellness Journey - Wellness metrics tracking dashboard showing progress over time",
    "/lovable-uploads/c37c7bf9-100c-4451-9856-1c4ca0adee05.png": "Community Support Network - Discussion boards and support groups for herbal wellness",
    "/lovable-uploads/c7039c67-0933-4671-9d1e-0a8e6066b5a0.png": "Exploring Herbal Remedies - Comprehensive library of medicinal herbs with detailed information",
    "/lovable-uploads/0937ca2e-b4b7-493a-963e-441f9fdafb2f.png": "Virtual Consultation Experience - Secure video interface with communication tools",
    "/lovable-uploads/8fd697f3-7606-4019-834b-7b9fc4ef4a02.png": "Finding Your Perfect Herbalist - Filtering and browsing herbalist profiles",
    "/lovable-uploads/00b250de-52be-48ea-b9c4-99626f288d14.png": "Seamless Consultation Booking - Three-step process for scheduling appointments",
    "/lovable-uploads/06c3b4e6-b260-4c9d-90d3-201371ff7381.png": "Welcome & Onboarding Experience - First-time user introduction with calming design",
    "/lovable-uploads/d33a7d68-a919-4e51-b481-44dedceb60ac.png": "Intuitive Home Dashboard - Search functionality and quick navigation",
    "/lovable-uploads/8ea27daa-0897-4466-8e91-c24f745f23d7.png": "Core Features: A Dual-Sided Platform - Connecting users with certified herbalists for personalized wellness solutions"
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
    "/lovable-uploads/a69db2eb-7bd4-41ab-a900-78640f05e555.png": "The end result: Barsky Joint Food Truck mobile app with GPS meal tracking and custom color themes",
    "/lovable-uploads/27fba121-19a6-475b-977a-925861f25ff2.png": "Customer journey mapping session analyzing the ordering experience",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png": "Final app interface showing real-time order tracking and loyalty program",
    "/lovable-uploads/77d748e9-8ea5-4084-bc85-5057051b9757.png": "The challenge: Current mobile app showing basic product details without real-time tracking and order status features",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png": "Testing & Results: Real-World Performance showing 60% decrease in ordering time, 80% improved vegan discovery, and 90% usability rating"
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
                    showTechnologies={false}
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
