import { ProjectDetails } from "../types/project";

export const investorLoanAppDetails: ProjectDetails = {
  challenge: "Primary Challenge: Transforming Legacy Excel-Based Banking Operations - The bank's outdated Excel-based approach created significant inefficiencies, increased error rates, and severely limited scalability potential. The institution urgently needed to automate workflows, reduce human error, support rapid business growth, handle complex financial data with strict accuracy, and maintain regulatory compliance standards.\n\nUser Adoption Challenges: The biggest challenge was helping users transition from familiar Excel workflows they had used for years to a completely new digital platform while maintaining productivity during the transition period. Required careful change management including training programs, gradual rollout phases, and maintaining some Excel familiarity in the interface design patterns.\n\nTechnical & Regulatory Complexity: Needed to balance usability with strict compliance requirements while handling complex financial data structures that required both accuracy and accessibility for different user roles. The solution had to integrate with existing CRM systems, compliance reporting tools, and communication platforms without disrupting daily banking operations.",

  process: "Banking Team Interviews: I conducted extensive research with the banking team to understand critical pain points: manual data entry errors causing compliance issues, time-consuming Excel tracking processes, difficulty collaborating on complex deals, and limited search capabilities. Developed three key personas: Investment Managers needing quick deal access, Loan Officers requiring efficient processing tools, and Compliance Officers needing accurate reporting and audit trails.\n\nLoan Management User Flows: I mapped the complete user journey from initial loan inquiry to final processing, identifying key decision points and data requirements for complex financial workflows. Created low-fidelity wireframes, user flow mapping, and conducted usability testing with team members for validation before developing high-fidelity prototypes.\n\nBanking Design System: Developed a professional color palette specifically for banking UI applications: Primary Blue for trust and stability, Secondary Gray for professional neutrality, Success Green for confirmations, Warning Orange for attention, and Error Red for critical actions. Ensured WCAG 2.1 AA compliance with screen reader compatibility, keyboard navigation, and high contrast support throughout the platform.\n\nAI-Powered Search Interface: The platform's AI-powered search functionality, inspired by Bloomberg's interface, addressed the critical problem of users being unable to efficiently find specific loans or borrower information within Excel spreadsheets. Implemented dynamic order book management with intuitive limit controls, flexible deal management with card/grid views, and advanced filtering with smart defaults and saved preferences.",

  result: "Results exceeded expectations: 85% reduction in manual errors, 40% faster deal processing, and 200+ orders processed in 60 days. Teams reported workflows became 'actually enjoyable' while eliminating email chaos through integrated communication.\n\nThe transformation went beyond metrics - the bank gained competitive agility while maintaining compliance through automated audit trails. Bloomberg-inspired search patterns reduced the learning curve for users transitioning from Excel.\n\nThis project successfully modernized legacy banking operations by deeply understanding user needs and designing solutions that improved both technical efficiency and daily work experience.",

  technologies: ["User Research", "Figma", "Balsamiq", "AG Grid", "Predictive AI Search", "Banking UI/UX", "Financial Data Visualization", "Excel Automation", "Order Management Systems"],
  duration: "1.5 years",
  client: "Private Banking Institution",
  role: "Lead UX/UI Designer & Product Strategist",

  // Manual captions for all images with project-specific placeholders
  imageCaptions: {
    "/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png": "📊 Excel Spreadsheet Limitations - Manual Excel tracking created data silos, version control issues, and made collaboration nearly impossible",
    "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png": "⚠️ Compliance Risks & Errors - Manual data entry led to frequent errors that created serious compliance and regulatory reporting issues",
    "/lovable-uploads/31f78724-10cf-467d-9ca1-7c9c9d69c792.png": "📧 Email Communication Chaos - Email-based deal communication created information silos and made deal tracking extremely difficult",
    "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png": "👥 Banking Team Interviews - Conducted extensive research with banking teams to understand Excel-based pain points and compliance requirements",
    "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png": "📐 Financial System Architecture - Mapped complex financial workflows and created prototypes for loan management and deal processing",
    "/lovable-uploads/7a8b4364-8a51-4c15-9e30-ab0352103ba1.png": "💼 Banking Platform Development - Guided development of AI-powered search, dynamic order books, and compliance-ready features",
    "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png": "📈 Performance Analytics Dashboard - 85% reduction in manual errors with 40% acceleration in deal processing time",
    "/lovable-uploads/27ed3b6b-f807-461f-a731-d28304ab0b2f.png": "💡 User Experience Transformation - Teams reported workflows became 'actually enjoyable' with integrated communication tools"
  },

  imageConfig: {
    challenge: {
      afterHeader: "/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png"
    },
    process: {
      beforeHeader: "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png",
      afterHeader: "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png"
    },
    result: {
      beforeHeader: "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png"
    }
  },

  availableImages: [
    "/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png",
    "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
    "/lovable-uploads/31f78724-10cf-467d-9ca1-7c9c9d69c792.png",
    "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png",
    "/lovable-uploads/ec1458b5-d364-498e-a5ec-4122b62195d3.png",
    "/lovable-uploads/7a8b4364-8a51-4c15-9e30-ab0352103ba1.png",
    "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png",
    "/lovable-uploads/27ed3b6b-f807-461f-a731-d28304ab0b2f.png"
  ],

  challengeGalleryImages: [
    "/lovable-uploads/e1d0b229-0ec0-4f02-a551-437bd38393e5.png",
    "/lovable-uploads/70efa220-d524-4d37-a9de-fbec00205917.png",
    "/lovable-uploads/31f78724-10cf-467d-9ca1-7c9c9d69c792.png"
  ],

  processImage: "/lovable-uploads/539fc1c8-ca24-465a-b189-653e03404112.png",

  resultGalleryImages: [
    "/lovable-uploads/150a4488-94c2-481d-a7e3-f3730f963866.png",
    "/lovable-uploads/27ed3b6b-f807-461f-a731-d28304ab0b2f.png"
  ],

  useAiCaptions: false
};