import React, { useEffect } from "react";
import clsx from "clsx";
import { useHeadingHierarchy } from "./HeadingHierarchyProvider";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingHierarchyProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Whether this is the main H1 for the page (should include primary keyword) */
  isPrimaryH1?: boolean;
}

/**
 * SEO-optimized heading component that enforces proper heading hierarchy
 * and semantic structure across the site.
 */
const HeadingHierarchy: React.FC<HeadingHierarchyProps> = ({
  level,
  children,
  className,
  id,
  isPrimaryH1 = false
}) => {
  const { h1Used, setH1Used } = useHeadingHierarchy();
  const Tag = level as keyof JSX.IntrinsicElements;

  // Track H1 usage for SEO compliance
  useEffect(() => {
    if (level === "h1" && isPrimaryH1) {
      setH1Used(true);
    }
  }, [level, isPrimaryH1, setH1Used]);
  
  // SEO-optimized styling based on heading level and importance
  const getHeadingStyles = () => {
    switch (level) {
      case "h1":
        return isPrimaryH1 
          ? "text-hero-h1 text-foreground font-display font-bold leading-tight" // Primary H1 with main keyword
          : "text-section-title text-foreground font-display font-bold leading-tight"; // Secondary H1 for other pages
      case "h2":
        return "text-section-title text-foreground font-display font-semibold leading-tight";
      case "h3":
        return "text-subsection-title text-foreground font-display font-medium leading-tight";
      case "h4":
        return "text-xl text-foreground font-display font-medium leading-tight";
      case "h5":
        return "text-lg text-foreground font-display font-medium leading-tight";
      case "h6":
        return "text-base text-foreground font-display font-medium leading-tight";
      default:
        return "text-foreground font-display";
    }
  };

  return (
    <Tag 
      id={id}
      className={clsx(
        getHeadingStyles(),
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default HeadingHierarchy;