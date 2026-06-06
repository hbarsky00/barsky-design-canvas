import React from "react";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";

const SHIPPED = [
  { label: "CatchBuddy", desc: "same-day pickup sports", to: "/project/catchbuddy" },
  { label: "HerbaLink", desc: "verified herbalist platform", to: "/project/herbalink" },
  { label: "Valora Bet", desc: "social prediction markets platform", to: "/project/valora-bet" },
];

const CONCEPTS = [
  { label: "Ring-Rival", desc: "mobile web boxing", to: "/project/ring-rival" },
  { label: "Fire Lion", desc: "word-casting arcade game", to: "/project/fire-lion" },
];

const ProductSection: React.FC<{ label: string; items: typeof SHIPPED }> = ({ label, items }) => (
  <div className="product-section">
    <h2 className="section-label">{label}</h2>
    {items.map((it) => (
      <a
        key={it.label}
        href={it.to}
        title={`${it.label} — ${it.desc}`}
        className="product-row"
      >
        <span className="product-pill">{it.label}</span>
        <span className="product-description">{it.desc}</span>
      </a>
    ))}
  </div>
);

const HeroContent: React.FC = () => {
  return (
    <div className="hero-inner">
      <p className="hero-eyebrow">Hey there! I am</p>
      <h1 className="hero-name">HIRAM BARSKY<span className="sr-only"> — Lead Product & AI Designer</span></h1>
      <div className="hero-divider" />
      <p className="hero-role">Lead Product &amp; AI Designer · Clifton, NJ</p>
      <p className="hero-tagline">I design AI-first products that ship.</p>

      <div id="projects" className="product-list">
        <ProductSection label="SHIPPED PRODUCTS" items={SHIPPED} />
        <ProductSection label="CONCEPT GAMES" items={CONCEPTS} />
      </div>

      <div className="social-icons">
        {[
          { Icon: Mail, href: "mailto:hbarsky01@gmail.com", label: "Email" },
          { Icon: Linkedin, href: "https://www.linkedin.com/in/hiram-barsky", label: "LinkedIn" },
          { Icon: Github, href: "https://github.com/hbarsky", label: "GitHub" },
          { Icon: Calendar, href: "https://calendly.com/barskyuxdesignservices/30min", label: "Book" },
        ].map(({ Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-link">
            <Icon size={20} />
          </a>
        ))}
      </div>

      <div className="book-call-wrap">
        <a
          className="book-call"
          href="https://calendly.com/barskyuxdesignservices/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Call
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
