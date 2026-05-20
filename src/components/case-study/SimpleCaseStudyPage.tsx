import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MaximizableImage from "@/components/project/MaximizableImage";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { Badge } from "@/components/ui/badge";

export interface SimpleCaseStudyImage {
  src: string;
  alt: string;
}

export interface SimpleCaseStudyBlock {
  heading: string;
  paragraphs: string[];
  images?: SimpleCaseStudyImage[];
  /** @deprecated use images */
  image?: SimpleCaseStudyImage;
}

export interface SimpleCaseStudyPageProps {
  projectId: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  heroImage?: SimpleCaseStudyImage;
  blocks: SimpleCaseStudyBlock[];
}

const SimpleCaseStudyPage: React.FC<SimpleCaseStudyPageProps> = ({
  projectId,
  title,
  description,
  tags,
  liveUrl,
  blocks,
}) => {
  return (
    <ImageMaximizerProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-[calc(var(--header-height,64px)+32px)] pb-24">
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                Live: {liveUrl.replace(/^https?:\/\//, "")}
              </a>
            )}
          </header>

          <div className="space-y-16">
            {blocks.map((b) => {
              const imgs = b.images ?? (b.image ? [b.image] : []);
              return (
                <section key={b.heading}>
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4">
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
                  {imgs.length > 0 && (
                    <div className="space-y-6">
                      {imgs.map((img, idx) => (
                        <MaximizableImage
                          key={`${img.src}-${idx}`}
                          src={img.src}
                          alt={img.alt}
                          className="w-full"
                          projectId={projectId}
                          fit="contain"
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </main>
        <Footer />
      </div>
    </ImageMaximizerProvider>
  );
};

export default SimpleCaseStudyPage;
