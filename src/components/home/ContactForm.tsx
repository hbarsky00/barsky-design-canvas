import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import ContactForm from "@/components/contact/ContactForm";

/**
 * The homepage contact section.
 *
 * This used to be its own 127-line form that submitted through
 * `supabase.functions.invoke('send-contact-email')`. That endpoint is gone —
 * ctqttomppgkjbjkckise.supabase.co does not resolve on 8.8.8.8 or 1.1.1.1, and
 * a POST to it fails to connect. It is the same dead Supabase project that
 * swallowed a month of enquiries before; the August 2026 migration to Netlify
 * Forms fixed /contact and never touched this copy, so the form on the page
 * most visitors actually land on has been posting into nothing ever since.
 *
 * There is now one contact form, not two that can drift apart: the /contact
 * one, which posts url-encoded to "/" with a form-name field and is the path
 * verified working end to end.
 */
const HomeContactForm: React.FC = () => (
  <section
    id="contact"
    className="min-h-screen flex flex-col justify-center py-8 md:py-12 bg-muted/30 relative"
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <SectionHeader
        as="h2"
        title="Get in Touch"
        subtitle="Tell me what you're working on and where it's stuck. Short messages are fine."
      />
      <div className="max-w-2xl mx-auto">
        <ContactForm showHeading={false} />
      </div>
    </div>
  </section>
);

export default HomeContactForm;
