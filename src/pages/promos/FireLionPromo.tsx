import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/firelion.png";

const ORANGE = "#ff6b00";
const BG = "#0a0a0a";

const FireLionPromo: React.FC = () => {
  const stats = [
    { n: "3", l: "Game Modes" },
    { n: "30+", l: "Files Refactored" },
    { n: "1 Year", l: "Solo Build" },
    { n: "0", l: "Investors" },
  ];

  return (
    <div style={{ background: BG, color: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <ProjectSeo
        slug="fire-lion"
        title="Fire Lion — Word-Casting Arcade Game by Hiram Barsky"
        description="A solo-built mobile web game where vocabulary is your weapon. Three modes, AI-generated opponents, spell-to-cast combat."
        image={heroImg}
      />

      <ProjectNav
        brand={<span style={{ color: ORANGE }}>Fire Lion</span>}
        links={[
          { label: "Home", href: "#hero" },
          { label: "Features", href: "#features" },
          { label: "About", href: "#about" },
        ]}
        cta={{ label: "Play Free →", href: "https://firelion.me" }}
        bg="rgba(10,10,10,0.85)" textColor="#fff" backColor="rgba(255,255,255,0.4)"
        ctaBg={ORANGE} ctaColor="#fff" blur
      />

      {/* HERO */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover", backgroundPosition: "center top",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 60%, #0a0a0a 100%)",
        }} />
        <div style={{
          position: "relative", zIndex: 2, height: "100vh",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 24px 12vh", maxWidth: 1100, margin: "0 auto", textAlign: "center",
        }}>
          <p style={{ color: ORANGE, fontSize: 11, letterSpacing: "0.15em", margin: 0, fontWeight: 700 }}>
            WORD-CASTING ARCADE GAME
          </p>
          <h1 style={{
            color: "#fff", fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 900,
            lineHeight: 1.05, margin: "16px 0", letterSpacing: "-0.02em",
          }}>
            Spell Words.<br />Cast Spells.<br />Survive.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, maxWidth: 560, margin: "8px auto 28px" }}>
            A solo-built mobile web game where vocabulary is your weapon.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://firelion.me" target="_blank" rel="noopener noreferrer"
              style={{ background: ORANGE, color: "#fff", padding: "14px 24px", borderRadius: 6, fontWeight: 700, textDecoration: "none" }}>
              Play Free →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: ORANGE, fontSize: 11, letterSpacing: "0.15em", fontWeight: 700, margin: 0 }}>WHAT I BUILT</p>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 800, margin: "8px 0 40px" }}>The work that survived deletion</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <FlCard title="Three Game Modes" body="Fire Lion (escalating tension), Lion Wars (strategic naval combat), Cub Mode (low-stakes recovery). Each isolated so refactors never break the others." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
              <FlCard title="Spell-to-Cast Combat" body="Spell words mid-flight to trigger attacks. Combos scale with word length and speed." />
              <FlCard title="AI-Generated Content" body="Opponent personalities, trash talk, and level text generated with AI. Art direction tuned by hand." />
            </div>
            <FlCard title="Solo Built" body="Supabase backend, particle systems, difficulty curves, and 30+ file refactors. Built solo with AI as co-builder. The deletion list ended up longer than the feature list." />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#000", padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {stats.map((s, i) => (
            <div key={s.l} style={{
              textAlign: "center", padding: "8px 16px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <div style={{ color: "#fff", fontSize: 36, fontWeight: 800 }}>{s.n}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "#111", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, margin: "0 0 20px" }}>Why I Built This</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7 }}>
            The design job was deciding what to delete. Building features is easy with AI. Killing them is the actual work.
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, lineHeight: 1.7, marginTop: 16 }}>
            I chose a canvas renderer over DOM sprites because framerate mattered for arcade feel, and gave up accessibility tooling.
          </p>
        </div>
          <div style={{
            background: "rgba(255,107,0,0.08)", borderLeft: `3px solid ${ORANGE}`,
            padding: 24, alignSelf: "start",
          }}>
            <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>WHAT I HAVEN'T SOLVED</p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>
              Difficulty balancing across skill levels. The game gets hard fast and there's no adaptive curve yet.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ background: ORANGE, padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, margin: 0 }}>Play Fire Lion Free</h2>
        <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 12, fontSize: 16 }}>No install. No account. Just play.</p>
        <a href="https://firelion.me" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 24, background: "#fff", color: ORANGE, padding: "16px 32px", borderRadius: 6, fontWeight: 800, textDecoration: "none" }}>
          Play Now →
        </a>
      </section>
    </div>
  );
};

const FlCard: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div style={{
    background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.15)",
    borderRadius: 12, padding: 24,
  }}>
    <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>{title}</h3>
    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{body}</p>
  </div>
);

export default FireLionPromo;
