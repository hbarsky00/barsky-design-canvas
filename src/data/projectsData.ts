
// Project data shared between AllProjects and ProjectDetail
export const projectsData = [
  {
    id: "project1",
    title: "Co-Parenting App",
    description: "A comprehensive mobile application that helps separated parents coordinate childcare responsibilities and communication.",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["UI/UX Design", "Mobile App", "React Native"],
    link: "https://example.com/project1"
  },
  {
    id: "project2",
    title: "Edible Plant Finder",
    description: "A location-based mobile application that helps users identify and locate edible plants, mushrooms, and flowers in their local area.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Mobile App", "Geolocation", "Nature"],
    link: "https://example.com/edibleplantfinder"
  },
  {
    id: "project3",
    title: "Herbalink: Herbal Wellness Platform",
    description: "A comprehensive mobile app connecting users with certified herbalists for personalized holistic health consultations.",
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Mobile Design", "Healthcare", "UI/UX"],
    link: "https://example.com/herbalink"
  },
  {
    id: "project4",
    title: "Gold 2 Crypto Services",
    description: "A comprehensive cryptocurrency trading platform enabling users to buy, sell, and track various cryptocurrencies with real-time market data visualization.",
    image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Web App", "Crypto", "FinTech", "Data Visualization"],
    link: "https://example.com/gold2crypto"
  },
  {
    id: "project5",
    title: "Barsky Joint Food Truck",
    description: "A modern mobile application for ordering gourmet burgers and sandwiches from Barsky Food Joint food truck, featuring real-time order tracking and customization options.",
    image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Mobile App", "UI/UX Design", "Food Service"],
    link: "https://example.com/barsky-food-joint"
  },
  {
    id: "project6",
    title: "Spectrum Apparel Co.",
    description: "An inclusive e-commerce platform specializing in autism awareness apparel and custom shirt designs, offering a seamless shopping experience with personalization options.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["E-commerce", "Web Development", "Apparel", "UI/UX Design"],
    link: "https://example.com/spectrum-apparel"
  }
];

// Project details
export interface ProjectDetails {
  fullDescription: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
}

export const projectDetails: Record<string, ProjectDetails> = {
  "project1": {
    fullDescription: "A mobile application designed to help separated parents better coordinate childcare responsibilities. The app includes features such as shared calendars for custody schedules, expense tracking and splitting, secure messaging, and important document storage. The design focuses on creating a neutral platform that promotes positive co-parenting communication and reduces conflict.",
    technologies: ["React Native", "Firebase", "Redux", "Node.js", "Express", "MongoDB", "Push Notifications"],
    duration: "4 months",
    client: "Family Support Services",
    role: "Lead Mobile Developer"
  },
  "project2": {
    fullDescription: "Edible Plant Finder is an innovative mobile application designed to connect nature enthusiasts, foragers, and curious explorers with edible wild plants, mushrooms, and flowers in their local environment. The app uses GPS and mapping technology to guide users to nearby locations where edible species can be found. Features include detailed species identification with high-quality images, seasonal availability calendars, foraging difficulty levels, and preparation suggestions. The app also includes toxic look-alike warnings, sustainable harvesting tips, and a community feature where users can share discoveries while protecting sensitive locations.",
    technologies: ["React Native", "MapBox API", "Node.js", "MongoDB", "Image Recognition AI", "GPS Integration", "Offline Mode"],
    duration: "7 months",
    client: "EcoExplore Initiatives",
    role: "Lead UX Designer & Mobile Developer"
  },
  "project3": {
    fullDescription: "Herbalink is an innovative mobile platform designed to revolutionize access to holistic healthcare. The app serves as a comprehensive marketplace connecting individuals seeking natural wellness solutions with qualified, vetted herbalists. Users can easily search for practitioners based on specialties, health concerns, or location, view detailed profiles with credentials and expertise, and book both virtual and in-person consultations.",
    technologies: ["React Native", "Node.js", "MongoDB", "WebRTC", "Stripe", "GraphQL", "TypeScript"],
    duration: "6 months",
    client: "Herbalink Wellness Technologies",
    role: "Lead Product Designer & Frontend Architect"
  },
  "project4": {
    fullDescription: "Gold 2 Crypto Services is a sophisticated cryptocurrency trading platform that bridges traditional gold investments with modern crypto markets. The platform features real-time price tracking, advanced charting tools, secure wallet integration, and instant trading capabilities. Users can monitor market trends, set price alerts, and execute trades with multiple cryptocurrency pairs. The platform includes a responsive dashboard with portfolio analytics, transaction history, and customizable watchlists. Security features include two-factor authentication, cold storage options, and encrypted transactions.",
    technologies: ["React", "TypeScript", "WebSocket API", "Trading View Charts", "Crypto APIs", "Node.js", "Redux", "TailwindCSS"],
    duration: "6 months",
    client: "Gold 2 Crypto Services",
    role: "Lead Full Stack Developer"
  },
  "project5": {
    fullDescription: "Barsky Joint Food Truck mobile app revolutionizes the food truck ordering experience with a sleek, user-friendly interface. The app features a curated menu of gourmet options including their signature bacon chicken cheese special sauce sandwich, customizable smash burgers, and innovative vegan options. Key features include real-time order tracking, customizable ingredients, side options between regular and sweet potato fries or salad, and seamless payment integration. The app also includes a loyalty program, push notifications for truck location updates, and estimated waiting times.",
    technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Push Notifications", "GPS Integration"],
    duration: "3 months",
    client: "Barsky Joint Food Truck",
    role: "Lead Mobile App Developer"
  },
  "project6": {
    fullDescription: "Spectrum Apparel Co. is a modern e-commerce platform dedicated to creating and selling autism awareness apparel and custom shirts. The platform features an intuitive design interface for custom shirt creation, size-inclusive options, and a streamlined shopping experience. Key features include a drag-and-drop shirt designer, real-time preview of customizations, automated inventory management, and a size recommendation tool. The platform also includes a blog section for autism awareness content and community stories.",
    technologies: ["React", "Next.js", "Stripe", "AWS", "Tailwind CSS", "Canvas API", "Shopify API"],
    duration: "4 months",
    client: "Spectrum Apparel Co.",
    role: "Lead Full Stack Developer"
  }
};

// Extra images for projects
export const extraImages = [
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
];
