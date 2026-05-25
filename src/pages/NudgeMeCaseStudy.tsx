import React from "react";
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
  { title: "Type the way you'd say it", desc: "\"Call mom Tuesday 6pm\" or \"Gym Mon Wed Fri 7am\" — Chrono-NLP plus a rules engine parse it in 300ms, no forms." },
  { title: "Real recurring schedules", desc: "RFC 5545 RRULE under the hood. Weekly, biweekly, weekdays, custom intervals, end dates, occurrence caps — all from one sentence." },
  { title: "Multi-channel delivery", desc: "In-app modal, Web Push, Email, SMS. Pick exact time, 5-minute early, or both. Scheduler dedupes and catches missed pings on tab return." },
  { title: "Installable PWA", desc: "Add to home screen on iOS and Android. Service worker handles background sync and push when the tab is closed." },
  { title: "Guest-friendly", desc: "Type a reminder before you sign up. Device ID preserves it. Account creation is one screen, context survives the modal." },
  { title: "Safety-aware parser", desc: "Detects password, credit card, and SSN-like content. Warns before saving — never auto-blocks, never silently logs." },
];

const dataPoints = [
  { k: "Parse latency", v: "300ms" },
  { k: "Scheduler poll", v: "15–60s adaptive" },
  { k: "Recurrence spec", v: "RFC 5545" },
  { k: "Channels", v: "App · Push · Email · SMS" },
];

const flow = [
  { step: "01", title: "Type", desc: "User types naturally in the main textarea. Chrono + rules parser run in parallel." },
  { step: "02", title: "Preview", desc: "300ms debounce. Title, date, time, recurrence appear inline. Every field is editable." },
  { step: "03", title: "Save", desc: "Guest? Signup modal preserves context. Logged in? Reminder is created and confirmed via toast." },
  { step: "04", title: "Nudge", desc: "Edge function polls due reminders. Push/Email/SMS fires on the configured channel and timing." },
];

const NudgeMeCaseStudy: React.FC = () => (
  <div style={{ background: "#fff", color: INK, minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
    <ProjectSeo
      slug="nudgeme"
      title="NudgeMe — Natural-Language Reminder PWA"
      description="A reminder app that parses plain English into structured schedules. Recurring rules, multi-channel delivery, installable PWA. Built on React + Supabase."
      image={heroImg}
    />

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

    {/* STACK */}
    <section id="stack" style={{ background: "#fff", padding: "96px 24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>UNDER THE HOOD</p>
        <h2 style={{ color: INK, fontSize: 32, fontWeight: 600, margin: "8px 0 24px", letterSpacing: "-0.02em" }}>Built to ship.</h2>
        <p style={{ color: SUBDUED, fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
          React 18 + TypeScript + Vite on the front. Tailwind with a custom token system (teal primary, no purple, no indigo). Supabase Postgres with row-level security, Supabase Auth, and ten edge functions for scheduling, push, SMS verification, Google Calendar OAuth, and email. The parser is fully client-side: Chrono-node and a rules engine run in parallel, reconcile by confidence, then extract titles, flags, and importance scores. Recurrence is real RFC 5545 RRULE — not a fake "every X days" hack.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 12 }}>
          {[
            "React 18 · TypeScript · Vite",
            "Tailwind · Custom tokens",
            "Supabase · Postgres + Edge",
            "Chrono-node + rules parser",
            "RFC 5545 RRULE",
            "Web Push · PWA · Service Worker",
            "Twilio SMS · Email",
            "Google Calendar OAuth",
          ].map((t) => (
            <div key={t} style={{ background: SURFACE, border: `1px solid #BBEAD9`, borderRadius: 999, padding: "8px 14px", color: TEAL_DARK, fontSize: 13, fontWeight: 500, textAlign: "center" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* WHY */}
    <section style={{ background: SURFACE, padding: "96px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>WHY I BUILT THIS</p>
        <h2 style={{ color: INK, fontSize: 30, fontWeight: 600, margin: "8px 0 20px", letterSpacing: "-0.02em" }}>
          Calendar apps are too much. Notes apps are not enough.
        </h2>
        <p style={{ color: SUBDUED, fontSize: 17, lineHeight: 1.75 }}>
          Every reminder app I've used wants me to click through three screens before I can save the thing. By the time I'm done, I've forgotten what I wanted to remember. NudgeMe lets me type a sentence — and the parser handles the date, the repeat, the timezone. The hard part wasn't the UI. It was building a parser that handles ambiguity gracefully: knowing when to ask, when to assume, and when to warn the user before they save a password as a reminder.
        </p>
        <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, borderLeft: `3px solid ${TEAL}`, padding: 20, marginTop: 28 }}>
          <p style={{ color: TEAL, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", margin: 0 }}>STATUS</p>
          <p style={{ color: "#334155", fontSize: 15, lineHeight: 1.6, marginTop: 8 }}>
            Live PWA at nudgeme.rip. Free tier: 5 active reminders, browser notifications. Premium ($9/mo) unlocks recurring, email, SMS. Professional ($19/mo) adds Google Calendar sync. Stripe billing is wired to the UI; processing goes live next.
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

export default NudgeMeCaseStudy;
