import React from "react";
import "./hero-button-fx.css";

/**
 * Hero button hover/focus FX.
 * CSS-only glow + shimmer that adapts to body[data-daytime]:
 *  - day/morning => warm sunrise glow
 *  - night/evening => cool moonlight glow
 *
 * Why not WebGL: one R3F Canvas per button created multiple WebGL
 * contexts on top of the hero scene canvas, which the browser dropped
 * ("THREE.WebGLRenderer: Context Lost") leaving the hover invisible.
 * A CSS layer is GPU-cheap, always renders, respects prefers-reduced-motion,
 * and works for keyboard focus (a11y) the same as mouse hover.
 */
interface HeroButtonFxProps {
  children: React.ReactNode;
  className?: string;
}

const HeroButtonFx: React.FC<HeroButtonFxProps> = ({ children, className }) => {
  return (
    <span className={`hero-btn-fx ${className ?? ""}`}>
      <span aria-hidden="true" className="hero-btn-fx__glow" />
      <span aria-hidden="true" className="hero-btn-fx__shimmer" />
      <span className="hero-btn-fx__content">{children}</span>
    </span>
  );
};

export default HeroButtonFx;
