import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/ringrival.png";

const RED = "#e8003d";
const BG = "#0d0d0d";

const rounds = [
  { n: "RD 01", t: "Distinct AI Opponents", d: "Each fighter has a unique silhouette, personality, trash talk, and behavior. Generated with AI, tuned across hundreds of fights." },
  { n: "RD 02", t: "Console-Grade Feel", d: "Hit-stop, screen shake, 60ms haptic on connect. Hand-tuned by feel, not by prompt." },
  { n: "RD 03", t: "Career Mode", d: "Fight through a difficulty-ordered roster. Unlock opponents by winning." },
  { n: "RD 04", t: "Zero Install", d: "Full game in the browser. No app store, no download, tap and fight." },
];

const press = [
  ["Type", "Mobile web boxing game"],
  ["Stack", "React, Supabase, Web Audio API, Haptics"],
  ["Opponents", "AI-generated roster, hand-tuned"],
  ["Platform", "Mobile web — iOS Safari, Chrome"],
  ["Status", "✓ Live"],
  ["URL", "rival.li"],
  ["Designer", "Hiram Barsky"],
];

const StructuredRingRivalCaseStudy: React.FC = () => (
  <div style={{ background: BG, color: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo slug="ring-rival"
      title="Ring-Rival — Mobile Web Boxing by Hiram Barsky"
      description="Console boxing feel with zero install. AI opponents, career mode, 100ms latency in the browser."
      image={heroImg} />

    <ProjectNav
      brand={<span style={{ letterSpacing: "0.1em" }}>RING-RIVAL</span>}
      links={[{ label: "Home", href: "#hero" }, { label: "Features", href: "#features" }, { label: "About", href: "#about" }]}
      cta={{ label: "Fight Now →", href: "https://rival.li" }}
      bg="rgba(13,13,13,0.9)" textColor="#fff" backColor="rgba(255,255,255,0.4)"
      ctaBg={RED} ctaColor="#fff" blur
    />

    {/* HERO */}
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "grid", gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)" }} className="rr-hero">
      <style>{`@media (max-width: 768px){ .rr-hero{ grid-template-columns: 1fr !important; } .rr-hero-img{ height: 50vh !important; min-height: 280px; } }`}</style>
      <div style={{ padding: "80px 32px", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(90deg, rgba(232,0,61,0.06), transparent 30%)" }}>
        <p style={{ color: RED, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", margin: 0 }}>MAIN EVENT</p>
        <p style={{ color: "#fff", fontSize: 11, letterSpacing: "0.15em", marginTop: 8 }}>MOBILE WEB BOXING</p>
        <h1 style={{ color: "#fff", fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.02, margin: "16px 0", letterSpacing: "-0.02em", fontStretch: "condensed" as any }}>
          Console Boxing Feel.<br />Zero Install.
        </h1>
        <div style={{ height: 2, background: RED, width: 80, margin: "16px 0 20px" }} />
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, letterSpacing: "0.05em" }}>
          100ms latency · AI Opponents · Career Mode · No Download
        </p>
        <div style={{ marginTop: 28 }}>
          <a href="https://rival.li" target="_blank" rel="noopener noreferrer"
            style={{ background: RED, color: "#fff", padding: "14px 28px", borderRadius: 4, fontWeight: 800, letterSpacing: "0.1em", textDecoration: "none" }}>
            START CAREER →
          </a>
        </div>
      </div>
      <div className="rr-hero-img" style={{ position: "relative", overflow: "hidden" }}>
        <img src={heroImg} alt="Ring-Rival mobile boxing gameplay" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </section>

    {/* FEATURES — Rounds */}
    <section id="features" style={{ background: BG, padding: "80px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p style={{ color: RED, fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", margin: 0 }}>THE FIGHT CARD</p>
        <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: "8px 0 32px" }}>Round by round</h2>
        <div>
          {rounds.map((r) => (
            <div key={r.n} style={{
              display: "grid", gridTemplateColumns: "80px 1fr", gap: 24,
              padding: "24px 0", borderBottom: `1px solid ${RED}33`,
            }}>
              <div style={{ color: RED, fontWeight: 800, fontSize: 14, fontVariantNumeric: "tabular-nums", letterSpacing: "0.05em" }}>{r.n}</div>
              <div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0 }}>{r.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6, margin: "6px 0 0" }}>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" style={{ background: "#111", padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ color: RED, fontSize: 80, fontWeight: 900, lineHeight: 0.8, fontFamily: "Georgia, serif" }}>"</div>
        <p style={{ color: "#fff", fontSize: 28, fontWeight: 700, lineHeight: 1.3, margin: "0 0 24px" }}>
          No model knows whether a punch feels like a punch.
        </p>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7 }}>
          Boxing games live on consoles for a reason. Doing console feel with a thumb in a browser was the constraint that made it worth building. Every hit-stop duration and screen shake amplitude was hand-tuned across hundreds of test fights.
        </p>
        <div style={{ background: "rgba(232,0,61,0.08)", borderLeft: `3px solid ${RED}`, padding: 20, marginTop: 32 }}>
          <p style={{ color: RED, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", margin: 0 }}>WHAT I HAVEN'T SOLVED</p>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
            Multiplayer is the obvious next step and the hardest engineering problem. Webcam hand-tracking was explored and cut — impressive, completely wrong for the audience.
          </p>
        </div>
      </div>
    </section>

    {/* PRESS / FIGHT CARD */}
    <section id="press" style={{ background: "#000", padding: "80px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ background: RED, color: "#fff", padding: "12px 20px", fontWeight: 800, letterSpacing: "0.15em", fontSize: 13 }}>
          OFFICIAL FIGHT CARD — RING-RIVAL
        </div>
        <div>
          {press.map(([k, v], i) => (
            <div key={k} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", padding: "14px 20px",
              background: i % 2 === 0 ? "#0a0a0a" : "#111",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>{k}</span>
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: RED, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "0.02em", margin: 0 }}>FIGHT NOW AT RIVAL.LI →</h2>
      <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 12 }}>No download. No account. Tap and fight.</p>
      <a href="https://rival.li" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: RED, padding: "16px 32px", borderRadius: 4, fontWeight: 800, textDecoration: "none", letterSpacing: "0.1em" }}>
        ENTER THE RING →
      </a>
    </section>
  </div>
);

export default StructuredRingRivalCaseStudy;
