import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Briefcase, Award, Book, Users, Target, Lightbulb } from 'lucide-react';

const skills = [
  "Product Design",
  "UX/UI Design",
  "Design Systems",
  "Product Strategy", 
  "User Research",
  "Design Thinking",
  "Interaction Design",
  "Wireframing & Prototyping",
  "Design Leadership",
  "Mobile App Design",
  "Web Development",
  "Frontend Development",
  "React Development",
  "Gen AI Design & Development"
];

const tools = [
  "Figma", "Adobe Creative Suite", "Zeplin", 
  "Lovable.dev", "Protopen", "Webflow", "UXPilot", "Gamma", "Claude AI", "Chat GPT", "Jira"
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About Hiram Barsky | Professional UX/UI Designer & Frontend Developer | Design Philosophy</title>
        <meta name="description" content="Learn about Hiram Barsky, a professional UX/UI designer and frontend developer with 12+ years of experience. Discover my design philosophy, approach to user-centered design, and passion for creating exceptional digital experiences." />
        <meta name="keywords" content="about Hiram Barsky, UX designer background, UI designer experience, design philosophy, user-centered design, frontend developer, product designer story" />
        <link rel="canonical" href="https://barskydesign.pro/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Hiram Barsky | Professional UX/UI Designer & Developer" />
        <meta property="og:description" content="Learn about Hiram Barsky's design philosophy and approach to creating exceptional user experiences." />
        <meta property="og:url" content="https://barskydesign.pro/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Hiram Barsky | Professional UX/UI Designer" />
        <meta name="twitter:description" content="Learn about my design philosophy and approach to user-centered design." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Hiram Barsky",
              "description": "Learn about Hiram Barsky's design philosophy and professional background",
              "url": "https://barskydesign.pro/about",
              "mainEntity": {
                "@type": "Person",
                "name": "Hiram Barsky",
                "jobTitle": "UX/UI Designer & Frontend Developer",
                "description": "Professional UX/UI designer and frontend developer with 12+ years of experience creating exceptional digital experiences",
                "url": "https://barskydesign.pro",
                "knowsAbout": [
                  "UX/UI Design",
                  "Frontend Development", 
                  "Mobile App Design",
                  "Web Development",
                  "User Research",
                  "Design Systems"
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-barsky-bg-light">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 text-barsky-dark">About Barsky Design</h1>
              <p className="text-xl text-barsky-text mb-8">
                Crafting innovative software solutions that drive technology forward through user-centered design.
              </p>
            </div>
          </div>
        </section>

        {/* Main About Content */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-barsky-dark">Hi, I'm Hiram Barsky</h2>
                <p className="text-barsky-text mb-6">
                  I'm a Product Designer & Gen AI Developer with a passion for creating 
                  user-centered digital experiences that solve complex problems 
                  and drive business value through strategic design.
                </p>
                <p className="text-barsky-text mb-6">
                  My approach combines deep user empathy, design thinking, 
                  and a strategic mindset to craft intuitive and impactful 
                  product solutions that bridge user needs with business goals.
                </p>
                <p className="text-barsky-text mb-8">
                  I help early-stage startups and teams create user-friendly digital experiences. 
                  I offer UX/UI design, design system creation, MVP design, and design audits 
                  to bring your ideas to life.
                </p>
                
                <div className="flex flex-col gap-5 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-barsky-blue/10 p-3 rounded-full">
                      <Briefcase className="w-6 h-6 text-barsky-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-barsky-dark">Professional Experience</h3>
                      <p className="text-sm text-barsky-text-light">12+ years in product design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-barsky-blue/10 p-3 rounded-full">
                      <Users className="w-6 h-6 text-barsky-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-barsky-dark">Client Focus</h3>
                      <p className="text-sm text-barsky-text-light">Early-stage startups and growing teams</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-barsky-blue/10 p-3 rounded-full">
                      <Target className="w-6 h-6 text-barsky-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-barsky-dark">Design Philosophy</h3>
                      <p className="text-sm text-barsky-text-light">User-centered, strategic, and results-driven</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-barsky-blue/10 p-3 rounded-full">
                      <Lightbulb className="w-6 h-6 text-barsky-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-barsky-dark">Innovation Focus</h3>
                      <p className="text-sm text-barsky-text-light">AI-driven design solutions and emerging tech</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Skills & Expertise</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-barsky-blue" />
                      <span className="text-barsky-text">{skill}</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-barsky-dark">Design Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool, index) => (
                      <span key={index} className="bg-barsky-bg-light px-4 py-2 rounded-full text-barsky-text text-sm shadow-sm border">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-barsky-bg-light">
          <div className="section-container">
            <h2 className="text-3xl font-bold text-center mb-12 text-barsky-dark">What I Do</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4 text-barsky-dark">UX/UI Design</h3>
                  <p className="text-barsky-text">
                    Creating intuitive and engaging user interfaces that prioritize user experience 
                    and drive business results.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4 text-barsky-dark">Mobile App Design</h3>
                  <p className="text-barsky-text">
                    Designing mobile applications that provide seamless experiences across 
                    iOS and Android platforms.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold mb-4 text-barsky-dark">Web Development</h3>
                  <p className="text-barsky-text">
                    Building responsive websites and web applications using modern technologies 
                    like React and TypeScript.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold mb-6 text-barsky-dark">Let's Work Together</h2>
            <p className="text-xl text-barsky-text mb-8 max-w-2xl mx-auto">
              Ready to bring your digital vision to life? I'm here to help you create 
              exceptional user experiences that drive results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get In Touch
              </a>
              <a href="/projects" className="btn-outline">
                View My Work
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
