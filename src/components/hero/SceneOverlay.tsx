import React from "react";
import type { Scene } from "./scenes";

type Props = { scene: Scene };

/**
 * Per-scene decorative overlay: sun/moon arc + occasional plane/helicopter.
 * Sits ABOVE the flat scene image and BELOW the content. Pure CSS animation,
 * no JS timers, no body-level state. Respects prefers-reduced-motion via CSS.
 */
const SceneOverlay: React.FC<Props> = ({ scene }) => {
  return (
    <div className="parallax-overlay" aria-hidden>
      {scene.celestial === "sun" && (
        <div className="overlay-celestial overlay-sun">
          <span className="overlay-sun-body" />
        </div>
      )}
      {scene.celestial === "moon" && (
        <div className="overlay-celestial overlay-moon">
          <span className="overlay-moon-body" />
        </div>
      )}

      {scene.aircraft && (
        <>
          <svg
            className="overlay-aircraft overlay-plane"
            viewBox="0 0 64 16"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M2 8 L40 6 L52 2 L56 2 L50 7 L60 7 L62 9 L50 9 L56 14 L52 14 L40 10 L2 8 Z"
              fill="currentColor"
              opacity="0.85"
            />
          </svg>
          <svg
            className="overlay-aircraft overlay-heli"
            viewBox="0 0 64 24"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* rotor */}
            <rect x="14" y="3" width="36" height="1.5" fill="currentColor" opacity="0.7" />
            <rect x="31" y="4" width="2" height="4" fill="currentColor" opacity="0.85" />
            {/* body */}
            <path
              d="M12 12 Q20 8 34 8 L44 8 Q50 8 52 12 Q52 16 44 16 L20 16 Q12 16 12 12 Z"
              fill="currentColor"
              opacity="0.9"
            />
            {/* tail */}
            <rect x="44" y="11" width="16" height="2" fill="currentColor" opacity="0.85" />
            <path d="M58 9 L62 12 L58 15 Z" fill="currentColor" opacity="0.85" />
            {/* skid */}
            <rect x="18" y="18" width="28" height="1.5" fill="currentColor" opacity="0.7" />
          </svg>
        </>
      )}
    </div>
  );
};

export default SceneOverlay;
