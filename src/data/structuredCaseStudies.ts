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
    description: `A one-tap arcade runner where you spell words mid-flight to cast spells. Built solo with AI.`,
    tags: [`Game`, `Solo + AI`, `Mobile Web`],
    heroImage: {
      src: `/images/firelion-hero-title.png`,
      alt: `Fire Lion title screen with Cub Mode and Fly Now buttons`,
    },
    projectLink: `https://firelion.me`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Most "I built X with AI" portfolios are a calculator or a dashboard. Safe. Forgettable. I wanted the hardest answer to "can a designer ship real product solo with AI?" — a game. You can't fake game feel with a prompt.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: one tap, one lion, no words, no worlds, no audio. Just: does the tap-to-fly feel good?\n\nThe mechanic: spell words mid-flight. Complete words cast spells.\n\nWhat AI did: scaffolding, Tailwind tokens, Supabase schemas, Canvas collision math, particle systems, refactors across 30+ files in one pass, procedural chiptune, a pre-commit script that fails the build if any sprite ships with a white matte halo.\n\nWhat I judged: what the game is. Game feel — every gravity tweak and tap impulse, hand-tuned over hundreds of runs. The visual identity. And the thing AI can't do: what to delete.\n\nLion Wars — a naval combat side-game that originally triggered between worlds. Players hated being yanked out of flow. Pulled the trigger entirely. Code stays for Phase 2.\n\nCub Mode — a separate top-down stomp game for a baby lion. One rule, enforced in the AI memory file: Cub Mode is never touched by main game changes. Separate component, separate audio, separate state.`,
      images: [
        { src: `/images/firelion-gameplay-lavagod.png`, alt: `Main runner gameplay, Lava God form, Wave 5, invincibility power-up` },
        { src: `/images/firelion-spelling-lightning.png`, alt: `Lightning Strike spell casting from spelling MN` },
        { src: `/images/firelion-spelling-combo.png`, alt: `Spelling CRAP over a lava forge anvil, 5× combo` },
        { src: `/images/firelion-lionwars-combat.png`, alt: `Lion Wars naval combat, wave 1 of 7, lava cavern backdrop` },
        { src: `/images/firelion-cubmode-sunset.png`, alt: `Cub Mode sunset scene with tiny lion cub and robot enemies` },
        { src: `/images/firelion-cubmode-ocean.png`, alt: `Cub Mode ocean scene with lion in a basket dodging stars` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `The Deletion List Got Longer Than the Feature List`,
      content: `- Daily missions — nobody completed them\n- Streak system — nobody cared\n- Daily word challenge — cute, no engagement\n- Legacy cumulative score — players only cared about this run\n- Social proof counter — felt like an ad\n- Forge upgrade screen — players wanted to play, not shop\n- Mod gating — players only saw 2–3 of 10 modifiers, killed the gating\n\nBuilding features is easy with AI. Killing features is the actual design work.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Three modes, three moods. A shipped game. A deletion list longer than its feature list. Self-playtested daily.\n\nThe thesis: AI can scaffold a game in a week. Deciding which 80% to throw away is the year of work that makes it playable.\n\nWhat's next: integrate Lion Wars into the main runner from World 5 onward. Capacitor wrapper for the App Store. Real event telemetry. Async ghost runs against a friend's best.`,
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
    description: `A retro arcade boxing game for the mobile browser. Distinct AI opponents, AI-generated trash talk, career mode. Built solo.`,
    tags: [`Game`, `Solo + AI`, `Mobile Web`],
    heroImage: {
      src: `/images/ringrival-hero-title.png`,
      alt: `Ring-Rival title screen with Start Career button`,
    },
    projectLink: `https://rival.li`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Boxing games live on consoles for a reason. Tight input latency, animation feel, AI that reads like a real opponent. Doing all that with a thumb on a phone — in a browser, no install — was the constraint that made it interesting.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: one opponent, two buttons, a health bar. Can a punch feel good on a phone screen?\n\nThe controls: tap, swipe, two-finger block, dodge-then-punch for a 2× counter. Five seconds before each fight, then dismiss.\n\nWhat AI did: sprite generation via Gemini — weeks of pixel art became a prompt loop. In-character trash talk per opponent and per fight state. Announcer intros. Crowd mood that modulates with round momentum. An EmotionEngine where opponents bait, hesitate, and tilt. Each fighter has a voice without me writing a dialogue tree.\n\nWhat I judged: game feel. No model knows whether a punch feels like a punch — hit-stop duration, screen shake, the 60ms haptic on connect. Hundreds of test fights. The difficulty order. AI generates fighters endlessly; sequencing them is design. Where the punch button lives on a real phone in a real hand.\n\nParticle effects: Bald Bull's signature charge spawned 15 dust particles per frame. On mobile it was a cloud you couldn't see through. Throttled to 15% of frames.`,
      images: [
        { src: `/images/ringrival-glassjoe-idle.png`, alt: `Glass Joe idle stance, the v1 starter opponent` },
        { src: `/images/ringrival-controls-modal.png`, alt: `VS Glass Joe controls modal with input scheme` },
        { src: `/images/ringrival-vonkaiser.png`, alt: `Von Kaiser — tall, broad, defensive guard` },
        { src: `/images/ringrival-discodan.png`, alt: `Disco Dan — completely different silhouette and personality` },
        { src: `/images/ringrival-knockdown.png`, alt: `Knockdown — DOWN! 5 count with star burst over floored Glass Joe` },
        { src: `/images/ringrival-impact-particles.png`, alt: `Glass Joe getting hit, red impact particles dialed back so fighter stays visible` },
        { src: `/images/ringrival-pause-modal.png`, alt: `Pause modal mid-fight vs. Disco Dan` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `What Broke`,
      content: `- Sprite scaling. Three rebuilds before per-archetype mobileScaleBoost multipliers worked across body types.\n- iOS audio. Safari kills audio without a user gesture. ~40% of first sessions launched silent. Gated AudioContext resume behind the first tap. Now under 2%.\n- AI rhythm. Early opponents threw punches at fixed intervals. Felt like fighting a metronome. The EmotionEngine rewrite fixed it.\n- Webcam hand-tracking. Half the testers refused the camera prompt and bounced. Cut.\n\nWhat users ignored: the 4-step calibration wizard. The daily challenges modal (<5% click-through). The how-to page (zero of six testers opened it before their first fight). If the first fight doesn't teach the controls in 10 seconds, no static screen will rescue it.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Time-to-first-punch: 22 seconds → 6 seconds. Audio failure rate: ~40% → under 2%. Most days: ship, watch one session, fix the loudest thing, reship. Three to six deploys daily.\n\nWhat's next: tutorial fight, not a tutorial screen. Async PvP — record a player's fight as an AI ghost. Belt animations + meta-progression that survives between sessions. Accessibility pass (color-blind telegraphs, reduce-flash, larger tap targets). Capacitor wrapper for App Store.`,
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
    description: `A location-aware web app for finding a partner for pickup sports nearby. Post a game, browse open games, confirm in a few taps. Built solo with AI.`,
    tags: [`Marketplace`, `Solo + AI`, `Trust & Safety`],
    heroImage: {
      src: `/images/catchbuddy-hero-landing.png`,
      alt: `CatchBuddy landing page — Find Local Sports Partners Near You`,
    },
    projectLink: `https://catchbuddy.me`,
    problemCallout: {
      eyebrow: `THE PROBLEM`,
      statement: `Pickup sports are dying in cities. Existing apps are league-focused or chat-heavy. Nobody wants a Slack thread to throw a baseball after work.`,
    },
    finalProductSection: {
      eyebrow: `WHAT I BUILT`,
      title: `What I Built`,
      description: `What I built first: a single screen — post a game, see open games on a map. No auth. No chat. No profiles. Can two strangers agree on a park and a time?\n\nThe core flow: pick a sport, pick a park, pick a time, post.\n\nWhat AI did: RLS-safe Postgres schemas. The profiles_public view that limits other users' visible columns. Supabase migrations. The proximity + time match heuristic powering the % scores. Stripe Checkout, Google Calendar OAuth, phone verification, safety check-in monitoring. Security code review that caught a recursive RLS policy I would have shipped.\n\nWhat I judged: the trust and safety model. Minors require a verified parent on file. The panic button reaches every in-game screen. Public meeting spots are curated, not crowdsourced. None of that comes from a prompt.\n\nAlso: monetization tiers, the demo-data toggle for first-time visitors, and the terminology — "Browse" and "Players" instead of "Matches," because "Matches" tested as Tinder-like.`,
      images: [
        { src: `/images/catchbuddy-signin.png`, alt: `Sign-in screen with the CatchBuddy brand` },
        { src: `/images/catchbuddy-post-game.png`, alt: `Post Your Game — sport picker with Football, Basketball, Baseball, Volleyball, Frisbee` },
        { src: `/images/catchbuddy-choose-park.png`, alt: `Choose a Park — searchable list with distance and amenities` },
        { src: `/images/catchbuddy-equipment-prefs.png`, alt: `Equipment and preferences — I'll bring a football, no-contact toggle` },
        { src: `/images/catchbuddy-game-live.png`, alt: `Confirmation — Your Game is Live! with nearby player count` },
        { src: `/images/catchbuddy-find-players.png`, alt: `Find Players list with 92% and 81% match scores` },
        { src: `/images/catchbuddy-signup-minor-gate.png`, alt: `Sign-up form with the 13+ age gate` },
        { src: `/images/catchbuddy-pro-pricing.png`, alt: `Pro pricing — $7.99/mo or $59.99/yr` },
      ],
    },
    whatDidntWorkSection: {
      eyebrow: `HICCUP`,
      title: `What Broke`,
      content: `- The Quick Start wizard. Watched users skip it every time. Cut.\n- The homepage MapSection. Looked great in screenshots, confused first-time visitors. Cut.\n- RLS recursion on profiles. A policy referenced its own table. AI found it on review.\n- iOS geolocation. Half the testers denied location and got a broken empty state. Rebuilt with a city-dropdown fallback.\n- Calendar OAuth. Initial implementation was CSRF-vulnerable. Rewrote with HMAC-SHA256 signed state.\n- Demo data leaking into real My Games queries. Tightened to a separate query path with a Demo badge.\n- Toast stacking — auto-dismiss after 3 seconds.\n- Bottom nav layout shift when badges appeared — fixed to grid-cols-5.`,
    },
    outcomeSection: {
      eyebrow: `OUTCOME`,
      title: `Outcome`,
      description: `Real shipped app with auth, RLS, OAuth, Stripe payments, realtime, minor-approval flow, geolocation, multi-sport scope. Mobile-first.\n\nThe thesis: safety can't be a bolt-on. If you're building a product where strangers meet in person, the trust model is the product. AI scaffolds the schema. It doesn't decide whether a 17-year-old needs a verified parent before they can post.\n\nWhat's next: native shells for push notifications and background safety check-ins. Park-anchored micro-groups, weekly "regulars" leaderboard. Recurring weekly games. A reputation graph beyond show-up rate. Stripe Connect for optional pro coaches.`,
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
      description: `What I built first: A giant filterable database of every herbalist I could find. Sport, modality, condition, location, price, availability — all the filters. It was the wrong product.\n\nWhat AI did: Component scaffolding, the Supabase schema, RLS policies, edge functions for booking and notifications. Drafting the symptom intake question structure. Writing the boilerplate copy for empty states. Generating the practitioner profile layout variants I A/B'd against each other.\n\nWhat I judged: The credential-verification model. AI doesn't know what the American Herbalists Guild is, doesn't know which certifications matter for which conditions, doesn't know that "verified" as a badge on a Yelp-style profile is meaningfully different from "verified" as a gate that controls whether you appear at all. That distinction is the entire product.`,
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
      description: `Early users described it as feeling more like booking a doctor than browsing a wellness app. That was the shift I was after. The thesis I'd defend: in a category dominated by misinformation, the design job is to make the safe path the easy path. Not to add warnings to the unsafe path. AI can build the directory in a weekend. Deciding who doesn't appear in it is the actual product.\n\nWhat's next: Practitioner-side tools — calendar management, intake review, secure messaging with attachments. A medication-interaction checker on the booking page that pulls from a real pharmacology database, not a static list. A follow-up flow that prompts "what changed since last visit?" 7 days post-appointment.`,
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
