
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Calendar, PenLine, Users, Clock, Briefcase, Code, Monitor, Smartphone, Palette } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

const Services = () => {
  const isMobile = useIsMobile();
  
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('service', 'consultation-booking', 'Calendly Booking');
  };

  React.useEffect(() => {
    trackPageView('/services', 'Design Services - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Professional Design Services | UX/UI Design | Web & Mobile App Development | Hiram Barsky</title>
        <meta name="description" content="Expert UX/UI design and development services for websites and mobile applications. Specializing in user-centered design, responsive web development, and cross-platform mobile apps." />
        <meta name="keywords" content="UX design services, UI design company, website design services, app design services, mobile app development, UX consultant, UI designer, web development services, product design, design systems" />
        <link rel="canonical" href="https://hirambarsky.com/services" />
        
        {/* Structured data for Services */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Design Services",
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
              "areaServed": {
                "@type": "Country",
                "name": "United States"
              },
              "description": "Professional UX/UI design and development services for websites and mobile applications, focusing on user-centered design principles and modern development practices.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "150.00",
                  "priceCurrency": "USD",
                  "unitText": "hour"
                }
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Design Services",
                "itemListElement": [
                  {
                    "@type": "Service",
                    "serviceType": "Website Design",
                    "description": "Custom website design with focus on user experience and conversion optimization."
                  },
                  {
                    "@type": "Service",
                    "serviceType": "Mobile App Design",
                    "description": "Intuitive and engaging mobile application designs for iOS and Android platforms."
                  },
                  {
                    "@type": "Service",
                    "serviceType": "UX Consultation",
                    "description": "Expert UX consultation services to improve existing products or guide new development."
                  },
                  {
                    "@type": "Service",
                    "serviceType": "Design Systems",
                    "description": "Creation of comprehensive design systems for consistent product experience."
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Design Services That Drive Results</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Combining strategic thinking with beautiful design to create digital experiences that solve real problems and deliver measurable outcomes.
              </p>
            </div>
            
            {/* Service Navigation Menu */}
            <div className="flex justify-center mb-12">
              <NavigationMenu>
                <NavigationMenuList className="flex flex-wrap justify-center gap-2">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white">UX/UI Design</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link to="/design-services/ux-ui-design" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-barsky-blue/20 to-barsky-blue/5 p-6 no-underline outline-none focus:shadow-md">
                              <div className="mb-2 mt-4 text-lg font-medium text-barsky-dark">
                                UX/UI Design
                              </div>
                              <p className="text-sm leading-tight text-slate-600">
                                User-centered design services that create intuitive, engaging interfaces for web and mobile applications.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link to="/design-services/ux-ui-design#user-research" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">User Research</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              In-depth research to understand your users and their needs
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/design-services/ux-ui-design#interaction-design" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Interaction Design</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Creating intuitive interfaces with meaningful interactions
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/design-services/ux-ui-design#prototyping" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Prototyping</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Interactive prototypes to test and validate design concepts
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white">Web Development</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link to="/design-services/web-development" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500/20 to-green-500/5 p-6 no-underline outline-none focus:shadow-md">
                              <div className="mb-2 mt-4 text-lg font-medium text-barsky-dark">
                                Web Development
                              </div>
                              <p className="text-sm leading-tight text-slate-600">
                                Modern web development using the latest technologies to create fast, responsive, and accessible websites.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link to="/design-services/web-development#frontend" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Frontend Development</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              React, TypeScript, and modern frameworks for interactive UIs
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/design-services/web-development#responsive" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Responsive Design</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Websites that work beautifully on all devices and screen sizes
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/design-services/web-development#performance" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Performance Optimization</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Fast loading times and smooth interactions for better user experience
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white">Mobile App Design</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link to="/design-services/mobile-app-design" className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/20 to-purple-500/5 p-6 no-underline outline-none focus:shadow-md">
                              <div className="mb-2 mt-4 text-lg font-medium text-barsky-dark">
                                Mobile App Design
                              </div>
                              <p className="text-sm leading-tight text-slate-600">
                                Creating engaging mobile experiences that users love and businesses rely on.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link to="/design-services/mobile-app-design#ios" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">iOS App Design</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Beautiful and intuitive designs following Apple's Human Interface Guidelines
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/design-services/mobile-app-design#android" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Android App Design</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Material Design implementation for Android platforms
                            </p>
                          </Link>
                        </li>
                        <li>
                          <Link to="/design-services/mobile-app-design#cross-platform" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100">
                            <div className="text-sm font-medium leading-none text-barsky-dark">Cross-Platform Design</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-600">
                              Consistent experiences across multiple platforms and devices
                            </p>
                          </Link>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Service Categories Tabs */}
            <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="design">{isMobile ? "UX/UI" : "UX/UI Design"}</TabsTrigger>
                <TabsTrigger value="web">{isMobile ? "Web" : "Web Development"}</TabsTrigger>
                <TabsTrigger value="mobile">{isMobile ? "Mobile" : "Mobile Apps"}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Design & Consultation Card */}
                  <Card className="shadow-lg w-full">
                    <CardHeader>
                      <h3 className="text-2xl font-bold text-center">Design & Consultation</h3>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                          <PenLine className="w-5 h-5 text-barsky-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-barsky-dark">Product Design</h4>
                          <p className="text-slate-600 text-sm">Crafting user-centered interfaces with meticulous attention to detail, ensuring intuitive navigation and delightful interactions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                          <Users className="w-5 h-5 text-barsky-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-barsky-dark">User Research & Strategy</h4>
                          <p className="text-slate-600 text-sm">Employing data-driven methods to understand your users, identify pain points, and develop strategic design solutions.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-barsky-blue/10 p-2 rounded-full mt-1">
                          <Clock className="w-5 h-5 text-barsky-blue" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-barsky-dark">Flexible Engagement Models</h4>
                          <p className="text-slate-600 text-sm">Whether you need ongoing support, fixed-scope projects, or expert consultation, I offer flexible options to accommodate your timeline and budget.</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button 
                        onClick={openCalendly} 
                        className="w-full"
                        size="lg"
                      >
                        <Calendar className="mr-2" />
                        Schedule a Call
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  {/* Development Card */}
                  <Card className="shadow-lg w-full">
                    <CardHeader>
                      <h3 className="text-2xl font-bold text-center">Development Services</h3>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500/10 p-2 rounded-full mt-1">
                          <Code className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-barsky-dark">Frontend Development</h4>
                          <p className="text-slate-600 text-sm">Building responsive and interactive web applications using modern frameworks and best practices.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500/10 p-2 rounded-full mt-1">
                          <Smartphone className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-barsky-dark">Mobile App Development</h4>
                          <p className="text-slate-600 text-sm">Creating cross-platform mobile applications that deliver native-like experiences on iOS and Android.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500/10 p-2 rounded-full mt-1">
                          <Palette className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-barsky-dark">Design System Implementation</h4>
                          <p className="text-slate-600 text-sm">Translating design systems into reusable code components for consistent user experiences across products.</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                      <Button 
                        onClick={openCalendly}
                        className="w-full"
                        size="lg"
                        variant="outline"
                      >
                        <Calendar className="mr-2" />
                        Book a Technical Consultation
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* My Design Process */}
                <Card className="shadow-lg w-full">
                  <CardHeader>
                    <h3 className="text-2xl font-bold text-center">My Design Process</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-barsky-blue">1.</span>
                        <span className="text-slate-700"><span className="font-semibold">Discovery:</span> Understanding your business goals, user needs, and project requirements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-barsky-blue">2.</span>
                        <span className="text-slate-700"><span className="font-semibold">Research:</span> Analyzing user behavior, market trends, and competitive landscape</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-barsky-blue">3.</span>
                        <span className="text-slate-700"><span className="font-semibold">Design:</span> Creating wireframes, prototypes, and high-fidelity designs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-barsky-blue">4.</span>
                        <span className="text-slate-700"><span className="font-semibold">Testing:</span> Validating solutions through user testing and iteration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-barsky-blue">5.</span>
                        <span className="text-slate-700"><span className="font-semibold">Implementation:</span> Supporting development teams with detailed specifications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-bold text-barsky-blue">6.</span>
                        <span className="text-slate-700"><span className="font-semibold">Evaluation:</span> Measuring success against key performance indicators and business goals</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button 
                      onClick={openCalendly} 
                      className="w-full"
                      size="lg"
                      variant="outline"
                    >
                      <Calendar className="mr-2" />
                      Book a Consultation
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="design" className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">UX/UI Design Services</h3>
                  <p className="text-slate-600 mb-6">I specialize in creating intuitive, user-centered designs that combine aesthetics with functionality to deliver exceptional digital experiences.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">User Research & Strategy</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>User interviews and persona development</li>
                        <li>Competitive analysis and market research</li>
                        <li>Journey mapping and user flows</li>
                        <li>Information architecture</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Wireframing & Prototyping</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Low and high-fidelity wireframing</li>
                        <li>Interactive prototyping</li>
                        <li>User testing and validation</li>
                        <li>Usability testing and analysis</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Visual Design</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>UI component design</li>
                        <li>Design system development</li>
                        <li>Visual identity and brand consistency</li>
                        <li>Animation and micro-interactions</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Design Consultation</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>UX audits and heuristic evaluations</li>
                        <li>Design critique and recommendations</li>
                        <li>A/B testing and optimization</li>
                        <li>Accessibility evaluation and improvement</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={openCalendly} size="lg">
                    <Calendar className="mr-2" />
                    Schedule a Design Consultation
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="web" className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Web Development Services</h3>
                  <p className="text-slate-600 mb-6">I build modern, responsive, and accessible web applications that deliver exceptional user experiences and meet business objectives.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Frontend Development</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>React and TypeScript development</li>
                        <li>Responsive web design</li>
                        <li>Progressive Web Apps (PWAs)</li>
                        <li>CSS-in-JS and Tailwind implementations</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Performance Optimization</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Core Web Vitals optimization</li>
                        <li>Code splitting and lazy loading</li>
                        <li>Image and asset optimization</li>
                        <li>Caching strategies</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Accessibility</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>WCAG 2.1 compliance</li>
                        <li>Screen reader compatibility</li>
                        <li>Keyboard navigation</li>
                        <li>Accessible color schemes</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">SEO & Analytics</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Technical SEO implementation</li>
                        <li>Schema.org structured data</li>
                        <li>Analytics integration</li>
                        <li>Conversion tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={openCalendly} size="lg" variant="outline">
                    <Calendar className="mr-2" />
                    Discuss Your Web Project
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="mobile" className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4">Mobile App Design Services</h3>
                  <p className="text-slate-600 mb-6">I create engaging mobile experiences that delight users and help businesses achieve their goals across iOS and Android platforms.</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">iOS App Design</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Human Interface Guidelines adherence</li>
                        <li>Native iOS component design</li>
                        <li>iPhone and iPad optimized layouts</li>
                        <li>iOS accessibility implementation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Android App Design</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Material Design implementation</li>
                        <li>Android-specific interaction patterns</li>
                        <li>Multi-device layout optimization</li>
                        <li>Android accessibility features</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Cross-Platform Design</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>React Native and Flutter design</li>
                        <li>Consistent cross-platform experiences</li>
                        <li>Platform-specific adaptations</li>
                        <li>Design system for multiple platforms</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-5 rounded-md shadow">
                      <h4 className="font-semibold text-lg mb-2">Mobile UX Strategy</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>Mobile-specific user research</li>
                        <li>Touch gesture optimization</li>
                        <li>Offline experience design</li>
                        <li>Push notification strategy</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={openCalendly} size="lg">
                    <Calendar className="mr-2" />
                    Plan Your Mobile App
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What is your design process?</h3>
                <p className="text-slate-600">My design process begins with understanding your business goals and user needs through discovery and research. I then create wireframes and prototypes to test concepts before moving into high-fidelity design. Throughout the process, I collaborate closely with stakeholders and iterate based on feedback to ensure the final product meets both business objectives and user expectations.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How do you charge for your services?</h3>
                <p className="text-slate-600">I offer flexible engagement models including hourly rates, project-based pricing, and retainer arrangements. The pricing structure depends on project scope, complexity, and timeline. During our initial consultation, I'll work with you to determine the most appropriate pricing model for your specific needs.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How long does a typical project take?</h3>
                <p className="text-slate-600">Project timelines vary based on scope and complexity. A simple website redesign might take 4-6 weeks, while a comprehensive mobile application could require 3-6 months. During our initial consultation, I'll provide a detailed timeline based on your specific requirements and desired launch date.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Do you work with clients remotely?</h3>
                <p className="text-slate-600">Yes, I work with clients worldwide through effective remote collaboration tools. I use tools like Figma for design collaboration, Slack for communication, and Zoom for meetings. My process ensures clear communication and regular updates regardless of geographic location.</p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What industries do you specialize in?</h3>
                <p className="text-slate-600">I've worked across diverse industries including healthcare, fintech, education, e-commerce, and SaaS. This broad experience allows me to bring fresh perspectives while understanding the unique requirements and constraints of different sectors. You can view examples of my work in various industries in my portfolio.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-barsky-blue/5">
          <div className="container px-4 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how my design and development services can help you create exceptional digital experiences for your users.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={openCalendly} size="lg">
                <Calendar className="mr-2" />
                Schedule a Free Consultation
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/#contact">
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

export default Services;
