
import { ProjectDetails } from "../types/project";
export const barskyjointDetails: ProjectDetails = {
  challenge: "The biggest challenge was creating an ordering experience that was both lightning-fast for rushed lunch customers while still allowing for meaningful burger customization. Food truck customers have notoriously short attention spans and often make decisions while walking, yet our gourmet burger concept required showcasing customization options that differentiated us from fast-food competitors.\n\nTechnical Constraints: Working with a limited development timeline and budget meant finding creative solutions for complex features like real-time location tracking and order queue management. The food truck's mobile nature also presented unique challenges for consistent connectivity and payment processing in various locations.\n\nUser Experience Complexity: Initial user testing revealed that customers were overwhelmed by too many customization options, leading to decision paralysis and cart abandonment. Additionally, managing user expectations around wait times proved difficult without real-time kitchen integration.",

  process: "I conducted comprehensive research to understand the food truck ecosystem and customer pain points. Through interviews with 15 potential customers and observations at local food trucks, I identified key user needs: quick ordering during lunch breaks, real-time location tracking, and menu transparency. I also analyzed competitor apps like Roach Coach and Street Food Finder to understand market gaps.\n\nKey Research Insights:\n• 78% of users abandon food truck lines due to long wait times\n• Users want to see wait times and truck locations in real-time\n• Clear pricing and ingredient information is crucial for decision-making\n• Mobile payment preferred over cash transactions\n\nI mapped out the core user journey from app discovery to order completion, focusing on a streamlined 3-tap ordering process. The information architecture prioritized the menu as the primary entry point, with secondary features like location tracking and order history easily accessible but not cluttering the main experience.\n\nUsing Figma, I developed a comprehensive design system featuring warm, appetite-inducing colors (deep reds and golden yellows) that reflected the gourmet burger brand. I created high-fidelity prototypes for three core user flows: Quick Order Flow (Browse menu → Customize burger → Add sides → Checkout), Truck Locator (Real-time map with truck locations and wait times), and Order Management (Track preparation status and pickup notifications). I conducted 5 usability testing sessions with the Figma prototype, iterating based on feedback to reduce cognitive load and improve order accuracy.\n\nI leveraged Lovable's AI-powered development platform to rapidly prototype and build the React Native application. Using natural language prompts, I translated my Figma designs into functional components, focusing on responsive component architecture, integration with location services, payment processing with Stripe integration, and real-time order status updates using WebSocket connections.",

  result: "The streamlined interface resulted in measurably better user satisfaction. Post-launch surveys showed that 92% of users found the ordering process 'intuitive' and 87% appreciated the real-time truck location feature. The simplified customization flow increased average order value by 23% as users felt confident exploring add-ons without overwhelming choice architecture.\n\nThe app directly contributed to a 35% increase in daily orders and enabled the food truck to serve 25% more customers during peak lunch hours. The pre-ordering feature allowed for better inventory management and reduced food waste by 18%. Most significantly, the app created a direct customer relationship channel, with 68% of users opting into push notifications for daily specials and location updates.\n\nTechnical Achievement: Successfully launching a production-ready mobile app using AI-assisted development demonstrated the viability of rapid prototyping tools for small business applications. The Lovable platform enabled feature iteration at unprecedented speed, with new functionality deployed weekly based on user feedback.",

  technologies: ["React Native", "Web App", "GPS Tracking", "Mobile Ordering", "Reservation System", "Payment Integration", "Real-time Updates", "Restaurant Management"],
  duration: "1.5 years",
  client: "Barsky Joint Restaurant Group",
  role: "Lead UX/UI Designer",
  projectLink: "https://barskyjoint.biz",

  // Disable AI captions - use manual captions only  
  useAiCaptions: false,

  // Manual captions for all images with project-specific placeholders
  imageCaptions: {
    "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png": "⏰ Long Wait Times at Food Trucks - Customers frequently abandoned food truck lines during busy lunch hours, creating lost revenue opportunities",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png": "🍔 Burger Customization Complexity - Gourmet customization options needed to be presented clearly without overwhelming rushed customers",
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png": "💳 Mobile Payment Integration - Contactless payment processing was essential for food truck's mobile business model",
    "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png": "🔍 User Research & Analysis - User interviews, competitor analysis, and market research to understand food truck customer behavior",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png": "🎨 Figma Design & Prototyping - Created design system, wireframes, and high-fidelity prototypes with user testing",
    "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png": "🤖 AI Development with Lovable - Built the app using Lovable's AI-powered development platform",
    "/lovable-uploads/6be59ab1-c95a-47d8-ba03-ebaf589354b5.png": "😊 User Testing Success Metrics - 92% of users found the ordering process intuitive with 87% appreciating real-time features"
  },

  imageConfig: {
    challenge: {
      afterHeader: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png"
    },
    process: {
      afterHeader: "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png"
    },
    result: {
      beforeHeader: "/lovable-uploads/6be59ab1-c95a-47d8-ba03-ebaf589354b5.png"
    }
  },

  availableImages: [
    "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png", 
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png",
    "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png",
    "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png",
    "/lovable-uploads/6be59ab1-c95a-47d8-ba03-ebaf589354b5.png"
  ],

  challengeGalleryImages: [
    "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png",
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png"
  ],

  processImage: "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png",

  resultGalleryImages: [
    "/lovable-uploads/6be59ab1-c95a-47d8-ba03-ebaf589354b5.png",
    "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png"
  ]
};
