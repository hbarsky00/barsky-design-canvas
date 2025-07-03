import { ProjectDetails } from "../types/project";

export const splittimeDetails: ProjectDetails = {
  challenge: "Separated parents face coordination challenges leading to miscommunication, scheduling conflicts, and tension. Traditional communication methods escalate conflicts, lack of centralized scheduling causes confusion, and children suffer from being caught in parental disputes. Problem Statement: How might we create a neutral digital platform that reduces conflict and improves co-parent communication while prioritizing children's wellbeing?",

  process: "Based on comprehensive research methodology that included 12 in-depth interviews with divorced and separated parents, 8 interviews with family counselors and mediators, a survey of over 150 parents currently using existing co-parenting tools, and competitive analysis of 8 existing co-parenting applications, several critical pain points emerged. The research revealed that parents consistently struggle with emotional triggers embedded in standard messaging systems, face scheduling chaos without centralized coordination systems, encounter ongoing financial disputes over child-related expenses, experience documentation issues that lead to critical information loss, and worry about their children being caught in the middle of parental conflicts. Three distinct user personas crystallized from this research: the Overwhelmed Parent who struggles to balance demanding work schedules with complex childcare coordination needs, the Detail-Oriented Parent who requires comprehensive tracking and documentation capabilities to manage every aspect of co-parenting arrangements, and the Conflict-Avoidant Parent who desperately seeks solutions that minimize direct communication with their ex-partner while still maintaining effective coordination for their children's wellbeing.",

  result: "Scheduling conflicts dropped 70%, but more importantly, kids started seeing their parents work together instead of against each other.\n\nWith over 10,000 families now using the platform, we've proven that technology can bring people together, even after they've grown apart.",

  technologies: ["React Native", "Node.js", "MongoDB", "Socket.io", "Push Notifications", "Calendar APIs", "Secure Messaging", "Payment Integration", "Family Safety Features"],
  duration: "1 year to present",  
  client: "Family Technology Startup",
  role: "Lead Product Designer & UX Researcher",
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
