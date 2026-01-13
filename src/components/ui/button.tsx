import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all focus:outline-none focus-visible:outline-none duration-300 w-full sm:w-auto [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-[44px] min-w-[44px] relative overflow-hidden text-label-large font-medium group cursor-pointer will-change-transform before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]",
  {
    variants: {
      variant: {
        // Ultra-Modern Premium Button Variants - Using standard primary color for proper gradient support
        filled: "bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] rounded-2xl px-6 h-12 font-semibold backdrop-blur-sm",
        "filled-tonal": "bg-secondary text-secondary-foreground hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium",
        elevated: "bg-gradient-to-br from-white to-gray-100 text-primary shadow-elevation-2 hover:shadow-elevation-4 hover:scale-[1.02] rounded-2xl px-6 h-12 border border-white/50 backdrop-blur-sm",
        outlined: "border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-[1.02] hover:shadow-glow rounded-2xl px-6 h-12 font-medium backdrop-blur-sm",
        text: "text-primary hover:bg-primary/10 hover:scale-[1.02] rounded-2xl px-4 h-12 font-medium",
        destructive: "bg-gradient-to-r from-destructive to-red-500 text-white hover:shadow-glow-hover hover:scale-[1.02] rounded-2xl px-6 h-12 font-semibold",
        
        // Award-winning enhanced variants with premium effects
        "case-study": "border-2 border-primary/30 bg-transparent text-primary hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-glow hover:scale-[1.05] active:scale-[0.95] rounded-2xl transition-all duration-500 ease-out [&_svg]:transition-all [&_svg]:duration-300 relative overflow-hidden backdrop-blur-sm font-semibold",
        "high-contrast": "bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-elevation-3 hover:shadow-elevation-5 hover:scale-[1.02] rounded-2xl font-bold",
        "on-dark": "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] rounded-2xl backdrop-blur-lg font-medium",
        "on-image": "bg-black/40 text-white border-2 border-white/20 shadow-elevation-3 hover:bg-black/60 hover:scale-[1.02] rounded-2xl backdrop-blur-lg font-medium",
        "on-gradient-filled": "bg-white text-primary hover:bg-white/90 hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-semibold backdrop-blur-sm",
        
        // Premium brand variants - ALL gradient buttons use text-white with standard colors
        brand: "bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white hover:shadow-glow-hover hover:scale-[1.02] active:scale-[0.98] rounded-2xl px-8 h-12 font-bold transform transition-all duration-300 relative overflow-hidden",
        default: "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium",
        secondary: "bg-secondary text-secondary-foreground hover:shadow-elevation-2 hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium border border-border/30",
        ghost: "text-primary hover:bg-primary/10 hover:scale-[1.02] rounded-2xl px-4 h-12 font-medium relative",
        link: "text-primary underline-offset-4 hover:underline bg-transparent h-auto p-0",
        outline: "border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary hover:scale-[1.02] rounded-2xl px-6 h-12 font-medium backdrop-blur-sm",
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
