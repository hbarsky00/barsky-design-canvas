import React from "react";
import TechStackBadge, { TechCategory } from "./TechStackBadge";
import { cn } from "@/lib/utils";

export interface TechStack {
  aiTools?: string[];
  devStack?: string[];
  designTools?: string[];
}

interface TechStackDisplayProps {
  techStack?: TechStack;
  variant?: "compact" | "full";
  className?: string;
}

const TechStackDisplay: React.FC<TechStackDisplayProps> = ({ 
  techStack, 
  variant = "compact",
  className 
}) => {
  if (!techStack) return null;
  
  const { aiTools = [], devStack = [], designTools = [] } = techStack;
  const hasContent = aiTools.length > 0 || devStack.length > 0 || designTools.length > 0;
  
  if (!hasContent) return null;

  const renderBadges = (tools: string[], category: TechCategory) => 
    tools.map((tool) => (
      <TechStackBadge 
        key={tool} 
        label={tool} 
        category={category}
        size={variant === "full" ? "md" : "sm"}
      />
    ));

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-1.5", className)}>
        {renderBadges(aiTools, "ai")}
        {renderBadges(devStack, "dev")}
        {renderBadges(designTools, "design")}
      </div>
    );
  }

  // Full variant with category labels
  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Project Stack
      </div>
      <div className="flex flex-wrap gap-2">
        {aiTools.length > 0 && (
          <>
            {renderBadges(aiTools, "ai")}
          </>
        )}
        {devStack.length > 0 && (
          <>
            {renderBadges(devStack, "dev")}
          </>
        )}
        {designTools.length > 0 && (
          <>
            {renderBadges(designTools, "design")}
          </>
        )}
      </div>
    </div>
  );
};

export default TechStackDisplay;
