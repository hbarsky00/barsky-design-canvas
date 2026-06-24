import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import nudgemeImg from "@/assets/projects/nudgeme.png";
import roiImg from "@/assets/projects/roidesigncalc.png";
import herbalinkImg from "@/assets/projects/herbalink.png";
import firelionImg from "@/assets/projects/firelion.png";


type Study = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  url: string;
  category: string;
  tags: string[];
};

type Group = {
  label: string;
  blurb: string;
  studies: Study[];
};

const groups: Group[] = [
  {
    label: "Health",
    blurb: "Designing for trust in categories where being wrong has real consequences.",
    studies: [
      {
        id: "herbalink",
        title: "HerbaLink",
        subtitle: "Verified herbalists, designed around trust",
        description:
          "A booking platform where no practitioner appears until credentials are verified against an external registry. Smaller catalog by design — honest beats exhaustive.",
        image: herbalinkImg,
        url: "/project/herbalink",
        category: "Healthcare",
        tags: ["Trust & Safety", "AI-Assisted", "Solo Build"],
      },
      {
        id: "nudgeme",
        title: "NudgeMe",
        subtitle: "Natural-language reminders that actually fire",
        description:
          "Type reminders the way you'd say them out loud. Plain English parsed into recurring schedules across browser, email, and SMS — all from one input.",
        image: nudgemeImg,
        url: "/project/nudgeme",
        category: "Behavior",
        tags: ["PWA", "NLP", "Shipped"],
      },
    ],
  },
  {
    label: "Financial & Enterprise",
    blurb: "Decisions in front of leadership need data you can defend.",
    studies: [
      {
        id: "dae-search",
        title: "DAE Search",
        subtitle: "Enterprise search redesigned around trust, not relevance",
        description:
          "Semantic match with data lineage and permissions inline. From 40 results to narrow down to 4 you can act on — reframed the product from search tool to data discovery tool.",
        image:
          "https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/dae-search/DAE-Project-1.jpg",
        url: "/project/dae-search",
        category: "Enterprise",
        tags: ["Data Discovery", "Search UX"],
      },
      {
        id: "roi-design-builder",
        title: "ROI Design Calculator",
        subtitle: "Make the business case for design",
        description:
          "A calculator that translates design decisions into dollars. Built for designers talking to finance — board-ready reports generated in minutes, benchmarks citable by vertical.",
        image: roiImg,
        url: "/project/roi-design-builder",
        category: "Financial Modeling",
        tags: ["Enterprise Tool", "Shipped"],
      },
    ],
  },
  {
    label: "For Fun",
    blurb: "Solo build, AI as co-builder, ruthless cuts.",
    studies: [
      {
        id: "fire-lion",
        title: "Fire Lion",
        subtitle: "A shipped game, built solo with AI",
        description:
          "A one-tap arcade runner where you spell words mid-flight to cast spells. The deletion list ended up longer than the feature list — that was the work.",
        image: firelionImg,
        url: "/project/fire-lion",
        category: "Game Design",
        tags: ["AI-Assisted", "Solo Build"],
      },
    ],
  },
];

// (images imported above)

const StudyCard: React.FC<{ study: Study; index: number }> = ({ study, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group"
  >
    <Link
      to={study.url}
      className="block rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={study.image}
          alt={`${study.title} — ${study.subtitle}`}
          width={800}
          height={448}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
          <span className="bg-primary text-primary-foreground px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
            {study.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">
          {study.title}
        </h3>
        <h4 className="text-sm sm:text-base font-semibold text-primary mb-2 sm:mb-3">{study.subtitle}</h4>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">{study.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center text-sm font-semibold text-primary">
          Read case study
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const CaseStudies: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-[calc(var(--header-height,64px)+24px)]">
        <section className="container mx-auto px-4 max-w-7xl py-8 sm:py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-primary mb-2 sm:mb-3">
              Case Studies
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-3 sm:mb-4 [text-wrap:balance]">
              The thinking behind the work.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Live products live on the homepage. These are the case studies — what I decided,
              what I cut, what I'd do differently. Selected work across health, financial, and one
              for fun.
            </p>
          </motion.div>
        </section>

        {groups.map((group) => (
          <section key={group.label} className="container mx-auto px-4 max-w-7xl pb-10 sm:pb-16">
            <div className="mb-6 sm:mb-8 border-l-4 border-primary pl-3 sm:pl-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{group.label}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">{group.blurb}</p>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {group.studies.map((study, i) => (
                <StudyCard key={study.id} study={study} index={i} />
              ))}
            </div>
          </section>
        ))}

        <section className="container mx-auto px-4 max-w-3xl py-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-3">Want to talk through one?</h2>
          <p className="text-muted-foreground mb-6">
            Happy to walk through any decision in detail — what I rejected, what I'd change.
          </p>
          <Button asChild size="lg">
            <a
              href="https://calendly.com/barskyuxdesignservices/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;
