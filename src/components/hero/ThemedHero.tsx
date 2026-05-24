import React from "react";
import "@/styles/themes.css";
import StyleSwitcher, { useStoredTheme } from "./StyleSwitcher";
import ParallaxHero from "./ParallaxHero";
import HeroContent from "./HeroContent";
import TerminalHero from "./themes/TerminalHero";
import LLMChatHero from "./themes/LLMChatHero";
import Win95Hero from "./themes/Win95Hero";
import EightBitHero from "./themes/EightBitHero";

const ThemedHero: React.FC = () => {
  const [themeId, setThemeId] = useStoredTheme();

  if (themeId === "3d") {
    return (
      <>
        <StyleSwitcher themeId={themeId} onChange={setThemeId} />
        <ParallaxHero />
      </>
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
      default:
        return <HeroContent />;
    }
  };

  return (
    <>
      <StyleSwitcher themeId={themeId} onChange={setThemeId} />
      <section data-theme={themeId} aria-label="Hiram Barsky portfolio hero">
        <div className="hero">{renderInteractive()}</div>
      </section>
    </>
  );
};

export default ThemedHero;
