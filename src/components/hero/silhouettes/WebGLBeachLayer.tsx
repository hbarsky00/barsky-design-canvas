import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL beach scene. Day/night via uDay. Aspect-corrected so people
 * silhouettes don't squash on a wide hero canvas.
 */

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

  float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  float sdCapsule(vec2 p, vec2 a, vec2 b, float r){
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }
  float sdCircle(vec2 p, vec2 c, float r){ return length(p - c) - r; }

  // Standing/dancing person. Coords are in aspect-corrected space where y is
  // canvas-height units and x is the same physical scale. bx in [0,uAspect].
  // s = body height in y-units.
  float person(vec2 p, float bx, float by, float s, float armSwing, float legSwing){
    vec2 q = (p - vec2(bx, by)) / s;
    vec2 hipsBot = vec2(0.0, 0.30);
    vec2 hipsTop = vec2(0.0, 0.55);
    float body = sdCapsule(q, hipsBot, hipsTop, 0.05);
    float head = sdCircle(q, vec2(0.0, 0.72), 0.08);
    vec2 sh = vec2(0.0, 0.55);
    vec2 hL = sh + vec2(-sin(armSwing) * 0.28, abs(cos(armSwing)) * 0.28 + 0.05);
    vec2 hR = sh + vec2( sin(armSwing + 1.2) * 0.28, abs(cos(armSwing - 0.4)) * 0.28 + 0.05);
    float armL = sdCapsule(q, sh, hL, 0.035);
    float armR = sdCapsule(q, sh, hR, 0.035);
    vec2 hip = vec2(0.0, 0.30);
    vec2 fL = hip + vec2(-0.08 - sin(legSwing) * 0.08, -0.30);
    vec2 fR = hip + vec2( 0.08 + sin(legSwing + 1.0) * 0.08, -0.30);
    float legL = sdCapsule(q, hip, fL, 0.04);
    float legR = sdCapsule(q, hip, fR, 0.04);
    float d = min(min(body, head), min(min(armL, armR), min(legL, legR)));
    return 1.0 - smoothstep(0.0, 0.01, d);
  }

  // Reclining person (sitting on sand)
  float personSit(vec2 p, float bx, float by, float s){
    vec2 q = (p - vec2(bx, by)) / s;
    float torso = sdCapsule(q, vec2(-0.20, 0.05), vec2(0.18, 0.20), 0.08);
    float head  = sdCircle(q, vec2(0.26, 0.26), 0.07);
    float thigh = sdCapsule(q, vec2(-0.18, 0.10), vec2(-0.40, 0.22), 0.06);
    float shin  = sdCapsule(q, vec2(-0.40, 0.22), vec2(-0.32, 0.00), 0.05);
    float arm   = sdCapsule(q, vec2(0.10, 0.20), vec2(0.30, 0.40), 0.04);
    float d = min(min(torso, head), min(min(thigh, shin), arm));
    return 1.0 - smoothstep(0.0, 0.01, d);
  }

  void main(){
    vec2 uv = vUv;

    // Aspect-corrected space (xa in [0,uAspect], ya in [0,1])
    vec2 p = vec2(uv.x * uAspect, uv.y);

    float horizon = 0.78;
    float beachLine = 0.42;

    vec4 col = vec4(0.0);

    // Ocean band
    if (uv.y < horizon && uv.y > beachLine) {
      float t = (horizon - uv.y) / (horizon - beachLine);
      // horizontal wave bands (lines parallel to horizon, not vertical streaks)
      float band = sin(uv.y * 90.0 - uTime * 0.8 + sin(uv.x * 3.0) * 0.6);
      float ripple = smoothstep(0.7, 1.0, band) * (0.5 + 0.5 * (1.0 - t)) * 0.25;
      vec3 dayWater   = mix(vec3(0.20, 0.50, 0.62), vec3(0.55, 0.78, 0.82), t);
      vec3 nightWater = mix(vec3(0.04, 0.08, 0.18), vec3(0.10, 0.16, 0.28), t);
      vec3 water = mix(nightWater, dayWater, uDay);
      water += ripple * mix(vec3(0.3, 0.4, 0.5), vec3(0.9, 0.95, 1.0), uDay);
      col = vec4(water, 1.0);
    }

    // Foam line at shore
    float foamBand = smoothstep(0.05, 0.0, abs(uv.y - beachLine));
    float foamWiggle = sin(uv.x * 18.0 + uTime * 0.9) * 0.5 + 0.5;
    float foam = foamBand * smoothstep(0.45, 0.85, foamWiggle);
    if (foam > 0.001) {
      vec3 foamCol = mix(vec3(0.75, 0.80, 0.85), vec3(1.0), uDay);
      col.rgb = mix(col.rgb, foamCol, foam);
      col.a = max(col.a, foam);
    }

    // Sand
    if (uv.y < beachLine) {
      float k = 1.0 - uv.y / beachLine;
      float grain = hash2(floor(uv * vec2(900.0, 500.0)));
      vec3 daySand   = mix(vec3(0.95, 0.88, 0.72), vec3(0.78, 0.65, 0.48), k);
      vec3 nightSand = mix(vec3(0.22, 0.20, 0.24), vec3(0.10, 0.09, 0.13), k);
      vec3 sand = mix(nightSand, daySand, uDay);
      sand += (grain - 0.5) * 0.04;
      col = vec4(sand, 1.0);
    }

    // ---- People silhouettes (in aspect-corrected space) ----
    // Stand them so feet sit just above beachLine (on the sand)
    float footY = beachLine - 0.02;
    float t = uTime;

    // Distribute across the full width using uAspect
    float W = uAspect;
    float dancerH = 0.34;
    float sitH = 0.20;

    float d1 = person(p, W * 0.12, footY, dancerH, sin(t * 2.0)        * 1.4, sin(t * 3.0)        * 0.5);
    float d2 = person(p, W * 0.22, footY, dancerH * 0.95, sin(t * 2.3 + 1.0) * 1.4, sin(t * 2.7 + 0.5) * 0.5);
    float d3 = person(p, W * 0.78, footY, dancerH, sin(t * 1.8 + 2.0) * 1.4, sin(t * 2.2 + 1.5) * 0.5);
    float d4 = person(p, W * 0.88, footY, dancerH * 0.95, sin(t * 2.5 + 0.7) * 1.4, sin(t * 3.1 + 2.2) * 0.5);

    float r1 = personSit(p, W * 0.45, footY, sitH);
    float r2 = personSit(p, W * 0.58, footY, sitH * 1.05);

    float peeps = max(max(max(d1, d2), max(d3, d4)), max(r1, r2));
    if (peeps > 0.001) {
      vec3 silDay   = vec3(0.12, 0.10, 0.12);
      vec3 silNight = vec3(0.02, 0.02, 0.05);
      vec3 sil = mix(silNight, silDay, uDay);
      sil += vec3(0.20, 0.12, 0.05) * (1.0 - uDay) * 0.4; // moonlight rim
      col.rgb = mix(col.rgb, sil, peeps);
      col.a = max(col.a, peeps);
    }

    gl_FragColor = col;
  }
`;

const BeachPlane: React.FC<{ day: number }> = ({ day }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDay: { value: day },
      uAspect: { value: 1 },
    }),
    [day]
  );
  useFrame(({ clock }) => {
    if (matRef.current) {
      const u = matRef.current.uniforms as any;
      u.uTime.value = clock.elapsedTime;
      u.uAspect.value = size.width / Math.max(size.height, 1);
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

const WebGLBeachLayer: React.FC<{ day: number }> = ({ day }) => {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <BeachPlane day={day} />
      </Canvas>
    </div>
  );
};

export default WebGLBeachLayer;
