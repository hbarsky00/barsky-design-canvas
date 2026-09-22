import { getTemplateForPageType } from "../templateRegistry";
import { SectionExport } from "./global";
import { structuredCaseStudies, StructuredCaseStudyData } from "@/data/structuredCaseStudies";

export function extractStructuredCaseStudyContent(caseStudyId: string): SectionExport[] {
  const template = getTemplateForPageType("case-study");
  const caseStudy = structuredCaseStudies[caseStudyId];
  
  if (!caseStudy) {
    return template.map(section => ({
      key: section.key,
      displayName: section.displayName,
      visibility: "hidden" as const,
      fields: {
        h1: "",
        h2: "",
        h3: "",
        body: "",
        bullets: [],
        captions: [],
        formLabels: [],
        tooltips: [],
        ctas: [],
        notes: "Case study not found"
      }
    }));
  }
  
  return template.map(section => {
    switch (section.key) {
      case "hero":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: caseStudy.title,
            h2: "",
            h3: "",
            body: caseStudy.description,
            bullets: caseStudy.tags,
            captions: caseStudy.heroVideo ? [caseStudy.heroVideo.alt] : [],
            formLabels: [],
            tooltips: [],
            ctas: caseStudy.projectLink ? [{ label: "View Live Project", url: caseStudy.projectLink }] : [],
            notes: caseStudy.heroVideo ? "Hero video with poster image" : "Hero section without video"
          }
        };

      case "overview":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Overview",
            h3: "",
            body: caseStudy.description,
            bullets: caseStudy.tags,
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "Project overview with tags"
          }
        };

      case "research":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.researchSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: "Research",
            h3: "",
            body: caseStudy.researchSection?.subhead || "",
            bullets: caseStudy.researchSection?.emergingThemes.map(theme => 
              `${theme.eyebrow}: ${theme.insight} — ${theme.drove}`
            ) || [],
            captions: caseStudy.researchSection?.researchImages?.map(img => img.alt) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.researchSection ? "Research insights and emerging themes" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "problem":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.problemCallout ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.problemCallout?.eyebrow || "",
            h3: "",
            body: caseStudy.problemCallout?.statement || "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.problemCallout ? "Problem statement callout" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "sprint-zero":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.sprintZeroSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.sprintZeroSection?.title || "",
            h3: caseStudy.sprintZeroSection?.eyebrow || "",
            body: [
              caseStudy.sprintZeroSection?.workshopKickoff,
              caseStudy.sprintZeroSection?.explorations,
              caseStudy.sprintZeroSection?.decisionPoint
            ].filter(Boolean).join('\n\n'),
            bullets: [],
            captions: caseStudy.sprintZeroSection?.images?.map(img => `${img.alt}${img.caption ? ` — ${img.caption}` : ''}`) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.sprintZeroSection ? "Sprint zero exploration with images and annotations" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "key-insights":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.keyInsights ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: "Key Insights",
            h3: "",
            body: "",
            bullets: caseStudy.keyInsights?.map(insight => 
              `${insight.number}. ${insight.title}: ${insight.description}`
            ) || [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.keyInsights ? "Numbered key insights" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "my-thought-process":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.myThoughtProcessSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.myThoughtProcessSection?.title || "",
            h3: caseStudy.myThoughtProcessSection?.eyebrow || "",
            body: caseStudy.myThoughtProcessSection?.content || "",
            bullets: [],
            captions: caseStudy.myThoughtProcessSection?.images?.map(img => 
              `${img.alt}${img.caption ? ` — ${img.caption}` : ''}`
            ) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.myThoughtProcessSection ? "Thought process with supporting images" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "ideation":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.ideationSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: "Ideation",
            h3: "",
            body: caseStudy.ideationSection?.subhead || "",
            bullets: caseStudy.ideationSection?.bubbles.map(bubble => 
              `${bubble.title}: ${bubble.description}`
            ) || [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.ideationSection ? "Ideation bubbles and concepts" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "iterations":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.ideationSection?.iterations ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: "Iterations",
            h3: "",
            body: "",
            bullets: caseStudy.ideationSection?.iterations.map(iteration => 
              `${iteration.label}: ${iteration.alt}${iteration.blurb ? ` — ${iteration.blurb}` : ''}`
            ) || [],
            captions: caseStudy.ideationSection?.iterations.map(iteration => iteration.alt) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.ideationSection?.iterations ? "Design iterations with annotations" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "validation-testing":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.userTestingSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.userTestingSection?.title || "",
            h3: caseStudy.userTestingSection?.eyebrow || "",
            body: caseStudy.userTestingSection?.description || "",
            bullets: caseStudy.userTestingSection?.metrics?.map(metric => 
              `${metric.value}: ${metric.label}`
            ) || [],
            captions: caseStudy.userTestingSection?.images?.map(img => 
              `${img.alt}${img.caption ? ` — ${img.caption}` : ''}`
            ) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.userTestingSection ? "User testing results with metrics" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "final-product":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.finalProductSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.finalProductSection?.title || "",
            h3: caseStudy.finalProductSection?.eyebrow || "",
            body: caseStudy.finalProductSection?.description || "",
            bullets: [],
            captions: caseStudy.finalProductSection?.images?.map(img => 
              `${img.alt}${img.caption ? ` — ${img.caption}` : ''}`
            ) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.finalProductSection ? "Final product showcase with images" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "outcome-impact":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.outcomeSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.outcomeSection?.title || "",
            h3: caseStudy.outcomeSection?.eyebrow || "",
            body: caseStudy.outcomeSection?.description || "",
            bullets: caseStudy.outcomeSection?.metrics?.map(metric => 
              `${metric.value}: ${metric.label}`
            ) || [],
            captions: caseStudy.outcomeSection?.images?.map(img => 
              `${img.alt}${img.caption ? ` — ${img.caption}` : ''}`
            ) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.outcomeSection ? "Outcome metrics and impact" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "what-didnt-work":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: caseStudy.whatDidntWorkSection ? "rendered" : "hidden",
          fields: {
            h1: "",
            h2: caseStudy.whatDidntWorkSection?.title || "",
            h3: caseStudy.whatDidntWorkSection?.eyebrow || "",
            body: caseStudy.whatDidntWorkSection?.content || "",
            bullets: [],
            captions: caseStudy.whatDidntWorkSection?.images?.map(img => 
              `${img.alt}${img.caption ? ` — ${img.caption}` : ''}`
            ) || [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: caseStudy.whatDidntWorkSection ? "Lessons learned section" : "<EMPTY SECTION (present in template)>"
          }
        };

      case "more-work":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "More Work",
            h3: "",
            body: "Explore other case studies and projects.",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "View All Projects", url: "/projects" }
            ],
            notes: "Related work section (SingleCaseStudyPreview)"
          }
        };

      case "case-study-contact":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "Let's Work Together",
            h3: "",
            body: "Interested in discussing your project? Let's connect.",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "Get In Touch", url: "/contact" }
            ],
            notes: "Case study contact section (CaseStudyContactSection)"
          }
        };

      case "share-toolbar":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [
              "Share on Twitter",
              "Share on LinkedIn", 
              "Copy Link"
            ],
            ctas: [],
            notes: "Social sharing toolbar with aria-labels"
          }
        };

      case "navigation":
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "rendered" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [
              { label: "Previous Project", url: "#" },
              { label: "Next Project", url: "#" },
              { label: "All Projects", url: "/projects" }
            ],
            notes: "Case study navigation controls"
          }
        };

      default:
        return {
          key: section.key,
          displayName: section.displayName,
          visibility: "hidden" as const,
          fields: {
            h1: "",
            h2: "",
            h3: "",
            body: "",
            bullets: [],
            captions: [],
            formLabels: [],
            tooltips: [],
            ctas: [],
            notes: "<EMPTY SECTION (present in template)>"
          }
        };
    }
  });
}