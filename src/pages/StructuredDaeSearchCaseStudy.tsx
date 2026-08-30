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
      caption: "Search across the data catalogue, with the trust signals moved onto the result instead of a click away from it.",
    }}
    relatedPost={{
      slug: "finding-the-data-is-half-the-job",
      title: "Finding the Data Is Half the Job",
      blurb: "An analyst searches for revenue and gets forty results. The search worked. The next twenty minutes \u2014 deciding which table to trust \u2014 is the part\u2026",
    }}
    blocks={[
      {
        heading: "Forty Results, and Twenty Minutes to Pick One",
        paragraphs: [
          "An analyst searches \"revenue\" and gets 40 results back. Then the real work starts: twenty minutes of figuring out which table is current, which one belongs to the team of record, and which was deprecated three quarters ago and never cleaned up.",
          "None of that is searching. It is opening tabs. You click into a table, find the owner, check when it last refreshed, look for anything downstream still reading from it, then go back and do it again for the next candidate. Forty times, if you are being careful. Nobody is being careful forty times.",
          "They were never short of results. They were short of a result they could act on.",
        ],
        images: [
          { src: "/images/dae-search/the-problem.webp", alt: "Learning from design iterations that didn't meet enterprise needs", caption: "Forty results and no way to tell which table is current. The search worked; the twenty minutes after it are the actual job." },
        ],
      },
      {
        heading: "Making It Understand the Question",
        paragraphs: [
          "Keyword matching is why the list is forty long. Someone types \"revenue\" and gets back everything with the word in a column name, a description or a stale comment, ranked by string similarity to a word nobody names their tables after.",
          "So the search runs semantically over the metadata instead. A table called `arr_monthly` comes back when you type \"revenue,\" because the model knows what annual recurring revenue is and the string match never would have.",
          "That alone took a result set from 40 things to narrow down to about 4 to choose between. It did not answer the question underneath, though. Four candidates still need a decision, and the decision was still happening in other tabs.",
        ],
      },
      {
        heading: "The Trust Signals Belong on the Row",
        paragraphs: [
          "So I moved them there. Where the table came from, when it last refreshed, what depends on it. You read it in the list instead of clicking through to find out.",
          "That sounds like a small layout change and it is the whole product. The question an analyst is actually asking is not \"which of these matches my words\" but \"which of these can I put in front of a VP on Thursday.\" Freshness and lineage answer that. Relevance never did.",
          "It also changes what a bad result costs. Under the old list you found out a table was stale after you had built on it. Here you find out before you open it.",
        ],
        images: [
          { src: "/images/dae-search/what-i-built.webp", alt: "Information architecture analysis of existing data systems", caption: "Lineage on the result itself: where a table came from, when it last refreshed, what depends on it. Read in the list, not after a click." },
        ],
      },
      {
        heading: "Restricted Results Stay Visible",
        paragraphs: [
          "Locked, with a one-click request for access, but visible. I tried hiding them first, which is the obvious call and the wrong one.",
          "It backfired badly. People concluded the data did not exist and went off to rebuild it themselves, which is worse for security than showing them a padlock: now there are two copies of sensitive data and only one of them is governed.",
        ],
      },
      {
        heading: "Security Killed My Autocomplete, and They Were Right",
        paragraphs: [
          "I built permission-aware autocomplete. Type three letters, get suggestions drawn from everything in the catalogue, restricted or not, on the theory that knowing a name exists is harmless.",
          "It is not harmless. The suggestions leaked the existence of restricted datasets to anyone who typed enough of the name to pattern-match it, which is a slower version of just reading the table list. Security caught it in review and I did not argue.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/dae-search/decisions-1.webp", alt: "Initial concepts for enterprise search interface design", width: 1733, height: 1274, caption: "Early concepts for the result row, from when I was still designing consumer search with an enterprise skin on it." },
          { src: "/images/dae-search/decisions-2.png", alt: "Search paradigm exploration and decision framework", width: 1920, height: 969, caption: "The version that admitted this audience wants density. They type fragments and internal abbreviations, not questions." },
        ],
      },
      {
        heading: "I Designed Consumer Search First",
        paragraphs: [
          "Clean ranked list, minimal chrome, get out of the way. Wrong audience entirely.",
          "These people want density. They want signals crammed into the row, because scanning ten dense rows is faster than opening three clean ones. Every bit of whitespace I added was costing them a click.",
          "They also do not type questions. They type fragments and internal abbreviations, because they already know what they are looking for and they are not in a conversation with the search box.",
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "This one shipped with its own style guide, so the swatches here are read straight off it rather than reconstructed. Nine named colours in three tiers, and the tiers do different jobs: one primary that carries every action, a secondary set that carries state, and neutrals doing the work of separating result rows.",
          "The neutrals are the interesting part. Mint, sage and khaki are what let a dense row show freshness without a legend or an extra column, which is the only reason the row could hold lineage at all.",
        ],
        images: [
          {
            src: "/images/dae-search/design-system.webp",
            alt: "DAE Search design tokens read off the project's own style guide \u2014 Primary Blue, White and Dark Grey, a secondary set of Medium Blue, Ice Blue and Orangey Red, and Cool Mint, Sage and Light Khaki as neutrals",
            caption: "Read off the project's own style guide. Primary Blue carries every action; the neutrals carry freshness, so the row never needs a legend.",
            width: 1500,
            height: 1164,
          },
        ],
      },
      {
        heading: "Trust Beat Relevance",
        paragraphs: [
          "Semantic search with lineage and permissions inline changed what the thing is. It stopped being a search box and became the place you go to find out whether data is worth using.",
          "Inside a company, whether you can trust a result matters more than how relevant it is. Almost all search design optimises for the second one.",
        ],
      },
    ]}
  />
);

export default StructuredDaeSearchCaseStudy;
