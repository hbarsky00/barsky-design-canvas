import React from "react";
import coastlineNight from "@/assets/hero-coastline-night.png";
import coastlineDay from "@/assets/hero-coastline-day.png";

const CoastlineSilhouette: React.FC = () => {
  const renderTiles = (src: string, alt: string) => (
    <>
      <img src={src} alt={alt} draggable={false} />
      <img src={src} alt="" aria-hidden className="is-mirrored" draggable={false} />
    </>
  );

  return (
    <>
      <div className="parallax-mountains" data-silhouette="coastline">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(coastlineNight, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(coastlineNight, "Rocky coastline cliffs at night")}
        </div>
      </div>
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="coastline">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {renderTiles(coastlineDay, "")}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {renderTiles(coastlineDay, "Rocky coastline cliffs in daylight")}
        </div>
      </div>
    </>
  );
};

export default CoastlineSilhouette;
