import * as React from "react";
import { motion, MotionProps } from "framer-motion";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface PremiumButtonProps extends ButtonProps {
  ripple?: boolean;
  magnetic?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const PremiumButton = React.forwardRef<
  HTMLButtonElement,
  PremiumButtonProps & MotionProps
>(({ 
  className, 
  children, 
  ripple = true, 
  magnetic = true, 
  glow = false,
  onMouseMove,
  onMouseLeave,
  onClick,
  ...props 
}, ref) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useImperativeHandle(ref, () => buttonRef.current!);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setMousePosition({ x: deltaX, y: deltaY });
    onMouseMove?.(e);
  }, [magnetic, onMouseMove]);

  const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (magnetic) {
      setMousePosition({ x: 0, y: 0 });
    }
    onMouseLeave?.(e);
  }, [magnetic, onMouseLeave]);

  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
    onClick?.(e);
  }, [ripple, onClick]);

  return (
    <motion.div
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      whileHover={glow ? { 
        filter: "drop-shadow(0 0 16px hsl(231 92% 58% / 0.4))",
        scale: 1.02,
      } : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        ref={buttonRef}
        className={cn(
          "relative overflow-hidden transform-gpu",
          glow && "hover:shadow-glow transition-shadow duration-300",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
        
        {/* Premium Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
          animate={{ translateX: ["0%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
        
        {children}
      </Button>
    </motion.div>
  );
});

PremiumButton.displayName = "PremiumButton";

export { PremiumButton };