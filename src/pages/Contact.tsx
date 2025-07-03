
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import BlogPreview from '@/components/blog/BlogPreview';
import EnhancedGlobalSeo from '@/components/seo/EnhancedGlobalSeo';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <EnhancedGlobalSeo 
        title="Contact Hiram Barsky | UX/UI Designer & Gen AI Developer | AI Web App Consultation"
        description="Get in touch with Hiram Barsky for UX/UI design and Gen AI integration services. Specializing in intelligent web applications, AI-powered interfaces, and user-centered design solutions with cutting-edge AI capabilities."
        canonicalUrl="https://barskydesign.pro/contact"
        pageType="content"
        keywords={[
          "contact UX UI designer", "hire Gen AI developer", "AI web app consultant",
          "UX designer with AI experience", "AI integration services", "Gen AI design consultation",
          "intelligent web application design", "AI UX consultant", "generative AI developer hire"
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Hiram Barsky - UX/UI Design & Gen AI Development Services",
          "description": "Contact page for UX/UI design and Gen AI integration services, specializing in intelligent web applications",
          "url": "https://barskydesign.pro/contact",
          "mainEntity": {
            "@type": "Person",
            "name": "Hiram Barsky",
            "jobTitle": "UX/UI Product Designer & Gen AI Developer",
            "email": "hbarsky01@gmail.com",
            "telephone": "+1-201-668-4754",
            "url": "https://barskydesign.pro",
            "knowsAbout": [
              "UX/UI Product Design",
              "Gen AI Integration", 
              "Intelligent Web Applications",
              "AI-Powered User Interfaces",
              "ChatGPT Integration",
              "Claude AI",
              "React Development"
            ]
          }
        }}
      />
      
      <Header />
      <main className="flex-grow pt-24">
        <section className="py-20 dark:bg-gray-900">
          <div className="section-container">
            <h1 className="section-title mb-16">Get In Touch</h1>
            
            <div className="grid md:grid-cols-2 gap-12">
              <ContactInformation />
              <ContactForm />
            </div>
          </div>
        </section>
        
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
