import React, { Suspense, lazy } from "react";

const WebGLCityLayer = lazy(() => import("./WebGLCityLayer"));

/**
 * City skyline silhouette rendered via WebGL/Three.js (procedural).
 * Keeps the .parallax-mountains slot structure so positioning, day/night
 * crossfade (CSS opacity), and parallax mouse/scroll offsets all behave
 * exactly like the previous PNG version.
 */
const CitySilhouette: React.FC = () => {
  return (
    <>
      {/* NIGHT */}
      <div className="parallax-mountains" data-silhouette="city">
        <div className="parallax-mountains-back" style={{ position: "absolute", left: 0, width: "100%" }}>
          <Suspense fallback={null}>
            <WebGLCityLayer day={0} variant="back" />
          </Suspense>
        </div>
        <div className="parallax-mountains-front" style={{ position: "absolute", left: 0, width: "100%" }}>
          <Suspense fallback={null}>
            <WebGLCityLayer day={0} variant="front" />
          </Suspense>
        </div>
      </div>

      {/* DAY */}
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="city">
        <div className="parallax-mountains-back" style={{ position: "absolute", left: 0, width: "100%" }}>
          <Suspense fallback={null}>
            <WebGLCityLayer day={1} variant="back" />
          </Suspense>
        </div>
        <div className="parallax-mountains-front" style={{ position: "absolute", left: 0, width: "100%" }}>
          <Suspense fallback={null}>
            <WebGLCityLayer day={1} variant="front" />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CitySilhouette;
