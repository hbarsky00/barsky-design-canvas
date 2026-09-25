import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ServicePageContent } from "@/data/serviceContent";

/**
 * Renders a long-form service page.
 *
 * The three /design-services/* pages were an h1, one line, and three sections of a
 * single sentence each — 169 to 182 words, against an 800-word baseline for a
 * commercial landing page. This renders the real content, including the citable
 * answer passage and the internal links those pages never had.
 */
const ServiceDetail: React.FC<{ content: ServicePageContent }> = ({ content }) => (
  <div className="container mx-auto px-4 py-8">
    <header className="max-w-3xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 text-foreground">{content.title}</h1>
      <p className="text-lg text-muted-foreground leading-relaxed">{content.standfirst}</p>
    </header>

    {/* The answer passage. Self-contained on purpose: this is the block an answer
        engine can quote without needing the rest of the page. */}
    <div className="max-w-3xl mx-auto mb-14">
      <p className="text-lg leading-relaxed text-foreground border-l-4 border-primary pl-6 py-2">
        {content.answer}
      </p>
    </div>

    <div className="max-w-3xl mx-auto space-y-14">
      {content.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">{section.heading}</h2>
          <div className="space-y-4">
            {section.body.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          {section.bullets && (
            <ul className="mt-6 space-y-3">
              {section.bullets.map((b) => (
                <li key={b.label} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-semibold">{b.label}</strong> — {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section id="related-work">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">Related work</h2>
        <ul className="space-y-3">
          {content.work.map((l) => (
            <li key={l.href} className="leading-relaxed">
              <Link to={l.href} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                {l.label}
              </Link>
              <span className="text-muted-foreground"> — {l.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="related-reading">
        <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">Related reading</h2>
        <ul className="space-y-3">
          {content.reading.map((l) => (
            <li key={l.href} className="leading-relaxed">
              <Link to={l.href} className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80">
                {l.label}
              </Link>
              <span className="text-muted-foreground"> — {l.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="next" className="border-t border-border pt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Start with a call</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Tell me what you are building and what is in the way. If it is not a fit I will
          say so on the call, and if I know someone better suited I will point you at them.
        </p>
        <Button asChild variant="brand" size="lg">
          <Link to="/contact" className="flex items-center justify-center">
            Get in touch
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </div>
  </div>
);

export default ServiceDetail;
