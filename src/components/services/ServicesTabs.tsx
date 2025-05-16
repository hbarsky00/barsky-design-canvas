import React from "react";
import { Calendar, PenLine, Users, Clock, Code, Smartphone, Palette } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { trackContentEngagement } from "@/lib/analytics";
import { useIsMobile } from "@/hooks/use-mobile";

const ServicesTabs = () => {
  const isMobile = useIsMobile();
  
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('service', 'consultation-booking', 'Calendly Booking');
  };

  return (
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
  );
};

export default ServicesTabs;
