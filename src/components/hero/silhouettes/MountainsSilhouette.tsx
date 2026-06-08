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

  // Snow caps — single triangles, apex exactly at peak, base points walked
  // down the actual slopes so the cap sits ON the mountain. Front layer only
  // (back is blurred/dim and freestanding triangles look floaty there).
  // Front peaks: (390,55) between (260,180)->(520,170); (930,45) between (790,180)->(1070,170).
  const snowFront = (
    <g fill="#ffffff" opacity="0.92">
      {/* Left summit cap, depth 22 */}
      <polygon points="367.1,77 390,55 412.4,77" />
      {/* Right summit cap, depth 22 */}
      <polygon points="909.3,67 930,45 951.7,67" />
    </g>
  );
  // Back layer stays bare — see skill://snow-caps-on-peaks
  const snowBack = null;


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
