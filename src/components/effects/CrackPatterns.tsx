import React from 'react';

interface CrackPattern {
  id: string;
  path: string;
  strokeWidth: number;
  opacity: number;
  animationDelay: number;
}

export const crackPatterns: CrackPattern[] = [
  {
    id: 'main-crack',
    path: 'M120 80 L160 120 L140 160 L180 180 M160 120 L200 100 L220 140',
    strokeWidth: 2.5,
    opacity: 0.9,
    animationDelay: 0
  },
  {
    id: 'spider-crack-1',
    path: 'M160 120 L130 100 L110 130 M160 120 L190 95 L210 105',
    strokeWidth: 1.8,
    opacity: 0.7,
    animationDelay: 0.1
  },
  {
    id: 'spider-crack-2',
    path: 'M140 160 L115 180 L95 165 M140 160 L165 185 L185 175',
    strokeWidth: 1.5,
    opacity: 0.6,
    animationDelay: 0.2
  },
  {
    id: 'minor-crack-1',
    path: 'M180 180 L200 200 L190 220',
    strokeWidth: 1.2,
    opacity: 0.5,
    animationDelay: 0.3
  },
  {
    id: 'minor-crack-2',
    path: 'M200 100 L220 80 L235 95',
    strokeWidth: 1,
    opacity: 0.4,
    animationDelay: 0.4
  }
];

interface CrackPatternsProps {
  isVisible: boolean;
  size: number;
}

const CrackPatterns: React.FC<CrackPatternsProps> = ({ isVisible, size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    >
      <defs>
        <filter id="crack-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {crackPatterns.map((pattern) => (
        <path
          key={pattern.id}
          d={pattern.path}
          stroke="rgba(0, 0, 0, 0.8)"
          strokeWidth={pattern.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#crack-glow)"
          className={`crack-line ${isVisible ? 'crack-appear' : ''}`}
          style={{
            opacity: isVisible ? pattern.opacity : 0,
            animationDelay: `${pattern.animationDelay}s`,
            strokeDasharray: isVisible ? 'none' : '100',
            strokeDashoffset: isVisible ? '0' : '100',
          }}
        />
      ))}
      
      {/* Impact point - small circle with ripple effect */}
      {isVisible && (
        <circle
          cx="160"
          cy="120"
          r="3"
          fill="rgba(0, 0, 0, 0.6)"
          className="crack-impact-point"
        />
      )}
    </svg>
  );
};

export default CrackPatterns;