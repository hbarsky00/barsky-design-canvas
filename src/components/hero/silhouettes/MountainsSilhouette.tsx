import React from "react";
import mountainsNight from "@/assets/hero-mountains-night.png";
import mountainsDay from "@/assets/hero-mountains-day.png";

/**
 * Mountains silhouette (live scene). Uses AI-generated panoramic PNGs with
 * transparent backgrounds. Seamless loop is achieved by mirroring the second
 * tile, so peaks never get cut at the wrap boundary.
 * Day/night crossfade is handled by .parallax-mountains CSS based on .is-day.
 */
const MountainsSilhouette: React.FC = () => {
  const renderTiles = (src: string, alt: string) => (
    <>
      <img src={src} alt={alt} draggable={false} />
      <img src={src} alt="" aria-hidden className="is-mirrored" draggable={false} />
    </>
  );

  return (
    <>
      {/* NIGHT */}
      <div className="parallax-mountains" data-silhouette="mountains">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(mountainsNight, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(mountainsNight, "Mountain range at night")}
        </div>
      </div>

      {/* DAY */}
      <div
        className="parallax-mountains parallax-mountains-day"
        data-silhouette="mountains"
      >
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(mountainsDay, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(mountainsDay, "Mountain range in daylight")}
        </div>
      </div>
    </>
  );
};

export default MountainsSilhouette;
