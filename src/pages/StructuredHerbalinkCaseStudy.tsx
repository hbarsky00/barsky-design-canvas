import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredHerbalinkCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="herbalink"
    title="HerbaLink"
    description="The difficult aspect wasn't carrying out the search. It was ensuring that the person you ended up with is real, since in this kind of category making a mistake could affect someone's health."
    tags={["AI-Assisted Product", "Healthcare", "Trust & Safety", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://herbalink.live"
    heroImage={{
      // Live screenshots of the shipped app, replacing dead barskyux.com links.
      src: "/images/herbalink/card-poster-home.jpg",
      hoverVideo: "/herbalink-card.mp4",
      alt: "HerbaLink practitioner booking interface",
      // Full booking-demo capture: directory → booking → checkout → herb library.
      caption: "A booking platform for herbalists, built around the realization that the actual product is trust, not search.",
      width: 1152,
      height: 720,
    }}
    relatedPost={{
      slug: "verification-is-a-door-not-a-sticker",
      title: "Verification Is a Door, Not a Sticker",
      blurb: "Most directories let anyone list, then put a badge on whoever checked out. Flipping that, nobody is visible until they're verified, gives you a\u2026",
    }}
    blocks={[
      {
        heading: "Anyone Can Claim Anything",
        paragraphs: [
          "It began as an idea, since people seek out a herbalist because of their anxiety, or because they're tired, or because their doctor hasn't been able to help them. They then end up in a situation where anyone can say anything. That's why I wanted to find out if it was possible to create the one that doesn't do that to them.",
          "The purpose of the job was to make the safe path the easier one, since making a mistake in this area would affect someone's health. Having a larger directory would have made the situation worse.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/herbalink/find-herbalist-sketch.webp", alt: "Early wireframe sketches: finding a herbalist, choosing a consultation type, matching flow", caption: "Where it started.", width: 1536, height: 1024 },
          { src: "/images/herbalink/thought-process.webp", alt: "Design process: interview, identify trust barriers, prioritize outcomes over UI, design for retention, validate simplicity", caption: "I consulted users and also talked to herbalists who are currently practising before coming up with anything. All the trust barriers arose as a result of those conversations.",
 width: 512,
 height: 768,
    },
        ],
      },
      {
        heading: "Verification Is a Door, Not a Sticker",
        paragraphs: [
          "In most directories anyone can list a name, and a badge is attached after the person has passed a check. I reversed this system, so that no one is visible until they have been verified by the American Herbalists Guild, which produces a smaller catalogue in which each entry has significance.",
          "I tried it the other way round by including 200 unverified practitioners, and as a result the product became worse, since now every listing had to rely on the judgement of the single person who had come here precisely because they could not make that judgement themselves.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/herbalink/herbalist-directory.webp", alt: "Find Herbalists directory: the gate is built: nothing appears here until it is verified", caption: "The directory with the gate incorporated in it. Nothing is displayed here until it has been checked against the American Herbalists Guild.",
 width: 2880,
 height: 1800,
    },
        ],
      },
      {
        heading: "What I Cut, and What Survived",
        paragraphs: [
          "One tester compared the filter panel to WebMD, which is about the most negative thing you could say about a health product. Intake is now guided by a single main question rather than a search box and two filter menus.",
          "I also got rid of open-ended search altogether, since it assumes that the person already knows what they need, and it is precisely because they don't know that they have come here.",
          "The symptom diary is the one that I got wrong on two occasions. I originally designed it to include full daily logging and a complete history, but people opened it twice and then never returned. I therefore reduced it to a single follow-up question, and that is the tracker that remains in the product. It was by building the more extensive version first that I realised nobody wanted it.",
        ],
        videos: [
          {
            src: "/herbalink-before.mp4",
            poster: "/images/herbalink/before-poster.jpg",
            caption:
              "Before: you had to search by name or specialty and then filter. This works, but it still requires someone who doesn't know what they need to describe what they need.",
              width: 510,
              height: 1282,
          },
        ],
        images: [
          { src: "/images/herbalink/mobile-booking-guided.webp", alt: "After: booking on mobile: \"We'll match you\" replaces the filter panel", caption: "After: one guided question.",
 width: 1170,
 height: 1210,
    },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "This colour system has no unverified state, since the product has no unverified listings. The palette records the decision just as the code does.",
        ],
        images: [
          { src: "/images/herbalink/design-system.webp", alt: "HerbaLink design tokens: forest green on warm paper with honey reserved for emphasis, and the verification rule the palette encodes", caption: "Forest green on warm paper, with honey used for emphasis and never for actions.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Actually Is",
        paragraphs: [
          "On hold, and I'll make the reason clear. The product has been built and functions properly: the verification gate, the guided intake, booking, the herb library, and the authentication system underneath everything else. The directory is empty because no herbalists have signed up yet.",
          "The gap accurately reflects the abilities I have and those I don't. I am able to start with an idea and end up with a working product all by myself, although marketing has always been my weaker point. Here is the clearest example I have: a platform that works, with no one on it.",
          "This is the full account of the thinking process, covering the research, the choice to gate verification rather than simply badging it, the things I cut and the consequences of those cuts. If you're looking for someone who can design something and then actually build it, this is what that complete process looks like, including the stage where it's just waiting for its first herbalist.",
        ],
        images: [
          {
            src: "/images/herbalink/herb-detail-reviews.webp",
            alt: "Herb library entry for Ashwagandha: description, benefits, preparation, precautions, and an education-not-medical-advice notice",
            caption:
              "The herb library contains the actual content. The reviews below it are placeholders and stay there until someone writes genuine ones.",
              width: 2880,
              height: 4446,
          },
        ],
      },
    ]}
  />
);

export default StructuredHerbalinkCaseStudy;
