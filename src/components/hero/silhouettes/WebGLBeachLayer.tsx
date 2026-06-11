import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Real 3D beach scene — SINGLE canvas (one WebGL context).
 * Day/night is blended inside the scene by watching body[data-daytime],
 * smoothly lerped each frame. This avoids mounting two canvases and
 * losing WebGL contexts (browsers cap concurrent contexts).
 */

type DayRef = React.MutableRefObject<number>;

const useDayTarget = (): DayRef => {
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

// ---------- Water ----------
const waterVert = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorldPos;
  varying vec2 vUv;
  varying float vWave;
  void main(){
    vUv = uv;
    vec3 p = position;
    float w = sin(p.x * 0.45 + uTime * 1.1) * 0.10
            + sin(p.x * 1.3 - uTime * 0.7 + p.y * 0.4) * 0.06
            + sin(p.y * 0.35 + uTime * 0.5) * 0.08;
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
    // vUv.y: 0 = shore edge, 1 = far horizon
    vec3 col = mix(uShallow, uDeep, clamp(vUv.y * 1.4, 0.0, 1.0));
    col = mix(col, uHorizon, smoothstep(0.6, 1.0, vUv.y));

    // sparkle on wave crests
    float crest = smoothstep(0.05, 0.12, vWave);
    vec3 glint = mix(vec3(0.85, 0.90, 1.0), vec3(1.0, 0.98, 0.85), uDay);
    col += crest * glint * (0.30 + 0.30 * uDay);

    // rolling foam bands approaching the shore
    float band = sin(vUv.y * 40.0 - uTime * 1.2 + sin(vWorldPos.x * 0.6) * 1.5);
    float foamBand = smoothstep(0.92, 1.0, band) * smoothstep(0.25, 0.02, vUv.y);
    // bright surf line right at the sand
    float surf = smoothstep(0.035, 0.0, vUv.y) * (0.7 + 0.3 * sin(vWorldPos.x * 2.0 + uTime * 1.6));
    col = mix(col, vec3(1.0), clamp(foamBand * 0.7 + surf, 0.0, 0.85));

    gl_FragColor = vec4(col, 1.0);
  }
`;

const Water: React.FC<{ day: DayRef }> = ({ day }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDay: { value: 0 },
      uShallow: { value: new THREE.Color() },
      uDeep: { value: new THREE.Color() },
      uHorizon: { value: new THREE.Color() },
    }),
    []
  );
  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms as any;
    const d = day.current;
    u.uTime.value = clock.elapsedTime;
    u.uDay.value = d;
    u.uShallow.value.setRGB(
      THREE.MathUtils.lerp(0.08, 0.30, d),
      THREE.MathUtils.lerp(0.16, 0.65, d),
      THREE.MathUtils.lerp(0.25, 0.72, d)
    );
    u.uDeep.value.setRGB(
      THREE.MathUtils.lerp(0.02, 0.06, d),
      THREE.MathUtils.lerp(0.05, 0.28, d),
      THREE.MathUtils.lerp(0.12, 0.48, d)
    );
    u.uHorizon.value.setRGB(
      THREE.MathUtils.lerp(0.10, 0.72, d),
      THREE.MathUtils.lerp(0.08, 0.64, d),
      THREE.MathUtils.lerp(0.15, 0.60, d)
    );
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -28]}>
      <planeGeometry args={[160, 60, 96, 48]} />
      <shaderMaterial ref={matRef} vertexShader={waterVert} fragmentShader={waterFrag} uniforms={uniforms} />
    </mesh>
  );
};

// ---------- Sand ----------
const Sand: React.FC<{ day: DayRef }> = ({ day }) => {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    if (!matRef.current) return;
    const d = day.current;
    matRef.current.color.setRGB(
      THREE.MathUtils.lerp(0.14, 0.93, d),
      THREE.MathUtils.lerp(0.12, 0.84, d),
      THREE.MathUtils.lerp(0.15, 0.64, d)
    );
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 9]}>
      <planeGeometry args={[160, 16, 1, 1]} />
      <meshStandardMaterial ref={matRef} roughness={1} />
    </mesh>
  );
};

// ---------- Person (jointed low-poly figure) ----------
type PersonProps = {
  x: number;
  z: number;
  rotY?: number;
  scale?: number;
  phase?: number;
  dancing?: boolean;
  sitting?: boolean;
  tone?: number;       // 0 → light, 1 → deep skin (day)
  swim?: string;       // swimwear color (hex)
  day: DayRef;
};

const skinDay = new THREE.Color();
const skinNight = new THREE.Color(0.05, 0.05, 0.08);
const tmp = new THREE.Color();
const swimDay = new THREE.Color();

const Person: React.FC<PersonProps> = ({
  x, z, rotY = 0, scale = 1, phase = 0,
  dancing = false, sitting = false,
  tone = 0.5, swim = "#e54b6b",
  day,
}) => {
  // refs to joints
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const shoulderL = useRef<THREE.Group>(null);
  const shoulderR = useRef<THREE.Group>(null);
  const hipL = useRef<THREE.Group>(null);
  const hipR = useRef<THREE.Group>(null);

  // material refs (skin vs swim)
  const skinRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const swimRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const pushSkin = (m: THREE.MeshStandardMaterial | null) => { if (m && !skinRefs.current.includes(m)) skinRefs.current.push(m); };
  const pushSwim = (m: THREE.MeshStandardMaterial | null) => { if (m && !swimRefs.current.includes(m)) swimRefs.current.push(m); };

  // Precompute skin palette in lerp(0..1): tone 0 = (0.95,0.78,0.62), tone 1 = (0.42,0.26,0.18)
  const skinR_d = THREE.MathUtils.lerp(0.95, 0.42, tone);
  const skinG_d = THREE.MathUtils.lerp(0.78, 0.26, tone);
  const skinB_d = THREE.MathUtils.lerp(0.62, 0.18, tone);
  swimDay.set(swim);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    const d = day.current;

    if (dancing) {
      // hip sway + bounce
      if (torso.current) {
        torso.current.rotation.z = Math.sin(t * 2.2) * 0.10;
        torso.current.position.y = Math.abs(Math.sin(t * 3.0)) * 0.05;
      }
      // arms up & swaying (rotate around shoulder = local Z so arm swings out to the side)
      if (shoulderL.current) {
        shoulderL.current.rotation.z = 1.9 + Math.sin(t * 2.5) * 0.35;     // raised
        shoulderL.current.rotation.x = Math.sin(t * 2.0) * 0.15;
      }
      if (shoulderR.current) {
        shoulderR.current.rotation.z = -1.9 - Math.sin(t * 2.5 + 1) * 0.35;
        shoulderR.current.rotation.x = Math.sin(t * 2.0 + 0.6) * 0.15;
      }
      // legs step in place
      if (hipL.current) hipL.current.rotation.x = Math.sin(t * 3.0) * 0.30;
      if (hipR.current) hipR.current.rotation.x = -Math.sin(t * 3.0) * 0.30;
    }

    // skin color
    skinDay.setRGB(skinR_d, skinG_d, skinB_d);
    tmp.copy(skinNight).lerp(skinDay, d);
    for (const m of skinRefs.current) m.color.copy(tmp);

    // swim color (only visible during day; near-black at night so it merges)
    tmp.copy(skinNight).lerp(swimDay, Math.min(1, d * 1.1));
    for (const m of swimRefs.current) m.color.copy(tmp);
  });

  if (sitting) {
    // Sitting on the sand, leaning back on one arm, knees bent up
    return (
      <group ref={root} position={[x, 0, z]} rotation={[0, rotY, 0]} scale={scale}>
        {/* hips on the sand */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.20, 14, 12]} />
          <meshStandardMaterial ref={(m) => pushSwim(m)} roughness={0.95} />
        </mesh>
        {/* torso leaning back */}
        <group position={[0, 0.30, 0]} rotation={[-0.55, 0, 0]}>
          <mesh position={[0, 0.22, 0]}>
            <capsuleGeometry args={[0.14, 0.32, 6, 12]} />
            <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
          </mesh>
          {/* neck + head */}
          <mesh position={[0, 0.58, 0]}>
            <sphereGeometry args={[0.13, 14, 12]} />
            <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
          </mesh>
          {/* support arm back */}
          <group position={[0.16, 0.30, 0]} rotation={[0.4, 0, -1.1]}>
            <mesh position={[0, -0.22, 0]}>
              <capsuleGeometry args={[0.05, 0.34, 4, 8]} />
              <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
            </mesh>
          </group>
          {/* resting arm on knee */}
          <group position={[-0.16, 0.30, 0]} rotation={[1.2, 0, 0.3]}>
            <mesh position={[0, -0.22, 0]}>
              <capsuleGeometry args={[0.05, 0.34, 4, 8]} />
              <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
            </mesh>
          </group>
        </group>
        {/* bent legs (knees up) */}
        <group position={[-0.10, 0.20, 0.05]} rotation={[-1.1, 0, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.07, 0.36, 4, 8]} />
            <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
          </mesh>
        </group>
        <group position={[0.10, 0.20, 0.05]} rotation={[-1.1, 0, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.07, 0.36, 4, 8]} />
            <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
          </mesh>
        </group>
      </group>
    );
  }

  // Standing / dancing rig — joints pivot at shoulder/hip so limbs swing correctly
  return (
    <group ref={root} position={[x, 0, z]} rotation={[0, rotY, 0]} scale={scale}>
      {/* legs first (origin at hip joint, mesh hangs below) */}
      <group ref={hipL} position={[-0.08, 0.55, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.07, 0.42, 4, 8]} />
          <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
        </mesh>
      </group>
      <group ref={hipR} position={[0.08, 0.55, 0]}>
        <mesh position={[0, -0.25, 0]}>
          <capsuleGeometry args={[0.07, 0.42, 4, 8]} />
          <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
        </mesh>
      </group>

      {/* hips / swim band */}
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.12, 14]} />
        <meshStandardMaterial ref={(m) => pushSwim(m)} roughness={0.95} />
      </mesh>

      {/* torso group sways */}
      <group ref={torso} position={[0, 0.70, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <capsuleGeometry args={[0.13, 0.34, 6, 12]} />
          <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
        </mesh>
        {/* neck + head */}
        <mesh position={[0, 0.56, 0]}>
          <sphereGeometry args={[0.13, 14, 12]} />
          <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
        </mesh>
        {/* shoulders: rotation.z swings the arm out to the side */}
        <group ref={shoulderL} position={[-0.17, 0.32, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.05, 0.36, 4, 8]} />
            <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
          </mesh>
        </group>
        <group ref={shoulderR} position={[0.17, 0.32, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.05, 0.36, 4, 8]} />
            <meshStandardMaterial ref={(m) => pushSkin(m)} roughness={0.95} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// ---------- Scene ----------
const BeachScene: React.FC = () => {
  const dayTarget = useDayTarget();
  const day = useRef<number>(dayTarget.current);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const ambRef = useRef<THREE.AmbientLight>(null);

  useFrame((_, delta) => {
    // smooth ~2.5s crossfade matching the sky transition
    day.current = THREE.MathUtils.damp(day.current, dayTarget.current, 1.6, delta);
    const d = day.current;
    if (dirRef.current) {
      dirRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.50, 1.0, d),
        THREE.MathUtils.lerp(0.55, 0.95, d),
        THREE.MathUtils.lerp(0.80, 0.85, d)
      );
      dirRef.current.intensity = THREE.MathUtils.lerp(0.35, 1.1, d);
    }
    if (ambRef.current) {
      ambRef.current.color.setRGB(
        THREE.MathUtils.lerp(0.10, 0.65, d),
        THREE.MathUtils.lerp(0.12, 0.72, d),
        THREE.MathUtils.lerp(0.25, 0.85, d)
      );
      ambRef.current.intensity = THREE.MathUtils.lerp(0.45, 0.60, d);
    }
  });

  return (
    <>
      <ambientLight ref={ambRef} />
      <directionalLight ref={dirRef} position={[8, 6, 4]} />
      <Sand day={day} />
      <Water day={day} />

      {/* Dancers on the sand */}
      <Person x={-6.5} z={4.5} scale={1.15} phase={0.0} dancing tone={0.15} swim="#e54b6b" rotY={0.2} day={day} />
      <Person x={-4.2} z={6.0} scale={1.05} phase={1.3} dancing tone={0.75} swim="#2bb6c4" rotY={-0.15} day={day} />
      <Person x={-1.8} z={4.0} scale={1.20} phase={2.1} dancing tone={0.40} swim="#f0c14b" rotY={0.05} day={day} />
      <Person x={ 4.0} z={5.0} scale={1.10} phase={0.7} dancing tone={0.85} swim="#7d4ed0" rotY={-0.25} day={day} />
      <Person x={ 6.5} z={4.0} scale={1.05} phase={2.6} dancing tone={0.30} swim="#f28b3d" rotY={0.3} day={day} />

      {/* Relaxers on the sand */}
      <Person x={ 0.8} z={3.6} scale={1.00} sitting tone={0.50} swim="#36a86d" rotY={-0.35} day={day} />
      <Person x={ 2.6} z={4.2} scale={0.95} sitting tone={0.65} swim="#e0a3c8" rotY={0.25} day={day} />
    </>
  );
};

const WebGLBeachLayer: React.FC = () => {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.2, 13], fov: 38, near: 0.1, far: 220 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0.4, -18);
        }}
      >
        <BeachScene />
      </Canvas>
    </div>
  );
};

export default WebGLBeachLayer;
