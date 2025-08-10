
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-300 w-full sm:w-auto [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-[44px] min-w-[44px] relative overflow-hidden",
  {
    variants: {
      variant: {
        filled: "bg-primary text-white shadow-sm hover:shadow-md hover:bg-primary/90 active:shadow-sm rounded-full",
        "filled-tonal": "bg-secondary-container text-on-secondary-container shadow-sm hover:shadow-md hover:bg-secondary-container/80 active:shadow-sm rounded-full",
        elevated: "bg-surface-container-low text-primary shadow-md hover:shadow-lg hover:bg-surface-container active:shadow-md rounded-full",
        outlined: "border border-outline bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 rounded-full",
        text: "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 rounded-full",
        destructive: "bg-error text-white shadow-sm hover:shadow-md hover:bg-error/90 active:shadow-sm rounded-full",
        // High-contrast variants for dark backgrounds
        "high-contrast": "bg-white text-black shadow-lg hover:bg-white/90 active:shadow-md rounded-full border border-white/20",
        "on-dark": "bg-white/10 text-white border border-white/30 shadow-sm hover:bg-white/20 active:bg-white/30 rounded-full backdrop-blur-sm [&_svg]:text-white",
        "on-image": "bg-black/80 text-white border border-white/20 shadow-lg hover:bg-black/90 active:bg-black/70 rounded-full backdrop-blur-sm [&_svg]:text-white",
        // Brand standard dark button
        brand: "bg-barsky-blue-dark text-white shadow-sm hover:bg-barsky-blue active:opacity-90 rounded-full [&_svg]:text-white",
        // Legacy variants for compatibility
        default: "bg-primary text-white shadow-sm hover:shadow-md hover:bg-primary/90 active:shadow-sm rounded-full",
        secondary: "bg-secondary-container text-on-secondary-container shadow-sm hover:shadow-md hover:bg-secondary-container/80 active:shadow-sm rounded-full",
        ghost: "bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 rounded-full",
        link: "text-primary underline-offset-4 hover:underline bg-transparent",
        outline: "border border-outline bg-transparent text-primary hover:bg-primary/8 active:bg-primary/12 rounded-full",
      },
      size: {
        default: "h-10 px-6 text-sm font-medium [&_svg]:h-4 [&_svg]:w-4 min-h-[44px]",
        sm: "h-9 px-4 text-sm font-medium [&_svg]:h-4 [&_svg]:w-4 min-h-[44px] min-w-[44px]",
        lg: "h-12 px-8 text-base font-medium [&_svg]:h-5 [&_svg]:w-5 min-h-[48px]",
        icon: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
