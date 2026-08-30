
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useHoverTilt } from "@/hooks/useHoverTilt"

const inputVariants = cva(
  "flex w-full transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-md-sys-on-surface-variant focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[56px] text-body-large",
  {
    variants: {
      variant: {
        // Material Design 3.0 Text Field Variants
        filled: "bg-md-sys-surface-container-highest text-md-sys-on-surface rounded-xs border-0 focus:ring-2 focus:ring-md-sys-primary px-4 py-4 hover:bg-md-sys-surface-container-high",
        outlined: "border border-md-sys-outline bg-md-sys-surface text-md-sys-on-surface rounded-xs focus:border-md-sys-primary focus:border-2 px-4 py-4 hover:border-md-sys-outline",
        
        // Legacy variant for compatibility
        default: "bg-md-sys-surface-container-highest text-md-sys-on-surface rounded-xs border-0 focus:ring-2 focus:ring-md-sys-primary px-4 py-4",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  tiltDisabled?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, tiltDisabled, onMouseMove, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const tilt = useHoverTilt<HTMLInputElement>({ maxTilt: 2, scale: 1.01, disabled: tiltDisabled });

    const handleMouseMove = React.useCallback<React.MouseEventHandler<HTMLInputElement>>(
      (e) => {
        onMouseMove?.(e);
        tilt.onMouseMove(e);
      },
      [onMouseMove, tilt]
    );

    const handleMouseLeave = React.useCallback<React.MouseEventHandler<HTMLInputElement>>(
      (e) => {
        onMouseLeave?.(e);
        tilt.onMouseLeave(e);
      },
      [onMouseLeave, tilt]
    );

    const handleFocus = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
      (e) => {
        onFocus?.(e);
        tilt.onFocus(e);
      },
      [onFocus, tilt]
    );

    const handleBlur = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
      (e) => {
        onBlur?.(e);
        tilt.onBlur(e);
      },
      [onBlur, tilt]
    );

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), "transform-gpu will-change-transform", className)}
        ref={ref}
        {...props}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
