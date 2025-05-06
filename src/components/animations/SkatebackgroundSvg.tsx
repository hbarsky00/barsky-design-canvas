
import React from "react";

interface SkatebackgroundSvgProps {
  className?: string;
}

const SkatebackgroundSvg: React.FC<SkatebackgroundSvgProps> = ({ className }) => {
  return (
    <svg 
      width="100%" 
      height="200" 
      viewBox="0 0 1200 200" 
      preserveAspectRatio="none"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Sky/Background */}
      <rect width="1200" height="200" fill="#F6F6F8" />
      
      {/* Half-pipe right side */}
      <path 
        d="M850 180 C950 100, 1050 100, 1150 180" 
        stroke="#E5DEFF" 
        strokeWidth="3" 
        fill="#F2FCE2" 
        fillOpacity="0.3"
      />
      
      {/* Half-pipe left side */}
      <path 
        d="M50 180 C150 100, 250 100, 350 180" 
        stroke="#E5DEFF" 
        strokeWidth="3" 
        fill="#F2FCE2" 
        fillOpacity="0.3"
      />
      
      {/* Ramp middle */}
      <path 
        d="M450 180 L550 130 L650 180" 
        stroke="#E5DEFF" 
        strokeWidth="3" 
        fill="#FDE1D3" 
        fillOpacity="0.3"
      />
      
      {/* Rail in middle */}
      <line 
        x1="700" 
        y1="150" 
        x2="800" 
        y2="150" 
        stroke="#D3E4FD" 
        strokeWidth="4" 
      />
      <line 
        x1="700" 
        y1="180" 
        x2="700" 
        y2="150" 
        stroke="#D3E4FD" 
        strokeWidth="2" 
      />
      <line 
        x1="800" 
        y1="180" 
        x2="800" 
        y2="150" 
        stroke="#D3E4FD" 
        strokeWidth="2" 
      />
      
      {/* Ground line */}
      <line 
        x1="0" 
        y1="180" 
        x2="1200" 
        y2="180" 
        stroke="#E5DEFF" 
        strokeWidth="2" 
        strokeDasharray="5,5" 
      />
      
      {/* Small decorative elements */}
      <circle cx="400" cy="170" r="5" fill="#FFDEE2" fillOpacity="0.7" />
      <circle cx="900" cy="170" r="5" fill="#FFDEE2" fillOpacity="0.7" />
      <circle cx="1100" cy="170" r="3" fill="#D3E4FD" fillOpacity="0.7" />
      <circle cx="200" cy="170" r="3" fill="#D3E4FD" fillOpacity="0.7" />
    </svg>
  );
};

export default SkatebackgroundSvg;
