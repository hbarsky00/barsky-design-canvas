import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { testimonials } from "@/data/testimonials";

/**
 * Word of mouth — the section carried over from barsky.design.
 *
 * Deliberately quiet: a rule above the attribution rather than a card with a
 * border on four sides, no avatars, no star ratings. The names are the proof,
 * and dressing them up reads as though they need help.
 */
const WordOfMouthSection: React.FC = () => (
  <div className="container mx-auto px-4 max-w-6xl">
    <SectionHeader
      eyebrow="Word of Mouth"
      title="What people say."
      subtitle="People I've worked with, in their words."
    />
    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
      {testimonials.map((t) => (
        <li
          key={t.name}
          className="flex flex-col justify-between rounded-xs border border-border bg-card p-6"
        >
          <blockquote className="text-base leading-relaxed text-muted-foreground">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <footer className="mt-5 border-t border-border pt-4">
            <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{t.title}</p>
          </footer>
        </li>
      ))}
    </ul>
  </div>
);

export default WordOfMouthSection;
