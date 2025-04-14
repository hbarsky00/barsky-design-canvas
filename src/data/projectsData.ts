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
    title: "Dashboard Interface",
    description: "A comprehensive analytics dashboard with data visualization and interactive elements.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["UI Design", "Data Visualization", "Web Development"],
    link: "https://example.com/project4"
  },
  {
    id: "project5",
    title: "Barsky Food Joint Mobile App",
    description: "A modern mobile application for ordering gourmet burgers and sandwiches from Barsky Food Joint food truck, featuring real-time order tracking and customization options.",
    image: "https://images.unsplash.com/photo-1513124146973-c923a79cf2c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Mobile App", "UI/UX Design", "Food Service"],
    link: "https://example.com/barsky-food-joint"
  },
  {
    id: "project6",
    title: "Restaurant Rebrand",
    description: "Complete visual identity redesign for an upscale restaurant, including menus, signage, and web presence.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Branding", "Print Design", "Web Design"],
    link: "https://example.com/project6"
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
    fullDescription: "A comprehensive analytics dashboard for a SaaS platform that provides real-time data visualization, user activity tracking, and performance metrics. The interface was designed for clarity and ease of use while handling complex data sets.",
    technologies: ["React", "D3.js", "Chart.js", "Firebase", "Material UI"],
    duration: "10 weeks",
    client: "Marketing Analytics Company",
    role: "Frontend Developer & UI Designer"
  },
  "project5": {
    fullDescription: "Barsky Food Joint mobile app revolutionizes the food truck ordering experience with a sleek, user-friendly interface. The app features a curated menu of gourmet options including their signature bacon chicken cheese special sauce sandwich, customizable smash burgers, and innovative vegan options. Key features include real-time order tracking, customizable ingredients, side options between regular and sweet potato fries or salad, and seamless payment integration. The app also includes a loyalty program, push notifications for truck location updates, and estimated waiting times.",
    technologies: ["React Native", "Redux", "Node.js", "Express", "MongoDB", "Stripe", "Push Notifications", "GPS Integration"],
    duration: "3 months",
    client: "Barsky Food Joint",
    role: "Lead Mobile App Developer"
  },
  "project6": {
    fullDescription: "Complete visual identity redesign for an upscale restaurant, including new logo, menus, signage, business cards, and web presence. The design emphasizes elegance and sophistication while improving brand recognition.",
    technologies: ["Adobe Creative Suite", "WordPress", "HTML/CSS"],
    duration: "8 weeks",
    client: "Fine Dining Restaurant",
    role: "Brand Designer & Web Developer"
  }
};

// Extra images for projects
export const extraImages = [
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
];
