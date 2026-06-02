import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/herbalink.png";

const SAGE = "#4a7c59";
const CREAM = "#faf9f6";
const BORDER = "#e8e4dc";

const features = [
  { n: "01", t: "Credential-Gated Directory", d: "Nothing visible until verified against the American Herbalists Guild. Smaller catalog. Honest by design." },
  { n: "02", t: "Symptom-First Discovery", d: "Guided intake replaces open search. Describe what you're experiencing, not what certification you want." },
  { n: "03", t: "Transparent Booking", d: "See credentials, specialties, and availability before you book. No surprises." },
  { n: "04", t: "Built for Safety", d: "In a category where bad advice has real medical consequences, the safer path is the easier one." },
];

const StructuredHerbalinkCaseStudy: React.FC = () => (
  <div style={{ background: CREAM, color: "#2d2d2d", minHeight: "100vh", fontFamily: "'Iowan Old Style', 'Palatino', Georgia, serif" }}>
    <ProjectSeo slug="herbalink"
      title="HerbaLink — Verified Herbalist Platform by Hiram Barsky"
      description="Find a herbalist you can trust. Every practitioner verified against the American Herbalists Guild."
      image={heroImg} />

    <ProjectNav
      brand={<span style={{ color: SAGE, fontFamily: "Georgia, serif" }}>HerbaLink</span>}
      links={[{ label: "Home", href: "#hero" }, { label: "Features", href: "#features" }, { label: "About", href: "#about" }]}
      cta={{ label: "Find an Herbalist →", href: "http://herbalink.live" }}
      bg={CREAM} border={`1px solid ${BORDER}`} textColor="#2d2d2d" backColor="rgba(0,0,0,0.3)"
      ctaBg={SAGE} ctaColor="#fff"
    />

    {/* HERO */}
    <section id="hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }} className="hl-hero">
      <style>{`@media (max-width: 768px){ .hl-hero{ grid-template-columns: 1fr !important; } .hl-img{ height: 50vh !important; min-height: 280px; } }`}</style>
      <div style={{ background: CREAM, padding: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <p style={{ color: SAGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0, fontFamily: "Inter, sans-serif" }}>
          VERIFIED HERBALIST PLATFORM
        </p>
        <h1 style={{ color: "#2d2d2d", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.1, margin: "20px 0" }}>
          Find a Herbalist You Can Trust.
        </h1>
        <div style={{ height: 1, width: 60, background: SAGE, margin: "8px 0 20px" }} />
        <p style={{ color: "#666", fontSize: 17, fontStyle: "italic", lineHeight: 1.6 }}>
          Every practitioner verified against the American Herbalists Guild. No unverified listings, ever.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
          <a href="http://herbalink.live" target="_blank" rel="noopener noreferrer"
            style={{ background: SAGE, color: "#fff", padding: "14px 24px", borderRadius: 4, fontWeight: 700, textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
            Find an Herbalist →
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ border: `1.5px solid ${SAGE}`, color: SAGE, padding: "14px 24px", borderRadius: 4, fontWeight: 700, textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
            Learn more about HerbaLink
          </a>
        </div>
      </div>
      <div className="hl-img">
        <img src={heroImg} alt="HerbaLink herbalist consultation" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: SAGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0, fontFamily: "Inter, sans-serif" }}>WHY IT WORKS</p>
        <h2 style={{ color: "#2d2d2d", fontSize: 36, fontWeight: 800, margin: "8px 0 40px" }}>An honest catalog by design</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0 }}>
          {features.map((f) => (
            <div key={f.n} style={{
              position: "relative", padding: "32px 24px",
              borderBottom: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}`,
            }}>
              <div style={{
                position: "absolute", top: 16, right: 24,
                color: "rgba(74,124,89,0.15)", fontSize: 64, fontWeight: 800, lineHeight: 1,
                fontFamily: "Georgia, serif", pointerEvents: "none",
              }}>{f.n}</div>
              <h3 style={{ color: "#2d2d2d", fontSize: 20, fontWeight: 700, margin: "0 0 10px", position: "relative" }}>{f.t}</h3>
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, margin: 0, position: "relative" }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* QUOTE */}
    <section style={{ background: SAGE, padding: "80px 24px", textAlign: "center" }}>
      <p style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontStyle: "italic", lineHeight: 1.3, maxWidth: 800, margin: "0 auto" }}>
        "The safer path should also be the easier path."
      </p>
      <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 20, fontSize: 13, letterSpacing: "0.1em", fontFamily: "Inter, sans-serif" }}>
            — DESIGN PRINCIPLE, HERBALINK
      </p>
    </section>

    {/* ABOUT */}
    <section id="about" style={{ background: CREAM, padding: "80px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <h2 style={{ color: "#2d2d2d", fontSize: 32, fontWeight: 800, margin: "0 0 24px" }}>Why I Built This</h2>
        <p style={{ color: "#444", fontSize: 17, lineHeight: 1.8 }}>
          <span style={{ float: "left", fontSize: 64, lineHeight: 0.85, paddingRight: 12, paddingTop: 6, color: SAGE, fontWeight: 700 }}>P</span>
          eople turn to herbalism for conditions conventional medicine isn't addressing — and the discovery experience is a misinformation field. Inverting the credential gate produces a smaller, more honest catalog. Honest beats exhaustive.
        </p>
        <div style={{ clear: "both", marginTop: 32, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, borderLeft: `3px solid ${SAGE}`, padding: 20 }}>
          <p style={{ color: SAGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0, fontFamily: "Inter, sans-serif" }}>WHAT I HAVEN'T SOLVED</p>
          <p style={{ color: "#444", fontSize: 15, lineHeight: 1.6, marginTop: 10 }}>
            Practitioner onboarding is manual. Scaling verified supply is the hardest problem and I haven't cracked it.
          </p>
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: SAGE, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, margin: 0 }}>
        Find an Herbalist at herbalink.live →
      </h2>
      <p style={{ color: "rgba(255,255,255,0.85)", marginTop: 12, fontStyle: "italic" }}>Every practitioner verified. No exceptions.</p>
      <a href="http://herbalink.live" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: SAGE, padding: "16px 32px", borderRadius: 4, fontWeight: 700, textDecoration: "none", fontFamily: "Inter, sans-serif" }}>
        Open HerbaLink →
      </a>
    </section>
  </div>
);

export default StructuredHerbalinkCaseStudy;
