import React from "react";
import { Link } from "react-router-dom";
import "@/styles/themes.css";
import StyleSwitcher, { useStoredTheme } from "./StyleSwitcher";
import ParallaxHero from "./ParallaxHero";
import type { ThemeId } from "./themeConfig";

const NAME = "Hiram Barsky";
const ROLE = "Lead Product & AI Designer · Clifton, NJ";
const BIO = "Passion for high craft, Gen AI, Cybersecurity & Fintech design.";
const SKILLS = ["Gen AI", "Fintech", "Cyber", "UX/UI"];

const CASE_STUDIES = [
  { id: "case-study-1", label: "Fire Lion", img: "/images/firelion-hero-title.png", to: "/project/fire-lion", desc: "Word-casting arcade game" },
  { id: "case-study-2", label: "Ring-Rival", img: "/images/ringrival-hero-title.png", to: "/project/ring-rival", desc: "Mobile web boxing" },
  { id: "case-study-3", label: "CatchBuddy", img: "/images/catchbuddy-hero-landing.png", to: "/project/catchbuddy", desc: "Same-day pickup sports" },
  { id: "case-study-4", label: "HerbaLink", img: "https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png", to: "/project/herbalink", desc: "Verified herbalist platform" },
  { id: "case-study-5", label: "QR Code Builder", img: "/images/email-ai-promo.png", to: "/project/qr-code-builder", desc: "Generate branded QR codes with analytics" },
  { id: "case-study-6", label: "ROI Design Builder", img: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg", to: "/project/roi-design-builder", desc: "Calculate design ROI for stakeholder buy-in" },
];

const scrollToCaseStudies = () => {
  const el = document.getElementById("case-study-1") || document.getElementById("case-studies");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

const HeroContent: React.FC<{ themeId: ThemeId }> = ({ themeId }) => {
  // Special layouts that need custom markup wrappers
  const wrapsInWindow = themeId === "win95" || themeId === "sys7" || themeId === "workbench";
  const isTeletext = themeId === "teletext";
  const isLlmChat = themeId === "llm-chat";
  const isFlash = themeId === "flash";
  const isMd = themeId === "md";

  const ctas = (
    <div className="ctas">
      <a className="btn primary" href="#case-studies" onClick={(e) => { e.preventDefault(); scrollToCaseStudies(); }}>
        <span>See My Work</span>
      </a>
      <a className="btn" href="https://calendly.com/barskyuxdesignservices/30min" target="_blank" rel="noopener noreferrer">
        <span>Book a Call</span>
      </a>
    </div>
  );

  const skillsBlock = (
    <div className="skills">
      {SKILLS.map((s) => <div key={s} className="skill">{s}</div>)}
    </div>
  );

  const caseGrid = (
    <div className="case-grid">
      {CASE_STUDIES.map((c) => (
        <Link key={c.id} className="case-card" to={c.to}>
          <img className="case-thumb" src={c.img} alt={c.label} loading="lazy" />
          <div className="case-label">{c.label}</div>
        </Link>
      ))}
    </div>
  );

  if (isLlmChat) {
    return (
      <div className="hero-inner">
        <div className="bubble user">Who are you?</div>
        <div className="bubble ai"><strong>{NAME}</strong> — {ROLE}</div>
        <div className="bubble user">What do you do?</div>
        <div className="bubble ai">{BIO}</div>
        <div className="bubble user">What are your skills?</div>
        <div className="bubble ai">{skillsBlock}</div>
        {ctas}
        {caseGrid}
        <div className="fake-input">Ask Hiram anything…</div>
      </div>
    );
  }

  if (isTeletext) {
    const today = new Date().toLocaleDateString("en-GB");
    return (
      <div className="hero-inner">
        <div className="tt-header"><span>P100 BARSKY</span><span>{today}</span></div>
        <div className="win-body">
          <h1 className="name">{NAME}</h1>
          <p className="role">{ROLE}</p>
          <p className="bio">{BIO}</p>
          {skillsBlock}
          {ctas}
          {caseGrid}
        </div>
        <div className="tt-footer">
          <span>100 INDEX</span><span>101 WORK</span><span>102 CONTACT</span>
        </div>
      </div>
    );
  }

  if (wrapsInWindow) {
    const titleMap = { win95: "Hiram Barsky — Portfolio", sys7: "Hiram Barsky", workbench: "Barsky:Portfolio" } as const;
    return (
      <>
        {themeId === "workbench" && (
          <div className="wb-iconrow">
            <div>Work</div><div>Mail</div><div>Disk</div>
          </div>
        )}
        <div className="hero-inner">
          <div className="titlebar">{themeId === "sys7" ? <span>{titleMap[themeId]}</span> : titleMap[themeId as "win95" | "workbench"]}</div>
          <div className="win-body">
            <h1 className="name">{NAME}</h1>
            <p className="role">{ROLE}</p>
            <p className="bio">{BIO}</p>
            {skillsBlock}
            {ctas}
            {caseGrid}
          </div>
          {themeId === "win95" && <div className="statusbar">barskydesign.pro · Ready</div>}
        </div>
      </>
    );
  }

  if (isFlash) {
    return (
      <div className="hero-inner">
        <h1 className="name"><span className="accent">Hiram</span> Barsky</h1>
        <p className="role">{ROLE}</p>
        <p className="bio">{BIO}</p>
        {skillsBlock}
        {ctas}
        {caseGrid}
      </div>
    );
  }

  if (isMd) {
    return (
      <div className="hero-inner">
        <h1 className="name">{NAME}</h1>
        <p className="role">{ROLE}</p>
        <p className="bio">{BIO}</p>
        {skillsBlock}
        {ctas}
        {caseGrid}
      </div>
    );
  }

  // Default layout (3d, 1990s, 2010s, simple, terminal, brutalism, swiss, viz, 8bit)
  return (
    <div className="hero-inner">
      {themeId === "1990s" && <div className="marquee"><span>★ Welcome to Hiram Barsky's Homepage — Best Viewed in Netscape Navigator ★</span></div>}
      {themeId === "2010s" && <div className="avatar">H</div>}
      <h1 className="name">{NAME}{themeId === "terminal" && <span className="cursor" />}</h1>
      {themeId === "1990s" && <hr />}
      <p className="role">{ROLE}</p>
      <p className="bio">{BIO}</p>
      {skillsBlock}
      {ctas}
      {caseGrid}
    </div>
  );
};

const ThemedHero: React.FC = () => {
  const [themeId, setThemeId] = useStoredTheme();

  return (
    <>
      <StyleSwitcher themeId={themeId} onChange={setThemeId} />
      {themeId === "3d" ? (
        <ParallaxHero />
      ) : (
        <section
          data-theme={themeId}
          aria-label="Hiram Barsky portfolio hero"
        >
          <div className="hero">
            <HeroContent themeId={themeId} />
          </div>
        </section>
      )}
    </>
  );
};

export default ThemedHero;
