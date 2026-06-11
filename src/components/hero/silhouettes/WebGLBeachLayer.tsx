import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL beach scene: distant horizon, animated wave line, sandy shore,
 * and silhouettes of people relaxing + dancing. Day/night via uDay.
 * Single fragment shader, single canvas per mode.
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
  uniform float uAspect;

  float hash(float x){ return fract(sin(x*127.1)*43758.5453); }
  float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  // Distance to a vertical capsule (line segment) of radius r between a and b
  float sdCapsule(vec2 p, vec2 a, vec2 b, float r){
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }
  float sdCircle(vec2 p, vec2 c, float r){ return length(p - c) - r; }

  // Silhouette of a standing/dancing person at base position bx, scale s,
  // armSwing in radians, legSwing in radians. Returns coverage [0,1].
  float person(vec2 uv, float bx, float by, float s, float armSwing, float legSwing){
    // local coords relative to feet
    vec2 p = (uv - vec2(bx, by)) / s;
    // body
    vec2 hipsTop = vec2(0.0, 0.55);
    vec2 hipsBot = vec2(0.0, 0.30);
    float body = sdCapsule(p, hipsBot, hipsTop, 0.05);
    // head
    float head = sdCircle(p, vec2(0.0, 0.70), 0.07);
    // arms
    vec2 shoulder = vec2(0.0, 0.55);
    vec2 handL = shoulder + vec2(-sin(armSwing) * 0.22, cos(armSwing) * 0.22);
    vec2 handR = shoulder + vec2( sin(armSwing) * 0.22, cos(armSwing) * 0.22);
    float armL = sdCapsule(p, shoulder, handL, 0.035);
    float armR = sdCapsule(p, shoulder, handR, 0.035);
    // legs
    vec2 hip = vec2(0.0, 0.30);
    vec2 footL = hip + vec2(-0.08 - sin(legSwing) * 0.05, -0.30);
    vec2 footR = hip + vec2( 0.08 + sin(legSwing) * 0.05, -0.30);
    float legL = sdCapsule(p, hip, footL, 0.04);
    float legR = sdCapsule(p, hip, footR, 0.04);

    float d = min(min(body, head), min(min(armL, armR), min(legL, legR)));
    return 1.0 - smoothstep(0.0, 0.008, d);
  }

  // Sitting/relaxing person (lying back). Wider, lower.
  float personSit(vec2 uv, float bx, float by, float s){
    vec2 p = (uv - vec2(bx, by)) / s;
    // reclined torso
    float body = sdCapsule(p, vec2(-0.18, 0.08), vec2(0.20, 0.18), 0.07);
    float head = sdCircle(p, vec2(0.26, 0.22), 0.06);
    // bent legs
    float thigh = sdCapsule(p, vec2(-0.18, 0.10), vec2(-0.38, 0.20), 0.05);
    float shin  = sdCapsule(p, vec2(-0.38, 0.20), vec2(-0.30, 0.02), 0.045);
    float d = min(min(body, head), min(thigh, shin));
    return 1.0 - smoothstep(0.0, 0.008, d);
  }

  void main(){
    vec2 uv = vUv;

    // ---- Horizon & water bands ----
    float horizon = 0.62;
    float beachLine = 0.30; // where wet sand begins

    // Sky is transparent (the page sky shows through above horizon)
    vec4 col = vec4(0.0);

    // Distant ocean band
    if (uv.y < horizon && uv.y > beachLine) {
      float t = (horizon - uv.y) / (horizon - beachLine);
      // wave ripples
      float wave = sin(uv.x * 40.0 + uTime * 0.6) * 0.5
                 + sin(uv.x * 17.0 - uTime * 0.4) * 0.5;
      float ripple = smoothstep(0.85, 1.0, 0.5 + 0.5 * wave) * (1.0 - t) * 0.4;
      vec3 dayWater   = mix(vec3(0.18, 0.42, 0.55), vec3(0.55, 0.78, 0.82), t);
      vec3 nightWater = mix(vec3(0.04, 0.08, 0.16), vec3(0.10, 0.16, 0.28), t);
      vec3 water = mix(nightWater, dayWater, uDay);
      water += ripple * mix(vec3(0.4, 0.5, 0.6), vec3(1.0), uDay);
      col = vec4(water, 1.0);
    }

    // Wet sand transition line with foam
    if (uv.y < beachLine + 0.04 && uv.y > beachLine - 0.01) {
      float foam = sin(uv.x * 30.0 + uTime * 1.2) * 0.5 + 0.5;
      float foamMask = smoothstep(0.4, 0.9, foam) * (1.0 - abs(uv.y - beachLine) / 0.03);
      vec3 foamCol = mix(vec3(0.7, 0.75, 0.8), vec3(1.0), uDay);
      col.rgb = mix(col.rgb, foamCol, foamMask);
      col.a = max(col.a, foamMask);
    }

    // Sand
    if (uv.y < beachLine) {
      float grain = hash2(floor(uv * vec2(800.0, 400.0)));
      vec3 daySand   = mix(vec3(0.95, 0.88, 0.72), vec3(0.78, 0.68, 0.50), 1.0 - uv.y / beachLine);
      vec3 nightSand = mix(vec3(0.20, 0.18, 0.22), vec3(0.10, 0.09, 0.13), 1.0 - uv.y / beachLine);
      vec3 sand = mix(nightSand, daySand, uDay);
      sand += (grain - 0.5) * 0.03;
      col = vec4(sand, 1.0);
    }

    // ---- People silhouettes (on sand) ----
    // Dancers: arms up, swaying
    float t = uTime;
    float d1 = person(uv, 0.18, 0.10, 0.18, 0.6 + sin(t * 2.0) * 0.5, sin(t * 3.0) * 0.4);
    float d2 = person(uv, 0.30, 0.08, 0.16, -0.5 + sin(t * 2.3 + 1.0) * 0.6, sin(t * 2.7 + 0.5) * 0.5);
    float d3 = person(uv, 0.78, 0.09, 0.17, 0.8 + sin(t * 1.8 + 2.0) * 0.5, sin(t * 2.2 + 1.5) * 0.4);
    float d4 = person(uv, 0.88, 0.11, 0.15, -0.7 + sin(t * 2.5 + 0.7) * 0.6, sin(t * 3.1 + 2.2) * 0.4);

    // Relaxers: sitting on the sand
    float r1 = personSit(uv, 0.50, 0.06, 0.20);
    float r2 = personSit(uv, 0.62, 0.05, 0.18);

    float peeps = max(max(max(d1, d2), max(d3, d4)), max(r1, r2));
    if (peeps > 0.001) {
      vec3 silDay   = vec3(0.10, 0.08, 0.10);
      vec3 silNight = vec3(0.02, 0.02, 0.04);
      vec3 sil = mix(silNight, silDay, uDay);
      // subtle rim from sunset/moon
      sil += vec3(0.15, 0.10, 0.05) * (1.0 - uDay) * 0.3;
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
        <BeachPlane day={day} />
      </Canvas>
    </div>
  );
};

export default WebGLBeachLayer;
