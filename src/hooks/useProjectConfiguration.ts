
import { useMemo } from "react";

interface ProjectConfiguration {
  isInvestorProject: boolean;
  isDaeSearchProject: boolean;
  inspirationImages: string[];
  inspirationCaptions: Record<string, string>;
  servicesCaptions: Record<string, string>;
  processBreakpoint: string;
}

export const useProjectConfiguration = (projectId?: string): ProjectConfiguration => {
  return useMemo(() => {
    const isInvestorProject = projectId === "investor-loan-app";
    const isDaeSearchProject = projectId === "daesearchproject";

    const inspirationImages = [
      "/lovable-uploads/e2d780f2-eb08-4510-83d7-3b5c7d30ec59.png",
      "/lovable-uploads/39898ab4-1bbc-4590-9af2-114808c351c0.png",
      "/lovable-uploads/c90d7110-4675-4b9e-bb87-7cdcce4bfc3f.png"
    ];

    const inspirationCaptions = {
      "/lovable-uploads/e2d780f2-eb08-4510-83d7-3b5c7d30ec59.png": "Professional search interface showing people search results",
      "/lovable-uploads/39898ab4-1bbc-4590-9af2-114808c351c0.png": "Advanced predictive search with categorized results",
      "/lovable-uploads/c90d7110-4675-4b9e-bb87-7cdcce4bfc3f.png": "Search functionality with recent deals and suggestions"
    };

    const servicesCaptions = {
      "/lovable-uploads/8445f64a-5401-42d2-8888-d423cd24ea73.png": "Initial wireframes and user research insights",
      "/lovable-uploads/5f6ac7d4-58b5-422e-854e-16227fb7c6c9.png": "Research inspiration and competitive analysis",
      "/lovable-uploads/4d0f57b5-653d-42fb-88c0-f942d18a6a84.png": "Homepage design with integrated search functionality"
    };

    const processBreakpoint = "For the search functionality, I analyzed leading financial interfaces as inspiration, implementing a predictive AI search with multiple categories.";

    return {
      isInvestorProject,
      isDaeSearchProject,
      inspirationImages,
      inspirationCaptions,
      servicesCaptions,
      processBreakpoint
    };
  }, [projectId]);
};
