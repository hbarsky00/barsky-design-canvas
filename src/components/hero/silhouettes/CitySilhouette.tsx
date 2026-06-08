import React from "react";

/**
 * City skyline silhouette (live scene). Renders both night and day versions.
 * Follows the hero-scene-swap contract: back+front, each tiled twice, unique gradient ids.
 */
const CitySilhouette: React.FC = () => {
  const backPath =
    "M0,260 L0,160 L50,160 L50,135 L100,135 L100,150 L150,150 L150,110 L200,110 L200,145 L260,145 L260,120 L310,120 L310,95 L355,95 L355,135 L405,135 L405,85 L445,85 L445,115 L495,115 L495,150 L545,150 L545,100 L590,100 L590,130 L640,130 L640,90 L685,90 L685,125 L735,125 L735,155 L785,155 L785,105 L830,105 L830,135 L880,135 L880,85 L925,85 L925,120 L975,120 L975,150 L1025,150 L1025,110 L1070,110 L1070,140 L1125,140 L1125,100 L1170,100 L1170,145 L1200,145 L1200,260 Z";
  const frontPath =
    "M0,260 L0,180 L65,180 L65,120 L130,120 L130,160 L190,160 L190,80 L250,80 L250,140 L310,140 L310,50 L370,50 L370,130 L425,130 L425,170 L490,170 L490,90 L555,90 L555,150 L615,150 L615,60 L675,60 L675,140 L735,140 L735,175 L795,175 L795,100 L855,100 L855,150 L915,150 L915,70 L975,70 L975,140 L1035,140 L1035,165 L1095,165 L1095,110 L1150,110 L1150,155 L1200,155 L1200,260 Z";

  const backWindows = (color: string, opacity: number) => (
    <g fill={color} opacity={opacity}>
      <rect x="60" y="145" width="2" height="3" /><rect x="70" y="145" width="2" height="3" /><rect x="80" y="145" width="2" height="3" />
      <rect x="160" y="120" width="2" height="3" /><rect x="175" y="120" width="2" height="3" /><rect x="160" y="135" width="2" height="3" />
      <rect x="320" y="105" width="2" height="3" /><rect x="335" y="105" width="2" height="3" /><rect x="320" y="120" width="2" height="3" />
      <rect x="415" y="95" width="2" height="3" /><rect x="430" y="95" width="2" height="3" /><rect x="415" y="110" width="2" height="3" /><rect x="430" y="110" width="2" height="3" />
      <rect x="555" y="110" width="2" height="3" /><rect x="570" y="110" width="2" height="3" /><rect x="555" y="125" width="2" height="3" />
      <rect x="650" y="100" width="2" height="3" /><rect x="665" y="100" width="2" height="3" /><rect x="650" y="115" width="2" height="3" />
      <rect x="795" y="115" width="2" height="3" /><rect x="810" y="115" width="2" height="3" /><rect x="795" y="130" width="2" height="3" />
      <rect x="890" y="95" width="2" height="3" /><rect x="905" y="95" width="2" height="3" /><rect x="890" y="110" width="2" height="3" /><rect x="905" y="110" width="2" height="3" />
      <rect x="1035" y="120" width="2" height="3" /><rect x="1050" y="120" width="2" height="3" /><rect x="1035" y="135" width="2" height="3" />
      <rect x="1135" y="110" width="2" height="3" /><rect x="1150" y="110" width="2" height="3" /><rect x="1135" y="125" width="2" height="3" />
    </g>
  );

  const frontWindows = (color: string, opacity: number) => (
    <g fill={color} opacity={opacity}>
      <rect x="200" y="100" width="3" height="4" /><rect x="210" y="100" width="3" height="4" /><rect x="220" y="100" width="3" height="4" /><rect x="230" y="100" width="3" height="4" /><rect x="240" y="100" width="3" height="4" />
      <rect x="200" y="120" width="3" height="4" /><rect x="220" y="120" width="3" height="4" /><rect x="240" y="120" width="3" height="4" />
      <rect x="200" y="140" width="3" height="4" /><rect x="210" y="140" width="3" height="4" /><rect x="230" y="140" width="3" height="4" />
      <rect x="320" y="70" width="3" height="4" /><rect x="335" y="70" width="3" height="4" /><rect x="350" y="70" width="3" height="4" />
      <rect x="320" y="90" width="3" height="4" /><rect x="350" y="90" width="3" height="4" />
      <rect x="320" y="110" width="3" height="4" /><rect x="335" y="110" width="3" height="4" />
      <rect x="500" y="110" width="3" height="4" /><rect x="515" y="110" width="3" height="4" /><rect x="530" y="110" width="3" height="4" /><rect x="545" y="110" width="3" height="4" />
      <rect x="500" y="130" width="3" height="4" /><rect x="530" y="130" width="3" height="4" />
      <rect x="625" y="80" width="3" height="4" /><rect x="645" y="80" width="3" height="4" /><rect x="665" y="80" width="3" height="4" />
      <rect x="625" y="100" width="3" height="4" /><rect x="665" y="100" width="3" height="4" />
      <rect x="625" y="120" width="3" height="4" /><rect x="645" y="120" width="3" height="4" />
      <rect x="805" y="120" width="3" height="4" /><rect x="820" y="120" width="3" height="4" /><rect x="835" y="120" width="3" height="4" /><rect x="845" y="120" width="3" height="4" />
      <rect x="805" y="140" width="3" height="4" /><rect x="835" y="140" width="3" height="4" />
      <rect x="925" y="90" width="3" height="4" /><rect x="945" y="90" width="3" height="4" /><rect x="965" y="90" width="3" height="4" />
      <rect x="925" y="110" width="3" height="4" /><rect x="965" y="110" width="3" height="4" />
      <rect x="925" y="130" width="3" height="4" /><rect x="945" y="130" width="3" height="4" />
      <rect x="1105" y="130" width="3" height="4" /><rect x="1120" y="130" width="3" height="4" /><rect x="1140" y="130" width="3" height="4" />
    </g>
  );

  const antennas = (color: string) => (
    <>
      <rect x="339" y="28" width="2" height="22" fill={color} />
      <rect x="644" y="38" width="2" height="22" fill={color} />
      <rect x="944" y="50" width="2" height="20" fill={color} />
    </>
  );

  return (
    <>
      {/* NIGHT */}
      <div className="parallax-mountains" data-silhouette="city">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`cb-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a1838" />
                  <stop offset="100%" stopColor="#120a1c" />
                </linearGradient>
              </defs>
              <path d={backPath} fill={`url(#cb-grad-${i})`} />
              {backWindows("#d9a55c", 0.45)}
            </svg>
          ))}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`cf-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15101c" />
                  <stop offset="100%" stopColor="#050308" />
                </linearGradient>
              </defs>
              <path d={frontPath} fill={`url(#cf-grad-${i})`} />
              {antennas("#050308")}
              {frontWindows("#ffd27a", 0.75)}
            </svg>
          ))}
        </div>
      </div>

      {/* DAY */}
      <div className="parallax-mountains parallax-mountains-day" data-silhouette="city">
        <div className="parallax-mountains-drift parallax-mountains-back">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`cbd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9ec5e8" />
                  <stop offset="100%" stopColor="#4f7fa8" />
                </linearGradient>
              </defs>
              <path d={backPath} fill={`url(#cbd-grad-${i})`} />
              {backWindows("#fff8d6", 0.85)}
            </svg>
          ))}
        </div>
        <div className="parallax-mountains-drift parallax-mountains-front">
          {[0, 1].map((i) => (
            <svg key={i} viewBox="0 0 1200 260" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`cfd-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3a6f9c" />
                  <stop offset="100%" stopColor="#1c3a5e" />
                </linearGradient>
              </defs>
              <path d={frontPath} fill={`url(#cfd-grad-${i})`} />
              {antennas("#1c3a5e")}
              {frontWindows("#fff8d6", 0.9)}
            </svg>
          ))}
        </div>
      </div>
    </>
  );
};

export default CitySilhouette;
