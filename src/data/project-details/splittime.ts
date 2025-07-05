import { ProjectDetails } from "../types/project";

export const splittimeDetails: ProjectDetails = {
  challenge: "Primary Challenge: Emotional Design at the Intersection of Logistics and Relationships - Co-parenting can be one of the most emotionally and logistically challenging experiences in modern family life. Many parents rely on disconnected tools that increase stress and conflict. Every design detail—from message templates to color choices—affects trust and usability in this sensitive context.\n\nDesign Principles: From research, I identified four core design principles: Simplicity first to strip away friction, Balance and fairness so both parents feel equally represented, Emotional neutrality using calm visual language, and Transparency to avoid ambiguity. These principles guided every design decision from color choice to interaction patterns.\n\nTechnical & Emotional Complexity: The biggest challenge was creating an interface that remained emotionally neutral while handling complex custody arrangements, expense splitting, and communication needs. Required careful balance between functionality and simplicity, ensuring no parent felt disadvantaged by the interface design or information hierarchy.",

  process: "Co-Parent Interview Research: I conducted interviews with seven parents managing joint or split custody arrangements. Their pain points were consistent: stress from communication breakdowns, difficulties tracking expenses, and friction when coordinating schedules. Competitive audit of OurFamilyWizard, Coparently, and AppClose revealed bloated features, poor UIs, and expensive paywalls.\n\nFamily Coordination Feature Design: SplitTime centers around five core tools: shared calendar for custody schedules, expense tracker with receipts, secure messaging with respectful prompts, document vault for records, and private parenting journal for personal notes. Each feature was designed with emotional neutrality and transparency in mind to reduce conflict and build trust.\n\nWireframes & User Testing: I created wireframes for each flow and tested them with five early participants. Feedback led to key improvements in custody schedule visualization (alternating weeks, color coding) and expense splitting clarity. Prioritized mobile-first patterns, clear navigation, and minimal friction throughout the experience.\n\nVisual Design & Accessibility: The app uses soft, calming colors—blues and greens—with rounded sans-serif typeface to reinforce neutrality and trust. Interfaces are intentionally sparse and clean. Tap targets and contrast ratios meet accessibility standards. Icons designed for clarity and warmth without being too playful or clinical.",

  result: "SplitTime is now fully designed and developed, ready for user testing. While not yet publicly marketed, the product is stable and functional with all core features implemented. The next milestone is structured usability testing with a larger group of co-parents to gather quantitative and qualitative insights before soft launch.\n\nDesigning SplitTime emphasized how crucial emotional design is when products live at the intersection of logistics and personal relationships. Every detail affects trust and usability. In the next phase, I plan to incorporate more personalization and smart defaults while exploring AI tone moderation tools to further reduce communication conflict.\n\nNext Steps: Immediate priorities include recruiting co-parents for structured testing, tracking task completion and friction points, refining onboarding and notification logic, and developing go-to-market strategy focused on trust, safety, and simplicity. The foundation is solid—now it's time to validate with real users and iterate based on their feedback.",

  technologies: ["React Native", "Node.js", "MongoDB", "Socket.io", "Push Notifications", "Calendar APIs", "Secure Messaging", "Payment Integration", "Family Safety Features"],
  duration: "1 year to present",
  client: "Family Technology Startup",
  role: "Lead Product Designer & UX Researcher", 
  projectLink: "http://splittime.pro",

  // Disable AI captions - use manual captions only
  useAiCaptions: false,

  // Manual captions for all images with project-specific placeholders  
  imageCaptions: {
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png": "💬 Communication Breakdown - Heated text exchanges and email chains often escalated minor scheduling conflicts into major disputes",
    "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png": "📊 Scattered Tools & Data - Parents juggled multiple apps, spreadsheets, and calendars leading to missed pickups and duplicate expenses",
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png": "😰 Emotional Stress & Tension - Simple logistics became emotionally charged when filtered through relationship tension and custody concerns",
    "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png": "🔍 User Research & Discovery - Conducted interviews with 7 co-parents to understand pain points and existing tool limitations",
    "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png": "🎨 UX Design & Testing - Created wireframes, tested with 5 participants, and refined key flows based on feedback", 
    "/lovable-uploads/41321aa7-5b68-4633-93d3-bc34aff90385.png": "📱 Visual Design & Development - Developed calming visual design and guided development to fully functional MVP",
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png": "✅ MVP Development Completion - SplitTime is now fully designed and developed, ready for user testing",
    "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png": "💡 Key Learnings & Insights - Emphasized crucial role of emotional design in products at intersection of logistics and relationships"
  },

  imageConfig: {
    challenge: {
      beforeHeader: "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png",
      afterHeader: "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png"
    },
    process: {
      beforeHeader: "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png",
      afterHeader: "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png"
    },
    result: {
      beforeHeader: "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png"
    }
  },

  availableImages: [
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png",
    "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png",
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png",
    "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png",
    "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png",
    "/lovable-uploads/41321aa7-5b68-4633-93d3-bc34aff90385.png",
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png",
    "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png"
  ],

  challengeGalleryImages: [
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png",
    "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png", 
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png"
  ],

  processImage: "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png",

  resultGalleryImages: [
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png",
    "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png"
  ]
};