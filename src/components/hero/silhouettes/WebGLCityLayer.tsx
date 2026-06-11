import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL procedural city skyline. Replaces the PNG silhouette while keeping
 * the same positioning slots (back/front layers) inside .parallax-mountains.
 * Day/night is driven per-instance via the `day` prop; the shader handles
 * horizontal drift internally so we don't need the CSS .parallax-mountains-drift
 * wrapper (one canvas per layer instead of two mirrored DOM tiles).
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDay;     // 0 night, 1 day
  uniform float uSpeed;   // drift speed
  uniform float uDensity; // building count
  uniform float uMaxH;    // max building height (0..1)

  float hash(float x){ return fract(sin(x*127.1)*43758.5453); }
  float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  void main(){
    // Scrolling UV for drift
    vec2 uv = vec2(vUv.x + uTime * uSpeed, vUv.y);
    float n = uDensity;
    float idx = floor(uv.x * n);
    float local = fract(uv.x * n);

    // Building height + small width-jitter (gap) per building
    float h = 0.25 + hash(idx) * uMaxH;
    float gapW = 0.04 + hash(idx + 17.0) * 0.06;
    float gap = step(1.0 - gapW, local);

    float yFromBottom = 1.0 - vUv.y;
    float inBuilding = step(yFromBottom, h) * (1.0 - gap);

    // Subtle facade gradient (top lighter, bottom darker)
    float facade = mix(0.7, 1.0, yFromBottom / max(h, 0.01));

    vec3 nightCol = vec3(0.035, 0.045, 0.085) * facade;
    vec3 dayCol   = vec3(0.42, 0.47, 0.58) * facade;
    vec3 baseCol  = mix(nightCol, dayCol, uDay);

    // Window grid scaled inside each building
    vec2 wuv = vec2(local * 6.0, yFromBottom * (12.0 + hash(idx + 3.0) * 10.0));
    vec2 wf = fract(wuv);
    float windowMask =
      step(0.18, wf.x) * step(wf.x, 0.78) *
      step(0.22, wf.y) * step(wf.y, 0.72);

    // Per-window lit seed (changes slowly w/ time for subtle flicker)
    float litSeed = hash2(vec2(idx * 7.0 + floor(wuv.x) * 13.0, floor(wuv.y) * 31.0));
    float flicker = step(0.5, fract(litSeed + floor(uTime * 0.25) * 0.37));
    float lit = step(0.55, litSeed) * flicker * windowMask * inBuilding;

    vec3 litNight = vec3(1.0, 0.82, 0.42);
    vec3 litDay   = vec3(0.95, 0.97, 1.0) * 0.45;
    vec3 litCol   = mix(litNight, litDay, uDay);

    // Rooftop edge highlight
    float topEdge = smoothstep(h - 0.006, h, yFromBottom) - smoothstep(h, h + 0.006, yFromBottom);
    vec3 edgeCol = mix(vec3(0.15, 0.18, 0.3), vec3(0.85, 0.88, 0.95), uDay);

    vec3 col = baseCol + lit * litCol * (1.0 - uDay * 0.55) + topEdge * edgeCol * inBuilding * 0.6;
    float alpha = inBuilding;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface PlaneProps {
  day: number;
  speed: number;
  density: number;
  maxH: number;
}

const CityPlane: React.FC<PlaneProps> = ({ day, speed, density, maxH }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDay: { value: day },
      uSpeed: { value: speed },
      uDensity: { value: density },
      uMaxH: { value: maxH },
    }),
    [day, speed, density, maxH]
  );
  useFrame(({ clock }) => {
    if (matRef.current) (matRef.current.uniforms as any).uTime.value = clock.elapsedTime;
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

interface WebGLCityLayerProps {
  day: number;
  variant: "back" | "front";
}

const WebGLCityLayer: React.FC<WebGLCityLayerProps> = ({ day, variant }) => {
  const isBack = variant === "back";
  const style: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  };
  return (
    <div style={style} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: "transparent" }}
      >
        <CityPlane
          day={day}
          speed={isBack ? 0.004 : 0.008}
          density={isBack ? 32 : 22}
          maxH={isBack ? 0.55 : 0.7}
        />
      </Canvas>
    </div>
  );
};

export default WebGLCityLayer;
