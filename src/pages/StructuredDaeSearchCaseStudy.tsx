import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredDaeSearchCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="dae-search"
    title="DAE Search"
    description="Enterprise search redesigned around an inconvenient truth: finding the data is only half the job. Knowing whether to trust it is the rest."
    tags={["Enterprise", "Data Discovery", "Search UX"]}
    heroImage={{
      src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg",
      alt: "DAE Search platform interface overview",
      hoverVideo: "/lovable-uploads/dae-search-hero.mp4",
    }}
    blocks={[
      {
        heading: "The Problem",
        paragraphs: [
          "Analysts search \"revenue,\" get 40 results, then spend 20 minutes figuring out which table is current, which is the team-of-record's, and which was deprecated three quarters ago but never cleaned up.",
          "The job isn't returning results — it's returning the one result you can act on.",
        ],
        images: [
          { src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/advancedsearch0.jpg", alt: "Learning from design iterations that didn't meet enterprise needs" },
        ],
      },
      {
        heading: "What I Built",
        paragraphs: [
          "Semantic search over metadata, not keyword match — tables called `arr_monthly` surface for \"revenue.\" Results cut from 40-to-narrow-down to 4-to-pick-from.",
          "Data lineage lives on the result itself: where the data came from, when it last refreshed, what depends on it. One glance, not a click-through.",
        ],
        images: [
          { src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/user%20flow%20process.webp", alt: "Information architecture analysis of existing data systems" },
        ],
      },
      {
        heading: "The Decisions That Mattered",
        paragraphs: [
          "Permission state is a first-class signal: restricted results stay visible with a lock and a one-click access request. Hiding them entirely made people think the data didn't exist.",
          "Permission-aware autocomplete was built, security flagged it — the suggestion box was leaking the existence of restricted datasets through pattern-matching.",
        ],
        images: [
          { src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/drawingouttheplan.webp", alt: "Initial concepts for enterprise search interface design" },
          { src: "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae/filterselect0.png", alt: "Search paradigm exploration and decision framework" },
        ],
      },
      {
        heading: "What I Got Wrong First",
        paragraphs: [
          "Started by treating this as consumer search with an enterprise wrapper — clean ranked list, minimal chrome. Wrong audience.",
          "Enterprise users want context, signals, and density. Analysts type fragments and abbreviations, not full questions.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "The shift from keyword match to semantic search with lineage and permissions inline reframed the product from a search tool to a data discovery tool.",
          "In enterprise contexts, trustworthiness of a result matters more than relevance. Most search UX optimizes for the second.",
        ],
      },
    ]}
  />
);

export default StructuredDaeSearchCaseStudy;
