import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedSEO from "@/components/seo/UnifiedSEO";

const CALENDLY = "https://calendly.com/barskyuxdesignservices/30min";

// Live products — every service claim on this page links to something a
// prospect can open and use right now. The proof rail is the pitch.
const liveProof = [
  { name: "HerbaLink", what: "Credential-gated herbalist booking", url: "https://herbalink.live", study: "/case-studies/herbalink" },
  { name: "NudgeMe", what: "Natural-language reminders (PWA)", url: "https://nudgeme.rip", study: "/case-studies/nudgeme" },
  { name: "ROI Calculator", what: "Design value modeling for finance", url: "https://roicalc.one", study: "/case-studies/roi-design-builder" },
  { name: "CatchBuddy", what: "Safety-first pickup sports matching", url: "https://catchbuddy.me", study: "/case-studies/catchbuddy" },
];

const services = [
  {
    title: "Product design",
    blurb:
      "Research, flows, and production-ready UI for web products. Strongest in the unglamorous domains — fintech, healthcare, enterprise ops — where the design problem is trust, not decoration.",
    href: "/design-services/ux-ui-design",
    proof: "Investor loan platform, enterprise data search",
    proofHref: "/project/investor-loan-app",
  },
  {
    title: "Mobile app design",
    blurb:
      "iOS, Android, and installable web apps designed on real phones, not device frames in Figma. Onboarding, ergonomics, and the offline and permission edge cases that decide app-store reviews.",
    href: "/design-services/mobile-app-design",
    proof: "CatchBuddy, NudgeMe — both live",
    proofHref: "/case-studies/catchbuddy",
  },
  {
    title: "Design + build",
    blurb:
      "The full loop: I design it, then ship it as working software — React front end, Supabase back end, auth, payments, deploys. One person, no handoff loss, working URL at the end.",
    href: "/design-services/web-development",
    proof: "Every product in the rail below",
    proofHref: "/case-studies",
  },
];

const weeks = [
  {
    label: "Day 1",
    title: "The call",
    detail: "30 minutes. You describe the problem; I tell you honestly whether I'm the right person for it and what I'd do first. No deck, no discovery-phase invoice.",
  },
  {
    label: "Days 2–5",
    title: "Something clickable",
    detail: "Not wireframes — a working prototype of the riskiest part of your product, built with the same AI-assisted workflow I use on my own products. We learn if the idea holds before you commit real budget.",
  },
  {
    label: "Weeks 2–6",
    title: "Ship and iterate",
    detail: "Weekly drops of working software or production-ready design, tested with real users where they exist. You see progress as URLs, not status updates.",
  },
];

const goodFit = [
  "Zero-to-one products that need design and a working build",
  "AI features that need judgment about what not to automate",
  "Regulated or trust-heavy domains: fintech, health, legal",
  "Founders who want one senior person, not an account team",
];

const notFit = [
  "Brand identity or marketing-site-only engagements",
  "Projects that need a 10-person agency and a program manager",
  "Teams looking for production staffing by the hour",
];

const Services: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-background">
    <UnifiedSEO />
    <Header />

    <main className="flex-grow pt-[calc(var(--header-height,64px)+32px)]">
      {/* Thesis */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">Services</p>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.05] max-w-3xl">
          Design that ships as working software.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          I'm a senior product designer who builds with an AI crew — so an engagement ends in a
          product your users can open, not a folder of mockups your engineers still have to interpret.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Book a 30-minute call <ArrowRight className="w-4 h-4" aria-hidden />
          </a>
          <Link to="/case-studies" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-blue-600 transition-colors">
            Read the case studies first
          </Link>
        </div>
      </section>

      {/* Three offers */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20" aria-labelledby="offers-heading">
        <h2 id="offers-heading" className="sr-only">What I offer</h2>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {services.map((s) => (
            <div key={s.title} className="bg-background p-7 flex flex-col">
              <h3 className="text-xl font-display font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow">{s.blurb}</p>
              <p className="mt-5 text-xs text-muted-foreground">
                Proof: <Link to={s.proofHref} className="text-foreground underline underline-offset-2 hover:text-blue-600">{s.proof}</Link>
              </p>
              <Link
                to={s.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Details <ArrowRight className="w-3.5 h-3.5" aria-hidden />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Signature: engagement timeline in the site's night-sky idiom */}
      <section className="relative overflow-hidden bg-[#0d0a1a] text-white" aria-labelledby="engagement-heading">
        <div
          aria-hidden
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 12% 22%, rgba(255,255,255,0.8) 50%, transparent 51%)," +
              "radial-gradient(1px 1px at 28% 64%, rgba(255,255,255,0.5) 50%, transparent 51%)," +
              "radial-gradient(2px 2px at 44% 15%, rgba(255,255,255,0.7) 50%, transparent 51%)," +
              "radial-gradient(1px 1px at 61% 48%, rgba(255,255,255,0.45) 50%, transparent 51%)," +
              "radial-gradient(1.5px 1.5px at 76% 28%, rgba(255,255,255,0.65) 50%, transparent 51%)," +
              "radial-gradient(1px 1px at 88% 70%, rgba(255,255,255,0.5) 50%, transparent 51%)," +
              "radial-gradient(1.5px 1.5px at 8% 82%, rgba(255,255,255,0.4) 50%, transparent 51%)," +
              "radial-gradient(1px 1px at 52% 86%, rgba(255,255,255,0.55) 50%, transparent 51%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <p className="text-sm font-semibold tracking-widest text-sky-300 uppercase mb-3">How an engagement runs</p>
          <h2 id="engagement-heading" className="text-3xl md:text-4xl font-display font-bold max-w-2xl">
            You see working software before you see an invoice for phase two.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {weeks.map((w) => (
              <div key={w.label} className="border-t border-white/20 pt-5">
                <p className="text-xs font-semibold tracking-widest text-sky-300 uppercase">{w.label}</p>
                <h3 className="mt-2 text-lg font-display font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof rail — live products */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20" aria-labelledby="proof-heading">
        <h2 id="proof-heading" className="text-2xl md:text-3xl font-display font-semibold text-foreground">
          Don't take the page's word for it.
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          These are live products I designed and built end-to-end. Open one, break something, then read how it was made.
        </p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {liveProof.map((p) => (
            <li key={p.name} className="py-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-lg font-display font-semibold text-foreground hover:text-blue-600"
              >
                {p.name} <ArrowUpRight className="w-4 h-4 text-muted-foreground" aria-hidden />
              </a>
              <span className="text-sm text-muted-foreground flex-grow">{p.what}</span>
              <Link to={p.study} className="text-sm font-medium text-blue-600 hover:text-blue-700 underline underline-offset-2">
                Case study
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Fit — honest qualification */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20" aria-labelledby="fit-heading">
        <h2 id="fit-heading" className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-8">
          Whether we should talk
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">A good fit</h3>
            <ul className="space-y-3">
              {goodFit.map((f) => (
                <li key={f} className="text-foreground leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-2 before:h-2 before:rounded-full before:bg-blue-600">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-muted-foreground uppercase mb-4">Not a fit</h3>
            <ul className="space-y-3">
              {notFit.map((f) => (
                <li key={f} className="text-muted-foreground leading-relaxed pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-2 before:h-2 before:rounded-full before:bg-border">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-grow">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
              Thirty minutes. Bring the hard problem.
            </h2>
            <p className="mt-2 text-muted-foreground">
              If I'm not the right person for it, I'll say so on the call and point you somewhere better.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              Book a call <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
            <a href="mailto:hbarsky01@gmail.com" className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-blue-600">
              Or email me
            </a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Services;
