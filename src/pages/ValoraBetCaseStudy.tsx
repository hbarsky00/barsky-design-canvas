import React from "react";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/valorabet.png";

const ORANGE = "#f97316";
const BG = "#0d0f1e";

const features = [
  ["Markets Across Categories", "Crypto, sports, politics, and more. New markets added as testers request them."],

  ["Create Your Own Market", "Publish a question, set the terms, let the crowd decide."],
  ["CPMM Pricing", "Prices move with every bet using a Constant Product Market Maker. The crowd sets the odds."],
  ["Clubs & Leaderboards", "Join clubs, compete with friends, climb the global ranks."],
];

const ValoraBetCaseStudy: React.FC = () => {


  return (
    <div style={{ background: BG, color: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <ProjectSeo slug="valora-bet"
        title="Valora Bet — Social Prediction Markets by Hiram Barsky"
        description="Your world. Your markets. Your call. Create and bet on real-world outcomes using play money."
        image={heroImg} />

      <ProjectNav
        brand={<span>⚡ Valora Bet</span>}
        links={[{ label: "Home", href: "#hero" }, { label: "Features", href: "#features" }, { label: "About", href: "#about" }]}
        cta={{ label: "Play Now →", href: "http://valora.bet" }}
        bg="rgba(13,15,30,0.95)" textColor="#fff" backColor="rgba(255,255,255,0.4)"
        ctaBg={ORANGE} ctaColor="#fff" blur
      />

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "11fr 9fr", background: BG }} className="vb-hero">
        <style>{`@media (max-width: 768px){ .vb-hero{ grid-template-columns: 1fr !important; } .vb-img-wrap{ height: 40vh !important; min-height: 240px; mask-image: none !important; -webkit-mask-image: none !important; } }`}</style>
        <div style={{ padding: "80px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>SOCIAL PREDICTION MARKETS</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.05, margin: "20px 0", letterSpacing: "-0.02em" }}>
            Your World. Your Markets. Your Call.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.6, maxWidth: 520 }}>
            Create and bet on real-world outcomes using play money.
          </p>

          <div style={{ display: "flex", gap: 10, margin: "28px 0", flexWrap: "wrap" }}>
            {[
              { l: "LIVE IN BETA", c: ORANGE },
              { l: "PLAY MONEY", c: "rgba(255,255,255,0.7)" },
              { l: "SEEKING TESTERS", c: "rgba(255,255,255,0.7)" },
            ].map((s) => (
              <span key={s.l} style={{
                color: s.c,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                padding: "6px 12px",
                border: `1px solid ${s.c === ORANGE ? ORANGE : "rgba(255,255,255,0.18)"}`,
                borderRadius: 999,
              }}>{s.l}</span>
            ))}
          </div>


          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="http://valora.bet" target="_blank" rel="noopener noreferrer"
              style={{ background: ORANGE, color: "#fff", padding: "14px 24px", borderRadius: 6, fontWeight: 700, textDecoration: "none" }}>
              Explore Markets →
            </a>
            <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "#fff", padding: "14px 24px", borderRadius: 6, fontWeight: 700, textDecoration: "none" }}>
              How It Works
            </a>
          </div>
        </div>
        <div className="vb-img-wrap" style={{
          position: "relative", overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 30%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)",
        }}>
          <img src={heroImg} alt="Valora Bet prediction markets dashboard" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ background: BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>PLATFORM SPECS</p>
          <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 800, margin: "8px 0 32px" }}>The mechanics</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 0 }}>
            {features.map(([t, d], i) => (
              <div key={t} style={{
                display: "grid", gridTemplateColumns: "200px 1fr", gap: 16,
                padding: "20px 24px",
                borderTop: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{t}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT — Decisions, tradeoffs, AI-honesty */}
      <section id="about" style={{ background: "#111827", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40 }}>
          <div>
            <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>THE REAL PROBLEM</p>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "8px 0 16px" }}>Prediction markets are accurate. Nobody uses them.</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7 }}>
              The forecasting math has been solved for decades. The reason normal people don't touch these platforms is the UI — order books, liquidity pools, share counts. Familiar to a trader, opaque to everyone else. The design job wasn't another exchange. It was a betting interface a casual user can play in 10 seconds, sitting on top of honest CPMM pricing that doesn't lie about the odds.
            </p>

            <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: "32px 0 0" }}>KEY DECISIONS</p>
            <ul style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, paddingLeft: 18, margin: "8px 0 0" }}>
              <li style={{ marginBottom: 12 }}>
                <strong style={{ color: "#fff" }}>Play money, not real money.</strong> Chose social play over a regulated exchange because shipping real-money markets means KYC, state-by-state licensing, and a legal surface I'm not staffing solo. Tradeoff: no skin-in-the-game accuracy, but I can iterate on the mechanic without a lawyer in every release.
              </li>
              <li style={{ marginBottom: 12 }}>
                <strong style={{ color: "#fff" }}>Show the pricing math, don't hide it.</strong> Chose visible CPMM curves over a Polymarket-style clean "Yes 67¢" chip because hiding the math is how casual users get fleeced. Tradeoff: a denser bet screen, but the user can see exactly how their bet moves the price.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>Let anyone create a market.</strong> Chose open authoring over a curated question set because the product dies if it's just my opinions. Tradeoff: moderation overhead and bad-question risk, mitigated by clubs and a flag-and-review loop instead of pre-approval.
              </li>
            </ul>

            <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: "32px 0 0" }}>AI vs. JUDGMENT</p>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, marginTop: 8 }}>
              AI scaffolded the CPMM math, Supabase schemas, RLS policies, and the clubs/leaderboards plumbing. What I wouldn't let it decide: how the bet screen frames a position. Getting that wrong turns "social prediction" into a casino UI, and the whole premise breaks.
            </p>
          </div>

          <div style={{ background: "rgba(249,115,22,0.08)", borderLeft: `3px solid ${ORANGE}`, padding: 24, alignSelf: "start" }}>
            <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: 0 }}>WHAT DIDN'T WORK</p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>
              First bet screen showed the order book like a real exchange. Testers froze. Replaced with a slider that updates the price preview live — same math, one less concept to learn. Also tried curated markets only for the first month; engagement cratered. Open authoring was the unlock, not the risk.
            </p>

            <p style={{ color: ORANGE, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", margin: "24px 0 0" }}>WHERE IT STANDS</p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>
              Live in beta with play money. The mechanic works end-to-end. Looking for testers to break it and tell me what's confusing before the next round of cuts.
            </p>
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
};

export default ValoraBetCaseStudy;
