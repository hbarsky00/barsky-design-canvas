import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all focus:outline-none focus-visible:outline-none duration-200 w-full sm:w-auto [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-[44px] min-w-[44px] relative overflow-hidden text-label-large font-medium",
  {
    variants: {
      variant: {
        // Material Design 3.0 Button Variants
        filled: "bg-md-sys-primary text-md-sys-on-primary hover:shadow-elevation-1 rounded-full px-6 h-10",
        "filled-tonal": "bg-md-sys-secondary-container text-md-sys-on-secondary-container hover:shadow-elevation-1 rounded-full px-6 h-10",
        elevated: "bg-md-sys-surface-container-low text-md-sys-primary shadow-elevation-1 hover:shadow-elevation-2 rounded-full px-6 h-10",
        outlined: "border border-md-sys-outline text-md-sys-primary hover:bg-md-sys-primary/8 rounded-full px-6 h-10",
        text: "text-md-sys-primary hover:bg-md-sys-primary/8 rounded-full px-4 h-10",
        destructive: "bg-md-sys-error text-md-sys-on-error hover:shadow-elevation-1 rounded-full px-6 h-10",
        
        // Enhanced variants with special effects
        "case-study": "border border-md-sys-outline bg-transparent text-md-sys-primary hover:bg-md-sys-primary hover:text-md-sys-on-primary hover:shadow-elevation-2 hover:scale-[1.02] active:bg-md-sys-primary rounded-full transition-all duration-300 [&_svg]:transition-colors [&_svg]:duration-300",
        "high-contrast": "bg-md-sys-inverse-surface text-md-sys-inverse-on-surface shadow-elevation-2 hover:shadow-elevation-3 rounded-full",
        "on-dark": "bg-md-sys-surface-container/20 text-md-sys-on-surface border border-md-sys-outline/30 hover:bg-md-sys-surface-container/40 rounded-full backdrop-blur-sm",
        "on-image": "bg-md-sys-scrim/80 text-md-sys-on-primary border border-md-sys-outline/20 shadow-elevation-2 hover:bg-md-sys-scrim/90 rounded-full backdrop-blur-sm",
        
        // Brand and legacy variants for compatibility
        brand: "bg-md-sys-primary text-md-sys-on-primary hover:shadow-elevation-2 rounded-full px-6 h-10 transform hover:scale-[1.02]",
        default: "bg-md-sys-primary text-md-sys-on-primary hover:shadow-elevation-1 rounded-full px-6 h-10",
        secondary: "bg-md-sys-secondary-container text-md-sys-on-secondary-container hover:shadow-elevation-1 rounded-full px-6 h-10",
        ghost: "text-md-sys-primary hover:bg-md-sys-primary/8 rounded-full px-4 h-10",
        link: "text-md-sys-primary underline-offset-4 hover:underline bg-transparent h-auto p-0",
        outline: "border border-md-sys-outline text-md-sys-primary hover:bg-md-sys-primary/8 rounded-full px-6 h-10",
      },
      size: {
        default: "h-10 px-6 text-label-large [&_svg]:h-4 [&_svg]:w-4 min-h-[44px]",
        sm: "h-8 px-4 text-label-medium [&_svg]:h-4 [&_svg]:w-4 min-h-[44px] min-w-[44px]",
        lg: "h-12 px-8 text-label-large [&_svg]:h-5 [&_svg]:w-5 min-h-[48px]",
        icon: "h-10 w-10 [&_svg]:h-4 [&_svg]:w-4 min-h-[44px] min-w-[44px] px-0",
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
        className={cn(className, buttonVariants({ variant, size }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
