import React from "react";
import oceanNight from "@/assets/hero-ocean-night.png";
import oceanDay from "@/assets/hero-ocean-day.png";

/**
 * Ocean silhouette (live scene). AI-generated panoramic transparent PNGs.
 * Same structure as MountainsSilhouette — back/front drift, mirrored tile
 * for seamless loop, day/night crossfade via .is-day on parent.
 */
const OceanSilhouette: React.FC = () => {
  const renderTiles = (src: string, alt: string) => (
    <>
      <img src={src} alt={alt} draggable={false} />
      <img src={src} alt="" aria-hidden className="is-mirrored" draggable={false} />
    </>
  );

  return (
    <>
      {/* NIGHT */}
      <div className="parallax-mountains" data-silhouette="ocean">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(oceanNight, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(oceanNight, "Ocean waves at night")}
        </div>
      </div>

      {/* DAY */}
      <div
        className="parallax-mountains parallax-mountains-day"
        data-silhouette="ocean"
      >
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(oceanDay, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(oceanDay, "Ocean waves in daylight")}
        </div>
      </div>
    </>
  );
};

export default OceanSilhouette;
