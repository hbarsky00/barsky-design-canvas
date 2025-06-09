import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Check, PenLine, Users, Eye, Lightbulb, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";

const UxUiDesign = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('service', 'consultation-booking', 'UX/UI Design Calendly Booking');
  };

  React.useEffect(() => {
    trackPageView('/design-services/ux-ui-design', 'UX/UI Design Services - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>UX/UI Design Services | User Experience Design | Hiram Barsky</title>
        <meta name="description" content="Professional UX/UI design services including user research, wireframing, prototyping, and visual design. Create intuitive digital experiences that users love." />
        <meta name="keywords" content="UX design, UI design, user experience design, user interface design, UX research, wireframing, prototyping, visual design, design systems, usability testing" />
        <link rel="canonical" href="https://hirambarsky.com/design-services/ux-ui-design" />
        
        {/* Structured data for UX/UI Design Service */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "UX/UI Design",
              "provider": {
                "@type": "ProfessionalService",
                "name": "Hiram Barsky Design Services",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "New York",
                  "addressRegion": "NY",
                  "addressCountry": "US"
                }
              },
              "description": "Professional UX/UI design services including user research, wireframing, prototyping, and visual design for web and mobile applications.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "150.00",
                  "priceCurrency": "USD",
                  "unitText": "hour"
                }
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24 relative overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
        <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl gentle-float opacity-30" style={{ animationDelay: '2s' }} />
        
        {/* Breadcrumb */}
        <div className="relative bg-white/10 backdrop-blur-sm py-4 z-10">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-barsky-blue">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-barsky-blue">Services</Link>
              <span>/</span>
              <span className="text-barsky-blue">UX/UI Design</span>
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="py-20 relative z-10">
          <div className="container px-4 mx-auto max-w-6xl">
            <Button variant="outline" size="sm" asChild className="mb-8 glass-button">
              <Link to="/services" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to All Services
              </Link>
            </Button>
            
            <div className="glass-card-elevated p-12 layered-depth floating-element">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">UX/UI Design Services</h1>
                  <p className="text-lg text-slate-600 mb-8">
                    Creating intuitive, engaging digital experiences that delight users and drive business results through research-driven design.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 p-1 rounded-full">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-slate-700">User-centered design approach</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 p-1 rounded-full">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-slate-700">Data-informed decision making</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 p-1 rounded-full">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-slate-700">Iterative design and testing</p>
                    </div>
                  </div>
                  <Button onClick={openCalendly} size="lg" className="mt-8 glass-accent">
                    <Calendar className="mr-2" />
                    Book a Free UX Consultation
                  </Button>
                </div>
                <div className="glass-card p-6 layered-depth">
                  <img 
                    src="/lovable-uploads/14e4f7c9-8f3f-49a6-b459-858623183f1c.png" 
                    alt="UX/UI Design Services" 
                    className="w-full h-auto rounded-lg shadow-elevated" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Breakdown Section */}
        <section className="py-20 relative z-10" id="user-research">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">My UX/UI Design Services</h2>
            
            <div className="space-y-12">
              {/* User Research */}
              <div className="glass-card-elevated p-8 layered-depth floating-element">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-barsky-blue/10 p-3 rounded-full">
                    <Eye className="w-6 h-6 text-barsky-blue" />
                  </div>
                  <h3 className="text-2xl font-bold">User Research</h3>
                </div>
                <p className="text-slate-600 mb-8">
                  Understanding your users is the foundation of effective design. I employ a range of research methods to uncover insights that drive design decisions.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "User Interviews & Surveys", desc: "Gathering qualitative and quantitative data directly from your target audience" },
                    { title: "Persona Development", desc: "Creating research-based representations of your key user groups" },
                    { title: "Competitive Analysis", desc: "Evaluating competitors to identify opportunities and industry standards" },
                    { title: "Usability Testing", desc: "Observing users interacting with your product to identify pain points" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-barsky-blue/10 p-1 rounded-full mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-barsky-blue" />
                      </div>
                      <div>
                        <span className="font-semibold text-barsky-dark">{item.title}</span>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UX Strategy */}
              <div className="glass-card-elevated p-8 layered-depth floating-element">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-purple-500/10 p-3 rounded-full">
                    <Lightbulb className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold">UX Strategy</h3>
                </div>
                <p className="text-slate-600 mb-8">
                  Aligning user needs with business goals to create a strategic foundation for your digital product.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Journey Mapping", desc: "Visualizing the complete user experience from first contact to long-term engagement" },
                    { title: "Information Architecture", desc: "Organizing and structuring content for optimal user navigation" },
                    { title: "User Flows", desc: "Mapping the optimal paths users take to accomplish key tasks" },
                    { title: "Content Strategy", desc: "Planning content that guides users and supports their goals" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-purple-500/10 p-1 rounded-full mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-barsky-dark">{item.title}</span>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wireframing & Prototyping */}
              <div className="glass-card-elevated p-8 layered-depth floating-element" id="interaction-design">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-500/10 p-3 rounded-full">
                    <PenLine className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Wireframing & Prototyping</h3>
                </div>
                <p className="text-slate-600 mb-8">
                  Translating research insights into tangible design solutions through iterative wireframing and prototyping.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Low-Fidelity Wireframing", desc: "Creating initial layout concepts to establish information hierarchy" },
                    { title: "Interactive Prototyping", desc: "Building functional prototypes to test user flows and interactions" },
                    { title: "Usability Testing", desc: "Validating designs with real users to identify improvement opportunities" },
                    { title: "Interaction Design", desc: "Crafting intuitive interactions that guide users through your product" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-orange-500/10 p-1 rounded-full mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-barsky-dark">{item.title}</span>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UI Design & Visual Systems */}
              <div className="glass-card-elevated p-8 layered-depth floating-element" id="prototyping">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-500/10 p-3 rounded-full">
                    <Layout className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold">UI Design & Visual Systems</h3>
                </div>
                <p className="text-slate-600 mb-8">
                  Creating visually appealing interfaces that reinforce your brand and enhance usability.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Visual Design", desc: "Creating pixel-perfect interfaces with attention to detail and aesthetics" },
                    { title: "Design Systems", desc: "Building scalable component libraries for consistent user experiences" },
                    { title: "Responsive Design", desc: "Ensuring optimal experiences across all device sizes and types" },
                    { title: "Micro-interactions & Animation", desc: "Adding delight through thoughtful motion and feedback" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-green-500/10 p-1 rounded-full mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <span className="font-semibold text-barsky-dark">{item.title}</span>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section - Refined Layout */}
        <section className="py-20 relative z-10">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">My Design Process</h2>
            
            <div className="glass-card-elevated p-12 layered-depth">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { num: "01", title: "Discovery", desc: "I begin by understanding your business goals, user needs, and project requirements through stakeholder interviews and research planning. This critical foundation ensures all design decisions support your objectives.", color: "barsky-blue" },
                  { num: "02", title: "Research", desc: "Through user interviews, surveys, competitive analysis, and other research methods, I gather insights about your users' behaviors, motivations, and pain points to inform design decisions.", color: "purple-500" },
                  { num: "03", title: "Strategy", desc: "Based on research findings, I develop user personas, journey maps, information architecture, and content strategy to create a strategic framework for the design solution.", color: "orange-500" },
                  { num: "04", title: "Wireframing", desc: "I create low-fidelity wireframes to establish layout, hierarchy, and functionality without the distraction of visual design elements, focusing on structure and user flows.", color: "green-500" },
                  { num: "05", title: "Visual Design", desc: "With approved wireframes, I create high-fidelity visual designs that incorporate your brand identity while optimizing for usability and accessibility.", color: "cyan-500" },
                  { num: "06", title: "Testing & Iteration", desc: "I validate designs through usability testing with real users, gathering feedback to refine and improve the experience before final implementation.", color: "rose-500" }
                ].map((step, index) => (
                  <div key={index} className="floating-element">
                    <div className={`w-12 h-12 bg-${step.color}/10 rounded-full flex items-center justify-center mb-4`}>
                      <span className={`text-xl font-bold text-${step.color}`}>{step.num}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Examples Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-6">UX/UI Design Projects</h2>
            <p className="text-lg text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              Explore how my UX/UI design services have helped clients create intuitive, engaging digital experiences that drive results.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png" 
                    alt="Herbalink App" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Herbalink</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A telehealth platform connecting patients with herbal medicine practitioners
                  </p>
                  <Link to="/project/herbalink" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png" 
                    alt="Co-Parenting App" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Splittime</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A co-parenting coordination app for separated parents to manage childcare
                  </p>
                  <Link to="/project/splittime" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/56a3b260-72d5-4b69-879b-9280e1731be7.png" 
                    alt="Spectrum Apparel" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Spectrum Apparel</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    An accessible e-commerce platform for autism awareness apparel
                  </p>
                  <Link to="/project/spectrum" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonial */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="aspect-square w-40 h-40 md:w-full md:h-auto rounded-full overflow-hidden mx-auto">
                    <img 
                      src="/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png" 
                      alt="Client Testimonial" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <blockquote className="text-lg md:text-xl italic text-slate-700 mb-6">
                    "Hiram's UX/UI design services transformed our product from functional to exceptional. His research-driven approach and attention to detail resulted in an interface that our users love and a significant increase in engagement metrics."
                  </blockquote>
                  <div>
                    <p className="font-bold text-barsky-dark">Sarah Johnson</p>
                    <p className="text-sm text-slate-600">Product Manager, Health Tech Startup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-barsky-blue/5">
          <div className="container px-4 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your User Experience?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how my UX/UI design services can help you create digital experiences that delight your users and drive business results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={openCalendly} size="lg">
                <Calendar className="mr-2" />
                Schedule a Free UX Consultation
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">
                  Contact Me
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UxUiDesign;
