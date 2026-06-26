import React from "react";
import { useLocation, Link } from "react-router-dom";

/**
 * Renders a top banner on every /project/<slug> page linking to its
 * matching /case-studies/<slug> case study. Mounted globally in App.
 */
// Only slugs that have a DISTINCT /case-studies/<slug> page in addition
// to the /project/<slug> promo page.
const PROMO_WITH_CASE_STUDY = new Set([
  "herbalink",
  "nudgeme",
  "roi-design-builder",
  "fire-lion",
  "valora-bet",
]);

const ProjectPromoBanner: React.FC = () => {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/project\/([^/]+)\/?$/);
  if (!match) return null;
  const slug = match[1];
  if (!PROMO_WITH_CASE_STUDY.has(slug)) return null;

  return (
    <div
      style={{
        background: "#111",
        color: "#fff",
        padding: "10px 16px",
        textAlign: "center",
        fontSize: 13,
        fontFamily: "Inter, system-ui, sans-serif",
        position: "relative",
        zIndex: 200,
      }}
    >
      <span style={{ opacity: 0.8, marginRight: 8 }}>
        This is the product overview.
      </span>
      <Link
        to={`/case-studies/${slug}`}
        style={{ color: "#facc15", fontWeight: 700, textDecoration: "underline" }}
      >
        Read the full case study →
      </Link>
    </div>
  );
};

export default ProjectPromoBanner;
