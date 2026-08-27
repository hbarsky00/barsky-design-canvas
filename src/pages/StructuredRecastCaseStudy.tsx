import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredRecastCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="recast"
    title="Recast"
    description="Record it once, send a link. A screen recorder that runs as a real app on your Mac and your phone, because a browser tab was never going to be good enough."
    tags={["Product Design", "Cross-Platform", "Native + Web", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://recastvid.com"
    // The tight headline crop, not the full-page capture that was here before.
    // A 1440px screenshot of a dense dark UI is unreadable in a ~350px column,
    // which is what made the mobile view bad. This crop still reads at 350px —
    // checked by scaling it and looking, not by assuming.
    // The Mac app's own recording panel, lifted from Hiram's screen recording
    // and set on the app's dark ground. The landing-page crop that was here
    // showed the pitch; this shows the product. Cropped to the panel exactly —
    // a looser crop caught a card sitting behind it and read as an artifact.
    heroImage={{
      src: "/images/recast/mac-app.webp",
      alt: "The Recast recorder panel floating over a browser page — Full Screen, Window or Area, camera and mic toggles, Start Recording",
    }}
    relatedPost={{
      slug: "i-just-wanted-to-send-someone-a-video",
      title: "I Just Wanted to Send Someone a Video",
      blurb: "Recording your screen is free. Sending it is what everyone charges for \u2014 watermarks, five-minute caps, a sign-in wall for your viewer.",
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "Half the messages I write would be better as thirty seconds of me talking over my screen. The tools that do that either want a login before the other person can watch, or they put a watermark on it, or they cap you at five minutes and then ask for a card.",
          "So the whole product is one sentence: record it once, send a link. Whoever you send it to presses play. No account, no app, no meeting.",
        ],
      },
      {
        heading: "I Deleted the Best-Looking Part",
        paragraphs: [
          "The first version recorded in the browser. It worked, it demoed well, and I killed it — twenty-one files, the whole capture engine, the compositor, the camera bubble, the crop selector. All of it.",
          "Two reasons. Browser capture is worse: you get a tab or a throttled screen, not your actual machine at full quality. And there is a hall-of-mirrors problem where recording your browser from inside your browser shows the recorder recording itself.",
          "What replaced it is a boundary I now hold to: the apps record, the website stores and shares. The Record button on the site is a launcher — it opens the native app and falls back to a download if you don't have it yet. There is no browser-capture fallback and there won't be one.",
          "Deleting working code you already built is the part of this job nobody puts in a portfolio. It was still the right call.",
        ],
        images: [
          { src: "/images/recast/launcher-modal.webp", alt: "The Record button on the website opening a dialog that offers Open Recast or Upload Video, with no browser-capture option", caption: "What the Record button does now. It hands you off to the app, or takes a file. It never opens a capture tab." },
          { src: "/images/recast/web-library.webp", alt: "The Recast web library — recordings with durations, dates and a Shared badge", caption: "The other half of the boundary: the site holds everything, and never records." },
        ],
      },
      {
        heading: "Stop Should Mean Watch",
        paragraphs: [
          "The rule I set: you press stop, the video plays immediately from the file on your device, and the upload happens behind it. Playback never waits for the network. If you're on a plane it still works.",
          "I broke my own rule in the Mac app without noticing. The function that queued a finished recording was async and awaited the entire upload before it opened the player window. On a good connection you'd never catch it. Offline, you pressed stop and stared at nothing until the request timed out.",
          "It returns in a millisecond or two now and uploads in a detached task. I also found the first upload after launch was eating five to eight seconds of framework setup, so the app warms that up when it starts instead of paying for it the moment you press stop.",
        ],
        images: [
          { src: "/images/recast/settings-storage.webp", alt: "Recast settings on the web — storage used, recording count, and a note that recording options including auto-upload are set in the app on the recording device", caption: "Where the upload rule actually lives: in the app, on the device doing the recording. The website is the destination, never the controller." },
        ],
      },
      {
        heading: "Android Argued With the Documentation",
        paragraphs: [
          "Google's own media projection guide numbers the steps: get the projection, then start the foreground service. On Android 14 that order throws. The service has to already be running or the system refuses you outright.",
          "The other thing I couldn't design away: Android will not let you authorise screen capture once and reuse it. Consent is single-use, so the system dialog appears on every single recording. I wanted that gone and it isn't mine to remove — so the flow is built to make it feel like one deliberate step rather than an interruption.",
          "I also caught the build asking for permission to draw over other apps, which I never wanted. It comes in from a dependency rather than from my code. It's blocked in release builds, and I check the actual APK after every upgrade instead of trusting that it stayed blocked.",
        ],
      },
      {
        heading: "I Found a Leak by Signing Up as a Stranger",
        paragraphs: [
          "I made a brand-new account to see what a first-time user sees. The empty library wasn't empty. It had somebody else's recording in it, and fifty-seven megabytes already counted against a quota I had never used.",
          "The database rule that lets a share link work was written to allow reading any recording marked shareable. It was never narrowed to the one link being opened, so it applied to everyone at once.",
          "The fix in the product is that nothing ownership-sensitive trusts that rule any more — every query that returns your library or counts your storage filters by your user id explicitly. The lesson is the one worth keeping: a permission rule written for one screen will be read by every other screen too, and the only way to find that is to become a new user and look.",
        ],
        images: [
          { src: "/images/recast/signin.webp", alt: "The Recast sign-in card with an email field, a password field and a Create an account link", caption: "The door I went back through as a stranger. Everything on the other side of it was supposed to be empty." },
        ],
      },
      {
        heading: "Three Apps, One Identity",
        paragraphs: [
          "At one point Recast had three different looks at the same time — a warm editorial share page, a purple Material web library, and a third thing on Android. Every screen had been reviewed on its own and passed. Nobody had put them side by side.",
          "I found it because I opened the app and the website next to each other and they didn't look related. Now a change isn't finished until it exists on both.",
        ],
      },
      {
        heading: "Where It Is Now",
        paragraphs: [
          "Live at recastvid.com, with a Mac app and an Android app, both built and shipping. Recording is native on both. The website handles the library, playback, sharing and downloads.",
          "It sells storage, not features — a free tier and paid plans above it. Entitlement lives in a database that only the payment webhook can write to, so no client can hand itself a plan. It's deliberately the boring answer: the thing you pay for is the thing that actually costs me money.",
          "This one is here for the engineering decisions more than the pixels. Deleting the recorder, the offline playback rule, the ordering bug Android's docs get wrong, the leak I found by being a stranger to my own product. That's the part that transfers.",
        ],
        images: [
          { src: "/images/recast/landing-light.webp", alt: "recastvid.com — Record it once. Send a link. with Get Recast and Sign in buttons above a How it works section", caption: "recastvid.com as it stands: one sentence, one button, and the apps doing the actual work behind it." },
        ],
      },
    ]}
  />
);

export default StructuredRecastCaseStudy;
