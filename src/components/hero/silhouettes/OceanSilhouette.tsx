import React, { Suspense, lazy } from "react";

const WebGLBeachLayer = lazy(() => import("./WebGLBeachLayer"));

/**
 * Beach scene — ONE WebGL canvas. Day/night is blended inside the 3D scene
 * (it watches body[data-daytime]), so we do NOT mount a second day canvas.
 * Inline opacity:1 overrides the .is-day CSS that would hide the night layer.
 */
const OceanSilhouette: React.FC = () => {
  return (
    <div className="parallax-mountains" data-silhouette="beach" style={{ opacity: 1 }}>
      <Suspense fallback={null}>
        <WebGLBeachLayer />
      </Suspense>
    </div>
  );
};

export default OceanSilhouette;
