import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px]",
  {
    variants: {
      variant: {
        filled: "bg-surface-container text-foreground rounded-t border-b-2 border-outline focus-visible:border-primary px-4 py-3 hover:bg-surface-container-high",
        outlined: "border border-outline bg-surface text-foreground rounded focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary px-4 py-3 hover:border-outline-variant",
        // Legacy variant
        default: "border border-outline bg-surface text-foreground rounded focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary px-4 py-3 hover:border-outline-variant",
      },
    },
    defaultVariants: {
      variant: "outlined",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
