import React from "react";
import cityNight from "@/assets/hero-city-night.png";
import cityDay from "@/assets/hero-city-day.png";

/**
 * City skyline silhouette (live scene). Uses AI-generated panoramic PNGs with
 * transparent backgrounds. Seamless loop is achieved by mirroring the second
 * tile, so buildings never get cut at the wrap boundary.
 * Day/night crossfade is handled by .parallax-mountains CSS based on .is-day.
 */
const CitySilhouette: React.FC = () => {
  const renderTiles = (src: string, alt: string) => (
    <>
      <img src={src} alt={alt} draggable={false} />
      <img src={src} alt="" aria-hidden className="is-mirrored" draggable={false} />
    </>
  );

  return (
    <>
      {/* NIGHT */}
      <div className="parallax-mountains" data-silhouette="city">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(cityNight, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(cityNight, "City skyline at night")}
        </div>
      </div>

      {/* DAY */}
      <div
        className="parallax-mountains parallax-mountains-day"
        data-silhouette="city"
      >
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(cityDay, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(cityDay, "City skyline in daylight")}
        </div>
      </div>
    </>
  );
};

export default CitySilhouette;
