import React from "react";
import CaseStudyLinkBanner from "@/components/project-pages/CaseStudyLinkBanner";
import ProjectNav from "@/components/project-pages/ProjectNav";
import ProjectSeo from "@/components/project-pages/ProjectSeo";
import heroImg from "@/assets/projects/nudgeme.png";

const TEAL = "#0D9B73";
const TEAL_DARK = "#0B8463";
const SURFACE = "#F0FAF7";
const INK = "#111827";
const SUBDUED = "#6B7280";
const BORDER = "#E5E7EB";

const features = [
  { title: "Type the way you'd say it", desc: "\"Call mom Tuesday 6pm\" or \"Gym Mon Wed Fri 7am\" — it understands plain English. No forms, no dropdowns." },
  { title: "Repeats that actually work", desc: "Weekly, every other week, weekdays, custom — just type it in a sentence and the app handles the rest." },
  { title: "Get nudged your way", desc: "Pick how you want to be reminded: in the app, browser pop-up, email, or text message. On time, or 5 minutes early." },
  { title: "Add it to your phone", desc: "Install it on your home screen like a real app — works on iPhone and Android. Reminders still fire when the tab is closed." },
  { title: "Try before you sign up", desc: "Type a reminder first, make an account after. Your reminder doesn't disappear when you sign up." },
  { title: "Keeps you safe", desc: "If you accidentally type a password or credit card number, it warns you before saving. Nothing private gets logged." },
];

const dataPoints = [
  { k: "How fast it reads you", v: "Instant" },
  { k: "How often it checks", v: "Every 15–60s" },
  { k: "Repeats supported", v: "Any schedule" },
  { k: "Ways to get nudged", v: "App · Pop-up · Email · Text" },
];

const flow = [
  { step: "01", title: "Type", desc: "Write your reminder the way you'd say it out loud." },
  { step: "02", title: "Preview", desc: "The app shows what it understood — title, date, time, repeat. Edit anything that's off." },
  { step: "03", title: "Save", desc: "Not signed up yet? Quick signup keeps your reminder. Already in? Done — you'll see a confirmation." },
  { step: "04", title: "Nudge", desc: "When it's time, you get the reminder on whichever channel you picked." },
];

