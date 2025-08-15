
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import BlogPreview from '@/components/blog/BlogPreview';
import SEO from '@/components/seo/SEO';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        type="website"
        title="Contact Hiram Barsky - AI Design Consultation"
        description="Get in touch for AI-enhanced product design services. Specializing in intelligent web applications and AI-powered user interfaces."
        url="https://barskydesign.pro/contact"
      />
      
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-12 dark:bg-gray-900">
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
