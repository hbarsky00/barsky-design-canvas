import { StructuredCaseStudyData } from "./types/caseStudy";

export const structuredCaseStudies: Record<string, StructuredCaseStudyData> = {
  splittime: {
    id: "splittime",
    title: "SplitTime: Revolutionizing Shared Expense Management",
    description: "A comprehensive mobile and web application designed to simplify expense tracking and splitting among groups, featuring real-time synchronization and intelligent categorization.",
    tags: ["Mobile App", "Web Development", "UX/UI Design", "React Native", "Real-time Sync"],
    heroVideo: {
      // FIXED: Use unique hero video poster URL to prevent cross-contamination
      poster: "https://barskyux.com/wp-content/uploads/2025/08/splittime-hero-poster.png",
      videoSrc: "/videos/splittime-hero.mp4",
      fallbackImage: "https://barskyux.com/wp-content/uploads/2025/08/splittime-hero-fallback.png"
    },
    projectLink: {
      live: "https://splittime.example.com",
      github: "https://github.com/example/splittime"
    },
    gradientClasses: "from-blue-600 via-purple-600 to-teal-600",
    sections: [
      {
        id: "problem",
        type: "problem",
        title: "The Challenge",
        content: "Managing shared expenses in group settings has always been a complex and often frustrating experience. Traditional methods rely on manual calculations, paper receipts, and constant back-and-forth communication.",
        // FIXED: Use unique problem section image URL
        image: "https://barskyux.com/wp-content/uploads/2025/08/splittime-problem-section.png",
        imageCaption: "Traditional expense splitting methods are complex and error-prone"
      },
      {
        id: "solution",
        type: "solution", 
        title: "The Solution",
        content: "SplitTime provides an intelligent, user-friendly platform that automates expense calculations, tracks individual contributions, and ensures transparent financial management for any group size.",
        image: "https://barskyux.com/wp-content/uploads/2025/08/featureimage1.png",
        imageCaption: "SplitTime's intuitive interface simplifies group expense management"
      },
    ]
  }
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
