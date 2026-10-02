import React from "react";
import { IdeationIteration } from "@/data/structuredCaseStudies";
import MaximizableImage from "../project/MaximizableImage";

interface IterationsSectionProps {
  iterations?: IdeationIteration[];
}

const IterationsSection: React.FC<IterationsSectionProps> = ({ iterations }) => {
  // Return null if no iterations provided
  if (!iterations || iterations.length === 0) {
    return null;
  }
  return (
    <section 
      className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)] py-4"
      aria-labelledby="iterations-heading"
    >
      <h2 id="iterations-heading" className="sr-only">
        Design Iterations Section
      </h2>
      
      <div className="w-full px-4 md:px-8">
        {/* The grid is built for a pair of iterations. With one, it parked the
            image in the left column while every other board on the page centred
            on the rail — on /project/email-creation-ai that put the
            low-fidelity board 292px left of the rest. */}
        <div className={iterations.length === 1 ? "flex justify-center" : "case-study-image-grid"}>
          {iterations.slice(0, 4).map((iteration, index) => (
            <div 
              key={index}
              id={`iteration-${index + 1}`}
              data-section={`iteration-${index + 1}`}
              className="case-study-image-container"
            >
              <div className="text-xs tracking-widest uppercase text-neutral-500 font-medium text-center mb-3 px-4">
                {iteration.label}
              </div>
              <MaximizableImage
                src={iteration.imageSrc}
                alt={iteration.alt}
                annotations={iteration.annotations}
                imageList={iterations.map(iter => iter.imageSrc)}
                currentIndex={index}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IterationsSection;