import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/catchbuddy.png";

const GREEN = "#16a34a";
const INK = "#111";
const BG = "#fff";
const SUBDUED = "#555";
const BORDER = "#e5e5e5";

const features = [
  { title: "Same-day games", desc: "Post and play today. No schedules, no seasons, no commitments." },
  { title: "Safety first", desc: "Curated meeting spots, panic button on every screen, verified parent gate for minors." },
  { title: "Smart matching", desc: "Match scores based on sport, skill, location, and availability." },
  { title: "Zero friction", desc: "Google OAuth, in-app confirmation, calendar export. Posted to confirmed in under 2 minutes." },
];

const dataPoints = [
  { k: "Status", v: "Live" },
  { k: "Sports", v: "5" },
  { k: "Spots", v: "50+ Parks" },
  { k: "Cost", v: "Free" },
];

const CatchBuddyPromo: React.FC = () => (
  <div style={{ background: BG, color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo
      slug="catchbuddy"
      title="CatchBuddy — Same-Day Pickup Sports"
      description="Find local players and play today. Same-day pickup sports with curated parks, safety-first design, and zero friction sign-up."
      image={heroImg}
    />


    <ProjectNav
      brand={<span style={{ color: GREEN, fontWeight: 700 }}>● CatchBuddy</span>}
      links={[
        { label: "Home", href: "#hero" },
        { label: "Features", href: "#features" },
      ]}
      cta={{ label: "Find a Game →", href: "https://catchbuddy.me" }}
      bg="#fff"
      border={`1px solid ${BORDER}`}
      textColor={INK}
      backColor="rgba(0,0,0,0.35)"
      ctaBg={GREEN}
      ctaColor="#fff"
    />

    {/* HERO */}
    <section id="hero" style={{ padding: "96px 24px 64px", textAlign: "center" }}>
      <p style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>
        SHIPPED PRODUCT · ● LIVE at catchbuddy.me
      </p>
      <h1 style={{ color: INK, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 800, lineHeight: 1.1, margin: "20px auto 16px", maxWidth: 900, letterSpacing: "-0.02em" }}>
        Find local players.<br />Play today.
      </h1>
      <p style={{ color: SUBDUED, fontSize: 18, lineHeight: 1.6, maxWidth: 640, margin: "0 auto 32px" }}>
        Post a game, find partners, confirm in a few taps. Built for same-day pickup sports with safety baked in.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        <a href="https://catchbuddy.me" target="_blank" rel="noopener noreferrer"
          style={{ background: GREEN, color: "#fff", padding: "14px 26px", borderRadius: 12, fontWeight: 700, textDecoration: "none", minHeight: 52, display: "inline-flex", alignItems: "center" }}>
          Find a Game →
        </a>
      </div>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <img src={heroImg} alt="CatchBuddy pickup sports app"
          width={1600} height={1000} loading="eager" decoding="async"
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 16, border: `1px solid ${BORDER}`, boxShadow: "0 20px 60px rgba(0,0,0,0.10)" }} />
      </div>
    </section>

    {/* DATA STRIP */}
    <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: "#fafafa" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
        {dataPoints.map((d) => (
          <div key={d.k} style={{ textAlign: "center" }}>
            <div style={{ color: GREEN, fontSize: 20, fontWeight: 700 }}>{d.v}</div>
            <div style={{ color: SUBDUED, fontSize: 12, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.12em" }}>{d.k}</div>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textAlign: "center", margin: 0 }}>WHAT IT DOES</p>
        <h2 style={{ color: INK, fontSize: 40, fontWeight: 700, margin: "8px 0 56px", textAlign: "center", letterSpacing: "-0.02em" }}>
          Pickup sports, with the friction removed.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(22,163,74,0.12)", color: GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginBottom: 16 }}>✓</div>
              <h3 style={{ color: INK, fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: SUBDUED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: GREEN, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, margin: 0 }}>Find a game at catchbuddy.me →</h2>
      <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 12 }}>Same-day pickup sports. No commitment required.</p>
      <a href="https://catchbuddy.me" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: GREEN, padding: "16px 32px", borderRadius: 8, fontWeight: 800, textDecoration: "none" }}>
        Open CatchBuddy →
      </a>
    </section>
  </div>
);

export default CatchBuddyPromo;
