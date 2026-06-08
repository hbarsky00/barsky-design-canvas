import React from "react";

/**
 * Mountains silhouette (live scene). Renders both night and day versions.
 * Day/night crossfade is handled by .parallax-mountains CSS based on .is-day.
 * Sticks to the hero-scene-swap contract: back+front, each tiled twice, unique gradient ids.
 */
const MountainsSilhouette: React.FC = () => {
  // Dramatic peaks, viewBox 0 0 1200 260
  const backPath =
    "M0,260 L0,200 L120,150 L210,185 L340,90 L450,170 L590,115 L720,165 L860,80 L980,170 L1100,125 L1200,180 L1200,260 Z";
  const frontPath =
    "M0,260 L0,215 L150,140 L260,180 L390,55 L520,170 L660,100 L790,180 L930,45 L1070,170 L1200,135 L1200,260 Z";

  // Snow cap triangles for the 4 tallest peaks (back: 340,860 — front: 390,930)
  const snowFront = (
    <g>
      <polygon points="370,80 390,55 410,80 405,90 395,82 385,90" fill="#ffffff" opacity="0.9" />
      <polygon points="910,72 930,45 950,72 945,82 935,72 925,82" fill="#ffffff" opacity="0.9" />
      <polygon points="245,160 260,180 275,160" fill="#ffffff" opacity="0.75" />
      <polygon points="775,160 790,180 805,160" fill="#ffffff" opacity="0.75" />
    </g>
  );
  const snowBack = (
    <g>
      <polygon points="325,108 340,90 355,108" fill="#ffffff" opacity="0.7" />
      <polygon points="845,98 860,80 875,98" fill="#ffffff" opacity="0.7" />
    </g>
  );

  return (
    <>
      {/* NIGHT */}
      <div className="parallax-mountains" data-silhouette="mountains">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`mtnb-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a1838" />
                  <stop offset="100%" stopColor="#120a1c" />
                </linearGradient>
              </defs>
              <path d={backPath} fill={`url(#mtnb-grad-${i})`} />
              {snowBack}
            </svg>
          ))}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`mtnf-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15101c" />
                  <stop offset="100%" stopColor="#050308" />
                </linearGradient>
              </defs>
              <path d={frontPath} fill={`url(#mtnf-grad-${i})`} />
              {snowFront}
            </svg>
          ))}
        </div>
      </div>

      {/* DAY */}
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="mountains">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`mtnbd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9ec5e8" />
                  <stop offset="100%" stopColor="#4f7fa8" />
                </linearGradient>
              </defs>
              <path d={backPath} fill={`url(#mtnbd-grad-${i})`} />
              {snowBack}
            </svg>
          ))}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`mtnfd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a6f9c" />
                  <stop offset="100%" stopColor="#1c3a5e" />
                </linearGradient>
              </defs>
              <path d={frontPath} fill={`url(#mtnfd-grad-${i})`} />
              {snowFront}
            </svg>
          ))}
        </div>
      </div>
    </>
  );
};

export default MountainsSilhouette;
