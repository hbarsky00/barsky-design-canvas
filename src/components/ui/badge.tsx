
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        secondary:
          "border-transparent bg-purple-100 text-purple-900 hover:bg-purple-200",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700 shadow-sm",
        outline: "text-slate-900 border-blue-300 hover:bg-blue-50 hover:text-slate-900",
        success:
          "border-transparent bg-green-600 text-white hover:bg-green-700 shadow-sm",
        warning:
          "border-transparent bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
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
