import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactInformation from "@/components/contact/ContactInformation";
import ContactForm from "@/components/contact/ContactForm";
import BlogPreview from "@/components/blog/BlogPreview";

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Header />
      <main className="flex-grow pt-[calc(var(--header-height,64px)+24px)] pb-12">
        <section className="px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Let's build something together
              </h1>
              <p className="mt-2 text-muted-foreground text-sm md:text-base">
                Project, collaboration, or just want to say hi — pick the channel that works for you.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden">
              <div className="grid md:grid-cols-[1fr_1.2fr]">
                <div className="p-6 md:p-8 bg-gradient-to-br from-primary/5 via-white to-purple-50 border-b md:border-b-0 md:border-r border-border/60">
                  <ContactInformation />
                </div>
                <div className="p-6 md:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12">
          <BlogPreview />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
