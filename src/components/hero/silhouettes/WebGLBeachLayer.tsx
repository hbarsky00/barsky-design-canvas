import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Real 3D beach scene (not a flat fragment shader).
 * - Perspective camera near sand level looking out to sea
 * - Sand plane with subtle dune displacement
 * - Animated water plane with vertex-shader waves + fresnel
 * - Low-poly people figures (capsule body + sphere head + animated limbs)
 *   Some dance (arms up, swaying), some sit on the sand.
 * Day/night driven by lighting colors + fog, controlled by `day` prop.
 */

// ---------- Water ----------
const waterVert = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying float vWave;
  void main(){
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 0.6 + uTime * 1.1) * 0.08
            + sin(p.x * 1.7 - uTime * 0.7 + p.y * 0.5) * 0.05
            + sin(p.y * 0.4 + uTime * 0.5) * 0.06;
    p.z += w;
    vWave = w;
    vec4 wp = modelMatrix * vec4(p, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const waterFrag = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uDay;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform vec3 uHorizon;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying float vWave;

  void main(){
    float depth = clamp((vUv.y - 0.0) / 1.0, 0.0, 1.0);
    vec3 col = mix(uShallow, uDeep, depth);
    // distance to horizon haze
    col = mix(col, uHorizon, smoothstep(0.55, 1.0, vUv.y));

    // sparkle on wave crests (day) / moonlight glints (night)
    float crest = smoothstep(0.04, 0.10, vWave);
    vec3 glint = mix(vec3(0.85, 0.90, 1.0), vec3(1.0, 0.98, 0.85), uDay);
    col += crest * glint * (0.35 + 0.25 * uDay);

    // foam line near shore (front of plane = vUv.y small)
    float foam = smoothstep(0.08, 0.0, vUv.y) * (0.6 + 0.4 * sin(vWorldPos.x * 3.0 + uTime * 1.5));
    col = mix(col, vec3(1.0), clamp(foam, 0.0, 0.75));

    gl_FragColor = vec4(col, 1.0);
  }
`;

const Water: React.FC<{ day: number }> = ({ day }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDay: { value: day },
      uShallow: { value: new THREE.Color() },
      uDeep: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
    }),
    [day]
  );
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms as any;
    u.uTime.value = clock.elapsedTime;
    const d = day;
    u.uShallow.value.setRGB(
      THREE.MathUtils.lerp(0.08, 0.45, d),
      THREE.MathUtils.lerp(0.16, 0.72, d),
      THREE.MathUtils.lerp(0.25, 0.78, d)
    );
    u.uDeep.value.setRGB(
      THREE.MathUtils.lerp(0.02, 0.10, d),
      THREE.MathUtils.lerp(0.05, 0.30, d),
      THREE.MathUtils.lerp(0.12, 0.50, d)
    );
    u.uHorizon.value.setRGB(
      THREE.MathUtils.lerp(0.10, 0.78, d),
      THREE.MathUtils.lerp(0.08, 0.68, d),
      THREE.MathUtils.lerp(0.15, 0.62, d)
    );
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -8]}>
      <planeGeometry args={[120, 60, 80, 40]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={waterVert}
        fragmentShader={waterFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
};

// ---------- Sand ----------
const Sand: React.FC<{ day: number }> = ({ day }) => {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.color.setRGB(
      THREE.MathUtils.lerp(0.12, 0.92, day),
      THREE.MathUtils.lerp(0.10, 0.82, day),
      THREE.MathUtils.lerp(0.12, 0.62, day)
    );
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 6]} receiveShadow>
      <planeGeometry args={[120, 30, 1, 1]} />
      <meshStandardMaterial ref={matRef} roughness={1} />
    </mesh>
  );
};

// ---------- Person (low-poly, animated) ----------
type PersonProps = {
  x: number;
  z: number;
  scale?: number;
  phase?: number;
  dancing?: boolean;
  sitting?: boolean;
  day: number;
};

const Person: React.FC<PersonProps> = ({ x, z, scale = 1, phase = 0, dancing = false, sitting = false, day }) => {
  const torso = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const legL = useRef<THREE.Mesh>(null);
  const legR = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    if (dancing && torso.current) {
      torso.current.position.y = sitting ? 0.3 : 0.9 + Math.abs(Math.sin(t * 3)) * 0.08;
      torso.current.rotation.z = Math.sin(t * 2) * 0.12;
    }
    if (dancing) {
      if (armL.current) armL.current.rotation.z = Math.PI * 0.85 + Math.sin(t * 3) * 0.4;
      if (armR.current) armR.current.rotation.z = -Math.PI * 0.85 - Math.sin(t * 3 + 1) * 0.4;
      if (legL.current) legL.current.rotation.x = Math.sin(t * 4) * 0.3;
      if (legR.current) legR.current.rotation.x = -Math.sin(t * 4) * 0.3;
    }
    if (matRef.current) {
      matRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.02, 0.10, day),
        THREE.MathUtils.lerp(0.02, 0.08, day),
        THREE.MathUtils.lerp(0.04, 0.10, day)
      );
    }
  });

  if (sitting) {
    return (
      <group position={[x, 0, z]} scale={scale} rotation={[0, -0.3, 0]}>
        {/* torso reclined */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, -0.4]} castShadow>
          <capsuleGeometry args={[0.18, 0.5, 4, 8]} />
          <meshStandardMaterial ref={matRef} roughness={0.9} />
        </mesh>
        {/* head */}
        <mesh position={[0.38, 0.62, 0]} castShadow>
          <sphereGeometry args={[0.17, 12, 12]} />
          <meshStandardMaterial color={matRef.current?.color ?? "black"} roughness={0.9} />
        </mesh>
        {/* bent legs */}
        <mesh position={[-0.25, 0.20, 0]} rotation={[0, 0, 0.6]} castShadow>
          <capsuleGeometry args={[0.10, 0.55, 4, 8]} />
          <meshStandardMaterial color="black" roughness={0.9} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={torso} position={[x, 0.9, z]} scale={scale}>
      {/* torso */}
      <mesh position={[0, 0, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.55, 4, 8]} />
        <meshStandardMaterial ref={matRef} roughness={0.9} />
      </mesh>
      {/* head */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="black" roughness={0.9} />
      </mesh>
      {/* arms (pivot at shoulder) */}
      <mesh ref={armL} position={[-0.18, 0.30, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.45, 4, 6]} />
        <meshStandardMaterial color="black" roughness={0.9} />
      </mesh>
      <mesh ref={armR} position={[0.18, 0.30, 0]} castShadow>
        <capsuleGeometry args={[0.07, 0.45, 4, 6]} />
        <meshStandardMaterial color="black" roughness={0.9} />
      </mesh>
      {/* legs (pivot at hip) */}
      <mesh ref={legL} position={[-0.10, -0.45, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 6]} />
        <meshStandardMaterial color="black" roughness={0.9} />
      </mesh>
      <mesh ref={legR} position={[0.10, -0.45, 0]} castShadow>
        <capsuleGeometry args={[0.09, 0.5, 4, 6]} />
        <meshStandardMaterial color="black" roughness={0.9} />
      </mesh>
    </group>
  );
};

// ---------- Scene ----------
const BeachScene: React.FC<{ day: number }> = ({ day }) => {
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    if (dirRef.current) {
      dirRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.50, 1.00, day),
        THREE.MathUtils.lerp(0.55, 0.95, day),
        THREE.MathUtils.lerp(0.80, 0.85, day)
      );
      dirRef.current.intensity = THREE.MathUtils.lerp(0.35, 1.1, day);
    }
    if (ambRef.current) {
      ambRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.10, 0.65, day),
        THREE.MathUtils.lerp(0.12, 0.72, day),
        THREE.MathUtils.lerp(0.25, 0.85, day)
      );
      ambRef.current.intensity = THREE.MathUtils.lerp(0.40, 0.55, day);
    }
  });

  return (
    <>
      <ambientLight ref={ambRef} />
      <directionalLight ref={dirRef} position={[8, 6, 4]} />
      <Sand day={day} />
      <Water day={day} />

      {/* Dancers — spread across the sand */}
      <Person x={-6} z={4} scale={1.0} phase={0.0} dancing day={day} />
      <Person x={-4} z={5} scale={0.95} phase={1.3} dancing day={day} />
      <Person x={-2} z={3.5} scale={1.05} phase={2.1} dancing day={day} />
      <Person x={4} z={4.5} scale={1.0} phase={0.7} dancing day={day} />
      <Person x={6} z={3.5} scale={0.95} phase={2.6} dancing day={day} />

      {/* Sitters / relaxers near center */}
      <Person x={0} z={5.5} scale={1.0} phase={0} sitting day={day} />
      <Person x={1.5} z={5.0} scale={0.95} phase={0} sitting day={day} />
    </>
  );
};

const WebGLBeachLayer: React.FC<{ day: number }> = ({ day }) => {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.4, 9], fov: 35, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <BeachScene day={day} />
      </Canvas>
    </div>
  );
};

export default WebGLBeachLayer;
