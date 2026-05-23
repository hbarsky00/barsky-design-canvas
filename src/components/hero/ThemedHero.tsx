import React from "react";
import "@/styles/themes.css";
import StyleSwitcher, { useStoredTheme } from "./StyleSwitcher";
import ParallaxHero from "./ParallaxHero";
import HeroContent from "./HeroContent";

const ThemedHero: React.FC = () => {
  const [themeId, setThemeId] = useStoredTheme();

  return (
    <>
      <StyleSwitcher themeId={themeId} onChange={setThemeId} />
      {themeId === "3d" ? (
        <ParallaxHero />
      ) : (
        <section data-theme={themeId} aria-label="Hiram Barsky portfolio hero">
          <div className="hero">
            <HeroContent />
          </div>
        </section>
      )}
    </>
  );
};

export default ThemedHero;
