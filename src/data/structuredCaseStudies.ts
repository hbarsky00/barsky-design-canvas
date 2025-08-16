
import { ProjectProps } from "@/components/ProjectCard";

export interface StructuredCaseStudyData extends Omit<ProjectProps, 'href'> {
  overview: {
    title: string;
    content: string[];
  };
  challenge: {
    title: string;
    content: string[];
  };
  solution: {
    title: string;
    content: string[];
  };
  results: {
    title: string;
    content: string[];
  };
  seoData?: {
    title: string;
    description: string;
    image: string;
    path: string;
    technologies: string[];
  };
  heroVideo: {
    poster: string;
    mp4: string;
    webm: string;
  };
  sections: Array<{
    id: string;
    title: string;
    content: string[];
  }>;
  gradientClasses?: string;
}

export const structuredCaseStudies: StructuredCaseStudyData[] = [
  {
    id: "herbalink",
    title: "HerbaLink: Connecting Users with Certified Herbalists",
    description: "How AI-enhanced UX design helped users find trusted herbal medicine practitioners and increased booking rates by 300%.",
    image: "/lovable-uploads/0733fede-9de2-483a-8bb8-09538b044e33.png",
    tags: ["UX Design", "UI Design", "Mobile App", "Healthcare", "Telemedicine"],
    heroVideo: {
      poster: "/lovable-uploads/0733fede-9de2-483a-8bb8-09538b044e33.png",
      mp4: "/videos/herbalink-case-study.mp4",
      webm: "/videos/herbalink-case-study.webm"
    },
    overview: {
      title: "Project Overview",
      content: [
        "HerbaLink is a comprehensive platform designed to connect users with certified herbalists for personalized consultations and treatments. The platform addresses the growing interest in herbal medicine by providing a trusted and accessible network of practitioners.",
        "The project involved creating a user-friendly interface for both patients and herbalists, integrating secure payment processing, and ensuring compliance with healthcare regulations.",
      ],
    },
    challenge: {
      title: "The Challenge",
      content: [
        "The primary challenge was to build trust in a fragmented market by verifying the credentials of herbalists and ensuring the quality of their services.",
        "Additionally, the platform needed to provide a seamless user experience that facilitated easy booking, communication, and payment processing.",
        "Another challenge was to differentiate HerbaLink from existing telemedicine platforms by focusing specifically on herbal medicine and providing specialized tools for herbalists.",
      ],
    },
    solution: {
      title: "The Solution",
      content: [
        "HerbaLink was designed with a clean and intuitive interface that allows users to easily search for herbalists based on their specialization, location, and availability.",
        "The platform includes a secure messaging system for direct communication between patients and herbalists, as well as a video conferencing feature for remote consultations.",
        "To ensure trust and quality, HerbaLink implemented a rigorous verification process for herbalists, including background checks and credential verification.",
      ],
    },
    results: {
      title: "The Results",
      content: [
        "HerbaLink successfully connected users with certified herbalists across the country, increasing booking rates by 300%.",
        "The platform received positive feedback from both patients and herbalists, who praised its ease of use and comprehensive features.",
        "HerbaLink has become a trusted resource for individuals seeking personalized herbal medicine consultations and treatments.",
      ],
    },
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: [
          "The primary challenge was to build trust in a fragmented market by verifying the credentials of herbalists and ensuring the quality of their services.",
          "Additionally, the platform needed to provide a seamless user experience that facilitated easy booking, communication, and payment processing."
        ]
      },
      {
        id: "solution",
        title: "The Solution", 
        content: [
          "HerbaLink was designed with a clean and intuitive interface that allows users to easily search for herbalists based on their specialization, location, and availability.",
          "The platform includes a secure messaging system for direct communication between patients and herbalists, as well as a video conferencing feature for remote consultations."
        ]
      },
      {
        id: "results",
        title: "The Results",
        content: [
          "HerbaLink successfully connected users with certified herbalists across the country, increasing booking rates by 300%.",
          "The platform received positive feedback from both patients and herbalists, who praised its ease of use and comprehensive features."
        ]
      }
    ],
    seoData: {
      title: "HerbaLink: Connecting Users with Certified Herbalists",
      description: "Discover how AI-enhanced UX design helped users find trusted herbal medicine practitioners and increased booking rates by 300%.",
      image: "/lovable-uploads/0733fede-9de2-483a-8bb8-09538b044e33.png",
      path: "/project/herbalink",
      technologies: ["UX Design", "UI Design", "Mobile App", "Healthcare", "Telemedicine"],
    },
  },
  {
    id: "splittime",
    title: "SplitTime: Reducing Co-Parenting Conflict Through Design",
    description: "A family-centered approach to scheduling that reduced conflicts by 40% and improved communication between co-parents.",
    image: "/lovable-uploads/8fb40d7a-8ac6-404e-a3ce-43746775a75c.png",
    tags: ["UX Design", "UI Design", "Mobile App", "Family Tech", "Legal UX"],
    heroVideo: {
      poster: "/lovable-uploads/8fb40d7a-8ac6-404e-a3ce-43746775a75c.png",
      mp4: "/videos/splittime-case-study.mp4",
      webm: "/videos/splittime-case-study.webm"
    },
    overview: {
      title: "Project Overview",
      content: [
        "SplitTime is a mobile application designed to simplify co-parenting schedules and reduce conflicts between parents. The app provides a shared calendar, communication tools, and a secure platform for managing child-related expenses.",
        "The project focused on creating a user-friendly interface that promotes clear communication and collaboration between co-parents, while minimizing the potential for misunderstandings and disputes.",
      ],
    },
    challenge: {
      title: "The Challenge",
      content: [
        "The primary challenge was to create a neutral and unbiased platform that both parents would trust and use consistently.",
        "Additionally, the app needed to be easy to use and accessible to parents with varying levels of technical expertise.",
        "Another challenge was to address the emotional complexities of co-parenting and provide tools that promote respectful communication and conflict resolution.",
      ],
    },
    solution: {
      title: "The Solution",
      content: [
        "SplitTime was designed with a clean and intuitive interface that allows parents to easily view and manage their shared calendar.",
        "The app includes features such as automated scheduling, expense tracking, and secure messaging to streamline co-parenting tasks.",
        "To promote respectful communication, SplitTime provides a neutral communication platform that encourages parents to focus on the needs of their children.",
      ],
    },
    results: {
      title: "The Results",
      content: [
        "SplitTime successfully reduced co-parenting conflicts by 40% and improved communication between co-parents.",
        "The app received positive feedback from parents, who praised its ease of use and comprehensive features.",
        "SplitTime has become a valuable tool for families seeking to navigate the challenges of co-parenting with greater ease and cooperation.",
      ],
    },
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: [
          "The primary challenge was to create a neutral and unbiased platform that both parents would trust and use consistently.",
          "Additionally, the app needed to be easy to use and accessible to parents with varying levels of technical expertise."
        ]
      },
      {
        id: "solution", 
        title: "The Solution",
        content: [
          "SplitTime was designed with a clean and intuitive interface that allows parents to easily view and manage their shared calendar.",
          "The app includes features such as automated scheduling, expense tracking, and secure messaging to streamline co-parenting tasks."
        ]
      },
      {
        id: "results",
        title: "The Results", 
        content: [
          "SplitTime successfully reduced co-parenting conflicts by 40% and improved communication between co-parents.",
          "The app received positive feedback from parents, who praised its ease of use and comprehensive features."
        ]
      }
    ],
    seoData: {
      title: "SplitTime: Reducing Co-Parenting Conflict Through Design",
      description: "A family-centered approach to scheduling that reduced conflicts by 40% and improved communication between co-parents.",
      image: "/lovable-uploads/8fb40d7a-8ac6-404e-a3ce-43746775a75c.png",
      path: "/project/splittime",
      technologies: ["UX Design", "UI Design", "Mobile App", "Family Tech", "Legal UX"],
    },
  },
  {
    id: "business-management",
    title: "Business Management: Streamlining Operations",
    description: "Internal operations platform that reduced manual entry errors by 68% through intelligent automation and user-centered design.",
    image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
    tags: ["UX Design", "UI Design", "Web App", "Enterprise", "CRM"],
    heroVideo: {
      poster: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
      mp4: "/videos/business-mgmt-case-study.mp4",
      webm: "/videos/business-mgmt-case-study.webm"
    },
    overview: {
      title: "Project Overview",
      content: [
        "The Business Management Platform is a comprehensive solution designed to streamline internal operations and improve efficiency for businesses of all sizes. The platform provides a centralized hub for managing tasks, projects, and resources.",
        "The project focused on creating a user-friendly interface that simplifies complex processes and empowers employees to work more effectively.",
      ],
    },
    challenge: {
      title: "The Challenge",
      content: [
        "The primary challenge was to integrate multiple business functions into a single platform, while ensuring that each function remained easy to use and accessible.",
        "Additionally, the platform needed to be scalable and adaptable to the changing needs of the business.",
        "Another challenge was to provide real-time data and analytics that would enable managers to make informed decisions and optimize performance.",
      ],
    },
    solution: {
      title: "The Solution",
      content: [
        "The Business Management Platform was designed with a modular architecture that allows businesses to customize the platform to their specific needs.",
        "The platform includes features such as task management, project tracking, resource allocation, and reporting to streamline operations.",
        "To provide real-time data and analytics, the platform integrates with various data sources and provides customizable dashboards that track key performance indicators.",
      ],
    },
    results: {
      title: "The Results",
      content: [
        "The Business Management Platform reduced manual entry errors by 68% and improved overall efficiency for businesses.",
        "The platform received positive feedback from employees, who praised its ease of use and comprehensive features.",
        "The Business Management Platform has become a valuable tool for businesses seeking to optimize their operations and improve their bottom line.",
      ],
    },
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: [
          "The primary challenge was to integrate multiple business functions into a single platform, while ensuring that each function remained easy to use and accessible.",
          "Additionally, the platform needed to be scalable and adaptable to the changing needs of the business."
        ]
      },
      {
        id: "solution",
        title: "The Solution",
        content: [
          "The Business Management Platform was designed with a modular architecture that allows businesses to customize the platform to their specific needs.",
          "The platform includes features such as task management, project tracking, resource allocation, and reporting to streamline operations."
        ]
      },
      {
        id: "results", 
        title: "The Results",
        content: [
          "The Business Management Platform reduced manual entry errors by 68% and improved overall efficiency for businesses.",
          "The platform received positive feedback from employees, who praised its ease of use and comprehensive features."
        ]
      }
    ],
    seoData: {
      title: "Business Management: Streamlining Operations",
      description: "Internal operations platform that reduced manual entry errors by 68% through intelligent automation and user-centered design.",
      image: "/lovable-uploads/4408b539-65ee-460c-9f7d-6303241781d0.png",
      path: "/project/business-management",
      technologies: ["UX Design", "UI Design", "Web App", "Enterprise", "CRM"],
    },
  },
  {
    id: "investment-app",
    title: "Investment App: Data-Driven Portfolio Management",
    description: "Mobile investment platform that increased user engagement by 23% through intuitive data visualization and AI-powered insights.",
    image: "/lovable-uploads/investment-app-thumb.png",
    tags: ["UX Design", "UI Design", "Mobile App", "Finance", "Data Viz"],
    heroVideo: {
      poster: "/lovable-uploads/investment-app-thumb.png",
      mp4: "/videos/investment-app-case-study.mp4",
      webm: "/videos/investment-app-case-study.webm"
    },
    overview: {
      title: "Project Overview",
      content: [
        "The Investment App is a mobile platform designed to help users track, plan, and grow their investments. The app provides a user-friendly interface for managing portfolios, analyzing market trends, and making informed investment decisions.",
        "The project focused on creating an engaging and intuitive experience that empowers users to take control of their financial future.",
      ],
    },
    challenge: {
      title: "The Challenge",
      content: [
        "The primary challenge was to simplify complex financial data and present it in a way that is easy for users to understand and act upon.",
        "Additionally, the app needed to provide personalized insights and recommendations based on each user's individual investment goals and risk tolerance.",
        "Another challenge was to ensure the security and privacy of user data, while providing a seamless and reliable experience.",
      ],
    },
    solution: {
      title: "The Solution",
      content: [
        "The Investment App was designed with a clean and intuitive interface that allows users to easily track their portfolio performance.",
        "The app includes features such as interactive charts, personalized recommendations, and secure trading to empower users to make informed investment decisions.",
        "To ensure the security and privacy of user data, the app utilizes advanced encryption and authentication protocols.",
      ],
    },
    results: {
      title: "The Results",
      content: [
        "The Investment App increased user engagement by 23% and helped users track, plan, and grow their investments.",
        "The app received positive feedback from users, who praised its ease of use and comprehensive features.",
        "The Investment App has become a valuable tool for individuals seeking to achieve their financial goals through informed investment decisions.",
      ],
    },
    sections: [
      {
        id: "challenge",
        title: "The Challenge",
        content: [
          "The primary challenge was to simplify complex financial data and present it in a way that is easy for users to understand and act upon.",
          "Additionally, the app needed to provide personalized insights and recommendations based on each user's individual investment goals and risk tolerance."
        ]
      },
      {
        id: "solution",
        title: "The Solution", 
        content: [
          "The Investment App was designed with a clean and intuitive interface that allows users to easily track their portfolio performance.",
          "The app includes features such as interactive charts, personalized recommendations, and secure trading to empower users to make informed investment decisions."
        ]
      },
      {
        id: "results",
        title: "The Results",
        content: [
          "The Investment App increased user engagement by 23% and helped users track, plan, and grow their investments.",
          "The app received positive feedback from users, who praised its ease of use and comprehensive features."
        ]
      }
    ],
    seoData: {
      title: "Investment App: Data-Driven Portfolio Management",
      description: "Mobile investment platform that increased user engagement by 23% through intuitive data visualization and AI-powered insights.",
      image: "/lovable-uploads/investment-app-thumb.png",
      path: "/project/investment-app",
      technologies: ["UX Design", "UI Design", "Mobile App", "Finance", "Data Viz"],
    },
  }
];

// Export the helper function that was missing
export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | undefined => {
  return structuredCaseStudies.find(caseStudy => caseStudy.id === id);
};
