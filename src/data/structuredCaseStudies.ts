import React from "react";
import {
  Zap,
  BarChart4,
  XCircle,
  Sparkles,
  Settings,
  Truck,
  Package,
  Users,
  Target,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  Wrench,
  Badge,
  Search,
  Eye,
  TrendingUp,
  Shield,
  TrendingDown,
  DollarSign,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { StructuredCaseStudySectionProps } from "@/components/case-study/structured/StructuredCaseStudySection";

export interface EmergingTheme {
  eyebrow: string;
  insight: string;
  drove: string;
}

export interface ResearchSection {
  subhead: string;
  blurb?: string;
  emergingThemes: EmergingTheme[];
  researchImage?: string;
  researchImageAlt?: string;
  researchImages?: { src: string; alt: string; caption?: string; annotations?: ImageAnnotation[] }[];
  researchVideo?: string;
}

export interface IdeationBubble {
  title: string;
  description: string;
}

export interface ImageAnnotation {
  text: string;
  x: number; // percentage from left
  y: number; // percentage from top
  type?: "issue" | "improvement" | "feature";
}

export interface IdeationIteration {
  label: string;
  imageSrc: string;
  alt: string;
  blurb?: string;
  annotations?: ImageAnnotation[];
}

export interface IdeationSection {
  subhead: string;
  bubbles: IdeationBubble[];
  wireframeImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  iterations?: IdeationIteration[];
}

export interface ClientTestimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
}

export interface ProjectContext {
  timeline: string;
  team: string;
  budget: string;
  companySize: string;
  industry: string;
}

export interface PostLaunchMetrics {
  timeframe: string;
  usage: string;
  retention: string;
  businessImpact: string;
}

export interface TechnicalImplementation {
  challenges: string[];
  solutions: string[];
  accessibility: string[];
  performance: {
    loadTime: string;
    mobileOptimization: string;
    browserSupport: string;
  };
}

export interface TechStack {
  aiTools?: string[];
  devStack?: string[];
  designTools?: string[];
}

