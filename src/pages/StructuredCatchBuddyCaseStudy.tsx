import React from "react";
import { Calendar, ShieldCheck, Users, Zap } from "lucide-react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/catchbuddy.png";

const GREEN = "#16a34a";

const features = [
  { Icon: Calendar, t: "Same-Day Games", d: "Post and play today. No schedules, no seasons, no commitments." },
  { Icon: ShieldCheck, t: "Safety First", d: "Curated meeting spots, panic button on every screen, verified parent gate for minors." },
  { Icon: Users, t: "Smart Matching", d: "Match scores based on sport, skill, location, and availability. See fit before you commit." },
  { Icon: Zap, t: "Zero Friction", d: "Google OAuth, in-app confirmation, calendar export. Post to confirmed in under 2 minutes." },
];

const stats = [
  { n: "5", l: "Sports" },
  { n: "50+", l: "Curated Parks" },
  { n: "2 min", l: "Post to Confirmed" },
  { n: "100%", l: "Free to Play" },
];

const StructuredCatchBuddyCaseStudy: React.FC = () => (
  <div style={{ background: "#fff", color: "#111", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo slug="catchbuddy"
      title="CatchBuddy — Same-Day Pickup Sports by Hiram Barsky"
      description="Find local players and play today. Built for same-day pickup sports with safety-first architecture."
      image={heroImg} />

    <ProjectNav
      brand={<span style={{ color: GREEN }}>● CatchBuddy</span>}
      links={[{ label: "Home", href: "#hero" }, { label: "Features", href: "#features" }, { label: "About", href: "#about" }]}
      cta={{ label: "Find a Game →", href: "https://catchbuddy.me" }}
      bg="#fff" border="1px solid #e5e5e5" textColor="#111" backColor="rgba(0,0,0,0.35)"
      ctaBg={GREEN} ctaColor="#fff"
    />

    {/* HERO */}
    <section id="hero" style={{ padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <p style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>PICKUP SPORTS PLATFORM</p>
        <h1 style={{ color: "#111", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.05, margin: "16px 0", letterSpacing: "-0.02em" }}>
          Find Local Players.<br />Play Today.
        </h1>
        <p style={{ color: "#666", fontSize: 16, maxWidth: 520, margin: "0 auto 28px", lineHeight: 1.6 }}>
          Post a game, find partners, confirm in a few taps. Built for same-day pickup sports.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <a href="https://catchbuddy.me" target="_blank" rel="noopener noreferrer"
            style={{ background: GREEN, color: "#fff", padding: "14px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
            Find a Game →
          </a>
          <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ border: `1.5px solid ${GREEN}`, color: GREEN, padding: "14px 24px", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
            How It Works
          </a>
        </div>
        <img src={heroImg} alt="CatchBuddy app screens" width={900} height={563} loading="eager" decoding="async"
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 10", objectFit: "cover", maxWidth: 900, margin: "0 auto", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", display: "block" }} />

      </div>
    </section>

    {/* STATS */}
    <section style={{ background: GREEN, padding: "32px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24 }}>
        {stats.map((s) => (
          <div key={s.l} style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 32, fontWeight: 800 }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textAlign: "center", margin: 0 }}>WHAT MAKES IT DIFFERENT</p>
        <h2 style={{ color: "#111", fontSize: 36, fontWeight: 800, textAlign: "center", margin: "8px 0 40px" }}>Built for trust, not just matching</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {features.map(({ Icon, t, d }) => (
            <div key={t} style={{
              border: "1px solid #e5e5e5", borderRadius: 12, padding: 24,
              transition: "box-shadow 0.2s, transform 0.2s", background: "#fff",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <Icon size={28} color={GREEN} />
              <h3 style={{ color: "#111", fontSize: 16, fontWeight: 700, margin: "12px 0 6px" }}>{t}</h3>
              <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ABOUT */}
    <section id="about" style={{ background: "#f9fafb", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
        <div>
          <h2 style={{ color: "#111", fontSize: 28, fontWeight: 800, margin: "0 0 16px" }}>Why I Built This</h2>
          <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7 }}>
            Pickup sports are dying in cities. Existing apps assume commitment. The real product wasn't a scheduler — it was a way to lower the friction and safety risk of two strangers agreeing to meet at a park. Trust-first architecture, built in from v1, not bolted on.
          </p>
          <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, marginTop: 16 }}>
            I chose curated public spots over user-chosen locations because safety anxiety was the real barrier to adoption, and gave up the viral growth of unconstrained listings.
          </p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, borderTop: `3px solid ${GREEN}`, padding: 24, alignSelf: "start" }}>
          <p style={{ color: GREEN, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>WHAT I HAVEN'T SOLVED</p>
          <p style={{ color: "#333", fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>
            Retention after the first game. Getting people back for a second is harder than getting them there the first time.
          </p>
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: GREEN, padding: "80px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, margin: 0 }}>Find a Game at catchbuddy.me →</h2>
      <p style={{ color: "rgba(255,255,255,0.85)", marginTop: 12 }}>Same-day pickup sports. No commitment required.</p>
      <a href="https://catchbuddy.me" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#fff", color: GREEN, padding: "16px 32px", borderRadius: 8, fontWeight: 800, textDecoration: "none" }}>
        Open CatchBuddy →
      </a>
    </section>
  </div>
);

export default StructuredCatchBuddyCaseStudy;
