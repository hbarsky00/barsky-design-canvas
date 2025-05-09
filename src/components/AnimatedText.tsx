
import React from "react";
import { AnimatedTextProps, isCharacterAnimation } from "./animations/text/AnimatedTextTypes";
import { CharacterAnimation } from "./animations/text/CharacterAnimation";
import { BlockAnimation } from "./animations/text/BlockAnimation";

const AnimatedText: React.FC<AnimatedTextProps> = (props) => {
  // Route to proper component based on animation type
  if (isCharacterAnimation(props)) {
    return <CharacterAnimation {...props} />;
  }
  
  // Default to block animation
  return <BlockAnimation {...props} />;
};

export default AnimatedText;
