import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/ringrival.png";

const RED = "#e8003d";
const BG = "#0d0d0d";
const INK = "#fff";
const SUBDUED = "rgba(255,255,255,0.7)";
const BORDER = "rgba(255,255,255,0.12)";

const features = [
  { title: "Distinct AI opponents", desc: "Each fighter has a unique silhouette, personality, and behavior. Generated with AI, tuned across hundreds of fights." },
  { title: "Console-grade feel", desc: "Hit-stop, screen shake, 60ms haptic on connect. Hand-tuned by feel, not by prompt." },
  { title: "Career mode", desc: "Fight through a difficulty-ordered roster. Unlock opponents by winning." },
  { title: "Zero install", desc: "Full game in the browser. No app store, no download, tap and fight." },
];

const dataPoints = [
  { k: "Status", v: "Live" },
  { k: "Latency", v: "100ms" },
  { k: "Install", v: "None" },
  { k: "URL", v: "rival.li" },
];

const RingRivalPromo: React.FC = () => (
  <div style={{ background: BG, color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo
      slug="ring-rival"
      title="Ring-Rival — Mobile Web Boxing"
      description="Console boxing feel with zero install. AI opponents, career mode, 100ms latency in the browser. Play at rival.li."
      image={heroImg}
    />


    <ProjectNav
      brand={<span style={{ color: INK, fontWeight: 700, letterSpacing: "0.1em" }}>RING-RIVAL</span>}
      links={[
        { label: "Home", href: "#hero" },
        { label: "Features", href: "#features" },
      ]}
      cta={{ label: "Fight Now →", href: "https://rival.li" }}
      bg="rgba(13,13,13,0.92)"
      textColor={INK}
      backColor="rgba(255,255,255,0.4)"
      ctaBg={RED}
      ctaColor="#fff"
      blur
    />

    {/* HERO */}
    <section id="hero" style={{ padding: "96px 24px 64px", textAlign: "center" }}>
      <p style={{ color: RED, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", margin: 0 }}>
        SHIPPED PRODUCT · ● LIVE at rival.li
      </p>
      <h1 style={{ color: INK, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 900, lineHeight: 1.05, margin: "20px auto 16px", maxWidth: 900, letterSpacing: "-0.02em" }}>
        Console boxing feel.<br />Zero install.
      </h1>
      <p style={{ color: SUBDUED, fontSize: 18, lineHeight: 1.6, maxWidth: 640, margin: "0 auto 32px" }}>
        Mobile web boxing with AI opponents, career mode, and 100ms latency — no download, tap and fight.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        <a href="https://rival.li" target="_blank" rel="noopener noreferrer"
          style={{ background: RED, color: "#fff", padding: "14px 28px", borderRadius: 4, fontWeight: 800, letterSpacing: "0.1em", textDecoration: "none", minHeight: 52, display: "inline-flex", alignItems: "center" }}>
          START CAREER →
        </a>
        <a href="/case-studies/ring-rival"
          style={{ border: `1.5px solid ${BORDER}`, color: INK, padding: "14px 26px", borderRadius: 4, fontWeight: 600, textDecoration: "none", minHeight: 52, display: "inline-flex", alignItems: "center" }}>
          Read the Case Study
        </a>
      </div>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <img src={heroImg} alt="Ring-Rival mobile boxing gameplay"
          width={1600} height={1000} loading="eager" decoding="async"
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 12, border: `1px solid ${BORDER}` }} />
      </div>
    </section>

    {/* DATA STRIP */}
    <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
        {dataPoints.map((d) => (
          <div key={d.k} style={{ textAlign: "center" }}>
            <div style={{ color: RED, fontSize: 20, fontWeight: 700 }}>{d.v}</div>
            <div style={{ color: SUBDUED, fontSize: 12, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.12em" }}>{d.k}</div>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ color: RED, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textAlign: "center", margin: 0 }}>THE FIGHT CARD</p>
        <h2 style={{ color: INK, fontSize: 40, fontWeight: 700, margin: "8px 0 56px", textAlign: "center", letterSpacing: "-0.02em" }}>
          Boxing, made playable in a tab.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(232,0,61,0.15)", color: RED, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginBottom: 16 }}>✓</div>
              <h3 style={{ color: INK, fontSize: 17, fontWeight: 700, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: SUBDUED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: RED, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "0.02em", margin: 0 }}>FIGHT NOW AT RIVAL.LI →</h2>
      <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 12 }}>No download. No account. Tap and fight.</p>
      <a href="https://rival.li" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: RED, padding: "16px 32px", borderRadius: 4, fontWeight: 800, textDecoration: "none", letterSpacing: "0.1em" }}>
        ENTER THE RING →
      </a>
    </section>
  </div>
);

export default RingRivalPromo;
