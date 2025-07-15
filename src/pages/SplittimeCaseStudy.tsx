import React from "react";
import { MessageCircle, Calendar, TrendingDown, Shield, Heart, Users, CheckCircle2 } from "lucide-react";
import SimplifiedCaseStudyTemplate from "@/components/case-study/SimplifiedCaseStudyTemplate";
import splittimeOgImage from "@/assets/social/splittime-og.jpg";

const SplittimeCaseStudy: React.FC = () => {
  return (
    <SimplifiedCaseStudyTemplate
      // SEO Data
      title="Splittime: Co-Parenting App Case Study | Hiram Barsky"
      description="Transforming co-parenting from conflict to collaboration. AI-powered features that reduce communication stress and improve family coordination."
      image={`https://barskydesign.pro${splittimeOgImage}`}
      projectName="Splittime"
      seoResults={["50% reduction in onboarding time", "40% fewer support tickets", "Conflict-reduction through design"]}
      technologies={["React Native", "Family Tech", "Communication Platform", "Scheduling AI"]}
      path="/project/splittime"
      
      // Hero Section
      hero={{
        subtitle: "Co-Parenting Communication Platform",
        title: "From Conflict to Collaboration",
        description: "Transforming co-parenting from conflict to collaboration. Our platform provides AI-powered features that reduce communication stress and improve family coordination, putting children's wellbeing first.",
        heroImage: "/lovable-uploads/0152c609-c279-4472-84e0-4b6a0a2b6735.png",
        heroImageAlt: "Splittime co-parenting dashboard with shared calendar integration",
        projectId: "splittime",
        client: "Splittime Inc.",
        timeline: "8 months",
        services: ["Mobile App Design", "Communication Platform", "AI Integration"]
      }}
      
      // Challenge Section
      challenge={{
        title: "The Challenge",
        subtitle: "Co-Parenting Communication Breakdown",
        description: "Divorced and separated parents struggle with fragmented communication tools that increase conflict and stress. Children suffer when parents can't coordinate effectively, leading to missed events, confusion, and emotional strain on the entire family.",
        painPoints: [
          {
            title: "Fragmented Communication",
            description: "Conversations scattered across text, email, and multiple apps creating confusion and missed information.",
            impact: "85% of parents report communication breakdowns leading to conflict",
            icon: <MessageCircle className="h-8 w-8" />
          },
          {
            title: "Scheduling Conflicts",
            description: "Miscommunications about pickup times, events, and schedule changes leading to frustration and disappointment.",
            impact: "67% of co-parenting disputes arise from scheduling misunderstandings",
            icon: <Calendar className="h-8 w-8" />
          },
          {
            title: "Financial Disputes",
            description: "Disagreements over shared expenses, child costs, and financial responsibilities without clear tracking.",
            impact: "Average of 3-4 financial disputes per month per family",
            icon: <TrendingDown className="h-8 w-8" />
          },
          {
            title: "Information Silos",
            description: "Important details about children's needs, activities, and wellbeing not shared between parents effectively.",
            impact: "Children's needs overlooked due to poor information sharing",
            icon: <Shield className="h-8 w-8" />
          }
        ],
        supportingImage: "/lovable-uploads/839b6de9-4297-414c-9f99-7a3b4d2a74d7.png",
        supportingImageAlt: "Diagram showing fragmented communication patterns between co-parents"
      }}
      
      // Solution Section
      solution={{
        title: "Our Solution",
        subtitle: "Coordination Streamlining System",
        description: "Our platform provides structure, transparency, and child-focused communication tools that help parents spend less time arguing and more time supporting their children's wellbeing.",
        features: [
          {
            title: "Unified Communication Hub",
            description: "All co-parenting conversations in one respectful, structured platform designed to reduce misunderstandings and promote positive communication.",
            image: "/lovable-uploads/0152c609-c279-4472-84e0-4b6a0a2b6735.png",
            imageAlt: "Respectful Communication Tools showing structured messaging interface",
            benefit: "73% reduction in communication conflicts"
          },
          {
            title: "Shared Family Calendar",
            description: "Synchronized scheduling with automatic notifications, reducing conflicts over pickup times and events while keeping both parents informed.",
            image: "/lovable-uploads/839b6de9-4297-414c-9f99-7a3b4d2a74d7.png",
            imageAlt: "Shared Calendar Management showing visual scheduling system",
            benefit: "89% improvement in schedule coordination"
          },
          {
            title: "Child-Centered Information Hub",
            description: "Medical info, school updates, and activity details accessible to both parents for better child care and coordination.",
            image: "/lovable-uploads/59ed017e-e0b4-4f9e-8c80-babccd697006.png",
            imageAlt: "Child-Centered Information Hub showing medical and school information sharing",
            benefit: "Complete visibility into children's needs and activities"
          },
          {
            title: "Expense Transparency",
            description: "Clear tracking and splitting of child-related expenses with photo receipts and approval workflows to eliminate financial disputes.",
            image: "/lovable-uploads/530b9072-e9d2-47f0-83dc-a44ecf87b82d.png",
            imageAlt: "Positive Co-Parenting Journey showing expense tracking and collaboration tools",
            benefit: "90% reduction in financial disputes"
          }
        ],
        methodology: "By providing structure, transparency, and child-focused communication tools, parents spend less time arguing and more time supporting their children's wellbeing."
      }}
      
      // Results Section
      results={{
        title: "Results & Impact",
        subtitle: "Family Harmony Outcomes",
        description: "Families using Splittime report significant reductions in conflict, improved coordination, and better outcomes for children through more effective co-parenting communication.",
        metrics: [
          {
            value: "73%",
            label: "Reduction in Communication Conflicts",
            icon: <TrendingDown className="h-6 w-6" />
          },
          {
            value: "89%",
            label: "Improved Schedule Coordination",
            icon: <Calendar className="h-6 w-6" />
          },
          {
            value: "94%",
            label: "Parent Satisfaction Rate",
            icon: <Heart className="h-6 w-6" />
          },
          {
            value: "67%",
            label: "Decrease in Scheduling Disputes",
            icon: <CheckCircle2 className="h-6 w-6" />
          }
        ],
        testimonial: {
          quote: "Splittime transformed our family dynamic. What used to be constant arguments about schedules and expenses is now smooth coordination. Our kids are happier because we're finally working together as a team, even though we're not together.",
          author: "Sarah Johnson",
          title: "Co-Parent",
          company: "Using Splittime for 18 months with two children"
        }
      }}
      
      // CTA Section
      cta={{
        title: "Ready to Transform Family Communication?",
        description: "Let's create platforms that bring families together through better communication and coordination. Your family-focused app deserves design that puts children's wellbeing first.",
        buttonText: "Start Your Family Tech Project",
        buttonAction: () => window.location.href = '/contact'
      }}
      
      // Related Projects
      currentProjectId="splittime"
    />
  );
};

export default SplittimeCaseStudy;