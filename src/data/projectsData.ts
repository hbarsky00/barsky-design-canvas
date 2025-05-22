
import { ProjectProps } from "@/components/ProjectCard";

export interface ProjectDetails {
  challenge: string;
  process: string;
  result: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
  extraImages: string[];
  challengeImage?: string;
  processImage?: string;
  resultImage?: string;
  caseStudyLink?: string;
  galleryImages?: string[];
  slidesUrl?: string;
}

export const projectDetails: Record<string, ProjectDetails> = {
  "splittime": {
    challenge: "Separated parents face significant challenges in coordinating childcare responsibilities, often leading to miscommunication, scheduling conflicts, and increased tension. Traditional communication methods like text messages and emails can exacerbate these issues, especially when co-parenting relationships are already strained.",
    process: "I led the design process from ideation to final UI implementation, focusing on creating a neutral platform that promotes positive co-parenting communication. Through extensive user research with divorced parents and family counselors, I identified key pain points and developed intuitive interfaces for shared calendars, expense tracking, and secure messaging. I conducted multiple rounds of usability testing to ensure the app was accessible to users with varying levels of technical proficiency.",
    result: "The app is currently in development, but the anticipated impact is significant: Projected measurable outcomes include a 60% reduction in court visits, $25K average savings in legal fees per family, 85% user satisfaction rate, and a 3.5X increase in productive communication between co-parents. These metrics were established through extensive research and pilot testing with target users. When launched, the app will provide a comprehensive platform with shared calendars, expense tracking, secure messaging, and document storage to reduce conflict and improve childcare coordination.",
    technologies: ["React Native", "Firebase", "Redux", "Node.js", "Express", "MongoDB", "Push Notifications"],
    duration: "4 months",
    client: "Family Support Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/d247fe26-c5c2-450d-a27d-fd1d41739b55.png",
      "/lovable-uploads/f90e5551-b19a-49c3-aeb4-348089b0ea6a.png"
    ],
    challengeImage: "/lovable-uploads/044ebd4f-a061-46fd-8668-fef8e8496a16.png",
    processImage: "/lovable-uploads/57188cd2-5ba4-4a9e-8a57-c70016dd2566.png",
    resultImage: "/lovable-uploads/cb589912-0dc5-44e5-bd32-f5d177296cc3.png",
    caseStudyLink: "https://hirambarsky.com/case-studies/splittime",
    galleryImages: [
      "/lovable-uploads/716b7cef-a40b-4d2a-a4db-6a360313a63a.png",
      "/lovable-uploads/9ff55bb2-a684-40cf-a9e9-6afec3054d7e.png", 
      "/lovable-uploads/2c2d5cc4-b820-4d42-8470-4b3147ed61be.png",
      "/lovable-uploads/7ca9117b-f843-4407-876d-90bbd289f24e.png",
      "/lovable-uploads/bc71b077-5c56-4ad7-af25-3c11ccacd0d1.png"
    ]
  },
  "herbalink": {
    challenge: "Many individuals seeking natural health solutions face significant barriers in finding qualified herbalists with verifiable credentials. Traditional healthcare platforms lack specialized features for herbal medicine practitioners, while patients struggle to determine the legitimacy and expertise of providers. This disconnect leads to missed opportunities for effective natural treatments and a general distrust in herbal medicine.",
    process: "I conducted extensive research with both herbalists and potential patients to understand their unique needs and communication barriers. Through collaborative design workshops, I developed user personas representing different stakeholder groups and mapped out comprehensive user journeys for various interaction scenarios. Multiple rounds of wireframing and prototyping focused on creating an intuitive interface that addresses privacy concerns while facilitating effective communication between practitioners and clients.",
    result: "The Herbalink mobile application successfully bridges the gap between qualified herbalists and individuals seeking natural health solutions. The platform features secure video consultations, credential verification for practitioners, a comprehensive treatment tracking system, and an in-app messaging feature for follow-up questions. Initial user data shows a 65% increase in first-time herbal consultations and significantly improved treatment adherence through the app's monitoring tools.",
    technologies: ["React Native", "Firebase", "Redux", "HIPAA-Compliant Storage", "Telehealth API", "Push Notifications", "Stripe Integration"],
    duration: "5 months",
    client: "Herbalink Inc.",
    role: "Lead UX Designer & Product Strategist",
    extraImages: [
      "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png",
      "/lovable-uploads/dbed92d3-b001-4854-bf76-b4c7ae74de29.png",
      "/lovable-uploads/11d88ba0-3135-42e4-99ba-d68beb56e518.png",
      "/lovable-uploads/da448046-c673-41fd-9682-c9471088dc98.png",
      "/lovable-uploads/31b21f6b-faa3-4ffe-a96b-702f87142fbd.png"
    ],
    challengeImage: "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png",
    processImage: "/lovable-uploads/8316c4d1-1eb7-4bbb-b3d5-5c449dbc9e84.png",
    resultImage: "/lovable-uploads/90cbccae-4660-4e76-8218-1164bbeb0883.png",
    caseStudyLink: "https://hirambarsky.com/case-studies/herbalink",
    galleryImages: [
      "/lovable-uploads/8e4b58bb-b896-4e18-b86d-1fae7fcc576e.png",
      "/lovable-uploads/a332bc93-8bd7-42b3-b4f9-0f24270eb9ab.png",
      "/lovable-uploads/41442407-7956-48f5-88bd-f68b4d0ce485.png",
      "/lovable-uploads/c37c7bf9-100c-4451-9856-1c4ca0adee05.png",
      "/lovable-uploads/c7039c67-0933-4671-9d1e-0a8e6066b5a0.png",
      "/lovable-uploads/0937ca2e-b4b7-493a-963e-441f9fdafb2f.png",
      "/lovable-uploads/8fd697f3-7606-4019-834b-7b9fc4ef4a02.png",
      "/lovable-uploads/00b250de-52be-48ea-b9c4-99626f288d14.png",
      "/lovable-uploads/06c3b4e6-b260-4c9d-90d3-201371ff7381.png",
      "/lovable-uploads/d33a7d68-a919-4e51-b481-44dedceb60ac.png"
    ]
  },
  "gold2crypto": {
    challenge: "Traditional investors interested in cryptocurrency face a significant barrier to entry due to the complexity of trading platforms and the disconnect between conventional gold investments and digital currency markets. There was a need for a platform that could bridge these two worlds while providing a user-friendly interface that appeals to both experienced investors and newcomers to cryptocurrency.",
    process: "I led the design and development of a sophisticated cryptocurrency trading platform that specifically addresses the needs of traditional gold investors entering the crypto market. Through extensive market research and user interviews with both traditional investors and crypto enthusiasts, I identified key friction points and opportunities to simplify the trading experience. I developed comprehensive wireframes and interactive prototypes that were refined through multiple rounds of user testing with different investor demographics.",
    result: "Gold 2 Crypto Services successfully bridges the gap between traditional gold investments and modern crypto markets through an intuitive, feature-rich platform. Users benefit from real-time price tracking, advanced charting tools, secure wallet integration, and instant trading capabilities. The platform includes a responsive dashboard with portfolio analytics, transaction history, and customizable watchlists. Advanced security features include two-factor authentication, cold storage options, and encrypted transactions, providing users with a safe and comprehensive trading environment.",
    technologies: ["React", "TypeScript", "WebSocket API", "Trading View Charts", "Crypto APIs", "Node.js", "Redux", "TailwindCSS"],
    duration: "6 months",
    client: "Gold 2 Crypto Services",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png",
      "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png",
      "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png",
      "/lovable-uploads/f859dde1-e2bb-4777-a2cd-293d24d4d865.png"
    ],
    challengeImage: "/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png",
    processImage: "/lovable-uploads/ddd4793c-96fd-4af4-a35a-6ee17e1ad879.png",
    resultImage: "/lovable-uploads/8ad63858-b980-4021-af95-772475a451b5.png",
    caseStudyLink: "https://hirambarsky.com/case-studies/gold2crypto"
  },
  "barskyjoint": {
    challenge: "Food truck customers often face lengthy wait times, ordering confusion, and limited payment options when trying to purchase meals from popular mobile vendors. Traditional ordering methods lead to inefficient service, order errors, and frustration for both customers and staff, especially during peak hours when lines grow long and communication becomes difficult.",
    process: "I designed a comprehensive mobile app solution focused on streamlining the food truck ordering experience. The process began with on-site research at various food trucks to understand the specific operational challenges and customer pain points. I developed user personas representing different customer types and created detailed user flows for ordering, customization, payment, and pickup. Multiple rounds of usability testing with actual food truck customers helped refine the interface and feature set.",
    result: "The Barsky Joint Food Truck mobile app successfully revolutionizes the food truck ordering experience with a sleek, user-friendly interface. Customers can now browse a curated menu of gourmet options, customize ingredients, and select side options between regular and sweet potato fries or salad. Key features include real-time order tracking, seamless payment integration, a loyalty program, and push notifications for truck location updates. The app has reduced average wait times by 40% and increased overall customer satisfaction while boosting the number of orders processed per hour.",
    technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Push Notifications", "GPS Integration"],
    duration: "3 months",
    client: "Barsky Joint Food Truck",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/2a322354-503a-4e82-baec-f3ebf3e8f097.png",
      "/lovable-uploads/27fba121-19a6-475b-977a-925861f25ff2.png",
      "/lovable-uploads/f0b2d57b-5da5-4156-83ec-4ff109c61ca1.png"
    ],
    challengeImage: "/lovable-uploads/77d748e9-8ea5-4084-bc85-5057051b9757.png",
    processImage: "/lovable-uploads/70baa6f2-a718-46e8-809d-52e3c43dc137.png", 
    resultImage: "/lovable-uploads/c8476a9d-176d-4cbb-812a-9312642c6d5f.png",
    caseStudyLink: "https://hirambarsky.com/case-studies/barskyjoint"
  },
  "spectrum": {
    challenge: "The autism awareness apparel market lacked a dedicated platform that combined customization options with accessibility features. Existing e-commerce solutions failed to address the specific needs of this community, such as sensory-friendly design interfaces and size-inclusive options. Additionally, there was a missed opportunity to integrate autism awareness content with the shopping experience.",
    process: "I led the design and development of an inclusive e-commerce platform specifically tailored for autism awareness apparel and custom shirt creation. The process involved extensive collaboration with autism advocacy groups and individuals on the spectrum to ensure the platform met their unique needs. I created wireframes and prototypes focusing on accessibility, simplicity, and visual clarity. User testing sessions with diverse participants, including those with various accessibility requirements, helped refine the final design.",
    result: "Spectrum Apparel Co. emerged as a modern, accessible e-commerce platform dedicated to autism awareness apparel and custom shirt creation. The platform features an intuitive drag-and-drop shirt designer with real-time preview of customizations, automated inventory management, and a size recommendation tool. The shopping experience is streamlined for all users, with particular attention to accessibility needs. The integrated blog section for autism awareness content and community stories has fostered a sense of community around the brand, driving engagement and customer loyalty beyond typical e-commerce metrics.",
    technologies: ["React", "Next.js", "Stripe", "AWS", "Tailwind CSS", "Canvas API", "Shopify API"],
    duration: "4 months",
    client: "Spectrum Apparel Co.",
    role: "Lead Designer & Inventor",
    extraImages: [
      "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png",
      "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png",
      "/lovable-uploads/e65cf5f1-62f3-4412-b533-fdfc0e59aae3.png",
      "/lovable-uploads/6544f03a-2e0f-4adb-b382-521741cdf807.png"
    ],
    challengeImage: "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png",
    processImage: "/lovable-uploads/8a8efa4e-4d69-4f21-8ea3-b45b70284058.png",
    resultImage: "/lovable-uploads/e65cf5f1-62f3-4412-b533-fdfc0e59aae3.png",
    caseStudyLink: "https://hirambarsky.com/case-studies/spectrum"
  }
};

