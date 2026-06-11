import React, { Suspense, lazy } from "react";

const WebGLCityLayer = lazy(() => import("./WebGLCityLayer"));

/**
 * City skyline silhouette via WebGL (single canvas per day/night mode).
 * Slots into the .parallax-mountains structure so positioning, day/night
 * crossfade (CSS opacity), and parallax all behave as before.
 */
const CitySilhouette: React.FC = () => {
  return (
    <>
      <div className="parallax-mountains" data-silhouette="city">
        <Suspense fallback={null}>
          <WebGLCityLayer day={0} />
        </Suspense>
      </div>
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="city">
        <Suspense fallback={null}>
          <WebGLCityLayer day={1} />
        </Suspense>
      </div>
    </>
  );
};

export default CitySilhouette;
