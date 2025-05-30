
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectsData } from "@/data/projects/projectsList";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ProjectDetailLoading from "@/components/project/ProjectDetailLoading";
import ProjectDetailSeo from "@/components/project/ProjectDetailSeo";
import ProjectDetailContent from "@/components/project/ProjectDetailContent";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { investorLoanImageCaptions } from "@/data/investorLoanData";

// Image captions for each project
const projectImageCaptions: Record<string, Record<string, string>> = {
  "investor-loan-app": {
    "/lovable-uploads/2d19b9e1-cbd1-4c7f-b733-6b20049f070e.png": "Loans orderbook interface",
    "/lovable-uploads/74f89ce6-f4fd-44d9-a8ea-e5573014208c.png": "Design thinking process",
    "/lovable-uploads/19954f9e-0643-434e-aab0-2f9eb992fabe.png": "Investor participation dashboard",
    "/lovable-uploads/d182275b-452b-4699-a81a-2bf1e846f871.png": "Typography system",
    "/lovable-uploads/14a16e01-623e-4712-b39b-16f61c682a11.png": "Deal management cards",
    ...investorLoanImageCaptions
  },
  "dae-search": {
    "/lovable-uploads/4cdd5e0d-f7c9-4d83-b760-08ffe57f27f4.png": "Data catalog interface",
    "/lovable-uploads/544c0417-cda6-4fee-af30-348eb96cf290.png": "Old filtering interface",
    "/lovable-uploads/78d6fb56-e0b4-4632-a262-deba85415e1d.png": "Search process flow",
    "/lovable-uploads/adc23be5-793c-4b9e-9e79-73f51c92d6b8.png": "Design system guide",
    "/lovable-uploads/75a41291-ec18-401c-bbf1-8b3daf2c25eb.png": "Final explorer interface",
    "/lovable-uploads/633cdf1a-0de5-4fbe-8c06-adc4d2c30a51.png": "Search recommendations",
    "/lovable-uploads/8445f64a-5401-42d2-8888-d423cd24ea73.png": "Initial wireframes",
    "/lovable-uploads/5f6ac7d4-58b5-422e-854e-16227fb7c6c9.png": "Research inspiration",
    "/lovable-uploads/4d0f57b5-653d-42fb-88c0-f942d18a6a84.png": "Homepage with search",
    "/lovable-uploads/88423dc3-1fd1-480a-846f-4d3f82a9d300.png": "Recent search terms",
    "/lovable-uploads/ccb7671a-9fbf-472a-b63b-e11e681ed341.png": "Simplified homepage"
  },
  "splittime": {
    "/lovable-uploads/716b7cef-a40b-4d2a-a4db-6a360313a63a.png": "Messaging interface",
    "/lovable-uploads/9ff55bb2-a684-40cf-a9e9-6afec3054d7e.png": "App screens overview",
    "/lovable-uploads/2c2d5cc4-b820-4d42-8470-4b3147ed61be.png": "Web dashboard",
    "/lovable-uploads/7ca9117b-f843-4407-876d-90bbd289f24e.png": "Design process docs",
    "/lovable-uploads/bc71b077-5c56-4ad7-af25-3c11ccacd0d1.png": "School tracking module",
    "/lovable-uploads/cb589912-0dc5-44e5-bd32-f5d177296cc3.png": "Impact metrics",
    "/lovable-uploads/ae80b9f9-03aa-452c-8e24-ac5474b42350.png": "Chat interface design",
    "/lovable-uploads/6246d44b-1242-4369-95d3-c0e7e579a9fe.png": "Calendar schedule view",
    "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png": "User research findings",
    "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png": "Wireframe iterations",
    "/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png": "Mobile app final",
    "/lovable-uploads/59518d59-73f8-4083-b538-21bdd7215742.png": "Custody calendar",
    "/lovable-uploads/044ebd4f-a061-46fd-8668-fef8e8496a16.png": "Platform evolution",
    "/lovable-uploads/b8f653d9-0253-43e1-94c8-f4890f48d414.png": "Key challenges",
    "/lovable-uploads/57188cd2-5ba4-4a9e-8a57-c70016dd2566.png": "Problem solving"
  },
  "herbalink": {
    "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png": "Mobile herbalist connection",
    "/lovable-uploads/e4fb8ea0-be2b-41f7-8d69-d8f8a043c213.png": "User journey map",
    "/lovable-uploads/ada2ad24-f156-4851-b6e8-572404ccb959.png": "Design process timeline",
    "/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png": "Workshop materials",
    "/lovable-uploads/8316c4d1-1eb7-4bbb-b3d5-5c449dbc9e84.png": "User-centered approach",
    "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png": "Video consultation",
    "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png": "Treatment tracking",
    "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png": "Practitioner profiles",
    "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png": "Appointment calendar",
    "/lovable-uploads/90cbccae-4660-4e76-8218-1164bbeb0883.png": "Cross-platform features",
    "/lovable-uploads/a874ae96-464b-4d3f-825b-4678373c6cc8.png": "Problem identification",
    "/lovable-uploads/bc0bc72b-4cd7-45f7-a1f6-eff8416ad0fa.png": "Platform overview",
    "/lovable-uploads/8e4b58bb-b896-4e18-b86d-1fae7fcc576e.png": "Personalized care",
    "/lovable-uploads/a332bc93-8bd7-42b3-b4f9-0f24270eb9ab.png": "Herb library design",
    "/lovable-uploads/41442407-7956-48f5-88bd-f68b4d0ce485.png": "Wellness tracking",
    "/lovable-uploads/c37c7bf9-100c-4451-9856-1c4ca0adee05.png": "Community support",
    "/lovable-uploads/c7039c67-0933-4671-9d1e-0a8e6066b5a0.png": "Herb library",
    "/lovable-uploads/0937ca2e-b4b7-493a-963e-441f9fdafb2f.png": "Virtual consultation",
    "/lovable-uploads/8fd697f3-7606-4019-834b-7b9fc4ef4a02.png": "Herbalist discovery",
    "/lovable-uploads/00b250de-52be-48ea-b9c4-99626f288d14.png": "Booking process",
    "/lovable-uploads/06c3b4e6-b260-4c9d-90d3-201371ff7381.png": "Welcome onboarding",
    "/lovable-uploads/d33a7d68-a919-4e51-b481-44dedceb60ac.png": "Dashboard home",
    "/lovable-uploads/8ea27daa-0897-4466-8e91-c24f745f23d7.png": "Platform connection"
  },
  "gold2crypto": {
    "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png": "Trading dashboard",
    "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png": "Market comparison",
    "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png": "User testing session",
    "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png": "Trading interface",
    "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png": "Security features"
  },
  "barskyjoint": {
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png": "Food truck app",
    "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png": "Core app features",
    "/lovable-uploads/2bd2eddc-5394-4d81-890a-57eaa00a7ed3.png": "Concept sketches",
    "/lovable-uploads/27fba121-19a6-475b-977a-925861f25ff2.png": "Journey mapping",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png": "Final app interface",
    "/lovable-uploads/71606fe7-5087-4d02-a61c-8dc2e771ff98.png": "Design process",
    "/lovable-uploads/70baa6f2-a718-46e8-809d-52e3c43dc137.png": "Wireframe evolution",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png": "Testing results",
    "/lovable-uploads/b53965c1-86f3-479d-a37c-9395c184fb2d.png": "Restaurant website"
  },
  "spectrum": {
    "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png": "Apparel homepage",
    "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png": "Accessibility testing",
    "/lovable-uploads/e65cf5f1-62f3-4412-b533-fdfc0e59aae3.png": "Custom shirt designer",
    "/lovable-uploads/6544f03a-2e0f-4adb-b382-521741cdf807.png": "Blog section"
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
        
        {/* Back to Projects navigation above header */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/projects" className="flex items-center text-barsky-text hover:text-barsky-blue transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </div>
        </div>
        
        <Header />
        <main className="flex-grow pt-32">
          <ProjectDetailContent 
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
