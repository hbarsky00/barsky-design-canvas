
import { useMemo } from "react";

interface ProcessContent {
  processBeforeGallery: string;
  processAfterGallery: string;
}

export const useProcessContent = (
  process: string, 
  isInvestorProject: boolean, 
  processBreakpoint: string
): ProcessContent => {
  return useMemo(() => {
    const processIndex = process.indexOf(processBreakpoint);
    
    let processBeforeGallery = "";
    let processAfterGallery = "";
    
    if (isInvestorProject && processIndex !== -1) {
      processBeforeGallery = process.substring(0, processIndex).trim();
      processAfterGallery = process.substring(processIndex).trim();
    } else {
      processAfterGallery = process;
    }

    return {
      processBeforeGallery,
      processAfterGallery
    };
  }, [process, isInvestorProject, processBreakpoint]);
};
