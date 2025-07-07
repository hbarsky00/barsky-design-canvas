import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Code, Smartphone, Globe } from "lucide-react";

interface LinkCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: Array<{
    text: string;
    url: string;
    description: string;
  }>;
}

const InternalLinkingHub: React.FC = () => {
  const linkCategories: LinkCategory[] = [
    {
      title: "Design Services",
      description: "Professional Product Design and consultation services",
      icon: <Briefcase className="w-6 h-6" />,
      links: [
        {
          text: "Product Design Services",
          url: "/design-services/ux-ui-design",
          description: "Complete user experience and interface design"
        },
        {
          text: "Web Development Services", 
          url: "/design-services/web-development",
          description: "Frontend development with React and TypeScript"
        },
        {
          text: "Mobile App Design",
          url: "/design-services/mobile-app-design", 
          description: "iOS and Android mobile application design"
        }
      ]
    },
    {
      title: "Featured Projects",
      description: "Case studies showcasing design process and results",
      icon: <Globe className="w-6 h-6" />,
      links: [
        {
          text: "MediTrack Pro - Healthcare App",
          url: "/project/medication-app",
          description: "Medication management mobile app design"
        },
        {
          text: "InvestorConnect - FinTech Platform",
          url: "/project/investor-loan-app", 
          description: "Professional trading platform for investors"
        },
        {
          text: "DataCatalog Pro - Enterprise Tool",
          url: "/project/dae-search",
          description: "AI-powered enterprise data catalog design"
        }
      ]
    },
    {
      title: "Mobile App Portfolio",
      description: "iOS and Android app design case studies",
      icon: <Smartphone className="w-6 h-6" />,
      links: [
        {
          text: "SplitTime - Co-parenting App",
          url: "/project/splittime",
          description: "Family coordination platform design"
        },
        {
          text: "HerbaLink - Telemedicine Platform", 
          url: "/project/herbalink",
          description: "Digital healthcare consultation app"
        },
        {
          text: "Barsky Joint - Restaurant Tech",
          url: "/project/barskyjoint",
          description: "Dual-format restaurant ordering system"
        }
      ]
    },
    {
      title: "Web Development",
      description: "Full-stack web application projects",
      icon: <Code className="w-6 h-6" />,
      links: [
        {
          text: "Gold2Crypto - Investment Platform",
          url: "/project/gold2crypto",
          description: "Cryptocurrency investment transition tool"
        },
        {
          text: "Spectrum Apparel - E-commerce",
          url: "/project/spectrum", 
          description: "Accessible custom apparel platform"
        },
        {
          text: "All Projects Portfolio",
          url: "/projects",
          description: "View complete design portfolio"
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore My Design Work & Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse my comprehensive Portfolio of Product Design Case studies with live links. 
            Each project showcases user-centered design principles and measurable business results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {linkCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 layered-depth h-full"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.title}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6 text-sm">
                {category.description}
              </p>

              <div className="space-y-4">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    className="block group hover:bg-blue-50/50 rounded-lg p-3 -mx-3 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {link.text}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {link.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200 ml-2 mt-1 flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalLinkingHub;
