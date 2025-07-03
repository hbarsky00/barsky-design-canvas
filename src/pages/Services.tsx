
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import IndexingOptimizer from "@/components/seo/IndexingOptimizer";
import { usePageIndexing } from "@/hooks/usePageIndexing";
import { Search, Target, Palette, TrendingUp, Users, Zap } from "lucide-react";

const Services = () => {
  usePageIndexing();
  
  const services = [
    {
      icon: Search,
      title: "User Research & Testing",
      description: "Comprehensive user research including interviews, usability testing, competitive analysis, and behavioral data analysis to understand your users deeply.",
      features: ["User Interviews & Surveys", "Usability Testing", "Competitive Analysis", "User Journey Mapping"]
    },
    {
      icon: Target,
      title: "Design Strategy & Planning",
      description: "Strategic design thinking that aligns user needs with business objectives, creating roadmaps for digital product success.",
      features: ["Product Strategy", "Information Architecture", "User Persona Development", "Design System Planning"]
    },
    {
      icon: Palette,
      title: "UX/UI Design & Prototyping",
      description: "Creating intuitive, accessible interfaces through wireframing, prototyping, visual design, and design system development.",
      features: ["Wireframing & Prototyping", "Visual Design", "Design Systems", "Accessibility Compliance"]
    },
    {
      icon: TrendingUp,
      title: "Conversion Optimization",
      description: "Data-driven optimization strategies that improve user engagement, conversion rates, and overall product performance.",
      features: ["A/B Testing Strategy", "Analytics Implementation", "Performance Optimization", "User Behavior Analysis"]
    },
    {
      icon: Users,
      title: "Team Collaboration & Training",
      description: "Seamless integration with your team including design workshops, process training, and ongoing collaboration support.",
      features: ["Design Workshops", "Process Training", "Team Integration", "Ongoing Support"]
    },
    {
      icon: Zap,
      title: "Digital Product Consulting",
      description: "Strategic consulting for digital product development, including MVP planning, product roadmapping, and growth strategy.",
      features: ["MVP Strategy", "Product Roadmapping", "Growth Planning", "Technical Consultation"]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>UX Research & Design Services | Barsky Design Agency</title>
        <meta name="description" content="Comprehensive UX research and design services including user research, design strategy, conversion optimization, and digital product consulting. Research-driven approach delivering measurable business outcomes." />
        <link rel="canonical" href="https://barskydesign.pro/services" />
        
        {/* Enhanced indexing signals */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="priority" content="high" />
        <meta name="revisit-after" content="30 days" />
        
        {/* Service-specific structured data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "UX Research & Design Services",
              "description": "Comprehensive UX research and design services helping businesses improve digital product experiences",
              "provider": {
                "@type": "Organization",
                "name": "Barsky Design",
                "description": "Research and design agency specializing in user experience optimization"
              },
              "serviceType": "UX Research and Design",
              "areaServed": "Global",
              "url": "https://barskydesign.pro/services"
            }
          `}
        </script>
      </Helmet>
      
      <IndexingOptimizer priority="high" changeFreq="monthly" />
      
      <Header />
      <main className="flex-grow">
        <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              UX Research & Design Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive research and design services that transform user insights into 
              exceptional digital experiences and measurable business outcomes.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From initial user research to final implementation, we provide end-to-end 
                UX research and design services tailored to your business needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Improve Your Digital Product?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how our research-driven approach can help you create better user experiences 
              and achieve your business objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Start a Project
              </a>
              <a href="/projects" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                View Our Work
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
