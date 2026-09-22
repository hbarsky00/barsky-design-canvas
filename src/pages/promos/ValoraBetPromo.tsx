import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/valorabet.png";

const ORANGE = "#f97316";
const BG = "#0d0f1e";
const INK = "#fff";
const SUBDUED = "rgba(255,255,255,0.65)";
const BORDER = "rgba(255,255,255,0.12)";

const features = [
  { title: "Markets across categories", desc: "Crypto, sports, politics, culture — new markets added as testers request them." },
  { title: "Create your own market", desc: "Publish a question, set the terms, let the crowd decide the odds." },
  { title: "CPMM pricing, in the open", desc: "Prices move with every bet. No hidden order book — the crowd is the market maker." },
  { title: "Clubs & leaderboards", desc: "Join clubs, compete with friends, climb the global ranks on play money." },
];

const dataPoints = [
  { k: "Status", v: "Live in beta" },
  { k: "Stakes", v: "Play money" },
  { k: "Pricing", v: "CPMM" },
  { k: "Looking for", v: "Testers" },
];

const ValoraBetPromo: React.FC = () => (
  <div style={{ background: BG, color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo
      slug="valora-bet"
      title="Valora Bet — Social Prediction Markets"
      description="Create and bet on real-world outcomes with play money. CPMM pricing, open authoring, clubs and leaderboards. Live in beta."
      image={heroImg}
    />


    <ProjectNav
      brand={<span style={{ color: INK, fontWeight: 700 }}>⚡ Valora Bet</span>}
      links={[
        { label: "Home", href: "#hero" },
        { label: "Features", href: "#features" },
      ]}
      cta={{ label: "Play Now →", href: "http://valora.bet" }}
      bg="rgba(13,15,30,0.92)"
      textColor={INK}
      backColor="rgba(255,255,255,0.4)"
      ctaBg={ORANGE}
      ctaColor="#fff"
      blur
    />

    {/* HERO */}
    <section id="hero" style={{ padding: "96px 24px 64px", textAlign: "center" }}>
      <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>
        SHIPPED PRODUCT · ● LIVE at valora.bet
      </p>
      <h1 style={{ color: INK, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 800, lineHeight: 1.1, margin: "20px auto 16px", maxWidth: 900, letterSpacing: "-0.02em" }}>
        Your world. Your markets.<br />Your call.
      </h1>
      <p style={{ color: SUBDUED, fontSize: 18, lineHeight: 1.6, maxWidth: 640, margin: "0 auto 32px" }}>
        Create and bet on real-world outcomes with play money. Honest CPMM pricing and a betting UI a casual user can play in 10 seconds.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        <a href="http://valora.bet" target="_blank" rel="noopener noreferrer"
          style={{ background: ORANGE, color: "#fff", padding: "14px 26px", borderRadius: 12, fontWeight: 700, textDecoration: "none", minHeight: 52, display: "inline-flex", alignItems: "center" }}>
          Explore Markets →
        </a>
      </div>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <img src={heroImg} alt="Valora Bet prediction markets dashboard"
          width={1600} height={1000} loading="eager" decoding="async"
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 10", objectFit: "cover", borderRadius: 16, border: `1px solid ${BORDER}` }} />
      </div>
    </section>

    {/* DATA STRIP */}
    <section style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
        {dataPoints.map((d) => (
          <div key={d.k} style={{ textAlign: "center" }}>
            <div style={{ color: ORANGE, fontSize: 20, fontWeight: 700 }}>{d.v}</div>
            <div style={{ color: SUBDUED, fontSize: 12, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.12em" }}>{d.k}</div>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ padding: "96px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textAlign: "center", margin: 0 }}>WHAT IT DOES</p>
        <h2 style={{ color: INK, fontSize: 40, fontWeight: 700, margin: "8px 0 56px", textAlign: "center", letterSpacing: "-0.02em" }}>
          Prediction markets, made playable.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(249,115,22,0.12)", color: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginBottom: 16 }}>✓</div>
              <h3 style={{ color: INK, fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: SUBDUED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: ORANGE, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, margin: 0 }}>Try the beta at valora.bet →</h2>
      <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 12 }}>Free to play. No install. Feedback wanted.</p>
      <a href="http://valora.bet" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: ORANGE, padding: "16px 32px", borderRadius: 6, fontWeight: 800, textDecoration: "none" }}>
        Open Valora →
      </a>
    </section>
  </div>
);

export default ValoraBetPromo;