export const projectsData: ProjectProps[] = [
  {
    id: "splittime",
    title: "Co-Parenting Coordination App",
    description: "A mobile application designed to help separated parents better coordinate childcare responsibilities.",
    image: "/lovable-uploads/ae80b9f9-03aa-452c-8e24-ac5474b42350.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Mobile App", "React Native", "AI Driven Design"],
    link: "https://splittime.pro/"
  },
  {
    id: "herbalink",
    title: "Herbalink",
    description: "Mobile application connecting individuals with qualified herbalists for personalized natural health solutions.",
    image: "/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Mobile App", "Healthcare", "AI Driven Design"],
    link: "https://herbalink.live"
  },
  {
    id: "gold2crypto",
    title: "Gold 2 Crypto Services",
    description: "Trading platform bridging traditional gold investments with cryptocurrency markets.",
    image: "/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Web App", "Trading", "Crypto", "AI Driven Design"],
    link: "https://gold2.gold/"
  },
  {
    id: "barskyjoint",
    title: "Barsky Joint Food Truck",
    description: "Mobile ordering app for a gourmet food truck with real-time tracking and customization.",
    image: "/lovable-uploads/ca0ed7f2-7f32-4ed9-a558-e1c3a718e711.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Mobile App", "Food Service", "AI Driven Design"],
    link: "https://barskyjoint.biz/"
  },
  {
    id: "spectrum",
    title: "Spectrum Apparel Co.",
    description: "E-commerce platform for autism awareness apparel with custom shirt design capabilities.",
    image: "/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png",
    tags: ["Figma", "Lovable.dev", "Product Design", "UX / UI Design", "Web App", "E-Commerce", "Accessibility", "AI Driven Design"],
    link: "https://supersha.store"
  }
];
