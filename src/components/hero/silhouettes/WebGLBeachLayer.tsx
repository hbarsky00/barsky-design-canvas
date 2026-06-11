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

// ---------- Person (low-poly silhouette, animated) ----------
type PersonProps = {
  x: number;
  z: number;
  scale?: number;
  phase?: number;
  dancing?: boolean;
  sitting?: boolean;
  day: DayRef;
};

const tmpColor = new THREE.Color();

const Person: React.FC<PersonProps> = ({ x, z, scale = 1, phase = 0, dancing = false, sitting = false, day }) => {
  const group = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const legL = useRef<THREE.Mesh>(null);
  const legR = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + phase;
    const d = day.current;
    if (dancing && torso.current) {
      torso.current.position.y = 0.92 + Math.abs(Math.sin(t * 3)) * 0.08;
      torso.current.rotation.z = Math.sin(t * 2) * 0.12;
    }
    if (dancing) {
      if (armL.current) armL.current.rotation.z = Math.PI * 0.85 + Math.sin(t * 3) * 0.4;
      if (armR.current) armR.current.rotation.z = -Math.PI * 0.85 - Math.sin(t * 3 + 1) * 0.4;
      if (legL.current) legL.current.rotation.x = Math.sin(t * 4) * 0.3;
      if (legR.current) legR.current.rotation.x = -Math.sin(t * 4) * 0.3;
    }
    // Dark silhouette at night, warm dark skin-tone at day
    tmpColor.setRGB(
      THREE.MathUtils.lerp(0.03, 0.13, d),
      THREE.MathUtils.lerp(0.03, 0.10, d),
      THREE.MathUtils.lerp(0.05, 0.10, d)
    );
    group.current?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if ((mesh as any).isMesh) {
        const m = mesh.material as THREE.MeshStandardMaterial;
        if (m && (m as any).isMeshStandardMaterial) m.color.copy(tmpColor);
      }
    });
  });

  if (sitting) {
    return (
      <group ref={group} position={[x, 0, z]} scale={scale} rotation={[0, -0.3, 0]}>
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, -0.45]}>
          <capsuleGeometry args={[0.18, 0.5, 4, 8]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
        <mesh position={[0.40, 0.64, 0]}>
          <sphereGeometry args={[0.17, 12, 12]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
        <mesh position={[-0.25, 0.20, 0]} rotation={[0, 0, 0.6]}>
          <capsuleGeometry args={[0.10, 0.55, 4, 8]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={group} position={[x, 0, z]} scale={scale}>
      <group ref={torso} position={[0, 0.92, 0]}>
        <mesh>
          <capsuleGeometry args={[0.18, 0.55, 4, 8]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
        <mesh ref={armL} position={[-0.20, 0.28, 0]}>
          <capsuleGeometry args={[0.07, 0.45, 4, 6]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
        <mesh ref={armR} position={[0.20, 0.28, 0]}>
          <capsuleGeometry args={[0.07, 0.45, 4, 6]} />
          <meshStandardMaterial roughness={0.95} />
        </mesh>
      </group>
      <mesh ref={legL} position={[-0.10, 0.42, 0]}>
        <capsuleGeometry args={[0.09, 0.5, 4, 6]} />
        <meshStandardMaterial roughness={0.95} />
      </mesh>
      <mesh ref={legR} position={[0.10, 0.42, 0]}>
        <capsuleGeometry args={[0.09, 0.5, 4, 6]} />
        <meshStandardMaterial roughness={0.95} />
      </mesh>
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
      <Person x={-6.5} z={4.5} scale={1.15} phase={0.0} dancing day={day} />
      <Person x={-4.2} z={6.0} scale={1.05} phase={1.3} dancing day={day} />
      <Person x={-1.8} z={4.0} scale={1.2} phase={2.1} dancing day={day} />
      <Person x={4.0} z={5.0} scale={1.1} phase={0.7} dancing day={day} />
      <Person x={6.5} z={4.0} scale={1.05} phase={2.6} dancing day={day} />

      {/* Relaxers near center — kept back from the camera so they read as people */}
      <Person x={0.8} z={3.6} scale={0.95} sitting day={day} />
      <Person x={2.6} z={4.2} scale={0.9} sitting day={day} />
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
