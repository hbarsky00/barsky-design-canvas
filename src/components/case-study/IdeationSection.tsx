import React from "react";
import { IdeationSection as IdeationSectionType } from "@/data/structuredCaseStudies";
import { Badge } from "@/components/ui/badge";

interface IdeationSectionProps {
  ideationData: IdeationSectionType;
}

const IdeationSection: React.FC<IdeationSectionProps> = ({ ideationData }) => {
  return (
    <section 
      id="ideation"
      data-section="ideation"
      className="section-spacing scroll-mt-[calc(var(--header-height,64px)+1rem)]"
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center">
          <Badge variant="outlined" className="mb-4">
            IDEATION
          </Badge>
          <h2 className="text-section-title content-rail-center">
            Multiple iterations
          </h2>
          <p className="text-base text-neutral-600 content-spacing max-w-[65ch] mx-auto">
            {ideationData.subhead}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ideationData.bubbles.map((bubble, index) => (
            <div
              key={index}
              className="group bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm h-full transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md hover:border-neutral-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              tabIndex={0}
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="outlined" className="text-xs font-medium">
                  {index + 1}
                </Badge>
              </div>
              <h3 className="text-subsection-title mb-3 text-left">
                {bubble.title}
              </h3>
              <p className="text-base text-neutral-700 leading-relaxed text-left">
                {bubble.description}
              </p>
            </div>
          ))}
        </div>

        {/* Iterations Gallery */}
        <div className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {ideationData.iterations.slice(0, 4).map((iteration, index) => (
              <div key={index}>
                <div className="text-xs tracking-widest uppercase text-neutral-500 mb-3 font-medium">
                  {iteration.label}
                </div>
                <img
                  src={iteration.imageSrc}
                  alt={iteration.alt}
                  className="w-full h-auto rounded-lg"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeationSection;