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
          { src: "/images/catchbuddy-post-game.webp", alt: "Post Your Game: sport picker with Football, Basketball, Baseball, Volleyball, Frisbee", caption: "To start posting a game you first need to choose the sport and that's all\u2014there's no need to include a team, a schedule, or a season.",
 width: 1848,
 height: 1364,
    },
        ],
      },
      {
        heading: "A Parent Verifies Before a Kid Can Post",
        paragraphs: [
          "A child won't be allowed to post a game until their parent has been verified; the panic button can be accessed from any screen that you're on while playing the game, and the meeting points are taken from a list that I have selected, so no one can drop a pin on an address of their own choosing.",
          "That one is often the subject of debate; although it would be more flexible if people were allowed to add their own locations, I still won't do so.",
        ],
        images: [
          { src: "/images/catchbuddy-choose-park.webp", alt: "Choose a Park: searchable list with distance and amenities", caption: "Here is a selected list of places where meetings can be held, including the distance and facilities available. It is not possible for anyone to place their own pin, and that limitation is what's intended.",
 width: 1940,
 height: 1396,
    },
        ],
      },
      {
        heading: "What AI Did, and What It Couldn't",
        paragraphs: [
          "The AI carried out the preparation of the RLS policies, carried out the Supabase migrations, carried out the Stripe integration and the OAuth flow, which represents a major part of the project, and it did so quickly.",
          "It wasn't clear who was allowed in, who was gatekept, and what a stranger would see about another stranger before agreeing to meet; those cases were the ones I handled manually. Although, one thing an AI security review did pick up on that I otherwise would have missed was a recursive RLS policy which would have led to data being leaked in production.",
        ],
        images: [
          { src: "/images/catchbuddy-equipment-prefs.webp", alt: "Equipment and preferences: \"I'll bring a football,\" no-contact toggle", caption: "The minor details which the two strangers exchange before meeting, namely who is bringing the ball and how physical the game is going to be.",
 width: 1888,
 height: 1386,
    },
        ],
      },
      {
        heading: "What I Cut",
        paragraphs: [
          "People always read \"Matches\" as referring to a dating service; it's now called \"Browse\" and \"Players\".",
          "I created a Quick Start wizard which was not wanted, saw testers skip it each time, and eventually stopped having them skip it.",
          "The support for Apple, Outlook and ICS calendars was developed but then removed since hardly anyone used them and I would have had to maintain three integrations indefinitely for those few who did.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/catchbuddy-find-players.webp", alt: "Find Players list with 92% and 81% match scores", width: 1946, height: 1404, caption: "The player cards show the match scores; the programme is now called Players since the testers always read 'Matches' as referring to a dating app." },
          { src: "/images/catchbuddy-signup-minor-gate.webp", alt: "Sign-up form with the 13+ age gate: first checkpoint in the minor-protection flow", width: 1076, height: 1398, caption: "In version 1, the 13+ age restriction at sign-up was included as the first step in the minor-protection process rather than being added later." },
          { src: "/images/catchbuddy-game-live.webp", alt: "Confirmation: \"Your Game is Live!\" with nearby player count, not a vanity counter", width: 1218, height: 1378, caption: "The caption indicates the number of other players around you. It is a real figure and this determines if you are able to play the game." },
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
