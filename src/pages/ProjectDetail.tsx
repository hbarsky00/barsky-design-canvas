import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectsData } from "@/data/projects/projectsList";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ProjectDetailLoading from "@/components/project/ProjectDetailLoading";
import ProjectDetailSeo from "@/components/project/ProjectDetailSeo";
import ModernProjectDetail from "@/components/project/enhanced/ModernProjectDetail";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { investorLoanImageCaptions } from "@/data/investorLoanData";

// Enhanced image captions for each project with more descriptive and professional descriptions
const projectImageCaptions: Record<string, Record<string, string>> = {
  "medication-app": {
    "/lovable-uploads/f291f600-a3da-4d1f-8a53-70063b1b113e.png": "Final medication management app interface showcasing intuitive Calendar view, comprehensive Resources section, and personalized Profile management for optimal patient care",
    "/lovable-uploads/60d8aee8-4b4b-4335-8cc5-3a0816eccfab.png": "Complete user journey from welcome splash screen through secure authentication to the main dashboard, demonstrating seamless onboarding experience",
    "/lovable-uploads/3561de34-19f0-43b5-af1e-c72096282ab3.png": "Initial wireframe concepts and app architecture planning showing systematic approach to medication tracking functionality",
    "/lovable-uploads/46b1b74d-cba7-4b37-95e7-17f113a89041.png": "Comprehensive design system featuring carefully selected color palette, typography hierarchy, and component library for healthcare applications",
    "/lovable-uploads/73d25798-547e-49a0-ad44-a79540285bff.png": "Low-fidelity wireframes illustrating user flow concepts and layout structure for intuitive navigation patterns",
    "/lovable-uploads/5ebc710e-fd8f-40aa-b092-99290c136a57.png": "Task completion states and interactive feedback systems designed to enhance user engagement and medication adherence",
    "/lovable-uploads/5faa6be9-9602-4fd5-8dff-4f95864e7142.png": "In-depth user research findings revealing patient responsibilities, pain points, and opportunities for digital health intervention",
    "/lovable-uploads/593ace1d-0082-49d1-aacf-debe109e5235.png": "User journey mapping documentation showcasing comprehensive app usage patterns and touchpoint optimization",
    "/lovable-uploads/9de388e2-d7b4-4265-816c-08384411503a.png": "Competitive analysis of leading healthcare and medication tracking applications identifying market gaps and opportunities",
    "/lovable-uploads/759f7954-5048-407d-9dca-e1d4a4cd954f.png": "Early conceptual sketches and brainstorming session outputs documenting feature ideation and functionality planning"
  },
  "investor-loan-app": {
    "/lovable-uploads/d9596b32-c5a5-42bd-9229-db1b496aeea4.png": "Advanced loans orderbook interface featuring real-time market data, sophisticated filtering options, and institutional-grade trading tools with predictive search capabilities",
    "/lovable-uploads/b49f4918-37cd-4ffa-bae3-2468e22f2fce.png": "Comprehensive advanced search functionality with category-based filtering, date ranges, and saved search preferences for efficient deal discovery",
    "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png": "Key features and solutions overview highlighting AI-powered search, dynamic order book, advanced filtering, and flexible deal management capabilities",
    "/lovable-uploads/27ed3b6b-f807-461f-a731-d28304ab0b2f.png": "Project lessons learned showcasing successful user adoption, iterative design improvements, and future enhancement roadmap for mobile platforms",
    "/lovable-uploads/8d00085d-423a-4f72-be94-2f47f6c9a894.png": "Deal Central dashboard featuring card-based interface for managing multiple loan deals with status tracking and progress indicators",
    "/lovable-uploads/1a7eeadb-eae0-4c00-8a2c-a2ed24372c35.png": "Collaborative deal management interface with grid view, real-time team collaboration tools, and integrated communication features",
    "/lovable-uploads/ca299ce2-3a90-4503-8cda-c2c8e17fe160.png": "Loan limit management system with comprehensive utilization tracking, credit monitoring, and automated compliance reporting",
    "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png": "Enhanced orderbook interface with integrated comments system, team collaboration features, and real-time communication tools",
    "/lovable-uploads/6e0291a5-2519-4b89-8402-44a9b8a27cf0.png": "User workflow diagram illustrating the complete loan management process from deal selection through order management and collaboration"
  },
  "dae-search": {
    "/lovable-uploads/4cdd5e0d-f7c9-4d83-b760-08ffe57f27f4.png": "Enterprise data catalog interface featuring advanced search capabilities, intelligent filtering, and Bloomberg-inspired professional design",
    "/lovable-uploads/78d6fb56-e0b4-4632-a262-deba85415e1d.png": "Search methodology and process flow documentation showing systematic approach to enterprise data discovery optimization",
    "/lovable-uploads/adc23be5-793c-4b9e-9e79-73f51c92d6b8.png": "Comprehensive design system guide establishing visual hierarchy, interaction patterns, and component standards for data platforms",
    "/lovable-uploads/75a41291-ec18-401c-bbf1-8b3daf2c25eb.png": "Final data explorer interface showcasing predictive search, contextual recommendations, and enhanced user experience",
    "/lovable-uploads/633cdf1a-0de5-4fbe-8c06-adc4d2c30a51.png": "Intelligent search recommendations system displaying AI-powered suggestions and contextual data discovery features",
    "/lovable-uploads/8445f64a-5401-42d2-8888-d423cd24ea73.png": "Initial wireframe concepts addressing complex enterprise search challenges and user workflow optimization",
    "/lovable-uploads/5f6ac7d4-58b5-422e-854e-16227fb7c6c9.png": "Research and inspiration gathering from industry-leading platforms like Bloomberg Terminal for professional data interfaces",
    "/lovable-uploads/4d0f57b5-653d-42fb-88c0-f942d18a6a84.png": "Homepage design featuring prominent search functionality and intuitive navigation for enterprise data catalog access",
    "/lovable-uploads/88423dc3-1fd1-480a-846f-4d3f82a9d300.png": "Recent search terms interface showing personalized search history and frequently accessed data patterns",
    "/lovable-uploads/ccb7671a-9fbf-472a-b63b-e11e681ed341.png": "Simplified homepage layout prioritizing search discovery and minimizing cognitive load for enterprise users"
  },
  "splittime": {
    "/lovable-uploads/716b7cef-a40b-4d2a-a4db-6a360313a63a.png": "Secure co-parenting messaging interface designed to facilitate positive communication while maintaining necessary boundaries for family dynamics",
    "/lovable-uploads/9ff55bb2-a684-40cf-a9e9-6afec3054d7e.png": "Comprehensive mobile app screens overview showcasing calendar integration, expense tracking, and child-focused communication features",
    "/lovable-uploads/2c2d5cc4-b820-4d42-8470-4b3147ed61be.png": "Web dashboard interface providing centralized family management tools for scheduling, documentation, and collaborative parenting",
    "/lovable-uploads/7ca9117b-f843-4407-876d-90bbd289f24e.png": "Design process documentation including family counselor insights, legal professional input, and child psychology considerations",
    "/lovable-uploads/bc71b077-5c56-4ad7-af25-3c11ccacd0d1.png": "School integration module enabling seamless educational coordination between co-parents and academic institutions",
    "/lovable-uploads/cb589912-0dc5-44e5-bd32-f5d177296cc3.png": "Impact metrics and user satisfaction data demonstrating improved family communication and reduced scheduling conflicts",
    "/lovable-uploads/ae80b9f9-03aa-452c-8e24-ac5474b42350.png": "Chat interface design promoting constructive communication with child-safety features and conflict prevention tools",
    "/lovable-uploads/6246d44b-1242-4369-95d3-c0e7e579a9fe.png": "Shared calendar schedule view enabling transparent coordination of children's activities and parental responsibilities",
    "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png": "User research findings from divorced parents revealing communication barriers and scheduling coordination challenges",
    "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png": "Iterative wireframe development process showing evolution from concept to family-focused digital solution",
    "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png": "Final mobile application interface demonstrating intuitive navigation and child-centered design principles",
    "/lovable-uploads/59518d59-73f8-4083-b538-21bdd7215742.png": "Custody calendar management system with clear visualization of parenting time and activity coordination",
    "/lovable-uploads/044ebd4f-a061-46fd-8668-fef8e8496a16.png": "Platform evolution documentation showing growth from initial concept to comprehensive co-parenting solution",
    "/lovable-uploads/b8f653d9-0253-43e1-94c8-f4890f48d414.png": "Key challenges identification in post-divorce family communication and digital solution opportunities",
    "/lovable-uploads/57188cd2-5ba4-4a9e-8a57-c70016dd2566.png": "Problem-solving methodology applied to sensitive family dynamics and technology-assisted co-parenting"
  },
  "herbalink": {
    "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png": "Mobile herbalist connection platform enabling secure practitioner discovery and traditional medicine consultations",
    "/lovable-uploads/e4fb8ea0-be2b-41f7-8d69-d8f8a043c213.png": "Comprehensive user journey mapping for herbal medicine practitioners and patients seeking alternative healthcare solutions",
    "/lovable-uploads/ada2ad24-f156-4851-b6e8-572404ccb959.png": "Design process timeline documenting research phases, stakeholder interviews, and iterative development for healthcare compliance",
    "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png": "Workshop materials and collaborative sessions with herbalists, naturopaths, and patients for authentic user experience design",
    "/lovable-uploads/8316c4d1-1eb7-4bbb-b3d5-5c449dbc9e84.png": "User-centered design approach respecting traditional medicine practices while incorporating modern digital conveniences",
    "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png": "Video consultation interface bridging traditional herbal medicine with modern telemedicine capabilities",
    "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png": "Treatment tracking system enabling patients to monitor herbal therapy progress and practitioner collaboration",
    "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png": "Practitioner profile system showcasing qualifications, specializations, and patient reviews for trusted herbalist selection",
    "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png": "Appointment calendar integration streamlining consultation scheduling between herbalists and patients",
    "/lovable-uploads/90cbccae-4660-4e76-8218-1164bbeb0883.png": "Cross-platform features ensuring seamless access to herbal medicine resources across mobile and web interfaces",
    "/lovable-uploads/a874ae96-464b-4d3f-825b-4678373c6cc8.png": "Problem identification in traditional herbal medicine accessibility and digital transformation opportunities",
    "/lovable-uploads/bc0bc72b-4cd7-45f7-a1f6-eff8416ad0fa.png": "Platform overview demonstrating comprehensive herbal medicine ecosystem connecting practitioners and patients",
    "/lovable-uploads/8e4b58bb-b896-4e18-b86d-1fae7fcc576e.png": "Personalized care pathways tailored to individual patient needs and traditional herbal treatment protocols",
    "/lovable-uploads/a332bc93-8bd7-42b3-b4f9-0f24270eb9ab.png": "Comprehensive herb library design featuring detailed plant information, preparation methods, and safety guidelines",
    "/lovable-uploads/41442407-7956-48f5-88bd-f68b4d0ce485.png": "Wellness tracking dashboard enabling patients to monitor symptoms, treatment responses, and health progress",
    "/lovable-uploads/c37c7bf9-100c-4451-9856-1c4ca0adee05.png": "Community support features fostering knowledge sharing and peer connections in alternative medicine",
    "/lovable-uploads/c7039c67-0933-4671-9d1e-0a8e6066b5a0.png": "Interactive herb library interface with search functionality and detailed medicinal plant information",
    "/lovable-uploads/0937ca2e-b4b7-493a-963e-441f9fdafb2f.png": "Virtual consultation platform enabling remote herbal medicine consultations with video and chat capabilities",
    "/lovable-uploads/8fd697f3-7606-4019-834b-7b9fc4ef4a02.png": "Herbalist discovery interface featuring location-based search, specialty filtering, and availability scheduling",
    "/lovable-uploads/00b250de-52be-48ea-b9c4-99626f288d14.png": "Streamlined booking process designed for easy appointment scheduling with herbal medicine practitioners",
    "/lovable-uploads/06c3b4e6-b260-4c9d-90d3-201371ff7381.png": "Welcome onboarding experience introducing new users to herbal medicine platform features and safety protocols",
    "/lovable-uploads/d33a7d68-a919-4e51-b481-44dedceb60ac.png": "Dashboard home interface providing centralized access to consultations, treatments, and herbal medicine resources",
    "/lovable-uploads/8ea27daa-0897-4466-8e91-c24f745f23d7.png": "Platform connection features facilitating seamless communication between traditional medicine practitioners and modern patients"
  },
  "gold2crypto": {
    "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png": "Professional trading dashboard designed for traditional gold investors transitioning to cryptocurrency markets",
    "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png": "Market comparison interface drawing parallels between gold investment patterns and cryptocurrency trading opportunities",
    "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png": "User testing session with traditional gold investors validating cryptocurrency platform usability and trust factors",
    "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png": "Familiar trading interface design reducing cognitive load for precious metals investors entering digital asset space",
    "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png": "Advanced security features and protocols designed to instill confidence in traditional investors exploring cryptocurrency"
  },
  "barskyjoint": {
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png": "Food truck mobile application featuring real-time location tracking and streamlined mobile ordering capabilities",
    "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png": "Core app features overview showcasing unified brand experience across food truck and restaurant operations",
    "/lovable-uploads/2bd2eddc-5394-4d81-890a-57eaa00a7ed3.png": "Initial concept sketches exploring dual-format food service digital solutions and customer journey optimization",
    "/lovable-uploads/27fba121-19a6-475b-977a-925861f25ff2.png": "Customer journey mapping for both mobile food truck interactions and traditional restaurant dining experiences",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png": "Final mobile application interface demonstrating seamless ordering, payment integration, and location services",
    "/lovable-uploads/71606fe7-5087-4d02-a61c-8dc2e771ff98.png": "Design process documentation showing field research methodology and customer behavior analysis",
    "/lovable-uploads/70baa6f2-a718-46e8-809d-52e3c43dc137.png": "Wireframe evolution from initial concepts to refined mobile-first design for dynamic food service operations",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png": "User testing results and feedback integration showing improved customer satisfaction and operational efficiency",
    "/lovable-uploads/b53965c1-86f3-479d-a37c-9395c184fb2d.png": "Restaurant website interface maintaining brand consistency while serving full-service dining experience needs"
  },
  "spectrum": {
    "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png": "Spectrum Apparel homepage featuring accessible design principles and comprehensive custom apparel showcase",
    "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png": "Accessibility testing documentation ensuring inclusive design for users with visual impairments and disabilities",
    "/lovable-uploads/e65cf5f1-62f3-4412-b533-fdfc0e59aae3.png": "Custom shirt designer interface enabling both basic customization and advanced design tools for varied user expertise",
    "/lovable-uploads/6544f03a-2e0f-4adb-b382-521741cdf807.png": "Integrated blog platform establishing Spectrum as thought leader in custom apparel and design education"
  }
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { project, details, isLoading } = useProjectDetail(projectId);
  
  if (isLoading || !project || !details) {
    return <ProjectDetailLoading />;
  }

  // Get captions for current project
  const currentProjectCaptions = projectImageCaptions[projectId || ""] || {};
  
  return (
    <ImageMaximizerProvider>
      <div className="flex flex-col min-h-screen">
        <ProjectDetailSeo 
          title={project.title}
          description={`${project.title} - ${project.tags.join(', ')}`}
          tags={project.tags}
          projectId={projectId || ""}
        />
        
        <Header />
        <main className="flex-grow pt-20">
          <ModernProjectDetail 
            project={project}
            details={details}
            projectId={projectId || ""}
            projectsData={projectsData.map(p => ({
              id: p.id,
              title: p.title,
              image: p.image
            }))}
            imageCaptions={currentProjectCaptions}
          />
        </main>
        <Footer />
      </div>
    </ImageMaximizerProvider>
  );
};

export default ProjectDetail;
