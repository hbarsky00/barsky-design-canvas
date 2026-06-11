import React, { Suspense, lazy } from "react";

const WebGLCityLayer = lazy(() => import("./WebGLCityLayer"));

/**
 * City skyline silhouette — ONE WebGL canvas. Day/night is blended inside
 * the shader (uDay watches body[data-daytime]), so no second day canvas.
 * Inline opacity:1 overrides the .is-day CSS that would hide the night layer.
 */
const CitySilhouette: React.FC = () => {
  return (
    <div className="parallax-mountains" data-silhouette="city" style={{ opacity: 1 }}>
      <Suspense fallback={null}>
        <WebGLCityLayer />
      </Suspense>
    </div>
  );
};

export default CitySilhouette;
