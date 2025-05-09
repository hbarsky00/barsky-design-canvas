
export type AnimationType = "fade" | "bounce" | "wave" | "rainbow" | "typewriter";
export type AnimationElementType = "block" | "character" | "word";

export interface BaseAnimatedTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  animateOnce?: boolean;
  onComplete?: () => void;
}

export interface CharacterAnimatedTextProps extends BaseAnimatedTextProps {
  type: "character" | "word";
  staggerChildren?: number;
  duration?: number;
  animation: AnimationType;
}

export interface BlockAnimatedTextProps extends BaseAnimatedTextProps {
  type: "block";
}

export type AnimatedTextProps = CharacterAnimatedTextProps | BlockAnimatedTextProps;

export const isCharacterAnimation = (props: AnimatedTextProps): props is CharacterAnimatedTextProps => {
  return props.type === "character" || props.type === "word";
};
