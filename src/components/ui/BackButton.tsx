import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Unified back button used across project pages, case studies, blog posts,
 * store pages, and 404. Same shape everywhere — only the color tones can be
 * themed for dark/light project navs.
 *
 * Visual contract (do not diverge in callers):
 *   - rounded-full pill
 *   - lucide ArrowLeft icon, 16px
 *   - 13px / 600 weight label
 *   - 1px border at 20–30% of textColor
 *   - subtle background tint at 8–12% of textColor
 */
export interface BackButtonProps {
  to: string;
  label?: string;
  /** Override foreground color for themed/dark navs. Defaults to semantic foreground. */
  themeColor?: string;
  className?: string;
  ariaLabel?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  to,
  label = "Back",
  themeColor,
  className,
  ariaLabel,
}) => {
  if (themeColor) {
    return (
      <Link
        to={to}
        aria-label={ariaLabel || `Back: ${label}`}
        className={className}
        style={{
          color: themeColor,
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          minHeight: 40,
          borderRadius: 999,
          border: `1px solid ${themeColor}33`,
          background: `${themeColor}14`,
          transition: "background 0.2s",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        <ArrowLeft size={16} strokeWidth={2.25} aria-hidden="true" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      aria-label={ariaLabel || `Back: ${label}`}
      className={
        "inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/5 px-3.5 py-2 text-[13px] font-semibold text-foreground transition-colors hover:bg-foreground/10 " +
        (className ?? "")
      }
    >
      <ArrowLeft size={16} strokeWidth={2.25} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
};

export default BackButton;
