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
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "bg-tech-badge-bg/95 border",
        "font-mono text-xs tracking-tight",
        "transition-all duration-200",
        config.borderClass,
        config.textClass,
        config.glowClass,
        size === "md" && "px-3 py-1.5 text-sm"
      )}
    >
      <Icon className={cn("shrink-0", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      <span>{label}</span>
    </span>
  );
};

export default TechStackBadge;
