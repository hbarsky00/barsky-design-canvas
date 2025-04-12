
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, UserCircle, Tags, Code, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProjectDetails {
  fullDescription: string;
  technologies: string[];
  duration: string;
  client: string;
  role: string;
}

// Project data - same as in AllProjects to maintain consistency
const projectsData = [
  {
    id: "project1",
    title: "Modern E-Commerce Website",
    description: "A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout.",
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["UI/UX Design", "Web Development", "React"],
    link: "https://example.com/project1"
  },
  {
    id: "project2",
    title: "Corporate Brand Identity",
    description: "Complete brand identity design including logo, color palette, typography, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1634942537034-a3f7ae8c5587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Branding", "Logo Design", "Typography"],
    link: "https://example.com/project2"
  },
  {
    id: "project3",
    title: "Mobile App UI Design",
    description: "User interface design for a fitness tracking mobile application with clean and intuitive interactions.",
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Mobile Design", "UI/UX", "Prototyping"],
    link: "https://example.com/project3"
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
    title: "Photography Portfolio",
    description: "Minimalist photography portfolio website showcasing work with elegant transitions and gallery views.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    tags: ["Web Design", "Photography", "Gallery"],
    link: "https://example.com/project5"
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
const projectDetails: Record<string, ProjectDetails> = {
  "project1": {
    fullDescription: "A modern e-commerce website built with React, featuring product filtering, shopping cart functionality, user accounts, and secure checkout integration with Stripe. The responsive design ensures seamless shopping experience across all devices.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe API"],
    duration: "3 months",
    client: "Fashion Retail Brand",
    role: "Lead Developer"
  },
  "project2": {
    fullDescription: "Complete brand identity redesign for a technology consulting firm. The project included logo design, color palette selection, typography guidelines, business cards, letterheads, and digital assets for web and social media presence.",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "InDesign"],
    duration: "6 weeks",
    client: "Tech Consulting Group",
    role: "Brand Designer"
  },
  "project3": {
    fullDescription: "UI/UX design for a fitness tracking mobile application that helps users track workouts, set goals, and monitor progress. The design focused on creating an intuitive user experience with clean interfaces and meaningful data visualization.",
    technologies: ["Figma", "Sketch", "Protopie", "Adobe XD"],
    duration: "2 months",
    client: "Health & Fitness Startup",
    role: "UI/UX Designer"
  },
  "project4": {
    fullDescription: "A comprehensive analytics dashboard for a SaaS platform that provides real-time data visualization, user activity tracking, and performance metrics. The interface was designed for clarity and ease of use while handling complex data sets.",
    technologies: ["React", "D3.js", "Chart.js", "Firebase", "Material UI"],
    duration: "10 weeks",
    client: "Marketing Analytics Company",
    role: "Frontend Developer & UI Designer"
  },
  "project5": {
    fullDescription: "A minimalist photography portfolio website designed to showcase professional photography work with elegant transitions, gallery views, and optimal image loading strategies. The design emphasizes the visual content while providing seamless navigation.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Webflow", "Lightbox"],
    duration: "4 weeks",
    client: "Professional Photographer",
    role: "Web Designer"
  },
  "project6": {
    fullDescription: "Complete visual identity redesign for an upscale restaurant, including new logo, menus, signage, business cards, and web presence. The design emphasizes elegance and sophistication while improving brand recognition.",
    technologies: ["Adobe Creative Suite", "WordPress", "HTML/CSS"],
    duration: "8 weeks",
    client: "Fine Dining Restaurant",
    role: "Brand Designer & Web Developer"
  }
};

// Extra images for projects (in a real app, these would be unique for each project)
const extraImages = [
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
];

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [details, setDetails] = useState<ProjectDetails | null>(null);
  
  useEffect(() => {
    // Find the project based on the URL parameter
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setDetails(projectDetails[projectId as string]);
    } else {
      // If project not found, redirect to all projects page
      navigate("/projects");
    }
  }, [projectId, navigate]);
  
  if (!project || !details) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <p className="text-barsky-text">Loading project details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="section-container">
            <div className="flex items-center mb-8">
              <Link to="/projects" className="flex items-center text-barsky-text hover:text-barsky-blue transition-colors mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </div>
            
            <h1 className="text-4xl font-bold text-barsky-dark mb-4">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-barsky-text px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mb-12">
              <Carousel>
                <CarouselContent>
                  <CarouselItem>
                    <div className="h-[500px] w-full overflow-hidden rounded-xl">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </CarouselItem>
                  {extraImages.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="h-[500px] w-full overflow-hidden rounded-xl">
                        <img 
                          src={img} 
                          alt={`${project.title} - view ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Overview</h2>
                <p className="text-barsky-text mb-8 leading-relaxed">
                  {details.fullDescription}
                </p>
                
                <h2 className="text-2xl font-semibold text-barsky-dark mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {details.technologies.map((tech) => (
                    <span key={tech} className="bg-barsky-blue/10 text-barsky-blue px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.link && (
                  <div className="mb-8">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-barsky-blue text-white px-4 py-2 rounded-md hover:bg-barsky-blue/90 transition-colors"
                    >
                      View Live Project <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
              
              <div>
                <Card className="bg-gray-50 border-none">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-barsky-dark mb-4">Project Details</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-barsky-blue mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-barsky-text">Duration</p>
                          <p className="text-barsky-text/80">{details.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <UserCircle className="h-5 w-5 text-barsky-blue mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-barsky-text">Client</p>
                          <p className="text-barsky-text/80">{details.client}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Code className="h-5 w-5 text-barsky-blue mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-barsky-text">Role</p>
                          <p className="text-barsky-text/80">{details.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
