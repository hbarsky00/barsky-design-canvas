import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-label-small font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[24px]",
  {
    variants: {
      variant: {
        // Material Design 3.0 Badge Variants
        filled: "bg-md-sys-primary text-md-sys-on-primary border-0",
        "filled-tonal": "bg-md-sys-secondary-container text-md-sys-on-secondary-container border-0",
        outlined: "border border-md-sys-outline text-md-sys-on-surface-variant bg-transparent",
        
        // Legacy variants for compatibility
        default: "bg-md-sys-primary text-md-sys-on-primary border-0",
        secondary: "bg-md-sys-secondary-container text-md-sys-on-secondary-container border-0",
        destructive: "bg-md-sys-error text-md-sys-on-error border-0",
        outline: "border border-md-sys-outline text-md-sys-on-surface-variant bg-transparent",
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
