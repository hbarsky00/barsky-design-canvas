import React from "react";
import palmsNight from "@/assets/hero-palms-night.png";
import palmsDay from "@/assets/hero-palms-day.png";

const PalmsSilhouette: React.FC = () => {
  const renderTiles = (src: string, alt: string) => (
    <>
      <img src={src} alt={alt} draggable={false} />
      <img src={src} alt="" aria-hidden className="is-mirrored" draggable={false} />
    </>
  );

  return (
    <>
      <div className="parallax-mountains" data-silhouette="palms">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(palmsNight, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(palmsNight, "Tropical island with palm trees at night")}
        </div>
      </div>
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="palms">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(palmsDay, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(palmsDay, "Tropical island with palm trees in daylight")}
        </div>
      </div>
    </>
  );
};

export default PalmsSilhouette;
