
import React from "react";
import clsx from "clsx";

export type SectionHeaderProps = {
  as?: "h1" | "h2" | "h3";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  as = "h2",
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}) => {
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    <header className={clsx("text-center", className)}>
      <Tag className={clsx("mx-auto max-w-5xl [text-wrap:balance] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface", titleClassName)}>
        {title}
      </Tag>
      {subtitle ? (
        <p className={clsx(
          "mt-4 mx-auto max-w-3xl leading-relaxed [text-wrap:balance] text-lg sm:text-xl md:text-2xl text-on-surface-variant",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
};

export default SectionHeader;
