import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredHerbalinkCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="herbalink"
    title="HerbaLink"
    description="The hard part was never search. It was making sure the person you found is real, in a category where being wrong lands on someone's health."
    tags={["AI-Assisted Product", "Healthcare", "Trust & Safety", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="http://herbalink.live"
    heroImage={{
      // Live screenshots of the shipped app, replacing dead barskyux.com links.
      src: "/images/herbalink/home-hero.png",
      alt: "HerbaLink homepage — personalized wellness guided by certified herbalists",
      // Full booking-demo capture: directory → booking → checkout → herb library.
      hoverVideo: "/herbalink-demo.mp4",
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "People go looking for a herbalist because of anxiety, or fatigue, or something their doctor has not been able to help with. Then they land in a swamp. Anyone can claim anything, and the person searching has no way to tell the difference.",
          "So my job was never to build a bigger directory. It was to make the safe path the easy one, in a category where getting it wrong lands on someone's health.",
        ],
        images: [
          { src: "/images/herbalink/find-herbalist-sketch.png", alt: "Early wireframe sketches — finding a herbalist, choosing a consultation type, matching flow", width: 1536, height: 1024 },
          { src: "/images/herbalink/sitemap.png", alt: "Full site map — the credential-gated Find Herbalists flow sits alongside account, support, and legal pages", width: 512, height: 768 },
        ],
      },
      {
        heading: "I Started By Asking, Not Auditing",
        paragraphs: [
          "I talked to users and to practising herbalists before I designed anything. Every trust barrier I ended up building around came out of those conversations, not out of studying what competitors were doing.",
          "After that the order was always the same. Work out what breaks trust, design the loop that brings someone back, then check that the simplified version still leaves people feeling confident before adding anything to it.",
        ],
        images: [
          { src: "/images/herbalink/thought-process.png", alt: "Design process — interview, identify trust barriers, prioritize outcomes over UI, design for retention, validate simplicity" },
        ],
      },
      {
        heading: "Verification Is a Door, Not a Sticker",
        paragraphs: [
          "Most directories let anyone list, then put a little badge on the ones that passed a check. I flipped it. Nobody is visible at all until they are verified against the American Herbalists Guild. You end up with a smaller catalogue and a far more honest one.",
          "I tested it the other way round. Adding 200 unverified practitioners made the product worse, because now every listing needed a judgement call from the one person who came here specifically because they could not make one.",
        ],
        images: [
          { src: "/images/herbalink/herbalist-directory.png", alt: "Find Herbalists directory — every listed practitioner is verified before they're visible" },
        ],
      },
      {
        heading: "What AI Did, and What It Couldn't",
        paragraphs: [
          "AI handled the Supabase schemas, the RLS policies, the edge functions, the structure of the symptom intake and a pile of copy variants.",
          "Which certifications actually matter for which conditions, when to turn a listing down, who never appears in the catalogue at all. Those I made myself, every time.",
        ],
        images: [
          { src: "/images/herbalink/booking-intake.png", alt: "Guided booking intake — a single focused question replaces open-ended search" },
        ],
      },
      {
        heading: "What I Cut",
        paragraphs: [
          "A tester told me the filter panel felt like WebMD, which is about the worst thing you can say about a health product. It is guided intake now.",
          "I built a full symptom diary. People opened it twice and never came back. It is one follow-up question now.",
          "I also took out open-ended search completely. Asking someone to describe what they need assumes they already know, and the whole reason they are here is that they do not.",
        ],
        videos: [
          {
            src: "/herbalink-before.mp4",
            poster: "/images/herbalink/before-poster.jpg",
            caption:
              "Before: search by name or specialty, then filter by Specialty and Health Concerns. It works, and it still asks someone who doesn't know what they need to describe what they need.",
          },
        ],
        images: [
          { src: "/images/herbalink/mobile-booking.png", alt: "After: booking on mobile — \"We'll match you\" replaces the filter panel", caption: "After: one guided question instead of a search box and two filter menus." },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It shipped. Every practitioner on it has credentials verified outside the platform, intake replaced search, and the safer route is now also the faster one.",
          "The catalogue is smaller than it could be, on purpose. In this category honest beats exhaustive.",
        ],
        images: [
          { src: "/images/herbalink/herb-detail-reviews.png", alt: "Herb library entry with real user reviews — the shipped, working platform" },
        ],
      },
    ]}
  />
);

export default StructuredHerbalinkCaseStudy;
