import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackToProjectsFab: React.FC = () => {
  return (
    <Link
      to="/projects"
      aria-label="Back to Projects"
      className="fixed left-4 sm:left-6 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur hover:bg-muted transition-colors"
      style={{ top: "calc(var(--header-height, 64px) + 12px)" }}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="hidden sm:inline">Back to Projects</span>
      <span className="sm:hidden">Back</span>
    </Link>
  );
};

export default BackToProjectsFab;
