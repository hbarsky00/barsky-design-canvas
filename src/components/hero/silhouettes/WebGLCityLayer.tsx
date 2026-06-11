import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Single-canvas WebGL city skyline. Draws BOTH back and front building layers
 * inside one fragment shader, and blends day/night via uDay (watching
 * body[data-daytime]) so only ONE WebGL context is used for the whole scene.
 */

const useDayTarget = () => {
  const target = useRef(
    typeof document !== "undefined" && document.body.dataset.daytime === "day" ? 1 : 0
  );
  useEffect(() => {
    const update = () => {
      target.current = document.body.dataset.daytime === "day" ? 1 : 0;
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-daytime"] });
    return () => obs.disconnect();
  }, []);
  return target;
};

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDay;    // 0 night, 1 day
  uniform float uAspect; // canvas width / height

  float hash(float x){ return fract(sin(x*127.1)*43758.5453); }
  float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  // One skyline layer. count = buildings across (scaled by aspect so buildings
  // stay narrow on wide canvases). minH/maxH = building heights in canvas uv.y.
  vec4 cityLayer(vec2 uv, float count, float minH, float maxH, float speed, float salt){
    float x = uv.x + uTime * speed + salt;
    float idx = floor(x * count) + salt * 100.0;
    float local = fract(x * count);

    // Jagged skyline: strong per-building height variation
    float r = hash(idx);
    float h = minH + pow(r, 1.4) * (maxH - minH);

    // Narrow gaps between buildings
    float gapW = 0.04 + hash(idx + 17.0) * 0.05;
    if (local > 1.0 - gapW) return vec4(0.0);
    if (uv.y > h) return vec4(0.0);

    float facade = mix(0.8, 1.0, uv.y / max(h, 0.01));
    vec3 nightCol = vec3(0.04, 0.05, 0.09) * facade;
    vec3 dayCol   = vec3(0.40, 0.45, 0.56) * facade;
    vec3 baseCol  = mix(nightCol, dayCol, uDay);

    // Small sparse windows: fixed world-space row height so windows stay
    // small on every building; ~3 columns per building.
    vec2 wuv = vec2(local * 3.0, uv.y * 26.0 + hash(idx + 3.0));
    vec2 wf = fract(wuv);
    float windowMask =
      step(0.30, wf.x) * step(wf.x, 0.62) *
      step(0.34, wf.y) * step(wf.y, 0.60);
    float litSeed = hash2(vec2(idx * 7.0 + floor(wuv.x) * 13.0, floor(wuv.y) * 31.0));
    float flicker = step(0.35, fract(litSeed + floor(uTime * 0.2) * 0.37));
    float lit = step(0.72, litSeed) * flicker * windowMask;

    vec3 litNight = vec3(1.0, 0.82, 0.45);
    vec3 litDay   = vec3(0.95, 0.97, 1.0) * 0.35;
    vec3 litCol   = mix(litNight, litDay, uDay);

    vec3 col = baseCol + lit * litCol * (1.0 - uDay * 0.6);
    return vec4(col, 1.0);
  }

  void main(){
    // Building width scales with canvas height, not width → narrow towers
    float backCount  = uAspect * 9.0;
    float frontCount = uAspect * 5.5;

    // Back layer: shorter, denser, hazier
    vec4 back = cityLayer(vUv, backCount, 0.18, 0.55, 0.0035, 0.0);
    back.rgb = mix(back.rgb, mix(vec3(0.10, 0.09, 0.14), vec3(0.55, 0.58, 0.66), uDay), 0.45);
    back.a *= 0.85;

    // Front layer: taller, more varied, near-black silhouette
    vec4 front = cityLayer(vUv, frontCount, 0.10, 0.92, 0.007, 13.7);

    vec4 col = mix(back, front, front.a);
    gl_FragColor = col;
  }
`;

const CityPlane: React.FC = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const dayTarget = useDayTarget();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDay: { value: dayTarget.current },
      uAspect: { value: 1 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useFrame(({ clock }, delta) => {
    if (matRef.current) {
      const u = matRef.current.uniforms as any;
      u.uTime.value = clock.elapsedTime;
      u.uAspect.value = size.width / Math.max(size.height, 1);
      u.uDay.value = THREE.MathUtils.damp(u.uDay.value, dayTarget.current, 1.6, delta);
    }
  });
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
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

const WebGLCityLayer: React.FC = () => {
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
        <CityPlane />
      </Canvas>
    </div>
  );
};

export default WebGLCityLayer;
