import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredCatchBuddyCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="catchbuddy"
    title="CatchBuddy"
    description="The easy part is getting two strangers to agree to meet in a park; the difficult part is getting them to feel safe while doing so."
    tags={["AI-Assisted Product", "Trust & Safety", "Mobile-First", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://catchbuddy.fit"
    heroImage={{
      src: "/images/catchbuddy-hero-landing-card.webp",
      hoverVideo: "/catchbuddy-card.mp4",
      width: 900,
      height: 507,
      alt: "CatchBuddy pickup sports app",
      caption: "Same-day pickup sports, designed for trust. Post a game, see open games, confirm in a few taps.",
    }}
    relatedPost={{
      slug: "when-trust-is-the-product",
      title: "When Trust Is the Product, It Can't Be a Feature",
      blurb: "Getting two strangers to agree to meet at a park is easy. Getting them to feel fine about it's the entire product, and it's not something you\u2026",
    }}
    blocks={[
      {
        heading: "Most People Just Want a Game on Saturday",
        paragraphs: [
          "Pickup sports are declining in urban areas, and the apps designed to address this problem all assume that you want to take part in a full season, with all the commitment and the fixed schedule and the regular team that such a season entails. What most people actually want is a game on Saturday.",
          "It wasn't the scheduling that was the issue; the problem was getting two complete strangers to agree to meet at a park and both of them feeling comfortable about it, and that's a matter of trust rather than one of the calendar.",
        ],
        images: [
          {
            src: "/images/catchbuddy/fig-who-can-do-what.svg",
            alt: "Table: adults and verified minors can browse and post; an unverified minor can browse but not post; every account gets the curated meeting spot and the panic button",
            caption: "The gate that a minor passes through, together with the two things which every game has no matter what: a curated meeting place and a panic button.",
            width: 1150,
            height: 400,
          },
        ],
      },
      {
        heading: "A Parent Verifies Before a Kid Can Post",
        paragraphs: [
          "A child won't be allowed to post a game until their parent has been verified; the panic button can be accessed from any screen that you're on while playing the game, and the meeting points are taken from a list that I have selected, so no one can drop a pin on an address of their own choosing.",
          "That one is often the subject of debate; although it would be more flexible if people were allowed to add their own locations, I still won't do so.",
        ],
      },
      {
        heading: "What AI Did, and What It Couldn't",
        paragraphs: [
          "The AI carried out the preparation of the RLS policies, carried out the Supabase migrations, carried out the Stripe integration and the OAuth flow, which represents a major part of the project, and it did so quickly.",
          "It wasn't clear who was allowed in, who was gatekept, and what a stranger would see about another stranger before agreeing to meet; those cases were the ones I handled manually. Although, one thing an AI security review did pick up on that I otherwise would have missed was a recursive RLS policy which would have led to data being leaked in production.",
        ],
      },
      {
        heading: "What I Cut",
        paragraphs: [
          "People always read \"Matches\" as referring to a dating service; it's now called \"Browse\" and \"Players\".",
          "I built a Quick Start wizard nobody had asked for, watched testers skip it every time, and removed it.",
          "The support for Apple, Outlook and ICS calendars was developed but then removed since hardly anyone used them and I would have had to maintain three integrations indefinitely for those few who did.",
        ],
        images: [
          { src: "/images/catchbuddy/m1-landing.webp", alt: "Landing on a phone: 'Your next pickup game is a block away', Join free and See open games", caption: "The front door on a phone. Join free, or look at open games first without an account.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m2-sign-up.webp", alt: "Sign-up on a phone: username, email, password, Continue with Google", caption: "Sign-up. The age gate sits behind Continue, so a minor is routed to a parent before anything else.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m3-browse.webp", alt: "Browse on a phone: How CatchBuddy Works in three steps, Post Your First Game, and the empty games list", caption: "Browse, the screen that used to be called Matches. Three steps, then the games nearby.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m4-find-people.webp", alt: "Find People on a phone: level filters and the empty state asking you to set availability", caption: "Find People. Level filters at the top; with nobody nearby yet it asks you to set your availability.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m5-safety.webp", alt: "Safety Guidelines on a phone: core safety rules and warning signs", caption: "Safety guidelines, one tap from every screen: public places only, tell someone, report private-location requests.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m6-about.webp", alt: "About on a phone: the sports supported and how it works", caption: "About: the six sports and the three steps.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m7-pro.webp", alt: "CatchBuddy Pro on a phone: monthly and annual plans", caption: "Pro. Monthly or annual; the free tier is the product, this is the upgrade.", width: 780, height: 1688 },
          { src: "/images/catchbuddy/m8-contact.webp", alt: "Contact and Support on a phone: FAQs and a message form", caption: "Contact and the FAQs, including how safety works for minors.", width: 780, height: 1688 },
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "I warmed up the palette since a trustworthy product which has the appearance of a fintech dashboard comes across as a company and it was necessary for it to appear as a neighbour. The safety states have always been part of the same system from v1, rather than appearing later as status chips attached to the side.",
        ],
        images: [
          { src: "/images/catchbuddy-ds/design-system.webp", alt: "CatchBuddy design tokens: warm paper ground, one deep field green at three depths, and the safety states the colour has to carry", caption: "The paper is warm and there is one green, at three different depths. Green is kept for use in action and is therefore not used for decoration.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It was shipped, including auth, RLS, Stripe, Google OAuth, real-time updates, the minor-approval process and the curated meeting spots, all of which I designed and built.",
          "In version 1 the safety layer was the first thing to be included, since all the products I've seen which added it later ended up with a settings screen that no one opened.",
        ],
        videos: [
          {
            src: "/catchbuddy-walkthrough.mp4",
            poster: "/images/catchbuddy-walkthrough-poster.jpg",
            narrated: true,
            caption:
              "Here's the complete walkthrough with me explaining it step by step\u2014starting by posting the game, then selecting a park, choosing the equipment and your preferences, before moving on to the safety features, which include emergency contacts, phone verification, and the minor gate.",
              width: 640,
              height: 1280,
          },
        ],
      },
    ]}
  />
);

export default StructuredCatchBuddyCaseStudy;
