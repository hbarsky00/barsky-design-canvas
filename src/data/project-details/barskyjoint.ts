
import { ProjectDetails } from "../types/project";

export const barskyjointDetails: ProjectDetails = {
  challenge: "Balancing Speed with Customization - The biggest challenge was creating an ordering experience that was both lightning-fast for rushed lunch customers while still allowing for meaningful burger customization. Food truck customers have notoriously short attention spans and often make decisions while walking, yet our gourmet burger concept required showcasing customization options that differentiated us from fast-food competitors.",

  challengeAdditionalText: "Technical Constraints: Working with a limited development timeline and budget meant finding creative solutions for complex features like real-time location tracking and order queue management. The food truck's mobile nature also presented unique challenges for consistent connectivity and payment processing in various locations.\n\nUser Experience Complexity: Initial user testing revealed that customers were overwhelmed by too many customization options, leading to decision paralysis and cart abandonment. Additionally, managing user expectations around wait times proved difficult without real-time kitchen integration.",

  process: "I conducted comprehensive research to understand the food truck ecosystem and customer pain points. Through interviews with 15 potential customers and observations at local food trucks, I identified key user needs: quick ordering during lunch breaks, real-time location tracking, and menu transparency. I mapped out the core user journey from app discovery to order completion, focusing on a streamlined 3-tap ordering process. Using Figma, I developed a comprehensive design system featuring warm, appetite-inducing colors that reflected the gourmet burger brand. I leveraged Lovable's AI-powered development platform to rapidly prototype and build the React Native application, translating my Figma designs into functional components with integrated location services, payment processing, and real-time order status updates.",

  result: "The streamlined interface resulted in measurably better user satisfaction with 92% of users finding the ordering process 'intuitive' and 87% appreciating the real-time truck location feature. The app directly contributed to a 35% increase in daily orders and enabled the food truck to serve 25% more customers during peak lunch hours. The pre-ordering feature allowed for better inventory management and reduced food waste by 18%, with 68% of users opting into push notifications for location updates.",

  technologies: ["Lovable", "React Native", "Figma", "Stripe", "WebSocket", "GPS Tracking", "Mobile Ordering", "Payment Integration", "Real-time Updates"],
  duration: "4 weeks",
  client: "Barsky Joint Restaurant Group", 
  role: "UX Designer & Developer",
  projectLink: "https://barskyjoint.biz",

  // Disable AI captions - use manual captions only
  useAiCaptions: false,

  // Manual captions for all images
  imageCaptions: {
    "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png": "Barsky Joint desktop menu interface showcasing signature items, burgers, and comprehensive food ordering system with customization options",
    "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png": "Food truck GPS tracking and location system",
    "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png": "Restaurant reservation management platform",
    "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png": "Order tracking and delivery system",
    "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png": "Customer loyalty and engagement features",
    "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png": "Brand integration across mobile and web platforms",
    "/lovable-uploads/6be59ab1-c95a-47d8-ba03-ebaf589354b5.png": "Analytics dashboard showing order increases"
  },

  imageConfig: {
    challenge: {
      afterHeader: "/lovable-uploads/c38018a8-f2a2-49ee-ac88-837de2d1e82d.png"
    },
    process: {
      afterHeader: "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png"
    },
    result: {
      beforeHeader: "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png"
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
    "/lovable-uploads/734cc9eb-7dd3-44be-9815-8f2c35f8a785.png"
  ],

  processImage: "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png",

  resultGalleryImages: [
    "/lovable-uploads/a566ef85-3556-47c1-9175-16aaa0ec4e44.png"
  ]
};
