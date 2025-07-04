import { ProjectDetails } from "../types/project";

export const splittimeDetails: ProjectDetails = {
  challenge: "Emotional Design at the Intersection of Logistics and Relationships - Co-parenting can be one of the most emotionally and logistically challenging experiences in modern family life. Many parents rely on disconnected tools that increase stress and conflict. Every design detail—from message templates to color choices—affects trust and usability in this sensitive context.",

  challengeAdditionalText: "Design Principles: From research, I identified four core design principles: Simplicity first to strip away friction, Balance and fairness so both parents feel equally represented, Emotional neutrality using calm visual language, and Transparency to avoid ambiguity. These principles guided every design decision from color choice to interaction patterns.\n\nTechnical & Emotional Complexity: The biggest challenge was creating an interface that remained emotionally neutral while handling complex custody arrangements, expense splitting, and communication needs. Required careful balance between functionality and simplicity, ensuring no parent felt disadvantaged by the interface design or information hierarchy.",

  process: "I conducted interviews with seven parents managing joint or split custody arrangements. Their pain points were consistent: stress from communication breakdowns, difficulties tracking expenses, and friction when coordinating schedules. SplitTime centers around five core tools: shared calendar for custody schedules, expense tracker with receipts, secure messaging with respectful prompts, document vault for records, and private parenting journal. I created wireframes for each flow and tested them with five early participants, leading to key improvements in custody schedule visualization and expense splitting clarity. The app uses soft, calming colors—blues and greens—with rounded sans-serif typeface to reinforce neutrality and trust.",

  result: "SplitTime is now fully designed and developed, ready for user testing with all core features implemented. While not yet publicly marketed, the product is stable and functional. Designing SplitTime emphasized how crucial emotional design is when products live at the intersection of logistics and personal relationships. Every detail affects trust and usability. The next milestone is structured usability testing with a larger group of co-parents before soft launch.",

  technologies: ["Figma", "Sketch", "InVision", "Principle", "React Native", "Node.js", "MongoDB", "Socket.io", "Push Notifications"],
  duration: "3 weeks",
  client: "Family Technology Startup",
  role: "Lead UX Designer",
  projectLink: "http://splittime.pro",
  
  // Disable AI captions - use manual captions only
  useAiCaptions: false,

  // Manual captions for all images
  imageCaptions: {
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png": "Splittime app user flow diagram showing navigation paths for different user types",
    "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png": "User personas showing Dad, Mom, Lawyer, and Judge with their information and usage patterns",
    "/lovable-uploads/9ffb7140-e75f-4bd2-bc71-39e527664cc1.png": "User personas showing Dad, Mom, Lawyer, and Judge with their information and usage patterns",
    "/lovable-uploads/39924843-58df-42d8-918b-f8a7cffa124e.png": "Splittime app user flow diagram showing navigation paths for different user types",
    "/lovable-uploads/4edbc00b-80df-4dcd-bf13-ef4526e23d80.png": "Splittime co-parenting app interface showing alerts dashboard and notifications panel",
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png": "Co-parenting dashboard showing family coordination features",
    "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png": "Child wellbeing tracking interface with activity updates",
    "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png": "Family calendar displaying custody schedule and events",
    "/lovable-uploads/6e70d067-2ac3-4ead-a811-8dca98a26393.png": "Parent communication screen for coordinating child activities",
    "/lovable-uploads/053bd992-cc02-4938-9f9f-a693e33d3f56.png": "Child profile management with health and activity information",
    "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png": "Family notifications panel showing upcoming events and alerts",
    "/lovable-uploads/5e40f1bc-c8df-4ad5-8dca-1bc94c9af030.png": "Co-parenting mobile view showing dashboard and child wellbeing",
    "/lovable-uploads/41321aa7-5b68-4633-93d3-bc34aff90385.png": "Parent coordination interface with notification alerts",
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png": "Results and impact metrics showing 60% reduction in court visits, $25K annual savings, and 85% satisfaction rate"
  },

  imageConfig: {
    challenge: {
      beforeHeader: "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png",
      afterHeader: "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png"
    },
    process: {
      // Removed beforeHeader to eliminate duplicate - the family calendar image will only appear as processImage
    },
    result: {
      beforeHeader: "/lovable-uploads/053bd992-cc02-4938-9f9f-a693e33d3f56.png",
      afterHeader: "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png"
    }
  },

  // Enhanced gallery content with text sections between images
  challengeGalleryContent: [
    {
      type: 'image',
      content: '/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png',
      caption: 'Splittime app user flow diagram showing navigation paths for different user types'
    },
    {
      type: 'image',
      content: '/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png',
      caption: 'User personas showing Dad, Mom, Lawyer, and Judge with their information and usage patterns'
    },
    {
      type: 'video',
      content: 'https://www.loom.com/share/0bf47ee2418c46dd9196ec72afad5a39?sid=a2b787d0-b14f-4a68-8a8a-d441db511fe4',
      caption: 'Splittime app demonstration video showing key features and user interactions'
    },
    {
      type: 'image',
      content: '/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png',
      caption: 'Co-parenting dashboard showing family coordination features'
    },
    {
      type: 'text',
      content: 'The main dashboard needed to provide instant visibility into all family activities while maintaining a neutral, non-confrontational interface. Parents could see schedules, messages, and child updates without the emotional triggers that often escalate conflicts.',
      textKey: 'challenge_text_1'
    },
    {
      type: 'image',
      content: '/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png',
      caption: 'Child wellbeing tracking interface with activity updates'
    },
    {
      type: 'text',
      content: 'Child wellbeing became the central focus of our design. This screen shows how we prioritized the children\'s needs and activities, making their happiness and development the primary metric for success.',
      textKey: 'challenge_text_2'
    }
  ],

  processGalleryContent: [
    {
      type: 'image',
      content: '/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png',
      caption: 'Family calendar displaying custody schedule and events'
    },
    {
      type: 'text',
      content: 'The calendar interface went through 12 iterations. We tested with real families to ensure it reduced confusion rather than adding to it. The color coding and clear visual hierarchy were crucial for quick comprehension.',
      textKey: 'process_text_1'
    },
    {
      type: 'image',
      content: '/lovable-uploads/41321aa7-5b68-4633-93d3-bc34aff90385.png',
      caption: 'Parent coordination interface with notification alerts'
    },
    {
      type: 'text',
      content: 'Notification design was critical - we needed to alert parents without overwhelming them. The system learned from user behavior to send the right information at the right time.',
      textKey: 'process_text_2'
    }
  ],

  availableImages: [
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png",
    "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png",
    "/lovable-uploads/9ffb7140-e75f-4bd2-bc71-39e527664cc1.png",
    "/lovable-uploads/39924843-58df-42d8-918b-f8a7cffa124e.png",
    "/lovable-uploads/4edbc00b-80df-4dcd-bf13-ef4526e23d80.png",
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png",
    "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png",
    "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png",
    "/lovable-uploads/6e70d067-2ac3-4ead-a811-8dca98a26393.png",
    "/lovable-uploads/053bd992-cc02-4938-9f9f-a693e33d3f56.png",
    "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png",
    "/lovable-uploads/5e40f1bc-c8df-4ad5-8dca-1bc94c9af030.png",
    "/lovable-uploads/41321aa7-5b68-4633-93d3-bc34aff90385.png",
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png"
  ],

  // Legacy support - keep existing gallery images for backward compatibility
  challengeGalleryImages: [
    "/lovable-uploads/028009a0-8ed7-4cf1-9155-1269a756bcb1.png",
    "/lovable-uploads/a2a89b81-55de-4401-ba10-ce7b03e08e2a.png",
    "/lovable-uploads/3be08617-e041-4762-95ee-d64e40bfa9bd.png",
    "/lovable-uploads/54b8d8d3-83c7-4d48-b647-d7ae18dd9685.png"
  ],
  processImage: "/lovable-uploads/ae5ccd96-fa33-40a2-a780-81e82a3beb93.png",
  processGalleryImages: [
    "/lovable-uploads/41321aa7-5b68-4633-93d3-bc34aff90385.png"
  ],
  resultGalleryImages: [
    "/lovable-uploads/010681bc-91bc-4f74-9ad9-33cba67f1289.png",
    "/lovable-uploads/6e3f4a75-27d9-4d78-b9be-b3712a0d640b.png"
  ]
};
