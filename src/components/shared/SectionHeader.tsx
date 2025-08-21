
import React from "react";
import clsx from "clsx";

export type SectionHeaderProps = {
  as?: "h1" | "h2" | "h3";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  as = "h2",
  title,
  subtitle,
  eyebrow,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <header className={clsx("text-center", className)}>
      {eyebrow && (
        <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary bg-primary/10 rounded-full uppercase">
          {eyebrow}
        </div>
      )}
      <Tag className={clsx("text-section-title text-on-surface content-rail-center font-display", titleClassName)}>
        {title}
      </Tag>
      {subtitle ? (
        <p className={clsx(
          "content-spacing leading-relaxed text-lg md:text-xl text-on-surface-variant content-rail-center",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
};

export default SectionHeader;
