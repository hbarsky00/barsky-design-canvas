import React from "react";
import CaseStudyLinkBanner from "@/components/project-pages/CaseStudyLinkBanner";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/roidesigncalc.png";

const BLUE = "#0ea5e9";
const RED = "#ef4444";
const GREEN = "#22c55e";

const compare = [
  { b: '"Design is too expensive"', a: "ROI Calculator shows 9.2K% return, $5.8M business value" },
  { b: "Stakeholders don't understand design value", a: "Board-ready report generated in minutes" },
  { b: "Generic industry benchmarks get challenged", a: "Industry-template benchmarks pre-loaded and citable by vertical" },
  { b: "Designer has no seat at the table", a: "Designer walks in with a defensible financial model" },
];

const RoiDesignPromo: React.FC = () => (
  <div style={{ background: "#fff", color: "#111", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo slug="roi-design-builder"
      title="ROI Design Calculator — Make the Business Case for Design"
      description="A calculator that translates design decisions into dollars. Built for designers talking to finance."
      image={heroImg} />

    <CaseStudyLinkBanner slug="roi-design-builder" bg="#0f172a" color="#fff" accent="#0ea5e9" />
      <ProjectNav
      brand={<span style={{ color: "#111" }}>ROI Design Calculator</span>}
      links={[{ label: "Home", href: "#hero" }, { label: "Features", href: "#features" }, { label: "About", href: "#about" }]}
      cta={{ label: "Try It Free →", href: "https://roicalc.one/" }}
      bg="#fff" border="1px solid #e2e8f0" textColor="#111" backColor="rgba(0,0,0,0.35)"
      ctaBg={BLUE} ctaColor="#fff"
    />

    {/* HERO */}
    <section id="hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff" }} className="roi-hero">
      <style>{`@media (max-width: 900px){ .roi-hero{ grid-template-columns: 1fr !important; } }`}</style>
      <div style={{ padding: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>
          ENTERPRISE TOOL · <span style={{ color: "#22c55e" }}>● LIVE</span>
        </p>
        <h1 style={{ color: "#111", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 900, lineHeight: 1.08, margin: "20px 0", letterSpacing: "-0.02em" }}>
          Make the Business Case for Design.
        </h1>
        <p style={{ color: "#555", fontSize: 16, lineHeight: 1.6 }}>
          A calculator that translates design decisions into dollars. Built for designers talking to finance, not designers talking to designers.
        </p>

        <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 12, padding: 20, marginTop: 24 }}>
          <div style={{ color: BLUE, fontSize: 32, fontWeight: 800 }}>9.2K% ROI</div>
          <div style={{ color: "#555", fontSize: 14, marginTop: 4 }}>Generated $5.8M in total business value.</div>
          <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap", color: "#475569", fontSize: 13 }}>
            <span><strong style={{ color: "#0f172a" }}>Revenue</strong> $5.1M</span>
            <span><strong style={{ color: "#0f172a" }}>Savings</strong> $632K</span>
            <span><strong style={{ color: "#0f172a" }}>Payback</strong> 3 days</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
          <a href="https://roicalc.one/" target="_blank" rel="noopener noreferrer"
            style={{ background: BLUE, color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
            Try It Free →
          </a>
          <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ border: `1.5px solid ${BLUE}`, color: BLUE, padding: "14px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
            See How It Works
          </a>
        </div>
      </div>
      <div style={{ padding: 60, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <img src={heroImg} alt="ROI Design Calculator interface" style={{ maxWidth: "100%", borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }} />
      </div>
    </section>

    {/* FEATURES — Before/After */}
    <section id="features" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textAlign: "center", margin: 0 }}>WHAT IT DOES</p>
        <h2 style={{ color: "#111", fontSize: 36, fontWeight: 800, margin: "8px 0 40px", textAlign: "center" }}>Before / After</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginBottom: 16 }} className="roi-cmp-header">
          <style>{`@media (max-width:700px){ .roi-cmp-row{ grid-template-columns: 1fr !important; } .roi-cmp-header{ display:none !important; } }`}</style>
          <div style={{ color: RED, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", padding: "0 20px" }}>BEFORE</div>
          <div style={{ color: GREEN, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", padding: "0 20px" }}>AFTER</div>
        </div>

        {compare.map((row) => (
          <div key={row.b} className="roi-cmp-row" style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
            borderBottom: "1px solid #e2e8f0", padding: "20px 0",
          }}>
            <div style={{ padding: "0 20px", color: "#555", fontSize: 15 }}>
              <span style={{ color: RED, marginRight: 8 }}>✕</span>{row.b}
            </div>
            <div style={{ padding: "0 20px", color: "#111", fontSize: 15, fontWeight: 700 }}>
              <span style={{ color: GREEN, marginRight: 8 }}>✓</span>{row.a}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" style={{ background: "#f8fafc", padding: "80px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <h2 style={{ color: "#111", fontSize: 28, fontWeight: 800, margin: "0 0 20px" }}>Why I Built This</h2>
        <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.8 }}>
          Designers lose budget conversations because they speak in craft and stakeholders speak in money. The brief was a tool that translates. The hard part isn't the math — it's knowing which numbers stakeholders actually trust. Industry benchmarks get challenged immediately unless they're citable. That's the core design problem this tool is solving.
        </p>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, borderTop: `3px solid ${BLUE}`, padding: 20, marginTop: 24 }}>
          <p style={{ color: BLUE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>WHAT I HAVEN'T SOLVED</p>
          <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
            The benchmark data problem is real. Generic stats get dismissed. The tool only works if the numbers are defensible. That tension is partially solved — not fully.
          </p>
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: BLUE, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, margin: 0 }}>
        Try ROI Design Calculator Free →
      </h2>
      <p style={{ color: "rgba(255,255,255,0.85)", marginTop: 12 }}>Build the case that gets design funded.</p>
      <a href="https://roicalc.one/" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: BLUE, padding: "16px 32px", borderRadius: 8, fontWeight: 800, textDecoration: "none" }}>
        Open Calculator →
      </a>
    </section>
  </div>
);

export default RoiDesignPromo;
