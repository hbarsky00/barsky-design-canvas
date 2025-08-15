
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useHoverTilt } from "@/hooks/useHoverTilt"

const inputVariants = cva(
  "flex w-full transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]",
  {
    variants: {
      variant: {
        filled: "bg-surface-container text-foreground rounded-t border-b-2 border-outline focus:border-outline px-4 py-3 hover:bg-surface-container-high",
        outlined: "border border-outline bg-surface text-foreground rounded focus:border-outline px-4 py-3 hover:border-outline-variant",
        // Legacy variant
        default: "border border-outline bg-surface text-foreground rounded focus:border-outline px-4 py-3 hover:border-outline-variant",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  tiltDisabled?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, tiltDisabled, ...props }, ref) => {
    const tilt = useHoverTilt<HTMLInputElement>({ maxTilt: 2, scale: 1.01, disabled: tiltDisabled });

    const handleMouseMove = React.useCallback<React.MouseEventHandler<HTMLInputElement>>(
      (e) => {
        props.onMouseMove?.(e);
        tilt.onMouseMove(e);
      },
      [props.onMouseMove, tilt]
    );

    const handleMouseLeave = React.useCallback<React.MouseEventHandler<HTMLInputElement>>(
      (e) => {
        props.onMouseLeave?.(e);
        tilt.onMouseLeave(e);
      },
      [props.onMouseLeave, tilt]
    );

    const handleFocus = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
      (e) => {
        props.onFocus?.(e);
        tilt.onFocus(e);
      },
      [props.onFocus, tilt]
    );

    const handleBlur = React.useCallback<React.FocusEventHandler<HTMLInputElement>>(
      (e) => {
        props.onBlur?.(e);
        tilt.onBlur(e);
      },
      [props.onBlur, tilt]
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

export { Input, inputVariants }
