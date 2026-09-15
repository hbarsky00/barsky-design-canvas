import React from "react";
import SimpleCaseStudyPage from "@/components/case-study/SimpleCaseStudyPage";

const StructuredBzEssentialsCaseStudy: React.FC = () => (
  <SimpleCaseStudyPage
    projectId="bz-essentials"
    title="BZ Essentials"
    description="The enterprise knowledge portal is constructed based on the client's PRD, the difficult aspect being determining if the document you have found is applicable to you."
    tags={["Enterprise", "Information Architecture", "Design Systems", "Solo Build"]}
    // Both facts are the study's own words pulled above the fold: "built
    // from a client PRD" and "It's a prototype ... a realistic sample instead
    // of a full library". A founder arriving with a spec should see the
    // starting point matches theirs before they scroll, and whoever clicks
    // Visit should know what kind of live it is before they get there.
    meta={[
      { label: "Role", value: "Lead UX Designer & Developer" },
      { label: "Started from", value: "A client's written PRD" },
      { label: "Status", value: "Live prototype, sample content" },
    ]}
    liveUrl="https://az-essentials.netlify.app"
    relatedPost={{
      slug: "a-filter-nobody-opens",
      title: "A Filter Nobody Opens Isn't a Feature",
      blurb: "Some content is global, some is regional. Putting that in a filter menu means the one person who most needs it never sees it\u2026",
    }}
    heroImage={{
      src: "/images/bz-essentials/card-product.webp",
      hoverVideo: "/bz-essentials-card.mp4",
      alt: "BZ Essentials on desktop and on a phone: the portal home and the ADRD domain, with the Global/US region lens in each header",
      caption: "An enterprise knowledge portal built from a client PRD. Region is a lens over the whole app, not a filter nobody opens.",
      width: 1600,
      height: 1000,
    }}
    blocks={[
      {
        heading: "A PRD Isn't a Product",
        paragraphs: [
          "At the beginning it was a document setting out the requirements for an internal knowledge portal\u2014that is, the place where the marketing team goes to find the process, the template or the guideline they are supposed to be following.",
          "A PRD might outline an information architecture in a way that seems acceptable at first but collapses as soon as it's actually used, which is why I decided to create one. It includes three domains, four categories in each domain, and a group of documents complete with the metadata that a genuine one would have\u2014namely, owner, department, version, status, region, attachments, and related items.",
          "It's a prototype from a fictitious brand, and this fact is stated in the footer, but it is the underlying structure and behaviour that constitute the actual design work and those are the elements that this page deals with.",
        ],
        images: [
          { src: "/images/bz-essentials/process-flow.webp", alt: "Process flow: Home to domain landing to category listing to document, with search as a second path straight to the document, and the region lens applying to all of it", caption: "There are two ways of getting to the same destination\u2014browsing enables you to learn the vocabulary and search allows you to bypass the hierarchy once you already have it.",
 width: 1500,
 height: 806,
    },
        ],
      },
      {
        heading: "Region Runs Through the Whole App",
        paragraphs: [
          "The condition was that certain content was to be global while other content was to be available only in the United States. The straightforward solution would be to use a filter on the search page. However, that is incorrect since the person who needs it most is the one who never uses the search function; they follow a link, end up on a document, and have no realization that the document does not apply to their market.",
          "The region serves as a lens onto the entire app since it is contained within a context provider, is set once in the header, and is then read by all the different parts of the app: the counts on the category cards, the featured lists, the search results, and the badge on an individual document.",
          "All content labelled Both is visible and for everything else it must correspond to the region you are in; that's the entire rule. What this means is that switching to the US does not hide most of the portal but instead adds the US-specific material on top of the common section, the opposite of what a simple equality check would do.",
        ],
        images: [
          { src: "/images/bz-essentials/domain.webp", alt: "The ADRD domain landing: its four categories with live resource counts, and the latest documents underneath", caption: "The counts for these cards are calculated from the point of view of the region, which is why they alter when you change the region. A false count is worse than having no count at all.",
 width: 1500,
 height: 1197,
    },
        ],
      },
      {
        heading: "The Metadata Is the Product",
        paragraphs: [
          "What people really need from a portal such as this isn't the file itself but the answer to the question \"Can I use this?\". That is to say, who owns it, which version it is, whether it has been approved or is still under review, when it last changed, and whether it applies to my region.",
          "The document page starts off with that panel rather than putting it underneath the download section, with status, owner, department, version, the dates and the region all located on the right hand side so that you can read them before making a commitment.",
          "Related documents are placed at the bottom as actual links between records and not as a 'you might also like' section. In a compliance situation the related item is normally the one that governs the one being read and this is more important than a recommendation.",
        ],
        images: [
          { src: "/images/bz-essentials/design-system.webp", alt: "Design system: Inter, the gray ground and white surface, four accent pairs, region and status badges, the single card shape and the eight components", caption: "There are four accents, one card shape, and eight components; the region lens acts as a context provider not as a component threaded through all of them.",
 width: 1500,
 height: 1042,
    },
          { src: "/images/bz-essentials/document.webp", alt: "A document page: cover, status and region badges, attachments with sizes, keywords and tags, and the details panel", caption: "The download is available. It isn't the first item, since it isn't the first question.",
 width: 1500,
 height: 1270,
    },
        ],
      },
      {
        heading: "Three Doors, and a Search for People Who Already Know",
        paragraphs: [
          "The search-first approach would have resulted in a quicker build, but it is the incorrect default in this case since a person who is new to the subject cannot search for a process of which they do not yet know the name, and it is by browsing that they find out what is available.",
          "The front door has three domains, each with its own color and landing page, and search is the fourth option rather than the only option.",
          "Search is then built for the other half of the audience: the people who know exactly what they want. Facets for business area, region, document type, and status, filtering a live result count, because in this kind of library the useful question is usually \"approved templates for the US\" and not a keyword at all.",
        ],
        images: [
          { src: "/images/bz-essentials/search.webp", alt: "Search and browse: faceted filters for business area, region, document type and status beside a result grid", caption: "It is the facets that carry out the work since the useful question is generally a combination. The filters serve as the query.",
 width: 1500,
 height: 1354,
    },
        ],
      },
      {
        heading: "Where It Landed",
        paragraphs: [
          "You can find it live at az-essentials.netlify.app and click on all of the following: the region switch, the domains, the facets, and the document pages.",
          "It is a prototype and I'd rather be straightforward about its limitations. The PRD was provided by an actual client, a pharmaceutical company, and the brand name used on the public build is one that I created as a substitute. The content consists of a realistic example rather than a complete library, there is no authentication or content management system behind it, and nothing presented here is an official system for anyone.",
          "What it's evidence of is the part that usually stays theoretical: taking a written spec, deciding what the structure actually has to be, and building it far enough that you can find out whether it holds. The region-as-a-lens decision only looks obvious once you have seen the version where it is a filter buried in a search page.",
        ],
      },
    ]}
  />
);

export default StructuredBzEssentialsCaseStudy;
