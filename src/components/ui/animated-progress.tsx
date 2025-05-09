
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number;
  maxValue?: number;
  showValue?: boolean;
  animate?: boolean;
  className?: string;
  barClassName?: string;
  valueClassName?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

const AnimatedProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  AnimatedProgressProps
>(({ 
  className, 
  value = 0, 
  maxValue = 100,
  showValue = false,
  animate = true,
  barClassName,
  valueClassName,
  variant = "default",
  ...props 
}, ref) => {
  // Convert value to percentage
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));
  
  // Set up animation spring
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 30, 
    stiffness: 300 
  });
  const progressWidth = useTransform(springValue, (val) => `${val}%`);
  
  React.useEffect(() => {
    if (animate) {
      motionValue.set(percentage);
    }
  }, [percentage, motionValue, animate]);
  
  // Get class based on variant
  const getVariantClass = () => {
    switch(variant) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-barsky-blue";
    }
  };

  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <motion.div
          className={cn(
            "h-full w-full flex-1 transition-all", 
            getVariantClass(),
            barClassName
          )}
          style={{ width: animate ? progressWidth : `${percentage}%` }}
        >
          {/* Add bouncing circles at the end of the progress bar */}
          {animate && percentage > 5 && percentage < 100 && (
            <motion.div 
              className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white/50"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </ProgressPrimitive.Root>
      
      {/* Value label */}
      {showValue && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "absolute right-0 -bottom-6 text-xs font-medium",
            valueClassName
          )}
        >
          {value}/{maxValue}
        </motion.span>
      )}
    </div>
  );
});

AnimatedProgress.displayName = "AnimatedProgress";

export { AnimatedProgress };
