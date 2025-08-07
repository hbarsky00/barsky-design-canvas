import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[24px]",
  {
    variants: {
      variant: {
        filled: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        "filled-tonal": "border-transparent bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        outlined: "border-outline bg-transparent text-foreground hover:bg-primary/8",
        // Legacy variants for compatibility
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border-transparent bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80",
        destructive: "border-transparent bg-error text-error-foreground hover:bg-error/90",
        outline: "border-outline bg-transparent text-foreground hover:bg-primary/8",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
