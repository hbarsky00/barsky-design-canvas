
import React from "react";
import clsx from "clsx";
import AnimatedText from "../AnimatedText";

export type SectionHeaderProps = {
  as?: "h1" | "h2" | "h3";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  animatedTitle?: boolean;
  titleAnimation?: "fade" | "elastic" | "slide" | "bounce" | "wave" | "blur";
  titleDelay?: number;
  animatedSubtitle?: boolean;
  subtitleAnimation?: "fade" | "elastic" | "slide" | "bounce" | "wave" | "blur";
  subtitleDelay?: number;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  as = "h2",
  title,
  subtitle,
  eyebrow,
  className,
  titleClassName,
  subtitleClassName,
  animatedTitle = true,
  titleAnimation = "fade",
  titleDelay = 0,
  animatedSubtitle = true,
  subtitleAnimation = "fade",
  subtitleDelay = 0.2,
}) => {
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <header className={clsx("not-prose text-center mb-8 md:mb-12", className)}>
      {eyebrow && (
        <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
          {eyebrow}
        </div>
      )}
      {animatedTitle && typeof title === "string" ? (
        <AnimatedText
          text={title}
          tag={as}
          className={clsx("text-section-title text-on-surface content-rail-center font-display", titleClassName)}
          type="word"
          animation={titleAnimation}
          delay={titleDelay * 1000}
          staggerChildren={0.05}
        />
      ) : (
        <Tag className={clsx("text-section-title text-on-surface content-rail-center font-display", titleClassName)}>
          {title}
        </Tag>
      )}
      {subtitle ? (
        animatedSubtitle && typeof subtitle === "string" ? (
          <AnimatedText
            text={subtitle}
            tag="p"
            className={clsx(
              "content-spacing leading-relaxed text-lg md:text-xl text-on-surface-variant content-rail-center",
              subtitleClassName
            )}
            type="word"
            animation={subtitleAnimation}
            delay={subtitleDelay * 1000}
            staggerChildren={0.04}
          />
        ) : (
          <p className={clsx(
            "content-spacing leading-relaxed text-lg md:text-xl text-on-surface-variant content-rail-center",
            subtitleClassName
          )}>
            {subtitle}
          </p>
        )
      ) : null}
    </header>
  );
};

export default SectionHeader;
