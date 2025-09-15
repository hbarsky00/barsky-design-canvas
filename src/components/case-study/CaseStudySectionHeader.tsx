import React from "react";
import { LucideIcon } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

export interface CaseStudySectionHeaderProps {
  title: string;
  icon: LucideIcon;
  variant?: "problem" | "solution" | "impact" | "failed" | "default";
  className?: string;
}

const CaseStudySectionHeader: React.FC<CaseStudySectionHeaderProps> = ({
  title,
  icon: Icon,
  variant = "default",
  className = "",
}) => {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "problem":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          titleColor: "text-red-900"
        };
      case "solution":
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          titleColor: "text-blue-900"
        };
      case "impact":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          titleColor: "text-green-900"
        };
      case "failed":
        return {
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
          titleColor: "text-amber-900"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
          titleColor: "text-foreground"
        };
    }
  };

  const styles = getVariantStyles(variant);

  return (
    <div className={`not-prose flex items-center gap-3 mb-6 lg:mb-8 ${className}`}>
      <div className={`flex-shrink-0 p-3 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
        <Icon className={`h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ${styles.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <AnimatedText
          text={title}
          tag="h2"
          className={`font-display ${styles.titleColor} !text-[32px] sm:!text-[36px] md:!text-[48px] lg:!text-[56px] !leading-[1.2] md:!leading-[1.15] lg:!leading-[1.1] font-extrabold`}
          type="character"
          animation="wave"
          delay={100}
          staggerChildren={0.04}
        />
      </div>
    </div>
  );
};

export default CaseStudySectionHeader;