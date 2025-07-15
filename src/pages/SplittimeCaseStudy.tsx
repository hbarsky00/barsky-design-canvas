import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Users, MessageCircle, DollarSign, Shield, Clock, Star, CheckCircle2, Heart, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DynamicSeo from "@/components/seo/DynamicSeo";
import { Helmet } from "react-helmet-async";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import RelatedProjects from "@/components/RelatedProjects";
import ShareButtons from "@/components/blog/ShareButtons";
import MaximizableImage from "@/components/project/MaximizableImage";
import splittimeOgImage from "@/assets/social/splittime-og.jpg";

const SplittimeCaseStudy: React.FC = () => {
  const { maximizeImage } = useImageMaximizer();

  const coParentingChallenges = [
    {
      title: "Communication Breakdown",
      description: "Divorced parents struggled with effective communication, leading to misunderstandings and increased conflict over child-related decisions.",
      icon: <MessageCircle className="h-8 w-8" />
    },
    {
      title: "Scheduling Conflicts",
      description: "Complex custody schedules, school events, and activities created confusion and missed opportunities for children.",
      icon: <Calendar className="h-8 w-8" />
    },
    {
      title: "Expense Tracking",
      description: "Shared expenses for children were difficult to track, leading to disputes over who paid what and when.",
      icon: <DollarSign className="h-8 w-8" />
    }
  ];

  const designSolutions = [
    {
      title: "Neutral Communication Hub",
      description: "AI-moderated messaging system that filters emotional language and suggests constructive alternatives.",
      visual: "💬"
    },
    {
      title: "Smart Scheduling System",
      description: "Intelligent calendar that prevents double-booking and automatically syncs with both parents' schedules.",
      visual: "📅"
    },
    {
      title: "Expense Transparency",
      description: "Real-time expense tracking with receipt uploads and automatic splitting based on custody agreements.",
      visual: "💰"
    }
  ];

  const userJourney = [
    {
      step: "Setup",
      title: "Profile & Custody Agreement",
      description: "Parents input custody schedules, child information, and communication preferences to establish the foundation.",
      image: "/lovable-uploads/splittime-setup.png"
    },
    {
      step: "Schedule",
      title: "Coordinated Calendar Management",
      description: "Shared calendar with custody schedules, school events, and activities visible to both parents.",
      image: "/lovable-uploads/splittime-calendar.png"
    },
    {
      step: "Communicate",
      title: "Structured Messaging",
      description: "Topic-based conversations with AI moderation to keep discussions focused and productive.",
      image: "/lovable-uploads/splittime-messaging.png"
    },
    {
      step: "Track",
      title: "Expense Management",
      description: "Shared expense tracking with automatic calculations and payment reminders.",
      image: "/lovable-uploads/splittime-expenses.png"
    }
  ];

  const impactMetrics = [
    {
      metric: "73%",
      label: "Reduction in Communication Conflicts",
      icon: <MessageCircle className="h-6 w-6" />
    },
    {
      metric: "85%",
      label: "Improved Schedule Coordination",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      metric: "91%",
      label: "User Satisfaction Rate",
      icon: <Star className="h-6 w-6" />
    },
    {
      metric: "60%",
      label: "Faster Expense Resolution",
      icon: <CheckCircle2 className="h-6 w-6" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Splittime Co-Parenting App UX Design Case Study | Barsky Design</title>
        <meta name="description" content="Co-parenting coordination app UX design. Simplifie
