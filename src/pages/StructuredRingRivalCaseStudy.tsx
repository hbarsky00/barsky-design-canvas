import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredRingRivalCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="ring-rival"
    title="Ring-Rival"
    description="I wanted to find out whether a browser could have the feel of a console boxing game, and that took a lot of deleting."
    tags={["AI-Assisted Product", "Mobile Web", "Game Design", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://ringrival.today"
    // The opening frame is gameplay, not a trailer. What used to sit here was a
    // cinematic of a photorealistic boxer — nothing in it existed in the game,
    // so the first thing the page did was set the wrong expectation and the
    // second thing it did was break it.
    heroImage={{
      src: "/images/ringrival-now/hero-triptych.webp",
      alt: "Ring-Rival mid-fight: first-person gloves, Denny Frost blocking, trash talk and the super-punch meter",
      // No hover video here any more. This still sat directly above the
      // star-punch clip, so the top of the page was two video surfaces back to
      // back showing two different fights — a wide landscape one you had to
      // hover to see, then a narrow portrait one that played itself. One
      // moving thing at the top, and it should be the newest work.
      caption: "During the battle: the gloves, the opponent attempting to block, some trash talk and the super meter. The opening frame of the gameplay, since the cinematic which used to be in this position promised a game that didn't exist.",
      width: 1672,
      height: 992,
    }}
    relatedPost={{
      slug: "the-work-is-deleting-not-generating",
      title: "The Work Is Deleting, Not Generating",
      blurb: "AI made producing screens almost free. That moved the bottleneck from making things to deciding which ones to throw away, and no model will do\u2026",
    }}
    blocks={[
      {
        heading: "What I'm Working On Right Now",
        paragraphs: [
          "The star punch—you earn stars by landing counters, and you spend them using the meter located above the gloves. The difficult part is getting the wind-up, the building up of the meter, and the actual hit to match one another; if the star burns for even one frame before the glove makes contact, it is regarded as scripted.",
          "The phone capture shows the current build, starting from the title screen all the way through to the knockdown against Tor Volkov. This is the most recent entry on the page and it is not complete.",
        ],
        videos: [
          {
            src: "/ring-rival-star-punch.mp4",
            poster: "/images/ringrival-now/star-punch-poster.jpg",
            width: 430,
            height: 820,
            caption:
              "The star punch hits Tor Volkov directly and lands on the count. It was recorded on a phone of the same size as the one actually used, since that's the only way the timing can seem correct.",
          },
        ],
      },
      {
        heading: "Every Boxing Game I've Liked Was on a Console",
        paragraphs: [
          "All the boxing matches that I've enjoyed were played on a console; on this type of system the punch lands as soon as your thumb moves, the animation shows one body hitting another, and the opponent appears to be thinking about you. A browser doesn't provide any of this by default, and Mobile Safari offers even less.",
          "Anyway I wanted it; there's no need to install it, no requirement to go through the app store, you just open the link on your phone and then you start playing.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ring-rival/flow-how-i-worked.svg",
            alt: "How I worked on Ring Rival: build the rig, Glass Joe then Von Kaiser through it, fighters become data, fix the paper look, drop the particles, hand-tune on a phone, delete four screens to cut time to first punch, cut hand-tracking, live and tuning the star punch",
            caption: "A step-by-step explanation of how I approached it, based on the account in the study. The decision known as Terracotta was the one that the others rested their choice on. The more subdued steps were my own constructions which I later deleted.",
            width: 518,
            height: 946,
          },
          {
            src: "/images/ring-rival/flow-fighter-pipeline.svg",
            alt: "Fighter pipeline: shared rig, this fighter's proportions, generate the nine-pose sheet, eight poses the fight code counts on plus one special of their own, opponent in the roster with no new drawing",
            caption: "The process by which a new opponent is created. Eight poses constitute a shared agreement. It is the ninth pose that causes Klaus Brenner to be someone other than Glass Joe.",
            width: 398,
            height: 618,
          },
        ],
      },
      {
        heading: "Building a Fighter Out of Parts",
        paragraphs: [
          "A fighter isn't just a drawing; it's a physical entity with two arms, two legs and a head, all of which are separate since each one has to move independently and the code must be able to tell them apart. That's why I started by creating the rig, even though there wasn't anyone yet to place into it.",
          "Glass Joe was the first one to go through it and you can see all the seams; the torso was a flat block, each arm consisted of a single wedge extending from the shoulder to the glove with no room for an elbow, the legs joined the hips at a sharp edge, and each limb was a single solid colour. Then I had Von Kaiser go through the same setup but on a larger scale, and that was the real test, since if it worked for the second fighter I could use the rest of the data rather than having to draw each one by hand.",
          "It stayed as it was and still resembled paper. A flat wedge hitting a flat block simply appears as two shapes overlapping and never gives the impression of actual contact. Therefore I returned to the model and divided each arm into a shoulder, a bicep and a forearm, added a knee and a calf to the legs, and shaded the torso so that a turn is seen as a turn. You should make the parts quick, get rid of anything that doesn't look right, and then rebuild the layer below.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ringrival-glassjoe-idle.webp",
            alt: "Glass Joe at launch: flat block torso, wedge arms with no elbow, parallelogram legs seamed at the knee",
            caption: "Glass Joe was the first to go through the rig, with one solid colour on each limb, no elbow and no shading at all.",
            width: 1920,
            height: 1328,
          },
          {
            src: "/images/ringrival-vonkaiser.webp",
            alt: "Von Kaiser: the same rig at heavier proportions: wider trapezoid torso, longer arms, broader stance",
            caption: "Von Kaiser. The same type of frame but more robust in construction. It was this one that told me the rig would hold.",
            width: 1920,
            height: 1333,
          },
        ],
      },
      {
        heading: "The Part AI Couldn't Do",
        paragraphs: [
          "When I first tried to make a punch land I used impact particles; that was a mistake because the burst was so great it hid the fighter at the very moment when you needed to see him being hit.",
          "Then I gave up guessing and began to test it using an actual phone, trying one number at a time. I noted how long the game froze when making contact, how vigorously the screen shook, the 60ms buzz you get in your hand upon connecting, how quickly the health bar emptied, the position of the punch button and the size of the block zone. I kept doing this repeatedly until it no longer seemed like a web page.",
          "You can't ask the model if a punch actually feels like a punch since it would reply and that reply would be of no value as it has never held a phone. The AI provided me with three to six builds each day of raw material and I discarded most of them.",
        ],
      },
      {
        heading: "One Sheet Per Fighter",
        paragraphs: [
          "Since the rig is shared I no longer draw the fighter; instead I produce his sheet consisting of ready, jab, cross, hook, uppercut, special, wind-up, block, and hurt. That's nine poses with the same joints each time.",
          "Eight of the fight codes are the same for all the fighters, and the ninth one is theirs own. Glass Joe's is called the Glass Jaw, Von Kaiser's is the Kaiser Barrage, and it's that one slot which prevents the roster from looking like the same character in different colours.",
          "The act of adding an opponent ceased to be something that required artistic skill, because it was possible to use the rig based on their proportions and a sheet produced from that rig, which is the reason why Klaus Brenner was able to enter without having to make a single new drawing.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/ringrival-sprite-sheet-1.webp",
            width: 1100,
            height: 1100,
            alt: "Glass Joe's generated pose sheet, labelled ready, jab, cross, hook, uppercut, special (Glass Jaw), wind-up, block and hurt",
            caption: "Glass Joe is lean and nervous, and his specialty is the Glass Jaw, which is just as bad for him as the name suggests.",
          },
          {
            src: "/images/ringrival-sprite-sheet-2.webp",
            width: 1100,
            height: 1100,
            alt: "Von Kaiser's generated pose sheet, labelled ready, jab, cross, hook, uppercut, special (Kaiser Barrage), wind-up, block and hurt",
            caption: "Von Kaiser. It has the same nine slots, and the Kaiser Barrage is in the position that Glass Joe has for his glass jaw.",
          },
        ],
      },
      {
        heading: "What I Deleted",
        paragraphs: [
          "Originally it took 22 seconds to throw your first punch, but after the cut it only took 6, and I hadn't made any optimisations to achieve this \u2014 I simply removed the splash screen, the mode select, the fighter select and the tutorial.",
          "In around 40% of sessions the audio wasn't working and I wasn't aware of this since no errors were ever displayed. Since browsers don't allow sound to play until you've interacted with the page and the game was starting its audio as soon as the page loaded, four out of every ten people experienced their first punch in silence. When the audio was moved so that it played after the first tap, the failure rate dropped below 2%.",
          "I also developed a webcam hand-tracking feature. It functioned and was truly impressive, but it was entirely unsuitable for someone using it on their phone from a couch, so I abandoned it.",
          "If you play it now you'll see that the game has advanced; it now includes a career mode in which you select a fighter who is wearing a different hat, and the tutorial has returned to five cards, although it is placed on top of a fight that is already underway and one tap will skip all five. I'd prefer to tell you that rather than sell you a game that's stopped development at its most slender stage, and the truth is that the cuts were actually carried out and some of them were reverted within a month.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "All colours have a pair consisting of the state at rest and the same state but ten per cent lighter when it hits. Colour and brightness change together since this combination is easier to read than either one alone.",
        ],
        images: [
          { src: "/images/ringrival-now/design-system.webp", alt: "Ring-Rival design tokens: Courier New, the charcoal ring, and four accent colours each paired with a brighter glow", caption: "There are four colours, each having its own glow, since the punch has to be visible in the frame where it lands.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Every Opponent Has Their Own Rhythm",
        paragraphs: [
          "It's the same kind of rig that Glass Joe came out of, but the wedges are now arms. Since Klaus Brenner is heavier and takes longer to reset, you have to interpret him differently from the others.",
          "Each opponent has their own particular kind of trash talk and their own rhythm. In the old days, being knocked down was something you just sat and watched until it happened, but nowadays you can get back up quickly if you do so swiftly.",
        ],
        videos: [
          {
            src: "/ring-rival-fight-brenner.mp4",
            poster: "/images/ringrival-now/fight-brenner-poster.jpg",
            caption:
              "Klaus Brenner, who is bigger, heavier, and whose rhythm you have to learn separately.",
              width: 624,
              height: 1079,
          },
        ],
        images: [
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It's available at ringrival.today—all you have to do is open a link on your phone and immediately enter a fight, with neither an installation nor an account required. That was the very question I began with, and since the answer was close to a yes I decided to keep investigating.",
          "The work isn't complete, which is the reason why the most recent one on this page is at the top rather than at the bottom. At the moment I am adjusting the star punch, mainly the part where the star burns.",
        ],
      },
    ]}
  />
);

export default StructuredRingRivalCaseStudy;
