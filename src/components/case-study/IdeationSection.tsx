import React from "react";
import { IdeationSection as IdeationSectionType } from "@/data/structuredCaseStudies";

interface IdeationSectionProps {
  ideationData: IdeationSectionType;
}

const IdeationSection: React.FC<IdeationSectionProps> = ({ ideationData }) => {
  return (
    <section id="ideation" className="section-spacing">
      <div className="mx-auto max-w-[1120px] px-6 md:px-10">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-eyebrow text-neutral-700 header-spacing">
            IDEATION
          </span>
          <h2 className="text-section-title max-w-[72ch] mx-auto text-center">
            Multiple iterations
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-[72ch] mx-auto content-spacing text-center">
            {ideationData.subhead}
          </p>
        </div>

        {/* Focus bubbles */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {ideationData.bubbles.map((bubble, index) => (
            <div
              key={index}
              className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-none h-full"
            >
              <div className="text-subsection-title">{bubble.title}</div>
              <div className="text-sm text-neutral-600">{bubble.description}</div>
            </div>
          ))}
        </div>

        {/* Iterations gallery */}
        <div className="mt-10 md:mt-14 rounded-[24px] bg-neutral-50 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x md:snap-none snap-mandatory -mx-5 px-5 md:mx-0 md:px-0">
            {ideationData.iterations.map((iteration, index) => (
              <div key={index} className="snap-start min-w-[72%] md:min-w-0">
                <div className="text-[11px] tracking-widest uppercase text-neutral-500 mb-3">
                  {iteration.label}
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-white p-3 md:p-4">
                  <img
                    src={iteration.imageSrc}
                    alt={iteration.alt}
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeationSection;