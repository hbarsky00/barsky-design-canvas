
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactInformation from '@/components/contact/ContactInformation';
import ContactForm from '@/components/contact/ContactForm';
import BlogPreview from '@/components/blog/BlogPreview';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        <section className="py-12 dark:bg-gray-900">
          <div className="section-container">
            <h1 className="text-section-title text-center mb-16">Get In Touch</h1>
            
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
