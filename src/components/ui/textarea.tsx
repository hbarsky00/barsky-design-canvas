import * as React from "react"

import { cn } from "@/lib/utils"
import { useHoverTilt } from "@/hooks/useHoverTilt"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tiltDisabled?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tiltDisabled, ...props }, ref) => {
    const tilt = useHoverTilt({ maxTilt: 2, scale: 1.01, disabled: tiltDisabled });

    const handleMouseMove = React.useCallback<React.MouseEventHandler<HTMLTextAreaElement>>(
      (e) => {
        props.onMouseMove?.(e);
        // @ts-expect-error HTMLElement narrowing is fine here
        tilt.onMouseMove(e as any);
      },
      [props.onMouseMove, tilt]
    );

    const handleMouseLeave = React.useCallback<React.MouseEventHandler<HTMLTextAreaElement>>(
      (e) => {
        props.onMouseLeave?.(e);
        // @ts-expect-error HTMLElement narrowing is fine here
        tilt.onMouseLeave(e as any);
      },
      [props.onMouseLeave, tilt]
    );

    const handleFocus = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
      (e) => {
        props.onFocus?.(e);
        // @ts-expect-error HTMLElement narrowing is fine here
        tilt.onFocus(e as any);
      },
      [props.onFocus, tilt]
    );

    const handleBlur = React.useCallback<React.FocusEventHandler<HTMLTextAreaElement>>(
      (e) => {
        props.onBlur?.(e);
        // @ts-expect-error HTMLElement narrowing is fine here
        tilt.onBlur(e as any);
      },
      [props.onBlur, tilt]
    );

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transform-gpu will-change-transform",
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
