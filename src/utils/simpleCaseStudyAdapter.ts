import SimpleCaseStudyPage, { SimpleCaseStudyImage, SimpleCaseStudyPageProps } from "@/components/case-study/SimpleCaseStudyPage";
import { getStructuredCaseStudy, StructuredCaseStudyData } from "@/data/structuredCaseStudies";

type SimpleCaseStudyOverrides = {
  heroImage?: SimpleCaseStudyImage;
};

const toImages = (
  images?: Array<{ src: string; alt: string }>
): SimpleCaseStudyImage[] | undefined => {
  if (!images || images.length === 0) return undefined;
  return images.map((image) => ({ src: image.src, alt: image.alt }));
};

const compact = (items: Array<string | undefined>): string[] =>
  items.map((item) => item?.trim()).filter((item): item is string => Boolean(item));

const getHeroImage = (
  study: StructuredCaseStudyData,
  override?: SimpleCaseStudyImage
): SimpleCaseStudyImage | undefined => {
  if (override) return override;

  if (study.heroImage) {
    return {
      src: study.heroImage.src,
      alt: study.heroImage.alt,
    };
  }

  if (study.heroVideo) {
    return {
      src: study.heroVideo.poster,
      alt: study.heroVideo.alt,
      hoverVideo: study.heroVideo.src,
    };
  }

  return undefined;
};

export const buildSimpleCaseStudyPageProps = (
  study: StructuredCaseStudyData,
  overrides: SimpleCaseStudyOverrides = {}
): SimpleCaseStudyPageProps => {
  const blocks: SimpleCaseStudyPageProps["blocks"] = [];

  if (study.problemCallout?.statement) {
    blocks.push({
      heading: "The Problem",
      paragraphs: [study.problemCallout.statement],
    });
  }

  if (study.researchSection) {
    blocks.push({
      heading: "What I Saw",
      paragraphs: compact([
        study.researchSection.subhead,
        ...study.researchSection.emergingThemes.map(
          (theme) => `${theme.eyebrow}: ${theme.insight} ${theme.drove}`
        ),
      ]),
      images: study.researchSection.researchImage
        ? [
            {
              src: study.researchSection.researchImage,
              alt: study.researchSection.researchImageAlt ?? `${study.title} research artifact`,
            },
          ]
        : toImages(study.researchSection.researchImages),
    });
  }

  if (study.sprintZeroSection) {
    blocks.push({
      heading: study.sprintZeroSection.title || "Sprint Zero",
      paragraphs: compact([
        study.sprintZeroSection.workshopKickoff,
        study.sprintZeroSection.explorations,
        study.sprintZeroSection.decisionPoint,
      ]),
      images: toImages(study.sprintZeroSection.images),
    });
  }

  if (study.keyInsights && study.keyInsights.length > 0) {
    blocks.push({
      heading: "The Decisions That Mattered",
      paragraphs: study.keyInsights.map((insight) => `${insight.title} ${insight.description}`),
    });
  }

  if (study.finalProductSection) {
    blocks.push({
      heading: study.finalProductSection.title || "What I Built",
      paragraphs: [study.finalProductSection.description],
      images: toImages(study.finalProductSection.images),
    });
  }

  if (study.myThoughtProcessSection) {
    blocks.push({
      heading: study.myThoughtProcessSection.title,
      paragraphs: [study.myThoughtProcessSection.content],
      images: toImages(study.myThoughtProcessSection.images),
    });
  }

  if (study.userTestingSection) {
    blocks.push({
      heading: study.userTestingSection.title,
      paragraphs: [study.userTestingSection.description],
      images: toImages(study.userTestingSection.images),
    });
  }

  if (study.whatDidntWorkSection) {
    blocks.push({
      heading: study.whatDidntWorkSection.title,
      paragraphs: [study.whatDidntWorkSection.content],
      images: toImages(study.whatDidntWorkSection.images),
    });
  }

  if (study.outcomeSection) {
    blocks.push({
      heading: study.outcomeSection.title,
      paragraphs: [study.outcomeSection.description],
      images: toImages(study.outcomeSection.images),
    });
  }

  const promoSlugs = new Set(["herbalink", "nudgeme", "roi-design-builder", "fire-lion"]);

  return {
    projectId: study.id,
    title: study.title,
    description: study.description,
    tags: study.tags,
    liveUrl: study.projectLink,
    overviewUrl: promoSlugs.has(study.id) ? `/project/${study.id}` : undefined,
    heroImage: getHeroImage(study, overrides.heroImage),
    blocks,
  };
};

export const getSimpleCaseStudyPageProps = (
  studyId: string,
  overrides: SimpleCaseStudyOverrides = {}
): SimpleCaseStudyPageProps | null => {
  const study = getStructuredCaseStudy(studyId);
  if (!study) return null;
  return buildSimpleCaseStudyPageProps(study, overrides);
};

export { SimpleCaseStudyPage };