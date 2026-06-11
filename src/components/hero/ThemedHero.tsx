import React from "react";
import "@/styles/themes.css";
import { useStoredTheme } from "./StyleSwitcher";
import ParallaxHero from "./ParallaxHero";
import HeroContent from "./HeroContent";
import TerminalHero from "./themes/TerminalHero";
import LLMChatHero from "./themes/LLMChatHero";
import Win95Hero from "./themes/Win95Hero";
import EightBitHero from "./themes/EightBitHero";
import MDHero from "./themes/MDHero";
import StructuralHero from "./themes/StructuralHero";
import ThemeFx from "./themes/ThemeFx";

const FX_THEMES = new Set(["flash", "brutalism", "swiss", "1990s"]);
const STRUCTURAL_THEMES = new Set(["teletext", "sys7", "viz", "workbench", "2010s", "simple"]);

const ThemedHero: React.FC = () => {
  const [themeId] = useStoredTheme();

  if (themeId === "3d") {
    return <ParallaxHero />;
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

  return (
    <section data-theme={themeId} aria-label="Hiram Barsky portfolio hero" className="relative">
      <div className="hero relative">
        {renderInteractive()}
        {FX_THEMES.has(themeId) && <ThemeFx themeId={themeId} />}
      </div>
    </section>
  );
};

export default ThemedHero;
