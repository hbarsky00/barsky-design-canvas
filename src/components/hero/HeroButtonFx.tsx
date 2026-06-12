import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * WebGL hover FX layer for hero buttons.
 * - Activates only when daytime is "day" (morning) or "night" (evening).
 * - Sits BEHIND the button content; never alters button styles.
 * - Sun-warm palette in day, moon-cool palette at night.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uHover;   // 0..1 eased
  uniform float uDay;     // 0 night, 1 day

  // Smooth radial aurora swirl
  float swirl(vec2 p, float t){
    float a = atan(p.y, p.x);
    float r = length(p);
    float w = sin(a * 3.0 + t * 1.2) * 0.5 + 0.5;
    return smoothstep(0.95, 0.0, r) * w;
  }

  void main(){
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= 1.6;
    float t = uTime;

    float glow = swirl(p, t) * 0.6
               + swirl(p * 1.7 + 0.3, -t * 0.7) * 0.4;
    float falloff = smoothstep(1.1, 0.0, length(p));
    float a = glow * falloff * uHover;

    // Warm sunrise vs cool moon
    vec3 warm = mix(vec3(1.0, 0.55, 0.20), vec3(1.0, 0.85, 0.45), 0.5 + 0.5 * sin(t));
    vec3 cool = mix(vec3(0.35, 0.55, 1.0), vec3(0.70, 0.55, 1.0), 0.5 + 0.5 * sin(t * 0.8));
    vec3 col = mix(cool, warm, uDay);

    gl_FragColor = vec4(col, a * 0.85);
  }
`;

const FxPlane: React.FC<{ hoverRef: React.MutableRefObject<number>; dayRef: React.MutableRefObject<number> }> = ({ hoverRef, dayRef }) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uHover: { value: 0 },
    uDay: { value: dayRef.current },
  }), [dayRef]);

  useFrame(({ clock }, delta) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms as any;
    u.uTime.value = clock.elapsedTime;
    u.uHover.value = THREE.MathUtils.damp(u.uHover.value, hoverRef.current, 6, delta);
    u.uDay.value = THREE.MathUtils.damp(u.uDay.value, dayRef.current, 2, delta);
  });

  return (
    <mesh scale={[2, 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

interface HeroButtonFxProps {
  children: React.ReactNode;
  className?: string;
}

const HeroButtonFx: React.FC<HeroButtonFxProps> = ({ children, className }) => {
  const hoverRef = useRef(0);
  const dayRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener?.("change", onChange);

    const update = () => {
      dayRef.current = document.body.dataset.daytime === "day" ? 1 : 0;
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-daytime"] });

    setMounted(true);
    return () => {
      mql.removeEventListener?.("change", onChange);
      obs.disconnect();
    };
  }, []);

  return (
    <span
      className={`relative inline-block ${className ?? ""}`}
      onMouseEnter={() => { hoverRef.current = 1; }}
      onMouseLeave={() => { hoverRef.current = 0; }}
      onFocus={() => { hoverRef.current = 1; }}
      onBlur={() => { hoverRef.current = 0; }}
    >
      {mounted && !reduced && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-4 z-0"
          style={{ borderRadius: "1rem", overflow: "hidden" }}
        >
          <Canvas
            dpr={[1, 1.5]}
            orthographic
            camera={{ position: [0, 0, 1], zoom: 1 }}
            gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "low-power" }}
            style={{ background: "transparent" }}
          >
            <FxPlane hoverRef={hoverRef} dayRef={dayRef} />
          </Canvas>
        </span>
      )}
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default HeroButtonFx;
