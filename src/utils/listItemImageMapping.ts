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
  // Herbalink-specific features
  "trust-building verification": "/lovable-uploads/9fdc648a-10a5-4064-b579-b5decbe2da4d.png",
  "practitioner credentials": "/lovable-uploads/b80704a1-be0a-449f-8f1e-fac0c50daa5d.png",
  "streamlined booking flow": "/lovable-uploads/6c674eda-d6fd-4603-81c2-87f2d202dbc3.png",
  "reduced friction": "/lovable-uploads/6c674eda-d6fd-4603-81c2-87f2d202dbc3.png",
  "ai-powered herbalist matching": "/lovable-uploads/da41f3f1-3e1c-4300-83dc-d8a72c1d6831.png",
  "symptoms and preferences": "/lovable-uploads/d6c83a40-3d29-41c5-a4fd-1edf94a20375.png",
  "mobile-first interface": "/lovable-uploads/f0a13f3a-d111-4f75-962f-9c3d0f7e32a4.png",
  "healthcare decision-making": "/lovable-uploads/f0a13f3a-d111-4f75-962f-9c3d0f7e32a4.png",
  "chatgpt api": "/lovable-uploads/d6c83a40-3d29-41c5-a4fd-1edf94a20375.png",
  "personalized herbalist recommendations": "/lovable-uploads/da41f3f1-3e1c-4300-83dc-d8a72c1d6831.png",
  "advanced user journey mapping": "/lovable-uploads/02cb6dee-9823-4fbe-9509-1ec886f5c41c.png",
  "behavioral insights": "/lovable-uploads/02cb6dee-9823-4fbe-9509-1ec886f5c41c.png",
  "mobile-first responsive design": "/lovable-uploads/625861de-fcc5-4aa3-98c8-ae385d58e3d3.png",
  "accessibility focus": "/lovable-uploads/625861de-fcc5-4aa3-98c8-ae385d58e3d3.png",
  
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