export interface StructuredCaseStudyData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  techStack?: TechStack;
  heroVideo?: {
    src: string;
    poster: string;
    alt: string;
  };
  heroImage?: {
    src: string;
    alt: string;
  };
  heroMetrics?: {
    value: string;
    label: string;
  }[];
  // NEW: Business Context & Credibility
  projectContext?: ProjectContext;
  clientTestimonial?: ClientTestimonial;
  postLaunchSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    metrics: PostLaunchMetrics;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
  technicalImplementation?: TechnicalImplementation;
  // EXISTING sections
  researchSection?: ResearchSection;
  problemCallout?: {
    eyebrow: string;
    statement: string;
  };
  sprintZeroSection?: {
    eyebrow: string;
    title: string;
    workshopKickoff: string;
    explorations: string;
    decisionPoint: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  keyInsights?: {
    number: number;
    title: string;
    description: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  }[];
  keyInsightsVideo?: {
    src: string;
    title: string;
    caption?: string;
  };
  ideationSection?: IdeationSection;
  myThoughtProcessSection?: {
    eyebrow: string;
    title: string;
    content: string;
    video?: {
      src: string;
      title: string;
      caption?: string;
    };
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  userTestingSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    video?: {
      src: string;
      title: string;
      caption?: string;
    };
    metrics?: Array<{
      value: string;
      label: string;
    }>;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
  whatDidntWorkSection?: {
    eyebrow: string;
    title: string;
    content: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  finalProductSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
    video?: {
      src: string;
      title: string;
      caption?: string;
    };
  };
  outcomeSection?: {
    title: string;
    description: string;
    eyebrow?: string;
    metrics?: Array<{
      value: string;
      label: string;
    }>;
    images?: Array<{
      src: string;
      alt: string;
      caption?: string;
      annotations?: ImageAnnotation[];
    }>;
  };
  sections: StructuredCaseStudySectionProps[];
  projectLink?: string;
  gradientClasses?: string;
  seoData?: {
    image: string;
    projectName: string;
    results: string[];
    technologies: string[];
    path: string;
  };
}

export const structuredCaseStudies: Record<string, StructuredCaseStudyData> = {
  "firelion": {
    id: `firelion`,
    title: `Fire Lion`,
    description: `A one-tap arcade runner where you spell words mid-flight to cast spells. Shipped solo with AI as a build partner — to prove a designer can ship a real game, not another calculator demo.`,
    tags: [`Game`, `Solo + AI`, `Mobile Web`],
    heroImage: {
      src: `/images/firelion-hero-title.png`,
      alt: `Fire Lion title screen — Cub Mode and Fly Now entry points with a winged fire lion hero illustration`,
    },
    projectLink: `https://firelion.me`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Most "I built X with AI" portfolios are a calculator, a dashboard, a productized audit. They're safe and forgettable. I wanted the hardest possible answer to "can a designer ship a real product solo with AI?" — a game. Games have to feel right. You can't fake game feel with a prompt.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: One world. One lion sprite. Tap to flap, dodge obstacles, count coins. No words. No evolution. No worlds. No shop. No audio. The whole point of v1 was a single question — does the tap-to-fly feel good? Until that felt right, nothing else mattered.\n\nThe spelling mechanic: letters appear mid-flight, you spell words on the fly, and complete words cast spells that warp the world around you. Lightning strike. Shield. Nuke. The runner is the body; the spelling is the brain.\n\nWhat AI did: Component scaffolding, Tailwind tokens, Supabase schemas and RLS policies, Canvas collision math, particle systems, sprite animation timing, refactors that touched 30+ files without breaking the build. Procedural chiptune via Web Audio. A pre-commit Python script that fails the build if any sprite ships with a white matte halo. A game-spec.md memory file the AI updates after every change, so the next session has perfect context.\n\nWhat I judged: What the game is (a word-spelling lava runner is a design call, not a prompt result). Game feel — every gravity tweak, tap impulse, scroll curve, evolution threshold, tuned by hand over hundreds of runs. The visual identity (Bebas Neue + Barlow Condensed + DM Mono, #FF4500 ember palette). When something feels broken vs. intentional. And the one rule that mattered most: what to delete.\n\nOne game, three modes: Fire Lion isn't a single mode. Lion Wars (a naval combat side game) and Cub Mode (a top-down stomp game for a baby lion) live in the same app. Lion Wars originally triggered between worlds in the main runner — players hated being yanked out of flow. I pulled the trigger entirely. Designers ship by deleting entry points, not deleting code. Cub Mode has one ironclad rule, enforced in the AI memory file: Cub Mode is never touched by main game changes.`,
      images: [
        { src: `/images/firelion-gameplay-lavagod.png`, alt: `Main runner gameplay — Lava God form, Wave 5, neon grid, invincibility power-up active` },
        { src: `/images/firelion-spelling-lightning.png`, alt: `Spelling mechanic in action — letters orbiting the lion as it spells "DAMN," "LIGHTNING STRIKE!" and "SPELL CAST!" callouts` },
        { src: `/images/firelion-spelling-combo.png`, alt: `Combo system — spelling "CRAP" over a lava forge anvil, 5× combo callout` },
        { src: `/images/firelion-lionwars-combat.png`, alt: `Lion Wars — naval/spaceship combat, wave 1 of 7, lava cavern backdrop` },
        { src: `/images/firelion-cubmode-sunset.png`, alt: `Cub Mode — sunset sky, tiny lion cub at "SIZE: TINY" with a HUNGRY! prompt, robot enemies floating in` },
        { src: `/images/firelion-cubmode-ocean.png`, alt: `Cub Mode — ocean scene, lion in a basket dodging falling stars` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `The deletion list got longer than the feature list. Daily missions — built it, nobody completed them. Cut. Streak system — nobody cared. Cut. Daily Wordle-style challenge — cute, no engagement. Cut. Legacy cumulative score — players only cared about this run's PB. Cut. Social proof counter ("12,847 players today") — felt like an ad. Cut. Forge pre-run upgrade screen — players wanted to play, not shop. Cut. Mod gating behind a "Lava Rank" tier — players only ever saw 2–3 of 10 modifiers. Killed the gating; every mod unlocked from run 1.\n\nBiggest lesson: building features is easy with AI. Killing features is the actual design work.\n\nOther things that broke: game feel was floaty for ~30 iterations before it stopped feeling like a balloon. The "ease new players in" slow-start mechanic backfired so hard players thought the game was broken. Boss fights were damage-sponges until I rebuilt them around telegraphed attacks with a 3-second narrative cinematic.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `A shipped game with retention loops, three modes that serve three different moods, a deletion list longer than the feature list. Self-playtested daily. Friends and family on real phones caught half the layout bugs a desktop preview never would. The thesis I'd defend: AI can scaffold a game in a week. Deciding which 80% to throw away is the year of design work that makes it playable.\n\nWhat I'd do next: Phase 2 — integrate Lion Wars pirate-ship combat directly into the runner from World 5 onward — same game, escalating threat, no mode switch. Capacitor wrapper for the App Store. Real event telemetry instead of session replay + gut. Async ghost runs against a friend's best.`,
    },
    sections: [],
    seoData: {
      image: `/images/firelion-hero-title.png`,
      projectName: `Fire Lion`,
      results: [],
      technologies: [`React`, `TypeScript`, `Tailwind`, `Canvas`, `Supabase`, `Lovable`],
      path: `/project/firelion`,
    },
  },
  "ring-rival": {
    id: `ring-rival`,
    title: `Ring-Rival`,
    description: `A retro arcade boxing game built for the mobile browser. AI opponents with distinct fighting styles, AI-generated trash talk, career mode with championship belts. Built solo with AI as a co-builder.`,
    tags: [`Game`, `Solo + AI`, `Mobile Web`],
    heroImage: {
      src: `/images/ringrival-hero-title.png`,
      alt: `Ring-Rival title screen — angry boxer hero image, Start Career and Settings buttons, "Mobile Boxing" subtitle`,
    },
    projectLink: `https://rival.li`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Boxing games are usually console territory — they demand tight input latency, animation feel, and AI that reads like a real opponent. Doing that with a thumb on a phone screen, in a browser, no install, no native code, was the constraint that made it interesting. Could a designer-developer push a Punch-Out!-style experience that far on mobile web?`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: Smallest playable loop — one opponent (Glass Joe), static background, two touch buttons (punch and block), a health bar, a timer, a KO state. No AI, no career, no audio. Just one question — can a punch feel good on a phone screen?\n\nThe control system: Tap for jabs, swipe up for hooks, swipe down for body shots, swipe sideways to dodge, two-finger press to block, dodge-then-punch for a 2× counter. Every input had to map to something a thumb can do on a phone without taking eyes off the screen. The pre-fight modal isn't a tutorial — it's a 5-second briefing players see before each fight, then dismiss.\n\nWhat AI did: Fighter sprite generation via Gemini image preview — what would have been weeks of pixel art became a prompt-iteration loop. In-character trash talk per opponent and per fight state (player winning, losing, near-KO) so each fighter has a voice without me writing dialogue trees. Bombastic announcer intros via generate-fight-intro. Crowd mood + short musical stings that modulate based on round momentum. A ComboRhythm + EmotionEngine AI loop where opponents bait, hesitate, and tilt based on how the player is doing. Pattern analysis that reads recent player inputs — spam jabs and opponents start countering jabs specifically.\n\nWhat I judged: Game feel. No model knows whether a punch feels like a punch — hit-stop duration, screen shake amplitude, the 60ms haptic on connect, the curve of the health bar drain. Hundreds of test fights, hand-tuned. Difficulty curve — AI can generate opponents endlessly; deciding the order (Glass Joe → Von Kaiser → Bald Bull → … → Mike Tyson-equivalent) is design, not generation. Mobile ergonomics — where the punch button lives, how big the block zone is, whether the music toggle belongs top-right or in a menu. Every one of those decided by watching a real person hold a real phone. And every cut.`,
      images: [
        { src: `/images/ringrival-glassjoe-idle.png`, alt: `Glass Joe — the starter fighter in idle stance, simple silhouette designed to read instantly on a small screen` },
        { src: `/images/ringrival-controls-modal.png`, alt: `VS Glass Joe pre-fight modal — full controls list with emoji icons, "Fragile Fighter" tagline, FIGHT! button` },
        { src: `/images/ringrival-vonkaiser.png`, alt: `Von Kaiser — tall, broad, defensive stance with high guard, very different silhouette from Glass Joe` },
        { src: `/images/ringrival-discodan.png`, alt: `Disco Dan — funky character with a different read again, demonstrating the per-fighter visual identity AI generation enabled` },
        { src: `/images/ringrival-knockdown.png`, alt: `Knockdown — "DOWN! 5" count with stars over a floored Glass Joe, demonstrating the hit-stop and impact feedback I hand-tuned` },
        { src: `/images/ringrival-impact-particles.png`, alt: `Glass Joe getting hit hard — red impact particles falling but tuned so the fighter stays visible behind them` },
        { src: `/images/ringrival-pause-modal.png`, alt: `Pause modal — VS Disco Dan, Resume Fight / Music Off / Forfeit, designed to be reachable mid-fight without breaking flow` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `Sprite scaling. Fighters that looked great on desktop became cartoonish or postage-stamp small on mobile depending on archetype (Bald Bull vs. Von Kaiser). Rebuilt the scaling system three times before landing on per-archetype mobileScaleBoost multipliers driven by silhouette width, not pixel height.\n\nParticle effects. Bald Bull's signature charge spawned 15 dust particles per frame during attack. On mobile it created a literal cloud you couldn't see through. Throttled to 15% of frames.\n\nAudio unlock. iOS Safari kills any audio that isn't triggered by a user gesture. Music silently failed on ~40% of first sessions until I gated the AudioContext resume behind the first tap on the title screen.\n\nAI rhythm. Early opponents threw punches at fixed intervals. Felt like fighting a metronome. The EmotionEngine rewrite fixed it.\n\nCamera permissions. An earlier version used hand-tracking via webcam. Half the testers refused the camera prompt and bounced. Cut.\n\nWhat users ignored: The 4-step calibration wizard — beautiful, nobody read it. The daily challenges modal — under 5% click-through. The how-to page — 6 testers, zero opened it before their first fight. Lesson: if the first fight doesn't teach the controls in 10 seconds, no static screen will rescue it.\n\nWhat I cut: Webcam hand-tracking + AR mode (cool demo, wrong audience). Multiplayer / leaderboards as v1 (Leaderboard component exists but is gated — shipping it required moderation I didn't want to own yet). Bonus rounds (broke the pacing). Three "premium" fighters that were narratively interesting but mechanically duplicates.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Real product, real users, real cuts. Time-to-first-punch went from 22 seconds to 6. Audio failure rate dropped from ~40% to under 2%. Iteration cadence most days: ship → watch one session → fix the loudest thing → reship. Three to six deploys daily.\n\nWhat I'd do next: Tutorial fight, not a tutorial screen — a scripted Glass Joe opener that teaches block + counter implicitly. Async PvP — record a player's fight as an AI replay; let friends fight that ghost. Belt animations + meta-progression that survives between sessions. Accessibility pass: color-blind palette for telegraphs, reduce-flash mode, larger tap targets as a setting. Capacitor wrapper for the App Store, primarily for haptics and offline.`,
    },
    sections: [],
    seoData: {
      image: `/images/ringrival-hero-title.png`,
      projectName: `Ring-Rival`,
      results: [],
      technologies: [`React`, `TypeScript`, `Vite`, `Canvas 2D`, `Web Audio`, `Supabase`, `Lovable AI Gateway`, `ElevenLabs`],
      path: `/project/ring-rival`,
    },
  },
  "catchbuddy": {
    id: `catchbuddy`,
    title: `CatchBuddy`,
    description: `A location-aware web app for finding a partner — or a small group — for pickup sports in your neighborhood. Post a game, browse open games on a map, confirm in a couple of taps. Built solo with AI.`,
    tags: [`Marketplace`, `Solo + AI`, `Trust & Safety`],
    heroImage: {
      src: `/images/catchbuddy-hero-landing.png`,
      alt: `CatchBuddy landing page — "Find Local Sports Partners Near You" with Browse Players and Post Your Game CTAs over a park photo`,
    },
    projectLink: `https://catchbuddy.me`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Pickup sports are dying in cities. Existing platforms are league-focused or chat-heavy — nobody wants a Slack thread to throw a baseball for 30 minutes after work. The thing missing is a low-friction, same-day match at a real park near you.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: A single-screen "post a catch request" + a map of open games. No auth. No chat. No profiles. Just one question — can two strangers agree on a park and a time? Everything else got added only after that loop worked.\n\nWhat AI did: RLS-safe Postgres schema scaffolding and the profiles_public view that limits which columns other users can see. Supabase migrations. The matching score heuristic for proximity + time relevance (visible as the 92% / 81% match badges on player cards). Edge functions for Google Calendar OAuth, Stripe Checkout, phone verification, safety-check-in monitoring. Empty-state copy. Security code review that caught issues I would have missed.\n\nWhat I judged: The trust and safety model — phone verification gates, panic button reachable from any in-game screen, emergency contacts manager, safety check-ins that escalate to a contact if missed, parental approval flow for minors, public meeting spots curated by admins. None of that's a feature an AI proposes. It's product judgment about who's actually going to use this and what could go wrong.\n\nThe 13-and-up gate is a small visible piece of a much bigger judgment call. Minors require a verified parent on file before they can post. Public meeting spots are curated, not crowdsourced. The panic button isn't tucked in a settings menu — it's reachable from every in-game screen.\n\nAlso mine: monetization tiers (Free / Pro / one-off Boost / Sponsored Parks). The demo-data toggle so first-time visitors see a populated app instead of empty states. The terminology — "Browse" and "Players" instead of "Matches," because "Matches" tested as Tinder-like.`,
      images: [
        { src: `/images/catchbuddy-signin.png`, alt: `Sign-in screen with the CatchBuddy brand and tagline "Sign in to find people to play catch with"` },
        { src: `/images/catchbuddy-post-game.png`, alt: `Post Your Game flow — sport picker (Football, Basketball, Baseball, Volleyball, Frisbee) above a park search` },
        { src: `/images/catchbuddy-choose-park.png`, alt: `Choose a Park step — searchable list of nearby parks with distance, rating, and amenities` },
        { src: `/images/catchbuddy-equipment-prefs.png`, alt: `Equipment and preferences — "I'll bring a football" selected, "No-contact only" toggled on, multi-time-slot support` },
        { src: `/images/catchbuddy-game-live.png`, alt: `Confirmation modal — "Your Game is Live!" with nearby player count and estimated views` },
        { src: `/images/catchbuddy-find-players.png`, alt: `Find Players list with compatibility scoring — player cards showing distance, meeting spot, time window, and match %` },
        { src: `/images/catchbuddy-signup-minor-gate.png`, alt: `Sign-up form — username, date of birth (with "You must be at least 13 years old" gate), email, password` },
        { src: `/images/catchbuddy-pro-pricing.png`, alt: `Pro pricing — Monthly $7.99 and Annual $59.99 ("Save 37%") side by side, with Pro feature list below` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `The Quick Start wizard on Create. Built it because onboarding seemed hard. Watched users skip it every time. Cut.\n\nThe homepage MapSection. Looked great in screenshots. Confused first-time visitors who didn't know what they were looking at. Cut.\n\nRLS recursion on profiles. A subtle policy referenced its own table and created an infinite check. AI found it on review; I would have shipped it.\n\nGeolocation permission flow on iOS Safari. Half the testers denied location and got a broken empty state. Rebuilt with a city dropdown fallback — geolocation is now an enhancement, not a requirement.\n\nCalendar OAuth state handling. Initial implementation was vulnerable to CSRF. Rewrote with HMAC-SHA256 signed state.\n\nDemo data leaking into real queries. Demo matches stored in localStorage were briefly being treated as confirmed games in My Games. Tightened the scope to a separate query path with a Demo badge.\n\nToast stacking. Users complained about notifications piling up. Auto-dismiss after 3 seconds.\n\nBottom nav layout shift. When badges appeared on icons the whole row jumped. Fixed to grid-cols-5.\n\n"Matches" nav label. Users read it as Tinder-like. Renamed to "Browse" and "Players" across the app.\n\nWhat I cut: Apple Calendar, Outlook, and ICS support — Google only. Three calendar providers was a maintenance tax for a feature most users wouldn't notice. The "Matches" navigation label. The original onboarding flow.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Real shipped app with auth, RLS, OAuth, payments, realtime, minor-approval flow, geolocation, and multi-sport scope. Stripe Checkout wired end-to-end for subscriptions and one-off game boosts. Mobile-first responsive craft with reduced-motion support throughout. The thesis I'd defend: safety can't be a bolt-on. If you're building a product where two strangers meet in person, the trust model is the product. AI can scaffold the schema; it can't decide whether a 17-year-old needs a verified parent before they can post.\n\nWhat I'd do next: Native shells for push notifications and background safety check-ins. Park-anchored micro-groups and a weekly "regulars" leaderboard. Recurring weekly games. A reputation graph that goes beyond show-up rate. Stripe Connect for optional pro coaches.`,
    },
    sections: [],
    seoData: {
      image: `/images/catchbuddy-hero-landing.png`,
      projectName: `CatchBuddy`,
      results: [],
      technologies: [`React`, `Vite`, `TypeScript`, `Tailwind`, `Supabase`, `Leaflet`, `Stripe`],
      path: `/project/catchbuddy`,
    },
  },
  "herbalink": {
    id: `herbalink`,
    title: `HerbaLink`,
    description: `A booking platform for verified herbalists. Designed and shipped solo with AI as a co-builder. Built around the realization that the product isn't search — it's trust.`,
    tags: [`Health`, `Marketplace`, `Trust & Safety`],
    heroVideo: {
      src: `https://barskyux.com/wp-content/uploads/2025/07/HerbaLink-Book-A-Herbalist-1.mp4`,
      poster: `https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png`,
      alt: `HerbaLink booking platform overview`,
    },
    projectLink: `http://herbalink.live`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `People are turning to herbalism for anxiety, fatigue, conditions conventional medicine isn't addressing for them. The discovery experience is a mess: Instagram practitioners with no credentials, Google results that mix certified herbalists with people who took a weekend workshop, supplements that interact dangerously with prescription medication. One quote from research stuck with me: "I found this herbalist on Instagram who promised to cure my anxiety with a $200 tincture. Turns out she had zero credentials and the herbs made me violently sick." That's not a search problem. It's a trust and safety problem.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: A giant filterable database of every herbalist I could find. Sport, modality, condition, location, price, availability — all the filters. It was the wrong product.\n\nWhat AI did: Component scaffolding, the Supabase schema, RLS policies, edge functions for booking and notifications. Drafting the symptom intake question structure. Writing the boilerplate copy for empty states. Generating the practitioner profile layout variants I A/B'd against each other.\n\nWhat I judged: The credential-verification model. AI doesn't know what the American Herbalists Guild is, doesn't know which certifications matter for which conditions, doesn't know that "verified" as a badge on a Yelp-style profile is meaningfully different from "verified" as a gate that controls whether you appear at all. That distinction is the entire product. Also: which safety warnings go on the booking page vs. the FAQ. Which sources count as legitimate citations. When to refuse to list a practitioner whose credentials don't check out, even though removing them shrinks the catalog.\n\nWhat I cut: Open-ended search. Filter panels for modality and price. The comprehensive symptom diary. Any practitioner whose credentials I couldn't verify against an external registry — even when removing them shrank the catalog visibly.`,
      images: [
        { src: `https://barskyux.com/wp-content/uploads/2025/08/AHG-directory-2025-release-animation-1.gif`, alt: `AHG directory — grid of herbal schools` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/findanherbalistsketch.png`, alt: `Initial concepts & sketches` },
        { src: `https://barskyux.com/wp-content/uploads/2025/08/ChatGPT-Image-Aug-19-2025-11_19_58-PM.png`, alt: `User flow explorations` },
        { src: `https://i0.wp.com/barskyux.com/wp-content/uploads/2025/07/UserFlow.png?fit=1232%2C928&ssl=1`, alt: `HerbaLink user flow from onboarding to booking` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `Hiccup`,
      content: `The giant filterable database was the wrong product. Testing the filter-heavy version was brutal. One user said: "This feels like trying to diagnose myself on WebMD." They didn't want to filter. They wanted to describe what was wrong and be matched. Redesigned closer to a triage intake than a search bar.\n\nWhen users say they want more options, they often mean they want more confidence in the option they pick. Adding 200 practitioners made things worse, not better.\n\nThe comprehensive symptom tracker. Started as a health diary with mood, sleep, supplements, side effects, energy levels. Users opened it twice and abandoned it. Cut it back to one question: "what changed since last visit?" That one they use.\n\n"Verified" as a badge instead of a gate. First version let anyone list themselves and slapped a badge on profiles that passed a basic check. Inverted the whole thing: practitioners aren't visible at all until credentials are checked against the American Herbalists Guild or equivalent. No unverified tier. Smaller catalog, more honest one.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Early users described it as feeling more like booking a doctor than browsing a wellness app. That was the shift I was after. The thesis I'd defend: in a category dominated by misinformation, the design job is to make the safe path the easy path. Not to add warnings to the unsafe path. AI can build the directory in a weekend. Deciding who doesn't appear in it is the actual product.\n\nWhat I'd do next: Practitioner-side tools — calendar management, intake review, secure messaging with attachments. A medication-interaction checker on the booking page that pulls from a real pharmacology database, not a static list. A follow-up flow that prompts "what changed since last visit?" 7 days post-appointment.`,
    },
    sections: [],
    seoData: {
      image: `https://barskyux.com/wp-content/uploads/2025/08/Bookanherbalistpromomobile.png`,
      projectName: `HerbaLink`,
      results: [],
      technologies: [],
      path: `/project/herbalink`,
    },
  },
};

export const getStructuredCaseStudy = (id: string): StructuredCaseStudyData | null => {
  return structuredCaseStudies[id] || null;
};
