import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredDaeSearchCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="dae-search"
    title="DAE Search"
    description="Enterprise search has been redesigned based on an uncomfortable truth: while finding the data is only half the task, deciding whether to trust it is the other half."
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
      caption: "The catalogue is displayed with the advanced search feature active: there are 350 assets, having been narrowed down by filters related to therapeutic area, data type and metadata. The difficult part was always finding candidates.",
    }}
    relatedPost={{
      slug: "finding-the-data-is-half-the-job",
      title: "Finding the Data Is Half the Job",
      blurb: "An analyst searches for revenue and gets forty results. The search worked. The next twenty minutes, deciding which table to trust, is the part\u2026",
    }}
    blocks={[
      {
        heading: "Forty Results, and Twenty Minutes to Pick One",
        paragraphs: [
          "When the analyst searches for \"revenue\" they are given 40 results; the actual work then begins, which involves twenty minutes spent deciding which table is the current one, which one belongs to the team that is responsible, and which had been deprecated three quarters ago and was never cleaned up.",
          "That isn't really searching; it's just opening up tabs. You click on a table, identify the owner, check when it last refreshed, look for anything else that's still reading from it, then return and carry out the same process for the next item, and if you're being careful you'll do this forty times, even though no one actually does. The analysts had a lot of results. The only thing they lacked was one that they could claim as their own.",
          "The kind of data shown in these screenshots relates to the life sciences: specifically, therapeutic areas, registries, trial sets and claims sets. If you replace 'revenue' with 'diabetes' then nothing about the problem is affected, which is the reason why I am at ease in using the finance example.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/dae-search/decisions-1.webp", alt: "Hand sketches of advanced search: a multi-term search modal, a data-asset selection page, selected entities and meta tags, and the results table they feed", width: 1733, height: 1274, caption: "An illustration of the amount that could be included in the list before it ceased to be a list\u2014such as multiple search terms, the entities that had been selected, and the meta tags carried over into the results." },
          {
            src: "/images/dae-search/flow-how-i-worked.svg",
            alt: "How I worked on DAE Search: watch analysts, design consumer search first, wrong audience, density, semantic search, trust signals on the row, hide restricted results, backfired, show them locked, build autocomplete, security review cuts it, shipped with a style guide",
            caption: "A step-by-step explanation of how I worked on it, according to the study itself. The decision known as Terracotta was the one on which the rest was based. The more subdued steps were my own constructions which I later deleted.",
            width: 492,
            height: 1100,
          },
        ],
      },
      {
        heading: "Making It Understand the Question",
        paragraphs: [
          "The reason the list contains forty items is due to keyword matching; when someone types \"revenue\" they get back all the entries that have the word in the column name, in the description or in a stale comment and these are ranked according to their string similarity to a word which no one has named their tables after.",
          "The search therefore proceeds semantically through the metadata, and when you type \"revenue\" the table named `arr_monthly` is returned since the model knows what annual recurring revenue is and a simple string match never could have.",
          "It reduced the result set from 40 items to about 4 for selection, but it didn't deal with the underlying question since four of the candidates still required a decision and the decision was still being made in the other tabs.",
        ],
        images: [
          { src: "/images/dae-search/the-problem.webp", alt: "The advanced search panel: an empty prompt to start typing, one diagnosis filter chip applied, and a count of 15 matching data assets", caption: "The search was a success; it produced a filter chip, gave a count of the assets that matched, but provided no information on the screen about which of them is the current one, who owns it, or whether you are permitted to use it.",
 width: 1302,
 height: 710,
    },
        ],
      },
      {
        heading: "The Trust Signals Belong on the Row",
        paragraphs: [
          "Therefore I transferred them to the row. The origin of the table and the time at which it last refreshed, likewise, are all visible in the list rather than requiring you to click through to find this information.",
          "It seems to be just a minor change to the layout and yet involves the entire product. The real question that an analyst is asking is \"which of these can I show to a VP on Thursday\", and it is freshness and lineage that provide the answer, whereas a relevance score cannot.",
          "It also alters the cost of having a bad result, since under the previous system you only discovered that a table was out of date after you had already started to use it, sometimes even days later, whereas now you know about it before you open any row.",
        ],
        images: [
          { src: "/images/dae-search/what-i-built.webp", alt: "The DAE Search process flow, nine steps from login through dashboard, data assets, advanced search and entity selection to the related content for one chosen asset", caption: "It's nine steps from logging in to gaining any real knowledge about a single asset, and after the 'Results' stage the analyst has to decide what to trust, which is exactly what the results list was leaving them to do by themselves.",
 width: 1024,
 height: 576,
    },
        ],
      },
      {
        heading: "Restricted Results Stay Visible",
        paragraphs: [
          "They remain locked and can be given access with just one click, though they still stay visible. I initially tried to hide them since that seems to be the straightforward option.",
          "It had the opposite effect; people decided that the data did not exist and set about rebuilding it themselves, which is more dangerous from a security point of view than simply showing them a padlock, since there are now two copies of the sensitive data and only one of them is protected.",
        ],
      },
      {
        heading: "Security Killed My Autocomplete, and They Were Right",
        paragraphs: [
          "I developed an autocomplete feature that is aware of permissions. If you type in three letters, it will provide suggestions based on everything in the catalogue, whether or not that thing is restricted, on the basis that it's harmless to know that a name exists.",
          "It is by no means harmless; the suggestions revealed the existence of restricted datasets to anyone who typed in a sufficient portion of the name so that it could be matched by pattern, which is essentially a slower way of just looking at the list of tables. The security team picked up on it during their review and I didn't contest this.",
        ],
        images: [
          { src: "/images/dae-search/decisions-2.webp", alt: "The result table: data asset name, therapeutic area, geography and data availability as columns, with therapeutic-area filters alongside and 127 assets found", width: 1920, height: 969, caption: "Density has won; the name, the therapeutic area, the geography and availability are all in the same row. And consider the query, “Diabtes”: people type in fragments containing typos, and the search system has to cope with that." },
        ],
      },
      {
        heading: "I Designed Consumer Search First",
        paragraphs: [
          "Here's a clean ranked list with as little chrome as possible and get out of the way\u2014targeting the wrong audience.",
          "What the people want is density; they prefer having as many signals as possible in each row since it's faster to scan ten dense rows than it is to open three clean ones, and each bit of white space that I had added cost them a click.",
          "They also never form complete questions; instead they enter fragments and use internal abbreviations since they already know what they want and are not having a conversation with the search box. \"Diabtes\", with the spelling error, is in fact a real query from the screenshots.",
        ],
        images: [
        ],
      },
      {
        heading: "The Design System",
        paragraphs: [
          "It came with its own style guide, and therefore the swatches shown here are taken directly from it rather than being reconstructed. There are nine named colours divided into three groups, each group serving a different function: one primary group which handles all the actions, a second group which handles state, and the neutrals which are responsible for separating the result rows.",
          "What's interesting is the use of the neutrals; it is thanks to mint, sage and khaki that a dense row can appear fresh even without a legend or an extra column, that being the only reason why the row can show lineage at all.",
        ],
        images: [
          {
            src: "/images/dae-search/design-system.webp",
            alt: "DAE Search design tokens read off the project's own style guide: Primary Blue, White and Dark Grey, a secondary set of Medium Blue, Ice Blue and Orangey Red, and Cool Mint, Sage and Light Khaki as neutrals",
            caption: "The project's own style guide states that Primary Blue should be used for all actions while the neutral colours are responsible for providing a fresh appearance, so there is no need for a legend in the row.",
            width: 1500,
            height: 1164,
          },
        ],
      },
      {
        heading: "Trust Beat Relevance",
        paragraphs: [
          "The nature of semantic search, with lineage and permissions included, has changed. It is no longer just a search box but has become the place you go to find out whether data is worth using, which within a company has always been the question people have been asking, albeit in other tabs and in a slow manner.",
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It was shipped with its own style guide, and the swatches were pulled from that guide rather than reconstructed for this page. The autocomplete underwent a security review during which the design was altered before it was released, a kind of review that only takes place when a thing is actually being launched.",
          "What I can't tell you is what happened after. I don't have adoption or time-saved numbers for this one, and I'd rather say so than reach for a number from somewhere else and let you assume it came from here.",
        ],
      },
    ]}
  />
);

export default StructuredDaeSearchCaseStudy;
