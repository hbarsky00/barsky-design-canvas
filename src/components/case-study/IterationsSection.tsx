import React from "react";
import { IdeationIteration } from "@/data/structuredCaseStudies";
import AnnotatedImage from "./AnnotatedImage";

interface IterationsSectionProps {
  iterations: IdeationIteration[];
}

const IterationsSection: React.FC<IterationsSectionProps> = ({ iterations }) => {
  return (
    <>
      {iterations.slice(0, 4).map((iteration, index) => (
        <section 
          key={index}
          id={`iteration-${index + 1}`}
          data-section={`iteration-${index + 1}`}
          aria-labelledby={`iteration-${index + 1}-heading`}
          className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)] py-8"
        >
          <h2 id={`iteration-${index + 1}-heading`} className="sr-only">
            {iteration.label} Section
          </h2>
          
          <div className="section-container">
            <div className="text-xs tracking-widest uppercase text-neutral-500 mb-6 font-medium text-center">
              {iteration.label}
            </div>
            <div className="max-w-4xl mx-auto">
              <AnnotatedImage
                src={iteration.imageSrc}
                alt={iteration.alt}
                annotations={iteration.annotations}
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default IterationsSection;