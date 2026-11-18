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
/* No id on the <section> below. HomepageLayout already wraps this component in
   <section id="contact" tabIndex={-1} class="scroll-offset">, and that wrapper
   is the one the six getElementById("contact") call sites and the #contact
   anchors are meant to land on. Two elements sharing an id is invalid HTML, and
   here the inner one was shadowing the wrapper that carries the focus target.
   Scroll position is unchanged: the wrapper has no padding of its own and this
   section is its only child, so both elements start at the same Y.

   This component has no other call site — /contact renders
   components/contact/ContactForm directly and never had an id="contact". */
const HomeContactForm: React.FC = () => (
  <section className="min-h-screen flex flex-col justify-center py-8 md:py-12 bg-muted/30 relative">
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
