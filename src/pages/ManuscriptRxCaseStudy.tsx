import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaximizableImage from "@/components/project/MaximizableImage";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { Badge } from "@/components/ui/badge";

const tags = ["Enterprise", "Gen AI", "Pharma", "Workflow Design"];

const blocks: Array<{
  heading: string;
  paragraphs: string[];
  image: { src: string; alt: string };
}> = [
  {
    heading: "The Problem",
    paragraphs: [
      "A regulated pharma email touches a medical writer, content ops, brand, MLR, and CRM — each in a different tool. Two weeks to send one email is considered fast. The obvious AI fix is \u201Cdump the manuscript in and ship it.\u201D That\u2019s wrong.",
    ],
    image: {
      src: "/images/emailai-screen1-content-planning.png",
      alt: "Step 1 \u2014 6-step workflow navigator, Brief Creation locked, Initiate Email Creation active",
    },
  },
  {
    heading: "The Thesis",
    paragraphs: [
      "Regulated email requires human review at specific gates. The AI\u2019s job is the work between humans \u2014 not the work humans do. That one constraint shaped every decision.",
    ],
    image: {
      src: "/images/emailai-screen2-assemble.png",
      alt: "Step 2 \u2014 AI-owned manuscript on the left, market-specific compliance content auto-pulled on the right",
    },
  },
  {
    heading: "What I Built",
    paragraphs: [
      "Six steps, each with a clear owner and a clear gate. QC sits inline with editing \u2014 AI auto-pass, Content Ops, and Med Writer sign off while the writer is still in the content. \u201CSend Preview to Brand\u201D doesn\u2019t appear until the AI checklist passes.",
    ],
    image: {
      src: "/images/emailai-screen3-iterate-qc.png",
      alt: "Step 3 \u2014 AI chat with live email preview on top, three role-owned QC cards on the bottom",
    },
  },
  {
    heading: "The Honest Parts",
    paragraphs: [
      "Brief Creation is locked as \u201COutside pilot scope\u201D \u2014 the brief lives upstream and saying that out loud is more useful than pretending I designed it. PromoMats integration warning stays visible on screen. Unresolved decisions in the open, not hidden.",
    ],
    image: {
      src: "/images/emailai-screen6-pre-mlr.png",
      alt: "Step 5 \u2014 HTML generation and metadata checklist on the left, mobile and desktop email previews on the right",
    },
  },
];

const ManuscriptRxCaseStudy: React.FC = () => {
  return (
    <ImageMaximizerProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+32px)] pb-24">
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              ManuscriptRx
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              A self-initiated concept for AI-assisted pharma HCP email
              production — designed around the approval gates, not around the
              AI.
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </header>

          <div className="space-y-16">
            {blocks.map((b) => (
              <section key={b.heading}>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {b.heading}
                </h2>
                {b.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6"
                  >
                    {p}
                  </p>
                ))}
                <MaximizableImage
                  src={b.image.src}
                  alt={b.image.alt}
                  className="w-full"
                  projectId="email-creation-ai"
                  fit="contain"
                />
              </section>
            ))}

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                What I Haven&rsquo;t Solved
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                The MLR review experience. I designed the artifacts MLR
                receives — not the review tool itself. How reviewers annotate,
                reject, and approve claims with legal accountability is the
                hardest part of pharma email. I&rsquo;m not going to pretend I
                solved it in a concept project.
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </ImageMaximizerProvider>
  );
};

export default ManuscriptRxCaseStudy;
