
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Check, Code, Gauge, Laptop, Globe, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPageView, trackContentEngagement } from "@/lib/analytics";

const WebDevelopment = () => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('service', 'consultation-booking', 'Web Development Calendly Booking');
  };

  React.useEffect(() => {
    trackPageView('/design-services/web-development', 'Web Development Services - Hiram Barsky');
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Web Development Services | React & Modern Frontend | Hiram Barsky</title>
        <meta name="description" content="Professional web development services using React, TypeScript, and modern frontend technologies. Creating fast, responsive, and accessible websites and web applications." />
        <meta name="keywords" content="web development, website design, frontend development, React developer, TypeScript, responsive design, web performance, SEO, accessibility, modern web development" />
        <link rel="canonical" href="https://hirambarsky.com/design-services/web-development" />
        
        {/* Structured data for Web Development Service */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Web Development",
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
              "description": "Professional web development services using React, TypeScript, and modern frontend technologies to create fast, responsive, and accessible websites and web applications.",
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "170.00",
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
              <span className="text-barsky-blue">Web Development</span>
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Web Development Services</h1>
                <p className="text-lg text-slate-600 mb-8">
                  Building modern, high-performance web applications and websites using React, TypeScript, and cutting-edge frontend technologies.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">Fast, responsive, and accessible websites</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">Modern React and TypeScript development</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-1 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-slate-700">Performance and SEO optimized</p>
                  </div>
                </div>
                <Button onClick={openCalendly} size="lg" className="mt-8">
                  <Calendar className="mr-2" />
                  Book a Free Web Development Consultation
                </Button>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/24032530-c712-4fff-9236-3975170ee6e6.png" 
                  alt="Web Development Services" 
                  className="w-full h-auto rounded-lg" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Breakdown Section */}
        <section className="py-20 bg-white" id="frontend">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-16">My Web Development Services</h2>
            
            <div className="grid md:grid-cols-2 gap-20 mb-20">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Frontend Development</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Building modern, interactive web interfaces with clean, maintainable code and the latest frontend technologies.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">React Development</span>
                      <p className="text-sm text-slate-600">Creating component-based UIs with modern React and TypeScript</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Design Implementation</span>
                      <p className="text-sm text-slate-600">Turning design mockups into pixel-perfect web interfaces</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">State Management</span>
                      <p className="text-sm text-slate-600">Implementing efficient data flow with React Query, Redux, or Context API</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-green-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Component Libraries</span>
                      <p className="text-sm text-slate-600">Building reusable component libraries and design systems</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div id="responsive">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/10 p-2 rounded-full">
                    <Laptop className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Responsive Web Design</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Creating websites that provide optimal viewing experiences across all devices and screen sizes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Mobile-First Development</span>
                      <p className="text-sm text-slate-600">Building with small screens in mind, then expanding for larger devices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Fluid Layouts</span>
                      <p className="text-sm text-slate-600">Creating adaptable layouts that work across device sizes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Progressive Enhancement</span>
                      <p className="text-sm text-slate-600">Ensuring core functionality works everywhere while enhancing experiences for modern browsers</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Cross-Browser Testing</span>
                      <p className="text-sm text-slate-600">Verifying consistent experiences across different browsers and devices</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-20" id="performance">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500/10 p-2 rounded-full">
                    <Gauge className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-2xl font-bold">Performance Optimization</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Enhancing website speed and performance to improve user experience and search engine rankings.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Core Web Vitals Optimization</span>
                      <p className="text-sm text-slate-600">Improving key performance metrics like LCP, FID, and CLS</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Code Splitting</span>
                      <p className="text-sm text-slate-600">Breaking code into smaller chunks to improve load times</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Asset Optimization</span>
                      <p className="text-sm text-slate-600">Optimizing images, fonts, and other assets for faster loading</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Caching Strategies</span>
                      <p className="text-sm text-slate-600">Implementing effective caching to reduce server load and improve speed</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500/10 p-2 rounded-full">
                    <Globe className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold">SEO & Accessibility</h3>
                </div>
                <p className="text-slate-600 mb-6">
                  Building websites that are both search engine friendly and accessible to all users.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Technical SEO</span>
                      <p className="text-sm text-slate-600">Implementing SEO best practices in code structure</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">WCAG Compliance</span>
                      <p className="text-sm text-slate-600">Creating websites that meet accessibility standards</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Structured Data</span>
                      <p className="text-sm text-slate-600">Implementing Schema.org markup for enhanced search results</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-1 rounded-full mt-1">
                      <Check className="w-4 h-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="font-semibold text-barsky-dark">Semantic HTML</span>
                      <p className="text-sm text-slate-600">Using proper HTML elements for improved accessibility and SEO</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tech Stack Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-6">My Web Development Stack</h2>
            <p className="text-lg text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              I use modern, industry-standard technologies to build robust and maintainable web applications.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500" fill="currentColor">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538 15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005 26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">React</h3>
                <p className="text-sm text-slate-600">Component-based UI library for building interactive interfaces</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500" fill="currentColor">
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">TypeScript</h3>
                <p className="text-sm text-slate-600">Static typing for better code quality and developer experience</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-teal-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-teal-500" fill="currentColor">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Tailwind CSS</h3>
                <p className="text-sm text-slate-600">Utility-first CSS framework for rapid UI development</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-500/10 rounded-full">
                  <Database className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-bold text-lg mb-2">Tanstack Query</h3>
                <p className="text-sm text-slate-600">Data fetching and state management for React applications</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-500" fill="currentColor">
                    <path d="M12,1.85c-5.66,0-10.3,4.34-10.3,9.65s4.64,9.65,10.3,9.65s10.3-4.34,10.3-9.65S17.66,1.85,12,1.85z M12,19.65 c-4.7,0-8.5-3.6-8.5-8.15c0-4.55,3.8-8.15,8.5-8.15c4.7,0,8.5,3.6,8.5,8.15C20.5,16.05,16.7,19.65,12,19.65z M8.37,7.85 c0-0.5,0.4-0.9,0.9-0.9c0.5,0,0.9,0.4,0.9,0.9s-0.4,0.9-0.9,0.9C8.77,8.75,8.37,8.35,8.37,7.85z M13.83,7.85c0-0.5,0.4-0.9,0.9-0.9 c0.5,0,0.9,0.4,0.9,0.9s-0.4,0.9-0.9,0.9C14.23,8.75,13.83,8.35,13.83,7.85z M12,15.82c-2.28,0-4.2-1.3-5-3.15 c-0.23-0.52,0-1.13,0.52-1.35c0.52-0.23,1.13,0,1.35,0.52c0.54,1.22,1.81,2.08,3.13,2.08s2.59-0.86,3.13-2.08 c0.22-0.52,0.83-0.75,1.35-0.52c0.52,0.22,0.75,0.83,0.52,1.35C16.2,14.52,14.28,15.82,12,15.82z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Vite</h3>
                <p className="text-sm text-slate-600">Next-generation frontend build tool for fast development</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-purple-500" fill="currentColor">
                    <path d="M16.214 6.762l-.075.391c-.116.741-.074.953.244 1.228l.307.254-.318 1.418c-.19.846-.423 1.555-.571 1.788-.127.201-.275.497-.307.656-.053.19-.233.381-.508.55-.243.138-.72.508-1.058.805-.27.243-.456.392-.557.456l-.33.261c-.106.17-.166.307-.189.411-.023.107-.01.178.024.23.033.05.09.085.168.107a.954.954 0 00.282.023 3 3 0 00.632-.112c.07-.019.125-.037.173-.053.074-.091.245-.263.548-.562.804-.793 1.111-1.227.794-1.11-.117.042-.064-.064.137-.276.424-.413.667-1.037 1.175-2.994.402-1.545.402-1.567.698-1.567.139 0 .532.024.532.024V6.762h-.902zm3.839 3.165c-.064 0-.17.096-.233.202-.116.19.021.306 1.767 1.396 1.037.657 1.873 1.217 1.852 1.26-.021.031-.868.582-1.883 1.217-1.842 1.142-1.852 1.153-1.683 1.386.212.275 0 .37 2.391-1.122L24 13.155v-.836l-1.937-1.196c-1.047-.656-1.957-1.185-2.01-1.196zm-16.085.117c-.053 0-.963.54-2.01 1.185L0 12.425v.836l1.947 1.217c1.08.666 1.99 1.217 2.032 1.217.042 0 .127-.096.212-.212.127-.201.02-.286-1.768-1.418C.72 12.996.54 12.848.71 12.732c.106-.074.91-.572 1.778-1.111 1.979-1.217 1.873-1.133 1.714-1.387-.063-.105-.17-.2-.233-.19zm8.684.023c-.292-.002-.92.443-2.8 1.978-.081.193-.088.306-.023.366.065.06.151.063.275.016.11-.048 1.299-1.297 2.662-2.79-.01-.01-.085-.57-.114-.57zm-5.505.612c-.116 0-.259.118-.323.275-.133.317-.317.948-.138.948.085 0 .307-.307.455-.613.148-.306.19-.61.006-.61zm3.839 2.414c-.148 0-2.27 3.3-2.244 3.497.002.017.033.042.077.074.045.033.097.066.153.074.109.033 2.49-3.23 2.49-3.443 0-.031-.032-.074-.169-.139-.084-.04-.174-.06-.307-.063zm1.209.152c-.226-.006-.15 1.223.402 3.402.441-.005 1.702-3.38 1.385-3.38-.317 0-1.553-.022-1.787-.022zm-2.95 3.134c-.116 0-.237.063-.328.191-.117.19.021.275.249.286.122.016.311-.111.311-.233 0-.07-.117-.233-.233-.244z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Framer Motion</h3>
                <p className="text-sm text-slate-600">Animation library for creating fluid UI transitions</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-slate-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-500" fill="currentColor">
                    <path d="M12.0014 22.8296C10.591 22.8296 9.32317 22.6216 8.19788 22.2054C7.0726 21.7893 6.11394 21.1883 5.32192 20.4024C4.52989 19.6165 3.92037 18.697 3.49335 17.6439C3.06633 16.5908 2.83569 15.4409 2.80142 14.1942V13.6114C2.80142 12.2306 3.02777 10.9839 3.48049 9.87108C3.93321 8.75831 4.57559 7.79165 5.40762 6.97109C6.23966 6.15054 7.22974 5.51616 8.37788 5.06796C9.52603 4.61976 10.7857 4.39567 12.1567 4.39567C13.5735 4.39567 14.8328 4.60993 15.9346 5.03846C17.0364 5.46699 17.9737 6.07651 18.7464 6.86703C19.5192 7.65754 20.115 8.57508 20.5335 9.61963C20.952 10.6642 21.1613 11.8225 21.1613 13.0948C21.1613 13.9935 21.0156 14.8833 20.7241 15.7642C20.4327 16.645 19.9886 17.4559 19.3919 18.1967C18.7951 18.9375 18.0455 19.5683 17.1429 20.089C16.2404 20.6098 15.1865 20.923 13.9813 21.0288V18.0929C14.6468 18.0157 15.2014 17.8301 15.645 17.5365C16.0886 17.2427 16.4471 16.8689 16.7207 16.4151C16.9943 15.9613 17.1892 15.4543 17.3052 14.8941C17.4213 14.3339 17.4793 13.7655 17.4793 13.1888C17.4793 12.4158 17.3566 11.7424 17.1114 11.1686C16.8662 10.5949 16.5198 10.1176 16.0722 9.73688C15.6246 9.35615 15.097 9.07191 14.4892 8.88414C13.8815 8.69637 13.2116 8.60249 12.4797 8.60249C11.8227 8.60249 11.2114 8.70487 10.6458 8.90963C10.0802 9.11439 9.58732 9.41562 9.16708 9.8133C8.74683 10.211 8.42049 10.7051 8.18806 11.2955C7.95562 11.8859 7.8394 12.5765 7.8394 13.3673C7.8394 14.2146 7.97271 14.9439 8.23933 15.5552C8.50594 16.1665 8.87667 16.677 9.35151 17.0865C9.82634 17.4961 10.3877 17.7974 11.0357 17.9903C11.6836 18.1833 12.4045 18.2797 13.1982 18.2797H13.9813V21.0288C13.5806 21.0631 13.148 21.0802 12.6837 21.0802C12.2193 21.0802 12.0014 21.0802 12.0014 21.0802V22.8296ZM12.0014 0C18.6334 0 24.0028 5.34491 24.0028 11.9462C24.0028 18.5475 18.6334 23.8924 12.0014 23.8924C5.36937 23.8924 0 18.5475 0 11.9462C0 5.34491 5.36937 0 12.0014 0Z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Shadcn UI</h3>
                <p className="text-sm text-slate-600">Beautifully designed, accessible UI components</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-500/10 rounded-full">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-600" fill="currentColor">
                    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Git</h3>
                <p className="text-sm text-slate-600">Version control for code management and collaboration</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Examples Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-6">Web Development Projects</h2>
            <p className="text-lg text-center text-slate-600 mb-16 max-w-3xl mx-auto">
              Explore how my web development services have helped clients create high-performance, responsive web applications.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/6fbe4453-e22e-460f-81ff-a4a5a9ce791a.png" 
                    alt="Gold 2 Crypto Services" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Gold 2 Crypto</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A high-performance trading platform connecting gold investments with cryptocurrency markets
                  </p>
                  <Link to="/project/gold2crypto" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
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
                    An accessible e-commerce platform for autism awareness apparel with custom design capabilities
                  </p>
                  <Link to="/project/spectrum" className="text-barsky-blue font-medium hover:underline">View Case Study</Link>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src="/lovable-uploads/2a322354-503a-4e82-baec-f3ebf3e8f097.png" 
                    alt="Barsky Joint Food Truck" 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="pt-5">
                  <h3 className="font-bold text-xl mb-2">Barsky Joint</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    A responsive web app for a food truck business with ordering system and location tracking
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
        
        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="container px-4 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">What technologies do you use for web development?</h3>
                <p className="text-slate-600">I specialize in modern frontend technologies including React, TypeScript, Next.js, and Tailwind CSS. I also work with state management libraries like React Query and data visualization tools like Recharts. My focus is on creating fast, accessible, and maintainable web applications.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">How do you approach web performance optimization?</h3>
                <p className="text-slate-600">I follow a comprehensive approach to web performance, focusing on Core Web Vitals optimization. This includes code splitting, lazy loading, image optimization, efficient state management, and minimizing unnecessary re-renders. I use tools like Lighthouse and WebPageTest to measure and improve performance metrics.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Can you work with my existing codebase?</h3>
                <p className="text-slate-600">Yes, I have extensive experience working with existing codebases. I can help refactor, optimize, and extend your current web application while maintaining its core functionality. My approach focuses on incremental improvements that minimize disruption while enhancing the user experience.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Do you provide ongoing support after the initial development?</h3>
                <p className="text-slate-600">Yes, I offer flexible support options for your web application after launch. This can include bug fixes, feature enhancements, performance optimizations, and regular maintenance. I can work on a retainer basis or per-project basis depending on your needs.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-barsky-blue/5">
          <div className="container px-4 mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Web Project?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how my web development services can help you create a fast, responsive, and user-friendly web application.
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

export default WebDevelopment;
