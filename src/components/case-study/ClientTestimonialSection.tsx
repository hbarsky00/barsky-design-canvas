import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { ClientTestimonial } from "@/data/structuredCaseStudies";

interface ClientTestimonialSectionProps {
  testimonial: ClientTestimonial;
}

const ClientTestimonialSection: React.FC<ClientTestimonialSectionProps> = ({ testimonial }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Quote className="w-8 h-8 text-primary" />
          </div>
          
          <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8 italic">
            "{testimonial.quote}"
          </blockquote>
          
          <div className="flex items-center justify-center space-x-4">
            {testimonial.avatar && (
              <img
                src={testimonial.avatar}
                alt={`${testimonial.author} profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div className="text-left">
              <div className="font-semibold text-foreground">{testimonial.author}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.title} at {testimonial.company}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientTestimonialSection;