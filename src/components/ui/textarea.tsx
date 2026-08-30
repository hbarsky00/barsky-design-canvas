
import * as React from "react"

import { cn } from "@/lib/utils"
import { useHoverTilt } from "@/hooks/useHoverTilt"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tiltDisabled?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tiltDisabled, onMouseMove, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const tilt = useHoverTilt<HTMLTextAreaElement>({ maxTilt: 2, scale: 1.01, disabled: tiltDisabled });

    const handleMouseMove = React.useCallback<React.MouseEventHandler<HTMLTextAreaElement>>(
      (e) => {
        onMouseMove?.(e);
        tilt.onMouseMove(e);
      },
      [onMouseMove, tilt]
    );

    const handleMouseLeave = React.useCallback<React.MouseEventHandler<HTMLTextAreaElement>>(
      (e) => {
        onMouseLeave?.(e);
        tilt.onMouseLeave(e);
      },
      [onMouseLeave, tilt]
    );

    const handleFocus = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
      (e) => {
        onFocus?.(e);
        tilt.onFocus(e);
      },
      [onFocus, tilt]
    );

    const handleBlur = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
      (e) => {
        onBlur?.(e);
        tilt.onBlur(e);
      },
      [onBlur, tilt]
    );

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transform-gpu will-change-transform",
          className
        )}
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
Textarea.displayName = "Textarea"

export { Textarea }
