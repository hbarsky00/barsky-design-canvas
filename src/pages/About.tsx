
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About Hiram Barsky | Professional UX/UI Designer & Frontend Developer | Design Philosophy</title>
        <meta name="description" content="Learn about Hiram Barsky, a professional UX/UI designer and frontend developer with 5+ years of experience. Discover my design philosophy, approach to user-centered design, and passion for creating exceptional digital experiences." />
        <meta name="keywords" content="about Hiram Barsky, UX designer background, UI designer experience, design philosophy, user-centered design, frontend developer, product designer story" />
        <link rel="canonical" href="https://barskydesign.pro/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About Hiram Barsky | Professional UX/UI Designer & Developer" />
        <meta property="og:description" content="Learn about Hiram Barsky's design philosophy and approach to creating exceptional user experiences." />
        <meta property="og:url" content="https://barskydesign.pro/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Hiram Barsky | Professional UX/UI Designer" />
        <meta name="twitter:description" content="Learn about my design philosophy and approach to user-centered design." />
        <meta name="twitter:image" content="https://barskydesign.pro/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png" />
        
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
                "description": "Professional UX/UI designer and frontend developer with 5+ years of experience creating exceptional digital experiences",
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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <p className="text-center text-gray-600">Learn more about our design philosophy and approach.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
