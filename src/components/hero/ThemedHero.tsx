import React, { Suspense, lazy } from "react";
import "@/styles/themes.css";
import { useStoredTheme } from "./StyleSwitcher";
const ParallaxHero3D = lazy(() => import("./r3f/ParallaxHero3D"));
import HeroContent from "./HeroContent";
import TerminalHero from "./themes/TerminalHero";
import LLMChatHero from "./themes/LLMChatHero";
import Win95Hero from "./themes/Win95Hero";
import EightBitHero from "./themes/EightBitHero";
import MDHero from "./themes/MDHero";
import StructuralHero from "./themes/StructuralHero";
import ThemeFx from "./themes/ThemeFx";

const WebGLHeroBackdrop = lazy(() => import("./WebGLHeroBackdrop"));

const FX_THEMES = new Set(["flash", "brutalism", "swiss", "1990s"]);
const STRUCTURAL_THEMES = new Set(["teletext", "sys7", "viz", "workbench", "2010s", "simple"]);
const NO_BACKDROP_THEMES = new Set(["terminal", "win95", "8bit", "teletext", "sys7", "workbench"]);

const ThemedHero: React.FC = () => {
  const [themeId, setThemeId] = useStoredTheme();

  if (themeId === "3d") {
    return (
      <Suspense fallback={<section className="parallax-hero" aria-label="Loading 3D hero" />}>
        <ParallaxHero3D />
      </Suspense>
    );
  }

  const renderInteractive = () => {
    switch (themeId) {
      case "terminal":
        return <TerminalHero />;
      case "llm-chat":
        return <LLMChatHero />;
      case "win95":
        return <Win95Hero />;
      case "8bit":
        return <EightBitHero />;
      case "md":
        return <MDHero />;
      default:
        if (STRUCTURAL_THEMES.has(themeId)) return <StructuralHero themeId={themeId as any} />;
        return <HeroContent />;
    }
  };

  const showBackdrop = !NO_BACKDROP_THEMES.has(themeId);

  return (
    <section data-theme={themeId} aria-label="Hiram Barsky portfolio hero" className="relative">
      {showBackdrop && (
        <Suspense fallback={null}>
          <WebGLHeroBackdrop />
        </Suspense>
      )}
      <div className="hero relative" style={{ zIndex: 1 }}>
        {renderInteractive()}
        {FX_THEMES.has(themeId) && <ThemeFx themeId={themeId} />}
      </div>
    </section>
  );
};

export default ThemedHero;
