import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all focus:outline-none focus-visible:outline-none duration-300 w-full sm:w-auto [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-[44px] min-w-[44px] relative overflow-hidden text-label-large font-medium group cursor-pointer will-change-transform before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]",
  {
    variants: {
      variant: {
        // Ultra-Modern Premium Button Variants - ALL use text-white for gradient backgrounds
        filled: "bg-gradient-to-r from-md-sys-primary to-md-sys-tertiary text-white hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] rounded-2xl px-6 h-12 font-semibold backdrop-blur-sm",
        "filled-tonal": "bg-md-sys-secondary-container text-md-sys-on-secondary-container hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium",
        elevated: "bg-gradient-to-br from-md-sys-surface-bright to-md-sys-surface-container text-md-sys-primary shadow-elevation-2 hover:shadow-elevation-4 hover:scale-[1.02] rounded-2xl px-6 h-12 border border-white/50 backdrop-blur-sm",
        outlined: "border-2 border-md-sys-outline text-md-sys-primary hover:bg-md-sys-primary hover:text-white hover:border-md-sys-primary hover:scale-[1.02] hover:shadow-glow rounded-2xl px-6 h-12 font-medium backdrop-blur-sm",
        text: "text-md-sys-primary hover:bg-md-sys-primary/10 hover:scale-[1.02] rounded-2xl px-4 h-12 font-medium relative after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-md-sys-primary/5 after:to-md-sys-tertiary/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300",
        destructive: "bg-gradient-to-r from-md-sys-error to-red-500 text-white hover:shadow-glow-hover hover:scale-[1.02] rounded-2xl px-6 h-12 font-semibold",
        
        // Award-winning enhanced variants with premium effects
        "case-study": "border-2 border-md-sys-outline bg-gradient-to-br from-transparent via-white/5 to-transparent text-md-sys-primary hover:bg-gradient-to-r hover:from-md-sys-primary hover:to-md-sys-tertiary hover:text-white hover:border-transparent hover:shadow-glow hover:scale-[1.05] active:scale-[0.95] rounded-2xl transition-all duration-500 ease-out [&_svg]:transition-all [&_svg]:duration-300 relative overflow-hidden backdrop-blur-sm font-semibold",
        "high-contrast": "bg-gradient-to-br from-md-sys-inverse-surface to-gray-900 text-white shadow-elevation-3 hover:shadow-elevation-5 hover:scale-[1.02] rounded-2xl font-bold",
        "on-dark": "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] rounded-2xl backdrop-blur-lg font-medium",
        "on-image": "bg-black/40 text-white border-2 border-white/20 shadow-elevation-3 hover:bg-black/60 hover:scale-[1.02] rounded-2xl backdrop-blur-lg font-medium",
        
        // Premium brand variants - ALL gradient buttons use text-white
        brand: "bg-gradient-to-r from-md-sys-primary via-blue-600 to-md-sys-tertiary text-white hover:shadow-glow-hover hover:scale-[1.02] active:scale-[0.98] rounded-2xl px-8 h-12 font-bold transform transition-all duration-300 relative overflow-hidden",
        default: "bg-gradient-to-r from-md-sys-primary to-blue-600 text-white hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium",
        secondary: "bg-gradient-to-br from-md-sys-secondary-container to-md-sys-surface-container-high text-md-sys-on-secondary-container hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium border border-md-sys-outline-variant/30",
        ghost: "text-md-sys-primary hover:bg-gradient-to-r hover:from-md-sys-primary/10 hover:to-md-sys-tertiary/10 hover:scale-[1.02] rounded-2xl px-4 h-12 font-medium relative",
        link: "text-md-sys-primary underline-offset-4 hover:underline bg-transparent h-auto p-0 relative after:absolute after:w-full after:h-0.5 after:bg-gradient-to-r after:from-md-sys-primary after:to-md-sys-tertiary after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
        outline: "border-2 border-md-sys-outline text-md-sys-primary hover:bg-gradient-to-r hover:from-md-sys-primary/10 hover:to-md-sys-tertiary/10 hover:border-md-sys-primary hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium backdrop-blur-sm",
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
