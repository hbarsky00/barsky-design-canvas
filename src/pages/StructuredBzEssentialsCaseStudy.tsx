import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredBzEssentialsCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="bz-essentials"
    title="BZ Essentials"
    description="An enterprise knowledge portal built from a client PRD — where the hard part isn't finding a document, it's knowing whether the one you found applies to you."
    tags={["Enterprise", "Information Architecture", "Design Systems", "Solo Build"]}
    meta={[{ label: "Role", value: "Lead UX Designer & Developer" }]}
    liveUrl="https://az-essentials.netlify.app"
    heroImage={{
      src: "/images/bz-essentials/home.webp",
      alt: "BZ Essentials home — hero, quick access panel, and the four entry points into the portal",
      hoverVideo: "/bz-essentials-card.mp4",
    }}
    blocks={[
      {
        heading: "A PRD Isn't a Product",
        paragraphs: [
          "This started as a requirements document for an internal knowledge portal — the place a marketing team goes to find the process, the template or the guideline they're supposed to be following.",
          "A PRD can describe an information architecture in a way that sounds fine and falls apart the moment it's clickable. So I built it. Three domains, four categories under each, and a set of documents with the metadata a real one would carry: owner, department, version, status, region, attachments, related items.",
          "It's a prototype under a made-up brand, and the footer says so. What's real is the structure and the behaviour underneath it.",
        ],
        images: [
          { src: "/images/bz-essentials/ia.webp", alt: "Information architecture — three domains with four categories each, and Search & Browse as a fourth entry point", caption: "The structure the spec described, drawn out. Every count on it is one the app actually computes." },
        ],
      },
      {
        heading: "Region Is a Lens, Not a Filter",
        paragraphs: [
          "The requirement was that some content is global, some is US-only. The obvious build is a filter in the search page. That's wrong, because the person who needs it most is the one who never opens search — they follow a link, land on a document, and have no idea it doesn't apply to their market.",
          "So region is a lens on the whole app instead. It lives in a context provider, it's set once in the header, and every surface reads through it: the counts on the category cards, the featured lists, the search results, the badge on an individual document.",
          "The rule that makes it work is small. Content marked Both is always visible, and everything else has to match the region you're in. That means switching to US doesn't hide most of the portal, it adds the US-specific material on top of the shared set — which is the behaviour people expect and the opposite of what a naive equality check would do.",
        ],
        images: [
          { src: "/images/bz-essentials/region.webp", alt: "Region visibility matrix — content tagged Both stays visible in either region, while Global-only and US-only content swaps", caption: "One line decides it. Get that line wrong and switching region empties the portal instead of narrowing it." },
          { src: "/images/bz-essentials/domain.webp", alt: "The ADRD domain landing — its four categories with live resource counts, and the latest documents underneath", caption: "Counts on these cards are computed through the region lens, so they change when you switch. A number that lies is worse than no number." },
        ],
      },
      {
        heading: "The Metadata Is the Product",
        paragraphs: [
          "The thing people actually need from a portal like this isn't the file. It's the answer to \"can I use this?\" — who owns it, which version this is, whether it's approved or still in review, when it last changed, and whether it applies to my region.",
          "So the document page leads with that panel rather than burying it under the download. Status, owner, department, version, dates and region sit together on the right, where you read them before you commit to anything.",
          "Related documents sit at the bottom as real links between records, not a \"you might also like\" strip. In a compliance context the related item is usually the thing that governs the one you're reading, which is worth more than a recommendation.",
        ],
        images: [
          { src: "/images/bz-essentials/document.webp", alt: "A document page — cover, status and region badges, attachments with sizes, keywords and tags, and the details panel", caption: "The download is there. It is not the first thing, because it is not the first question." },
        ],
      },
      {
        heading: "Three Doors, and a Search for People Who Already Know",
        paragraphs: [
          "Search-first would have been the faster build. It's also the wrong default here, because someone new to this material can't search for a process whose name they don't know yet. Browsing is how you learn what exists.",
          "So the front door is three domains, each with its own colour and its own landing page, and search sits alongside them as the fourth option rather than the only one.",
          "Search is then built for the other half of the audience — the people who know exactly what they want. Facets for business area, region, document type and status, filtering a live result count, because in this kind of library the useful question is usually \"approved templates for the US\" and not a keyword at all.",
        ],
        imageLayout: "pair",
        images: [
          { src: "/images/bz-essentials/concepts.webp", alt: "Two entry concepts compared — search-first, rejected, against browse-first with search alongside", caption: "The version I didn't build, next to the one I did." },
          { src: "/images/bz-essentials/search.webp", alt: "Search and browse — faceted filters for business area, region, document type and status beside a result grid", caption: "Facets, not a smarter keyword match. The filters are the query." },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "It's live at az-essentials.netlify.app and you can click all of it — the region switch, the domains, the facets, the document pages.",
          "It's a prototype and I'd rather be plain about the edges. The content is a realistic sample rather than a full library, the brand is invented, and there's no authentication or CMS behind it. Nothing here is an official system for anyone.",
          "What it's evidence of is the part that usually stays theoretical: taking a written spec, deciding what the structure actually has to be, and building it far enough that you can find out whether it holds. The region-as-a-lens decision is the one I'd defend — it only looks obvious once you've seen the version where it's a filter nobody opens.",
        ],
        videos: [
          {
            src: "/bz-essentials-walkthrough.mp4",
            poster: "/images/bz-essentials/walkthrough-poster.jpg",
            caption:
              "The full portal end to end: home, the region switch changing what is visible, a domain landing with live counts, a document page with its metadata and related records, and faceted search.",
          },
        ],
      },
    ]}
  />
);

export default StructuredBzEssentialsCaseStudy;
