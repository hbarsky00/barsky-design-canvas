import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Single-canvas WebGL city skyline. Draws BOTH back and front building layers
 * inside one fragment shader to minimize WebGL contexts (browsers cap at ~16).
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDay; // 0 night, 1 day

  float hash(float x){ return fract(sin(x*127.1)*43758.5453); }
  float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  // Draw one building band. yBase = bottom of band in vUv.y. bandH = band height.
  // density = buildings across, maxH = max building height fraction of bandH.
  vec4 cityLayer(vec2 uv, float yBase, float bandH, float density, float maxH, float speed, float salt){
    // Convert global uv.y into local band coords (0 at band bottom, 1 at top)
    float localY = (uv.y - yBase) / bandH;
    if (localY < 0.0 || localY > 1.0) return vec4(0.0);
    float x = uv.x + uTime * speed + salt;
    float idx = floor(x * density) + salt*100.0;
    float local = fract(x * density);

    float h = 0.3 + hash(idx) * maxH;
    float gapW = 0.05 + hash(idx + 17.0) * 0.06;
    float gap = step(1.0 - gapW, local);

    float yFromBottom = 1.0 - localY;
    float inBuilding = step(yFromBottom, h) * (1.0 - gap);
    if (inBuilding < 0.5) return vec4(0.0);

    float facade = mix(0.7, 1.0, yFromBottom / max(h, 0.01));
    vec3 nightCol = vec3(0.035, 0.045, 0.085) * facade;
    vec3 dayCol   = vec3(0.42, 0.47, 0.58) * facade;
    vec3 baseCol  = mix(nightCol, dayCol, uDay);

    vec2 wuv = vec2(local * 6.0, yFromBottom * (12.0 + hash(idx + 3.0) * 10.0));
    vec2 wf = fract(wuv);
    float windowMask =
      step(0.18, wf.x) * step(wf.x, 0.78) *
      step(0.22, wf.y) * step(wf.y, 0.72);
    float litSeed = hash2(vec2(idx * 7.0 + floor(wuv.x) * 13.0, floor(wuv.y) * 31.0));
    float flicker = step(0.5, fract(litSeed + floor(uTime * 0.25) * 0.37));
    float lit = step(0.55, litSeed) * flicker * windowMask;

    vec3 litNight = vec3(1.0, 0.82, 0.42);
    vec3 litDay   = vec3(0.95, 0.97, 1.0) * 0.45;
    vec3 litCol   = mix(litNight, litDay, uDay);

    vec3 col = baseCol + lit * litCol * (1.0 - uDay * 0.55);
    return vec4(col, 1.0);
  }

  void main(){
    // Back layer: occupies bottom 50% of canvas, denser, shorter, dimmer/blurred via opacity
    vec4 back  = cityLayer(vUv, 0.0, 0.55, 32.0, 0.45, 0.004, 0.0);
    back.rgb *= 0.65;
    back.a   *= 0.7;

    // Front layer: occupies bottom 38%, taller, sharper, slower drift
    vec4 front = cityLayer(vUv, 0.0, 0.42, 22.0, 0.7, 0.008, 13.7);

    // Composite front over back
    vec4 col = mix(back, front, front.a);
    gl_FragColor = col;
  }
`;

const CityPlane: React.FC<{ day: number }> = ({ day }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uDay: { value: day } }),
    [day]
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

const WebGLCityLayer: React.FC<{ day: number }> = ({ day }) => {
  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <CityPlane day={day} />
      </Canvas>
    </div>
  );
};

export default WebGLCityLayer;
