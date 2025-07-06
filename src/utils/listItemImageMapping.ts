// Import all list item images
import herbalinstSearch from "@/assets/list-items/herbalist-search.jpg";
import consultationTools from "@/assets/list-items/consultation-tools.jpg";
import intakeProcess from "@/assets/list-items/intake-process.jpg";
import progressTracking from "@/assets/list-items/progress-tracking.jpg";
import educationResources from "@/assets/list-items/education-resources.jpg";
import neutralCommunication from "@/assets/list-items/neutral-communication.jpg";
import familyCalendar from "@/assets/list-items/family-calendar.jpg";
import childWellbeing from "@/assets/list-items/child-wellbeing.jpg";
import excelProblems from "@/assets/list-items/excel-problems.jpg";
import loanDashboard from "@/assets/list-items/loan-dashboard.jpg";
import dataValidation from "@/assets/list-items/data-validation.jpg";
import successMetrics from "@/assets/list-items/success-metrics.jpg";

// Mapping of keywords/patterns to images
const imageMapping: Record<string, string> = {
  // Healthcare/Herbal Medicine
  "find qualified": herbalinstSearch,
  "herbalists": herbalinstSearch,
  "practitioners": herbalinstSearch,
  "patient management": herbalinstSearch,
  "consultation": consultationTools,
  "video call": consultationTools,
  "management tools": consultationTools,
  "intake": intakeProcess,
  "standardized": intakeProcess,
  "intake form": intakeProcess,
  "herb tracking": progressTracking,
  "progress": progressTracking,
  "effectiveness": progressTracking,
  "treatment": progressTracking,
  "educational": educationResources,
  "resources": educationResources,
  "learning": educationResources,
  "confidence": educationResources,
  
  // Co-parenting/Family
  "communication": neutralCommunication,
  "messaging": neutralCommunication,
  "neutral": neutralCommunication,
  "co-parent": neutralCommunication,
  "calendar": familyCalendar,
  "scheduling": familyCalendar,
  "custody": familyCalendar,
  "family events": familyCalendar,
  "children": childWellbeing,
  "child wellbeing": childWellbeing,
  "wellbeing": childWellbeing,
  "child dashboard": childWellbeing,
  
  // Banking/Finance
  "excel": excelProblems,
  "manual": excelProblems,
  "spreadsheet": excelProblems,
  "data errors": excelProblems,
  "data entry": excelProblems,
  "loan tracking": loanDashboard,
  "banking": loanDashboard,
  "loan dashboard": loanDashboard,
  "centralized": loanDashboard,
  "automated": dataValidation,
  "validation": dataValidation,
  "banking system": dataValidation,
  "professional design": dataValidation,
  "satisfaction": successMetrics,
  "metrics": successMetrics,
  "user results": successMetrics,
  "success rate": successMetrics,
  "improvement": successMetrics,
  "reduction": successMetrics
};

export const getImageForListItem = (itemText: string): string | null => {
  const lowerText = itemText.toLowerCase();
  
  // Check for exact matches first, then partial matches
  for (const [keyword, image] of Object.entries(imageMapping)) {
    if (lowerText.includes(keyword.toLowerCase())) {
      return image;
    }
  }
  
  return null;
};

export default imageMapping;