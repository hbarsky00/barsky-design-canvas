import React from "react";
import { motion } from "framer-motion";

export type NarrativeBlock =
  | { type: "hook"; text: string }
  | { type: "header"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "image"; src: string; alt: string }
  | { type: "image-pair"; images: { src: string; alt: string }[] }
  | { type: "divider" };

interface Props {
  blocks: NarrativeBlock[];
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const ImageFigure: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <figure className="space-y-3">
    <div className="overflow-hidden rounded-2xl border border-border/40 shadow-sm bg-white">
      <MaximizableImage
        src={src}
        alt={alt}
        className="w-full h-auto object-contain image-high-quality"
      />
    </div>
    {alt && (
      <figcaption className="text-sm italic text-muted-foreground text-center max-w-2xl mx-auto">
        {alt}
      </figcaption>
    )}
  </figure>
);

const CaseStudyNarrative: React.FC<Props> = ({ blocks }) => {
  return (
    <section
      id="story"
      data-section="story"
      aria-labelledby="story-heading"
      className="scroll-mt-[calc(var(--header-height,64px)+1rem)]"
    >
      <h2 id="story-heading" className="sr-only">Case study</h2>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 md:space-y-14">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "hook":
              return (
                <motion.p
                  key={i}
                  {...fadeUp}
                  className="text-2xl md:text-3xl font-light leading-snug text-foreground max-w-3xl"
                >
                  {block.text}
                </motion.p>
              );
            case "header":
              return (
                <motion.h3
                  key={i}
                  {...fadeUp}
                  className="text-2xl md:text-3xl font-bold tracking-tight text-foreground pt-2"
                >
                  {block.text}
                </motion.h3>
              );
            case "paragraph":
              return (
                <motion.p
                  key={i}
                  {...fadeUp}
                  className="text-lg md:text-[1.125rem] leading-[1.7] text-muted-foreground max-w-[68ch]"
                >
                  {block.text}
                </motion.p>
              );
            case "bullets":
              return (
                <motion.ul
                  key={i}
                  {...fadeUp}
                  className="space-y-2.5 text-lg leading-[1.6] text-muted-foreground max-w-[68ch] list-disc pl-6 marker:text-foreground/40"
                >
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </motion.ul>
              );
            case "image":
              return (
                <motion.div key={i} {...fadeUp}>
                  <ImageFigure src={block.src} alt={block.alt} />
                </motion.div>
              );
            case "image-pair":
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
                >
                  {block.images.map((img, j) => (
                    <ImageFigure key={j} src={img.src} alt={img.alt} />
                  ))}
                </motion.div>
              );
            case "divider":
              return (
                <div
                  key={i}
                  aria-hidden
                  className="py-2 md:py-4 flex items-center justify-center"
                >
                  <span className="h-px w-16 bg-border/60" />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default CaseStudyNarrative;
