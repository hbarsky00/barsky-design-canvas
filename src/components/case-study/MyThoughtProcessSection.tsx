import React from "react";
import { motion } from "framer-motion";
import MaximizableImage from "@/components/project/MaximizableImage";
import AnnotatedImage from "./AnnotatedImage";
import ProjectVideo from "@/components/project/ProjectVideo";
import { ImageAnnotation } from "@/data/structuredCaseStudies";

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
  annotations?: ImageAnnotation[];
}

interface MyThoughtProcessSectionProps {
  content: string;
  video?: {
    src: string;
    title: string;
    caption?: string;
  };
  images?: ImageItem[];
}

// Render a line with **bold** and *italic* markers
const renderInline = (text: string, keyPrefix: string) => {
  // Split by ** first (bold), then within each segment by * (italic)
  const parts: React.ReactNode[] = [];
  const boldSplit = text.split(/(\*\*[^*]+\*\*)/g);
  boldSplit.forEach((seg, i) => {
    if (/^\*\*[^*]+\*\*$/.test(seg)) {
      parts.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-foreground">
          {seg.slice(2, -2)}
        </strong>
      );
    } else {
      const italicSplit = seg.split(/(\*[^*\n]+\*)/g);
      italicSplit.forEach((s, j) => {
        if (/^\*[^*\n]+\*$/.test(s)) {
          parts.push(
            <em key={`${keyPrefix}-i-${i}-${j}`} className="italic text-foreground/90">
              {s.slice(1, -1)}
            </em>
          );
        } else if (s) {
          parts.push(<React.Fragment key={`${keyPrefix}-t-${i}-${j}`}>{s}</React.Fragment>);
        }
      });
    }
  });
  return parts;
};

// Pull a step number out of "**Step 3 — ..." or similar
const getStepNumber = (text: string): number | null => {
  const m = text.match(/^\*\*Step\s+(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
};

const getStepFromAlt = (alt: string): number | null => {
  const m = alt.match(/Step\s+(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
};

const renderBlock = (block: string, key: string) => {
  const lines = block.split("\n");
  return (
    <div key={key} className="space-y-2">
      {lines.map((line, idx) => {
        if (!line.trim()) return null;
        const isCallout = line.trim().startsWith("*Design decision:");
        return (
          <p
            key={`${key}-l-${idx}`}
            className={
              isCallout
                ? "text-base md:text-lg text-foreground/80 italic border-l-2 border-primary/40 pl-4"
                : "text-base md:text-lg text-muted-foreground leading-relaxed"
            }
          >
            {renderInline(line, `${key}-l-${idx}`)}
          </p>
        );
      })}
    </div>
  );
};

const MyThoughtProcessSection: React.FC<MyThoughtProcessSectionProps> = ({
  content,
  video,
  images = [],
}) => {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  // Map images by step number for interleaving (supports multiple images per step)
  const imagesByStep = new Map<number, ImageItem[]>();
  const unmatchedImages: ImageItem[] = [];
  images.forEach((img) => {
    const n = getStepFromAlt(img.alt);
    if (n != null) {
      const arr = imagesByStep.get(n) ?? [];
      arr.push(img);
      imagesByStep.set(n, arr);
    } else {
      unmatchedImages.push(img);
    }
  });

  const renderImage = (img: ImageItem, key: string) => (
    // The images sit inside content-rail-left, which is max-w-[72ch] — a prose
    // measure, about 700px. Fine for a screenshot beside a paragraph, far too
    // narrow for the 4-across-by-2-down composites (2408x2506): the phone
    // screens inside become unreadable. Those break out of the reading rail to
    // 80% of the section, centred, and stay in the rail otherwise.
    <div
      key={key}
      className={
        /mobile-grid-8up|-grid-|four-panel/.test(img.src)
          ? "my-6 w-screen relative left-1/2 -ml-[50vw] px-4 sm:px-6"
          : "my-6"
      }
    >
      {img.annotations && img.annotations.length > 0 ? (
        <AnnotatedImage
          src={img.src}
          alt={img.alt}
          annotations={img.annotations}
          // The composites carry annotations, so they take this branch, not the
          // MaximizableImage one below — without the same cap the breakout runs
          // edge to edge instead of the 80% it is meant to be.
          className={
            /mobile-grid-8up|-grid-|four-panel/.test(img.src)
              ? "mx-auto w-full lg:w-4/5 rounded-lg"
              : "w-full rounded-lg"
          }
        />
      ) : (
        <MaximizableImage
          src={img.src}
          alt={img.alt}
          caption={img.caption}
          className={
            /mobile-grid-8up|-grid-|four-panel/.test(img.src)
              ? "mx-auto w-full lg:w-4/5 rounded-lg"
              : "w-full rounded-lg"
          }
        />
      )}
    </div>
  );

  return (
    <section className="section-snap py-12 md:py-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-eyebrow text-neutral-700 header-spacing">
              APPROACH & DECISION MAKING
            </div>
            <h2 className="text-section-title font-display content-rail-center">
              My Thought Process
            </h2>
          </div>

          {video && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <ProjectVideo
                src={video.src}
                title={video.title}
                caption={video.caption}
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>
          )}

          <div className="content-rail-left space-y-8">
            {blocks.map((block, idx) => {
              const stepNum = getStepNumber(block);
              const matchedImgs = stepNum != null ? imagesByStep.get(stepNum) : undefined;
              return (
                <div key={`block-${idx}`} className="space-y-4">
                  {renderBlock(block, `block-${idx}`)}
                  {matchedImgs && matchedImgs.map((img, i) => renderImage(img, `img-${idx}-${i}`))}
                </div>
              );
            })}

            {unmatchedImages.length > 0 && (
              <div className="space-y-6">
                {unmatchedImages.map((img, i) => renderImage(img, `extra-${i}`))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MyThoughtProcessSection;
