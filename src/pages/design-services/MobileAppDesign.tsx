
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Check, Smartphone, Cpu, Zap, Target, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";

const MobileAppDesign = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('service', 'consultation-booking', 'Mobile App Design Calendly Booking');
  };

  React.useEffect(() => {
    trackPageView('/design-services/mobile-app-design', 'Mobile App Design Services - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Mobile App Design Services | iOS & Android | Hiram Barsky</title>
        <meta name="description" content="Professional mobile app design services for iOS and Android platforms. Creating user-centered, intuitive mobile experiences that engage users and drive business results." />
        <meta name="keywords" content="mobile app design, iOS app design, Android app design, mobile UX, app UI design, cross-platform design, UX research, prototyping, UI design, mobile development" />
        <link rel="canonical" href="https://barskydesign.pro/design-services/mobile-app-design" />
        
        {/* Structured data for Mobile App Design Service */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Mobile App Design",
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
              "description": "Professional mobile app design services for iOS and Android platforms, creating user-centered mobile experiences that engage users and drive results.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "160.00",
                  "priceCurrency": "USD",
                  "unitText": "hour"
                }
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        {/* Breadcrumb */}
        <div className="bg-slate-50 py-4">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Link to="/" className="hover:text-barsky-blue">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-barsky-blue">Services</Link>
              <span>/</span>
              <span className="text-barsky-blue">Mobile App Design</span>
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <Button variant="outline" size="sm" asChild className="mb-8">
              <Link to="/services" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to All Services
              </Link>
            </Button>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Mobile App Design Services</h1>
                <p className="text-lg text-slate-600 mb-8">
                  Creating intuitive, engaging mobile experiences for iOS and Android platforms that users love and businesses rely on.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">User-centered mobile experiences</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">Platform-specific design expertise</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">Cross-platform consistency</p>
                  </div>
                </div>
                <Button onClick={openCalendly} size="lg" className="mt-8">
                  <Calendar className="mr-2" />
                  Book a Free Mobile App Consultation
                </Button>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png" 
                  alt="Mobile App Design Services" 
                  className="w-full h-auto rounded-lg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Breakdown Section */}
        <section className="py-20 bg-white" id="ios">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">My Mobile App Design Services</h2>
            
            <div className="grid md:grid-cols-2 gap-20 mb-20">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500/10 p-2 rounded-full">
                    <Smartphone className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold">iOS App Design</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Creating intuitive iOS app experiences that align with Apple's Human Interface Guidelines while maintaining your brand identity.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Human Interface Guidelines</span>
                      <p className="text-sm text-slate-600">Designing within Apple's design framework for familiar interactions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">iOS-Specific Patterns</span>
                      <p className="text-sm text-slate-600">Implementing navigation and interaction patterns familiar to iOS users</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Device Optimization</span>
                      <p className="text-sm text-slate-600">Tailoring designs for different iOS devices from iPhone to iPad</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Dark Mode Support</span>
                      <p className="text-sm text-slate-600">Creating dual-theme interfaces for both light and dark mode</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div id="android">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <Cpu className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Android App Design</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Designing for Android's diverse ecosystem while maintaining Material Design principles for intuitive user experiences.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Material Design</span>
                      <p className="text-sm text-slate-600">Implementing Google's design system for consistent Android experiences</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Adaptive Layouts</span>
                      <p className="text-sm text-slate-600">Creating designs that work across Android's diverse device ecosystem</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Platform Patterns</span>
                      <p className="text-sm text-slate-600">Using navigation and interaction patterns familiar to Android users</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Animation & Motion</span>
                      <p className="text-sm text-slate-600">Incorporating meaningful motion that guides users through the app</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-20" id="cross-platform">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/10 p-2 rounded-full">
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Cross-Platform Design</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Creating consistent experiences across platforms while respecting each platform's unique design principles.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Consistent Brand Experience</span>
                      <p className="text-sm text-slate-600">Maintaining brand identity across different platforms</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Platform-Specific Adaptation</span>
                      <p className="text-sm text-slate-600">Adjusting interface elements to match platform conventions</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Shared Design System</span>
                      <p className="text-sm text-slate-600">Creating component libraries that work across platforms</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Framework-Specific Design</span>
                      <p className="text-sm text-slate-600">Designing for React Native, Flutter, and other cross-platform frameworks</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500/10 p-2 rounded-full">
                    <Target className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Mobile UX Strategy</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Developing comprehensive user experience strategies specifically tailored for mobile contexts and use cases.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Mobile User Research</span>
                      <p className="text-sm text-slate-600">Understanding how users interact with mobile applications</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">User Flow Optimization</span>
                      <p className="text-sm text-slate-600">Streamlining key user journeys for mobile constraints</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Gesture Design</span>
                      <p className="text-sm text-slate-600">Creating intuitive touch interactions for mobile users</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Offline Experience</span>
                      <p className="text-sm text-slate-600">Designing for intermittent connectivity scenarios</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">My Mobile App Design Process</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-purple-500">01</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Discovery & Research</h3>
                  <p className="text-slate-600">
                    I begin by understanding your business objectives, target users, and app requirements. This phase includes competitive analysis, user interviews, and defining key metrics for success. The goal is to establish a solid foundation for the app's design direction.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-blue-500">02</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">User Flow & Architecture</h3>
                  <p className="text-slate-600">
                    I map out the app's information architecture and key user flows, focusing on creating intuitive navigation and interaction patterns specific to mobile contexts. This creates a blueprint for the app's structure and functionality.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-green-600">03</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Wireframing</h3>
                  <p className="text-slate-600">
                    I create low-fidelity wireframes to establish layout, hierarchy, and functionality specific to each platform (iOS and Android). This allows us to test concepts quickly before investing in detailed visual design.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-orange-500">04</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Visual Design</h3>
                  <p className="text-slate-600">
                    I create high-fidelity mockups that blend your brand identity with platform-specific design guidelines. This includes creating a comprehensive component library that ensures consistency across the app experience.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-rose-500">05</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Prototyping & Testing</h3>
                  <p className="text-slate-600">
                    I create interactive prototypes that simulate the app's behavior, allowing for user testing and validation of design concepts. This identifies usability issues early in the process while there's still time to iterate.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-cyan-500">06</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Developer Handoff</h3>
                  <p className="text-slate-600">
                    I prepare detailed specifications and assets for developers, ensuring your design is implemented accurately. This includes animations, interactions, and responsive behavior documentation for multiple device sizes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Project Examples Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-6">Mobile App Design Projects</h2>
            <p className="text-lg text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              Explore how my mobile app design services have helped clients create engaging, intuitive experiences across iOS and Android platforms.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/876fb1bd-4f5a-4734-8812-c18fa01e10ce.png" 
                    alt="Splittime App" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Splittime</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A co-parenting coordination app designed for separated parents to manage childcare responsibilities
                  </p>
                  <Link to="/project/splittime" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
                </CardContent>
              </Card>
              
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
                    A telehealth platform connecting patients with qualified herbalists for natural health solutions
                  </p>
                  <Link to="/project/herbalink" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/2a322354-503a-4e82-baec-f3ebf3e8f097.png" 
                    alt="Barsky Joint Food Truck App" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Barsky Joint</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A food truck ordering app with real-time tracking and location updates
                  </p>
                  <Link to="/project/barskyjoint" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
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
        
        {/* Technical Considerations Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">Mobile App Design Considerations</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Layout className="w-6 h-6 text-barsky-blue" />
                  <h3 className="text-xl font-bold">Performance & Optimization</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Mobile app design must account for device constraints and performance considerations:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Optimizing UI for battery efficiency and smooth performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Designing for offline states and intermittent connectivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Creating efficient loading states and skeleton screens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-green-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Implementing progressive loading for media-heavy applications</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-bold">Native Features Integration</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Effectively integrating mobile-specific capabilities into the app experience:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-purple-500" />
                    </div>
                    <span>Designing for biometric authentication (Face ID, Touch ID)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-purple-500" />
                    </div>
                    <span>Incorporating location services and mapping experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-purple-500" />
                    </div>
                    <span>Utilizing camera and photo library integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-purple-500" />
                    </div>
                    <span>Creating effective push notification experiences</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-bold">Accessibility & Inclusivity</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Ensuring mobile apps are usable by everyone, regardless of abilities:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="bg-orange-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-orange-500" />
                    </div>
                    <span>Designing for screen readers and voice control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-orange-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-orange-500" />
                    </div>
                    <span>Ensuring sufficient touch target sizes and spacing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-orange-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-orange-500" />
                    </div>
                    <span>Implementing proper color contrast and text sizing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-orange-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-orange-500" />
                    </div>
                    <span>Supporting dynamic text size adjustments</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-500" />
                  <h3 className="text-xl font-bold">App Store Optimization</h3>
                </div>
                <p className="text-slate-600 mb-4">
                  Designing with app marketplace success in mind:
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span>Creating compelling app icons and screenshots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span>Designing app preview videos that highlight key features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span>Optimizing onboarding for first-time user retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-blue-50 p-1 rounded-full mt-0.5">
                      <Check className="w-3 h-3 text-blue-500" />
                    </div>
                    <span>Planning for app updates and feature announcements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="bg-slate-50 p-8 md:p-12 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="aspect-square w-40 h-40 md:w-full md:h-auto rounded-full overflow-hidden mx-auto">
                    <img 
                      src="/lovable-uploads/8df73511-1861-490b-a280-b6b75c419522.png" 
                      alt="Client Testimonial" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <blockquote className="text-lg md:text-xl italic text-slate-700 mb-6">
                    "Hiram's approach to mobile app design transformed our product from concept to a polished, user-friendly application. His attention to platform-specific design details and focus on user experience resulted in exceptional engagement metrics and positive reviews."
                  </blockquote>
                  <div>
                    <p className="font-bold text-barsky-dark">Michael Reynolds</p>
                    <p className="text-sm text-slate-600">Founder, Health Tech Startup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-barsky-blue/5">
          <div className="container px-4 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Mobile App?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how my mobile app design services can help you create an engaging, user-centered mobile experience that delivers results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={openCalendly} size="lg">
                <Calendar className="mr-2" />
                Schedule a Free Consultation
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

export default MobileAppDesign;
