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

  // Snow caps — single triangles only (see skill://snow-caps-on-peaks).
  // Apex sits exactly on each front peak; base points walk down the actual
  // slopes. Small natural variations: slightly asymmetric base depth per side
  // so caps don't look stamped. Stroke adds a crisp edge for daytime contrast.
  const snowFront = (
    <g
      fill="#ffffff"
      fillOpacity="0.96"
      stroke="#dbe6f1"
      strokeWidth="0.6"
      strokeLinejoin="round"
    >
      {/* Left summit (390,55). Left slope -> (260,180), right slope -> (520,170).
          Left depth 20, right depth 24 — gentle asymmetry. */}
      <polygon points="369.2,75 390,55 413.8,79" />
      {/* Right summit (930,45). Left slope -> (790,180), right slope -> (1070,170).
          Left depth 24, right depth 18 — cap leans slightly left. */}
      <polygon points="904.1,69 930,45 950.2,63" />
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
