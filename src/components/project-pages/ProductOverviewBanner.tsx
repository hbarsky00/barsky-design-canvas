import React from "react";
import { Link } from "react-router-dom";

interface Props {
  slug: string;
  bg?: string;
  color?: string;
  accent?: string;
}

const ProductOverviewBanner: React.FC<Props> = ({
  slug,
  bg = "#111",
  color = "#fff",
  accent = "#facc15",
}) => (
  <div
    style={{
      background: bg,
      color,
      padding: "10px 16px",
      textAlign: "center",
      fontSize: 13,
      fontFamily: "Inter, system-ui, sans-serif",
    }}
  >
    <span style={{ opacity: 0.8, marginRight: 8 }}>
      This is the case study.
    </span>
    <Link
      to={`/project/${slug}`}
      style={{ color: accent, fontWeight: 700, textDecoration: "underline" }}
    >
      See the product overview →
    </Link>
  </div>
);

export default ProductOverviewBanner;
