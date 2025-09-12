import React from "react";
import { IdeationIteration } from "@/data/structuredCaseStudies";
import MaximizableImage from "../project/MaximizableImage";

interface IterationsSectionProps {
  iterations: IdeationIteration[];
}

const IterationsSection: React.FC<IterationsSectionProps> = ({ iterations }) => {
  return (
    <section 
      className="section-snap scroll-mt-[calc(var(--header-height,64px)+1rem)] py-4"
      aria-labelledby="iterations-heading"
    >
      <h2 id="iterations-heading" className="sr-only">
        Design Iterations Section
      </h2>
      
      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {iterations.slice(0, 4).map((iteration, index) => (
            <div 
              key={index}
              id={`iteration-${index + 1}`}
              data-section={`iteration-${index + 1}`}
              className="space-y-3"
            >
              <div className="text-xs tracking-widest uppercase text-neutral-500 font-medium text-center">
                {iteration.label}
              </div>
              <div className="max-w-full">
                <MaximizableImage
                  src={iteration.imageSrc}
                  alt={iteration.alt}
                  imageList={iterations.map(iter => iter.imageSrc)}
                  currentIndex={index}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IterationsSection;