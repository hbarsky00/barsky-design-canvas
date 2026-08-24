import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredDaeSearchCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="dae-search"
    title="DAE Search"
    description="Enterprise search redesigned around an inconvenient truth: finding the data is only half the job. Knowing whether to trust it is the rest."
    tags={["Enterprise", "Data Discovery", "Search UX"]}
    meta={[{ label: "Role", value: "Lead UX Designer" }]}
    heroImage={{
      // Was hosted on a Supabase project that's since been deprovisioned —
      // that domain no longer resolves at all. Hiram supplied the original
      // source files directly; restored locally rather than re-hosted
      // externally.
      src: "/images/dae-search/hero.webp",
      width: 1763,
      height: 1121,
      alt: "DAE Search platform interface overview",
      hoverVideo: "/lovable-uploads/dae-search-hero.mp4",
    }}
    blocks={[
      {
        heading: "Why I Built It",
        paragraphs: [
          "An analyst searches \"revenue\" and gets 40 results back. Then the real work starts: twenty minutes of figuring out which table is current, which one belongs to the team of record, and which was deprecated three quarters ago and never cleaned up.",
          "They were never short of results. They were short of a result they could act on.",
        ],
        images: [
          { src: "/images/dae-search/the-problem.webp", alt: "Learning from design iterations that didn't meet enterprise needs" },
        ],
      },
      {
        heading: "Putting the Answer on the Result",
        paragraphs: [
          "First I made the search actually understand the question. It runs semantically over the metadata rather than matching keywords, so a table called `arr_monthly` comes back when you type \"revenue.\" That alone took a result set from 40 things to narrow down to about 4 to choose between.",
          "Then I put the lineage on the result itself. Where it came from, when it last refreshed, what depends on it. You read it in the list instead of clicking through to find out.",
        ],
        images: [
          { src: "/images/dae-search/what-i-built.webp", alt: "Information architecture analysis of existing data systems" },
        ],
      },
      {
        heading: "The Two Calls That Mattered",
        paragraphs: [
          "Restricted results stay visible, with a lock on them and a one-click request for access. We tried hiding them and it backfired badly. People concluded the data did not exist and went off to rebuild it themselves.",
          "I also built permission-aware autocomplete, and security killed it. They were right. The suggestions were leaking the existence of restricted datasets to anyone who typed enough of the name to pattern-match it.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/dae-search/decisions-1.webp", alt: "Initial concepts for enterprise search interface design", width: 1733, height: 1274 },
          { src: "/images/dae-search/decisions-2.png", alt: "Search paradigm exploration and decision framework", width: 1920, height: 969 },
        ],
      },
      {
        heading: "What I Got Wrong",
        paragraphs: [
          "I started out treating this like consumer search with an enterprise skin on it. Clean ranked list, minimal chrome, get out of the way. Wrong audience entirely.",
          "These people want density. They want signals crammed into the row. And they do not type questions, they type fragments and internal abbreviations, because they already know what they are looking for.",
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "Moving from keyword matching to semantic search, with lineage and permissions sitting inline, changed what the thing actually is. It stopped being a search box and became the place you go to find out whether data is worth using.",
          "The lesson I took off it: inside a company, whether you can trust a result matters more than how relevant it is. Almost all search design optimises for the second one.",
        ],
      },
    ]}
  />
);

export default StructuredDaeSearchCaseStudy;
