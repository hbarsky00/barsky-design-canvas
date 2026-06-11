import React, { Suspense, lazy } from "react";

const WebGLBeachLayer = lazy(() => import("./WebGLBeachLayer"));

/**
 * Beach scene (replaces previous ocean PNGs). WebGL shader draws sand,
 * waves, foam, and silhouettes of people relaxing + dancing. Day/night
 * crossfade via .is-day on parent (.parallax-mountains-day).
 */
const OceanSilhouette: React.FC = () => {
  return (
    <>
      <div className="parallax-mountains" data-silhouette="beach">
        <Suspense fallback={null}>
          <WebGLBeachLayer day={0} />
        </Suspense>
      </div>
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="beach">
        <Suspense fallback={null}>
          <WebGLBeachLayer day={1} />
        </Suspense>
      </div>
    </>
  );
};

export default OceanSilhouette;
