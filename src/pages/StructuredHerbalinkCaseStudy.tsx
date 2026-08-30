import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredHerbalinkCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="herbalink"
    title="HerbaLink"
    description="The hard part was never search. It was making sure the person you found is real, in a category where being wrong lands on someone's health."
    tags={["AI-Assisted Product", "Healthcare", "Trust & Safety", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://herbalink.live"
    heroImage={{
      // Live screenshots of the shipped app, replacing dead barskyux.com links.
      src: "/images/herbalink/home-hero.webp",
      alt: "HerbaLink homepage — personalized wellness guided by certified herbalists",
      // Full booking-demo capture: directory → booking → checkout → herb library.
      hoverVideo: "/herbalink-demo.mp4",
      caption: "The promise on the front door is the practitioner, not the size of the catalogue. Everything behind it is gated on that being true.",
      width: 2880,
      height: 1800,
    }}
    relatedPost={{
      slug: "verification-is-a-door-not-a-sticker",
      title: "Verification Is a Door, Not a Sticker",
      blurb: "Most directories let anyone list, then put a badge on whoever checked out. Flipping that \u2014 nobody is visible until they're verified \u2014 gives you a\u2026",
    }}
    blocks={[
      {
        heading: "Anyone Can Claim Anything",
        paragraphs: [
          "This started as an idea. People go looking for a herbalist because of anxiety, or fatigue, or something their doctor hasn't been able to help with. Then they land in a swamp where anyone can claim anything. I wanted to know whether I could build the version that doesn't do that to them.",
          "The job was never a bigger directory. It was making the safe path the easy one, in a category where getting it wrong lands on someone's health.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/herbalink/find-herbalist-sketch.webp", alt: "Early wireframe sketches — finding a herbalist, choosing a consultation type, matching flow", caption: "Where it started.", width: 1536, height: 1024 },
          { src: "/images/herbalink/thought-process.webp", alt: "Design process — interview, identify trust barriers, prioritize outcomes over UI, design for retention, validate simplicity", caption: "I talked to users and to practising herbalists before designing anything. Every trust barrier came out of those conversations.",
 width: 512,
 height: 768,
    },
        ],
      },
      {
        heading: "Verification Is a Door, Not a Sticker",
        paragraphs: [
          "Most directories let anyone list, then put a badge on whoever passed a check. I flipped it. Nobody is visible until they're verified against the American Herbalists Guild. Smaller catalogue, far more honest one.",
          "I tested it the other way round. I added 200 unverified practitioners and the product got worse: every listing now needed a judgement call from the one person who came here because they couldn't make one.",
        ],
        images: [
          { src: "/images/herbalink/herbalist-directory.webp", alt: "Find Herbalists directory — the gate is built: nothing appears here until it is verified", caption: "The directory with the gate built in. Nothing appears here until it's verified against the American Herbalists Guild.",
 width: 2880,
 height: 1800,
    },
        ],
      },
      {
        heading: "What I Cut, and What Survived",
        paragraphs: [
          "A tester said the filter panel felt like WebMD, which is about the worst thing you can say about a health product. It's guided intake now: one focused question instead of a search box and two filter menus.",
          "I also took out open-ended search entirely. Asking someone to describe what they need assumes they already know, and not knowing is the whole reason they're there.",
          "The symptom diary is the one I got wrong twice. I built it full, daily logging and history and the lot, and people opened it twice and never came back. I cut it down to a single follow-up question, and what's left of it is the tracker that's still in the product. Building the big version first is how I found out nobody wanted it.",
        ],
        videos: [
          {
            src: "/herbalink-before.mp4",
            poster: "/images/herbalink/before-poster.jpg",
            caption:
              "Before: search by name or specialty, then filter. It works, and it still asks someone who doesn't know what they need to describe what they need.",
              width: 510,
              height: 1282,
          },
        ],
        images: [
          { src: "/images/herbalink/mobile-booking-guided.webp", alt: "After: booking on mobile — \"We'll match you\" replaces the filter panel", caption: "After: one guided question.",
 width: 1170,
 height: 1210,
    },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "There is no unverified state in this colour system because there are no unverified listings in the product. The palette ended up recording the verification decision as much as the code does.",
        ],
        images: [
          { src: "/images/herbalink/design-system.webp", alt: "HerbaLink design tokens — forest green on warm paper with honey reserved for emphasis, and the verification rule the palette encodes", caption: "Forest green on warm paper, honey for emphasis and never for actions.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Actually Is",
        paragraphs: [
          "On hiatus, and I'll say why plainly. The product is built and it works: verification gate, guided intake, booking, herb library, the database and auth underneath all of it. The directory is empty because no herbalists have signed up yet.",
          "That gap is an honest picture of what I'm good at and what I'm not. I can take an idea and come out the other end with a functional product on my own. Marketing it has always been the weaker half for me, and this is the clearest example I have: a platform that works, with nobody on it.",
          "So this is here for the thinking, not as a win. The research, the decision to gate verification instead of badging it, the things I cut and what cutting them cost. If what you need is someone who can design the thing and then actually build it, this is what that looks like end to end.",
        ],
        images: [
          {
            src: "/images/herbalink/herb-detail-reviews.webp",
            alt: "Herb library entry for Ashwagandha — description, benefits, preparation, precautions, and an education-not-medical-advice notice",
            caption:
              "The herb library is the part with real content in it. The reviews under it are placeholder, sitting there until there are people to write real ones.",
              width: 2880,
              height: 4446,
          },
        ],
      },
    ]}
  />
);

export default StructuredHerbalinkCaseStudy;
