import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";
import heroImg from "@/assets/projects/ringrival.png";

const StructuredRingRivalCaseStudy: React.FC = () => {
  return (
    <SimpleCaseStudyPage
      projectId="ring-rival"
      title="Ring-Rival — Mobile Web Boxing"
      description="A mobile web boxing game built to feel immediate in the browser: AI-generated opponents, career progression, and console-style punch feedback without an install."
      tags={["Game UX", "Mobile Web", "AI Opponents", "Interaction Design"]}
      liveUrl="https://rival.li"
      overviewUrl="/project/ring-rival"
      heroImage={{
        src: "/lovable-uploads/ringrival/01-title.png",
        alt: "Ring-Rival title screen — Mobile Boxing by Barsky Design",
        hoverVideo: "/lovable-uploads/ringrival-hero.mp4",
      }}
      blocks={[
        {
          heading: "The Problem",
          paragraphs: [
            "Boxing games usually need a console, controller, or app install to feel responsive. The challenge was making a browser game that still gave players the immediate feedback they expect from a punch, dodge, and career fight loop.",
            "The product also needed to look distinct fast. A generic fighting game roster would make the experience forgettable, so every opponent needed a different identity while still feeling coherent inside one game world.",
          ],
        },
        {
          heading: "What I Built",
          paragraphs: [
            "Ring-Rival is a zero-install mobile web boxing game with career mode, a difficulty-ordered opponent roster, AI-generated fighter identities, and touch-first fight controls tuned for quick sessions.",
            "Career mode opens on a Minor Circuit ladder — fight 1 of 4 against Glass Joe — and progresses through unique opponents like Von Kaiser and Disco Dan, each with their own stats, taunts, and visual identity.",
          ],
          images: [
            {
              src: "/lovable-uploads/ringrival/02-career-glass-joe.png",
              alt: "Minor Circuit career screen showing Glass Joe with power, speed, and HP stats",
            },
            {
              src: "/lovable-uploads/ringrival/03-von-kaiser.png",
              alt: "Von Kaiser opponent in the ring with first-person red glove POV",
            },
          ],
        },
        {
          heading: "Punch Feedback That Reads Instantly",
          paragraphs: [
            "The interaction layer focuses on feedback: hit-stop, screen shake, haptics, visual impact states, and fast recovery so a successful punch reads instantly without turning the interface into noise.",
            "Stun states use a star ring above the opponent and a green stun meter to signal the opening. Background swaps from arena to starfield mark the shift into the bonus stun window, so the player knows to swing without reading text.",
          ],
          images: [
            {
              src: "/lovable-uploads/ringrival/04-disco-dan-stars.png",
              alt: "Disco Dan stunned with a starfield background and green stun meter",
            },
            {
              src: "/lovable-uploads/ringrival/05-disco-dan-stunned.png",
              alt: "Disco Dan recoiling with stun stars above his head during a combo opening",
            },
          ],
        },
        {
          heading: "Key Decisions",
          paragraphs: [
            "I chose browser-first over native app because the point of the product was instant play. That made performance, input latency, and clear touch targets more important than heavy visual systems.",
            "I chose distinct AI-generated opponents, then hand-tuned the actual play feel myself. The AI could help with roster variety, but it could not judge whether a punch felt satisfying or whether a fighter was readable in motion.",
          ],
        },
        {
          heading: "What Didn't Work",
          paragraphs: [
            "Webcam hand-tracking was explored and cut. It looked impressive, but it was the wrong interaction model for the audience: too much setup, too much friction, and not enough precision for a quick mobile game.",
            "Real-time multiplayer was also deferred. It is the obvious long-term direction, but shipping the core fight loop first made more sense than building infrastructure before the game had proof of repeat play.",
          ],
        },
        {
          heading: "Where It Stands",
          paragraphs: [
            "Ring-Rival is live at rival.li as a mobile web game. The current version proves the zero-install fight loop, career progression, and AI opponent concept; the next step is deeper progression and stronger replay incentives.",
          ],
        },
      ]}
    />
  );
};

export default StructuredRingRivalCaseStudy;
