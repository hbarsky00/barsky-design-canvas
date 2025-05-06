
import React from "react";

interface GhostSkateboardSvgProps {
  className?: string;
  ghostOffset?: number; // Prop to control ghost position during ollies
}

const GhostSkateboardSvg: React.FC<GhostSkateboardSvgProps> = ({ 
  className,
  ghostOffset = 0 // Default 0 (no separation)
}) => {
  return (
    <svg 
      width="80" 
      height="80" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      role="img"
      aria-label="Ghost on skateboard"
    >
      {/* Skateboard - positioned normally */}
      <g className="skateboard">
        <rect x="15" y="80" width="70" height="8" rx="4" fill="#333333" />
        <circle cx="25" cy="91" r="4" fill="#666666" />
        <circle cx="75" cy="91" r="4" fill="#666666" />
      </g>
      
      {/* Ghost Body - with vertical offset for ollies */}
      <g className="ghost" transform={`translate(0, ${-ghostOffset})`}>
        <path
          d="M35 30C35 19 43 10 55 10C67 10 75 19 75 30V65C75 65 65 65 65 75C65 75 55 65 45 75C45 75 35 65 35 65V30Z"
          fill="white"
          stroke="#CCCCCC"
          strokeWidth="2"
        />
        
        {/* Ghost Eyes */}
        <circle cx="45" cy="35" r="5" fill="#333333" />
        <circle cx="65" cy="35" r="5" fill="#333333" />
        
        {/* Ghost Mouth */}
        <path
          d="M50 50C53 55 57 55 60 50"
          stroke="#333333"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default GhostSkateboardSvg;