const NudgeMePromo: React.FC = () => (
  <div style={{ background: "#fff", color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo
      slug="nudgeme"
      title="NudgeMe — Natural-Language Reminder PWA"
      description="A reminder app that parses plain English into structured schedules. Recurring rules, multi-channel delivery, installable PWA. Built on React + Supabase."
      image={heroImg}
    />

    <CaseStudyLinkBanner slug="nudgeme" bg="#fff" color="#111827" accent="#0D9B73" />
      <ProjectNav
      brand={<span style={{ color: INK, fontWeight: 700 }}>NudgeMe</span>}
      links={[
        { label: "Home", href: "#hero" },
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#flow" },
      ]}
      cta={{ label: "Try NudgeMe →", href: "https://nudgeme.rip" }}
      bg="rgba(255,255,255,0.9)"
      border={`1px solid ${BORDER}`}
      textColor={INK}
      backColor="rgba(17,24,39,0.55)"
      ctaBg={TEAL}
      ctaColor="#fff"
    />

    {/* HERO */}
    <section id="hero" style={{ position: "relative", padding: "96px 24px 64px", textAlign: "center", background: `linear-gradient(180deg, ${SURFACE} 0%, #fff 100%)` }}>
      <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>
        SHIPPED PRODUCT · <span style={{ color: TEAL_DARK }}>● LIVE at nudgeme.rip</span>
      </p>
      <h1 style={{ color: INK, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 700, lineHeight: 1.1, margin: "20px auto 16px", maxWidth: 900, letterSpacing: "-0.02em" }}>
        Remember everything.<br />Forget nothing.
      </h1>
      <p style={{ color: SUBDUED, fontSize: 18, lineHeight: 1.6, maxWidth: 640, margin: "0 auto 32px" }}>
        Type reminders the way you'd say them out loud. NudgeMe parses natural language into recurring schedules and ships notifications across browser, email, and SMS — all from one input.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
        <a href="https://nudgeme.rip" target="_blank" rel="noopener noreferrer"
          style={{ background: TEAL, color: "#fff", padding: "14px 26px", borderRadius: 12, fontWeight: 600, textDecoration: "none", minHeight: 52, display: "inline-flex", alignItems: "center", boxShadow: "0 10px 30px -12px rgba(13,155,115,0.55)" }}>
          Try NudgeMe Free →
        </a>
        <a href="#flow"
          onClick={(e) => { e.preventDefault(); document.querySelector("#flow")?.scrollIntoView({ behavior: "smooth" }); }}
          style={{ border: `1.5px solid ${BORDER}`, color: INK, padding: "14px 26px", borderRadius: 12, fontWeight: 600, textDecoration: "none", background: "#fff", minHeight: 52, display: "inline-flex", alignItems: "center" }}>
          See How It Works
        </a>
      </div>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <img src={heroImg} alt="NudgeMe app showing natural-language reminder input with active recurring and one-time reminders"
          style={{ width: "100%", borderRadius: 16, boxShadow: "0 30px 80px -20px rgba(15,23,42,0.25)", border: `1px solid ${BORDER}` }} />
      </div>
    </section>

    {/* DATA STRIP */}
    <section style={{ background: "#fff", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
        {dataPoints.map((d) => (
          <div key={d.k} style={{ textAlign: "center" }}>
            <div style={{ color: TEAL, fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em" }}>{d.v}</div>
            <div style={{ color: SUBDUED, fontSize: 12, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.12em" }}>{d.k}</div>
          </div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section id="features" style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textAlign: "center", margin: 0 }}>WHAT IT DOES</p>
        <h2 style={{ color: INK, fontSize: 40, fontWeight: 600, margin: "8px 0 56px", textAlign: "center", letterSpacing: "-0.02em" }}>
          Reminders without the friction.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: SURFACE, color: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginBottom: 16, border: `1px solid #BBEAD9` }}>✓</div>
              <h3 style={{ color: INK, fontSize: 17, fontWeight: 600, margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: SUBDUED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FLOW */}
    <section id="flow" style={{ background: SURFACE, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textAlign: "center", margin: 0 }}>HOW IT WORKS</p>
        <h2 style={{ color: INK, fontSize: 36, fontWeight: 600, margin: "8px 0 48px", textAlign: "center", letterSpacing: "-0.02em" }}>
          Type → preview → nudge.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {flow.map((s) => (
            <div key={s.step} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24 }}>
              <div style={{ color: TEAL, fontSize: 12, fontWeight: 700, letterSpacing: "0.18em" }}>{s.step}</div>
              <h3 style={{ color: INK, fontSize: 18, fontWeight: 600, margin: "8px 0" }}>{s.title}</h3>
              <p style={{ color: SUBDUED, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* WHY — Decisions, tradeoffs, AI-honesty */}
    <section style={{ background: SURFACE, padding: "96px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>THE REAL PROBLEM</p>
        <h2 style={{ color: INK, fontSize: 30, fontWeight: 600, margin: "8px 0 16px", letterSpacing: "-0.02em" }}>
          Calendar apps are too much. Notes apps don't ping you.
        </h2>
        <p style={{ color: SUBDUED, fontSize: 17, lineHeight: 1.75 }}>
          Every reminder app makes you click through three screens before you can save the thing. By the time you're done, you've forgotten what you wanted to remember. The design job wasn't a prettier form — it was making one sentence the entire input, and trusting the parser enough that the preview screen is the only correction surface a user ever needs.
        </p>

        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: "36px 0 0" }}>KEY DECISIONS</p>
        <ul style={{ color: SUBDUED, fontSize: 16, lineHeight: 1.75, paddingLeft: 20, margin: "8px 0 0" }}>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: INK }}>Natural-language input over a form.</strong> Chose a single sentence over the calendar-app pattern of date picker + time picker + repeat dropdown because the form is where reminders die. Tradeoff: the parser has to handle real human phrasing — slang, typos, "next tues" — and a visible preview step exists specifically so a misread can be fixed in one tap instead of a re-entry.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong style={{ color: INK }}>Save first, sign up after.</strong> Chose letting strangers type a reminder before creating an account over the standard auth-wall onboarding because the friction kills the demo. Tradeoff: anonymous draft storage and a quiet account merge on signup, but I get to watch real first-use behavior instead of post-signup behavior.
          </li>
          <li>
            <strong style={{ color: INK }}>Block private data at the input layer.</strong> Chose pattern-matching for passwords, card numbers, and SSNs at parse time over a generic privacy disclaimer because users will type sensitive things into any free-text field eventually. Tradeoff: occasional false positives on legitimate strings, mitigated with a one-tap override.
          </li>
        </ul>

        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: "36px 0 0" }}>AI vs. JUDGMENT</p>
        <p style={{ color: SUBDUED, fontSize: 16, lineHeight: 1.75, marginTop: 8 }}>
          AI handled the LLM parser, the Supabase schema, the recurrence engine, the multi-channel dispatch (browser, email, SMS), and the PWA install plumbing. What I wouldn't let it decide: when the parser is confident enough to skip the preview step. That's a trust call — get it wrong and silent misreads become missed reminders, which is the one failure mode the product can't survive.
        </p>

        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: "36px 0 0" }}>WHAT DIDN'T WORK</p>
        <p style={{ color: SUBDUED, fontSize: 16, lineHeight: 1.75, marginTop: 8 }}>
          First version auto-saved on parse with no preview. Sounded clean; produced silent misreads users only caught when the reminder didn't fire. Added the preview step back. Also tried push notifications without a PWA install — iOS Safari kills them. The "Add to Home Screen" step became a real onboarding moment, not a footnote.
        </p>

        <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, borderLeft: `3px solid ${TEAL}`, padding: 20, marginTop: 32 }}>
          <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>STATUS</p>
          <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.6, marginTop: 8 }}>
            Live at nudgeme.rip. Free plan keeps 5 reminders with browser pop-ups. Premium ($9/mo) unlocks repeating reminders, email, and text. Pro ($19/mo) adds Google Calendar sync. Looking for testers and feedback.
          </p>
        </div>
      </div>
    </section>

    {/* BOTTOM CTA */}
    <section style={{ background: INK, padding: "88px 24px", textAlign: "center" }}>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
        Stop forgetting. Start nudging.
      </h2>
      <p style={{ color: "rgba(255,255,255,0.7)", marginTop: 12, fontSize: 16 }}>Free during beta. No credit card.</p>
      <a href="https://nudgeme.rip" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", marginTop: 28, background: TEAL, color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 600, textDecoration: "none", minHeight: 52, boxShadow: "0 10px 30px -10px rgba(13,155,115,0.6)" }}>
        Open NudgeMe →
      </a>
    </section>
  </div>
);

export default NudgeMePromo;
