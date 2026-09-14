import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredRecastCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="recast"
    title="Recast"
    description="Save it once and send the link. The screen recorder works as a genuine app on both your Mac and your phone, since a browser tab never would have been good enough."
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
      src: "/images/recast/landing-light.webp",
      alt: "recastvid.com: Record it once. Send a link. The product's front door, in light mode",
      caption: "The front door as it appears in light mode. Record it once and then send the link. The product is that sentence.",
      width: 1500,
      height: 831,
    }}
    relatedPost={{
      slug: "i-just-wanted-to-send-someone-a-video",
      title: "I Just Wanted to Send Someone a Video",
      blurb: "Recording your screen is free. Sending it is what everyone charges for, watermarks, five-minute caps, a sign-in wall for your viewer.",
    }}
    blocks={[
      {
        heading: "Thirty Seconds of Me Talking Over My Screen",
        paragraphs: [
          "For every message I write, I could improve it by recording myself talking for thirty seconds over my screen. The programs that allow this either require a login before the other person can view it, put a watermark on the recording, or limit the duration to five minutes and then ask for a card.",
          "The product fits into a single sentence. You record once and send a link, and the person who receives it can then press play without having to make an account, install anything, or attend a meeting in order to hear what you would have said.",
        ],
        imageLayout: "pair",
        images: [
          {
            src: "/images/recast/flow-how-i-worked.svg",
            alt: "How I worked on Recast: build browser recording, kill it, draw the app and website boundary, set the stop-means-watch rule, break and fix it, reorder the Android service, audit permissions, sign up as a stranger and find the leak, unify three looks, live",
            caption: "A step-by-step explanation of how I dealt with it, as the study itself describes. The decision in terracotta was the one on which the others were based. The more subdued steps were my own constructions that I later deleted.",
            width: 555,
            height: 1012,
          },
          {
            src: "/images/recast/flow-record-to-link.svg",
            alt: "Record to link: press Record on the site, open or download the app, record, stop, then in parallel play from the local file and upload in the background, website library and share link, the viewer presses play",
            caption: "The boundary in the form of a sequence. All the actions take place within the native app before the upload, and the website only ever receives the final file.",
            width: 395,
            height: 904,
          },
        ],
      },
      {
        heading: "I Deleted the Best-Looking Part",
        paragraphs: [
          "The first version recorded in the browser. It worked properly, and the demo went well, and I abandoned it anyway. I eliminated twenty-one files, including the capture engine, the compositor, the camera bubble, and the crop selector.",
          "I destroyed it since browser capture is of lower quality. Instead of getting your real machine at full quality you get a tab or a throttled screen, and there's a kind of hall-of-mirrors situation in which recording your browser from within your browser shows the recorder recording itself, which is odd stuff to send to a client.",
          "What I have now is a statement I have kept: the apps record, and the website saves and shares the recordings. The Record button on the site is a launcher that opens the native app, or provides a download link if you don't already have it, and I have refused to add a browser fallback since, because the boundary is what makes the recordings look good.",
        ],
        images: [
          { src: "/images/recast/launcher-modal.webp", alt: "The Record button on the website opening a dialog that offers Open Recast or Upload Video, with no browser-capture option", caption: "This is what the Record button does nowadays. It transfers you to the app or accepts a file. It never opens a capture tab.",
 width: 1500,
 height: 1041,
    },
          { src: "/images/recast/web-library.webp", alt: "The Recast web library: recordings with durations, dates and a Shared badge", caption: "The second part of the boundary is that the site contains everything and never makes any recordings.",
 width: 1500,
 height: 1048,
    },
        ],
      },
      {
        heading: "Stop Should Mean Watch",
        paragraphs: [
          "When you press stop, the video will immediately start playing from the file on your device, the upload taking place in the background. It never waits for the network, so it works even if you're on a plane.",
          "I violated my own rule in the Mac app without realizing it. The function that queued the finished recording was asynchronous and waited for the whole upload to complete before opening the player window. On a good connection, you never noticed it, but offline you would press stop and then stare at nothing until the request timed out.",
          "It now takes only a millisecond or two to return, and the upload takes place in a separate task. While I was in the code, I noticed the first upload after launch used five to eight seconds of framework setup time, so the app now warms up those components at startup rather than paying for them each time you press stop.",
        ],
        images: [
          { src: "/images/recast/settings-storage.webp", alt: "Recast settings on the web: storage used, recording count, and a note that recording options including auto-upload are set in the app on the recording device", caption: "The upload rule lives in the app, on the device doing the recording. The website is the destination, not the controller.",
 width: 1500,
 height: 776,
    },
        ],
      },
      {
        heading: "Android Argued With the Documentation",
        paragraphs: [
          "Google's media projection guide says to get the projection first, then start the foreground service. On Android 14, that order is reversed, because the service must already be running or the system will refuse the request.",
          "You can't authorize screen capture once and then use the permission again. Since consent is only valid once, the system prompt appears each time you record. I'd like it to be eliminated, but since it isn't mine to remove, the procedure is designed so that dealing with it feels like a single intentional step in the process rather than an interruption.",
          "I also noticed the build requesting permission to draw over other applications, a permission which I had never wanted. It comes from a dependency and not from my own code. In release versions this permission is blocked, and instead of relying on the claim that it has remained blocked, I check the actual APK after each upgrade.",
        ],
      },
      {
        heading: "I Found a Leak by Signing Up as a Stranger",
        paragraphs: [
          "To find out what a first-time user sees, I created a new account. The empty library wasn't actually empty. It contained a recording that belonged to someone else, and 57 megabytes were already deducted from a quota I had never used, on an account I had just made.",
          "The database rule that enabled a share link to work was written so any recording marked as shareable could be read, and it wasn't restricted to the one recording being viewed at the time, so it applied to everybody simultaneously. A single rule. Every recording.",
          "Nothing ownership-sensitive trusts that rule anymore, and your user ID filters every query that displays your library or calculates your storage. I discovered this by creating an account and checking. Nothing I wrote as a test would have picked it up, because each test ran under my own account."
        ],
        images: [
          { src: "/images/recast/signin.webp", alt: "The Recast sign-in card with an email field, a password field and a Create an account link", caption: "The door I went back through as a stranger. On the other side of it, everything was meant to be empty.",
 width: 1500,
 height: 1102,
    },
        ],
      },
      {
        heading: "Three Apps, One Identity",
        paragraphs: [
          "At one time, Recast displayed three different designs simultaneously: a warm editorial share page, a purple Material web library, and another on Android. Each screen had been looked at individually and had been approved, since nobody had placed them side by side, myself included.",
          "I discovered this by opening the app and the website side by side, then realizing they didn't seem related. Ever since then, I haven't considered a change finished until it appears on both platforms, a process that has slowed me down and prevented this from happening again.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "The tokens keep the Mac application and the website looking similar. Each contrast pair has been measured rather than assessed by eye, and both light and dark modes have been specified so the app conforms to your operating system.",
        ],
        images: [
          { src: "/images/recast/design-system.webp", alt: "Recast's design tokens: Fraunces and Instrument Sans, the warm paper palette with measured contrast, the 4px scale, and the rules-not-boxes decision", caption: "A single token file, mirrored into the mobile app value for value. Copying it literally is the only method that prevents the two surfaces of the product from diverging.",
 width: 1500,
 height: 913,
    },
        ],
      },
      {
        heading: "Where It Is Now",
        paragraphs: [
          "It is available at recastvid.com, with versions for both Mac and Android, both of which have been developed and are now being distributed. Recording is done natively on both platforms. The website manages the library, playback, sharing and downloads, and this separation is the entire basis of the architecture.",
          "The product offers storage: a free version, plus paid plans above that. Authorization is stored in a database that only the payment webhook can write to, so clients cannot assign themselves a plan. I decided to charge for storage because that's the aspect that costs me money when you use more of it.",
        ],
        images: [
          { src: "/images/recast/mac-app.webp", alt: "The Recast recorder panel floating over a browser window: Full Screen, Window or Area, camera and mic toggles, Start Recording", caption: "The Mac app, over whatever happens to be on screen. Recording is native on both platforms. The website never captures anything.",
 width: 1050,
 height: 790,
    },
        ],
      },
    ]}
  />
);

export default StructuredRecastCaseStudy;
