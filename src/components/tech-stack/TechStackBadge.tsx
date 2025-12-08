import React from "react";
import { Sparkles, Code2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

export type TechCategory = "ai" | "dev" | "design";

interface TechStackBadgeProps {
  label: string;
  category: TechCategory;
  size?: "sm" | "md";
}

const categoryConfig = {
  ai: {
    icon: Sparkles,
    borderClass: "border-tech-ai/60",
    textClass: "text-tech-ai",
    glowClass: "hover:shadow-[0_0_12px_hsl(var(--tech-ai-glow)/0.4)]",
  },
  dev: {
    icon: Code2,
    borderClass: "border-tech-dev/60",
    textClass: "text-tech-dev",
    glowClass: "hover:shadow-[0_0_12px_hsl(var(--tech-dev-glow)/0.4)]",
  },
  design: {
    icon: Palette,
    borderClass: "border-tech-design/60",
    textClass: "text-tech-design",
    glowClass: "hover:shadow-[0_0_12px_hsl(var(--tech-design-glow)/0.4)]",
  },
};

const TechStackBadge: React.FC<TechStackBadgeProps> = ({ 
  label, 
  category,
  size = "sm" 
}) => {
  const config = categoryConfig[category];
  const Icon = config.icon;
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full",
        "bg-tech-badge-bg/95 border-2",
        "font-mono tracking-tight font-medium",
        "transition-all duration-200",
        "shadow-sm",
        config.borderClass,
        config.textClass,
        config.glowClass,
        size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base"
      )}
    >
      <Icon className={cn("shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      <span>{label}</span>
    </span>
  );
};

export default TechStackBadge;
