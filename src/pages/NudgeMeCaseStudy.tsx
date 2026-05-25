import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/nudgeme.png";

const MINT = "#10b981";
const INK = "#0f172a";

const features = [
  { title: "Type naturally", desc: "\"Meeting with Sarah next Tuesday at 2pm\" parses into a structured reminder. No date pickers, no forms." },
  { title: "Recurring schedules", desc: "\"Weekly team yoga Wed + Fri 7:30 AM\" — handles complex repeat patterns without leaving the input." },
  { title: "Multi-channel delivery", desc: "Browser push today, email + SMS next. One reminder, the channel that actually reaches you." },
  { title: "Timezone-aware", desc: "Detects your zone and asks before assuming. Travel-friendly without surprise 3 AM pings." },
];

const NudgeMeCaseStudy: React.FC = () => (
  <div style={{ background: "#fafaf9", color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo
      slug="nudgeme"
      title="NudgeMe — Natural-Language Reminder App"
      description="Type reminders the way you'd say them out loud. NudgeMe handles recurring schedules, smart parsing, and multi-channel delivery."
      image={heroImg}
    />

    <ProjectNav
      brand={<span style={{ color: INK }}>NudgeMe</span>}
      links={[{ label: "Home", href: "#hero" }, { label: "Features", href: "#features" }, { label: "About", href: "#about" }]}
      cta={{ label: "Try NudgeMe →", href: "https://nudgeme.rip" }}
      bg="rgba(255,255,255,0.85)" border="1px solid #e5e7eb" textColor={INK} backColor="rgba(0,0,0,0.5)"
      ctaBg={MINT} ctaColor="#fff"
    />

    {/* HERO */}
    <section id="hero" style={{ position: "relative", padding: "100px 24px 80px", textAlign: "center", background: "linear-gradient(180deg,#f0fdf4 0%,#fafaf9 100%)" }}>
      <p style={{ color: MINT, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>
        SHIPPED PRODUCT · <span style={{ color: "#16a34a" }}>● LIVE at nudgeme.rip</span>
      </p>
      <h1 style={{ color: INK, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 900, lineHeight: 1.05, margin: "20px auto 18px", maxWidth: 880, letterSpacing: "-0.02em" }}>
        Remember everything.<br />Forget nothing.
      </h1>
      <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.6, maxWidth: 620, margin: "0 auto 36px" }}>
        Type reminders the way you'd say them out loud. NudgeMe handles recurring schedules, smart parsing, and multi-channel delivery.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
        <a href="https://nudgeme.rip" target="_blank" rel="noopener noreferrer"
          style={{ background: MINT, color: "#fff", padding: "16px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", boxShadow: "0 10px 30px -10px rgba(16,185,129,0.5)" }}>
          Try NudgeMe Free →
        </a>
        <a href="#features"
          onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }}
          style={{ border: `1.5px solid ${MINT}`, color: MINT, padding: "16px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none", background: "#fff" }}>
          See How It Works
        </a>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <img src={heroImg} alt="NudgeMe app showing natural-language reminder input and a list of active reminders"
          style={{ width: "100%", borderRadius: 16, boxShadow: "0 30px 80px -20px rgba(15,23,42,0.25)", border: "1px solid #e5e7eb" }} />
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ background: "#fff", padding: "100px 24px", borderTop: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: MINT, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textAlign: "center", margin: 0 }}>WHAT IT DOES</p>
        <h2 style={{ color: INK, fontSize: 40, fontWeight: 800, margin: "8px 0 56px", textAlign: "center", letterSpacing: "-0.02em" }}>
          Reminders without the friction.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, padding: 28 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: MINT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, marginBottom: 16 }}>✓</div>
              <h3 style={{ color: INK, fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" style={{ background: "#fafaf9", padding: "100px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <p style={{ color: MINT, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>WHY I BUILT THIS</p>
        <h2 style={{ color: INK, fontSize: 32, fontWeight: 800, margin: "8px 0 20px", letterSpacing: "-0.02em" }}>Calendar apps are too much. Notes apps are not enough.</h2>
        <p style={{ color: "#475569", fontSize: 17, lineHeight: 1.75 }}>
          Every reminder app makes me click through three screens before I can save the thing. By the time I'm done, I've forgotten what I wanted to remember. NudgeMe lets me type the way I think — a sentence — and it figures out the date, the repeat, the timezone. The hard part wasn't the UI; it was the parsing model that handles ambiguity gracefully and never makes me re-enter information.
        </p>
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, borderLeft: `3px solid ${MINT}`, padding: 20, marginTop: 28 }}>
          <p style={{ color: MINT, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>STATUS</p>
          <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.6, marginTop: 8, margin: "8px 0 0" }}>
            Live in browser. Email + SMS channels in progress. Free during beta.
          </p>
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: INK, padding: "90px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, margin: 0, letterSpacing: "-0.02em" }}>
        Stop forgetting. Start nudging.
      </h2>
      <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 12, fontSize: 16 }}>Free during beta. No credit card.</p>
      <a href="https://nudgeme.rip" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 28, background: MINT, color: "#fff", padding: "16px 32px", borderRadius: 10, fontWeight: 800, textDecoration: "none", boxShadow: "0 10px 30px -10px rgba(16,185,129,0.6)" }}>
        Open NudgeMe →
      </a>
    </section>
  </div>
);

export default NudgeMeCaseStudy;
