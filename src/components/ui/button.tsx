
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-300 w-full sm:w-auto",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-2xl backdrop-blur-md !text-white hover:!text-white [&_svg]:!text-white [&_svg]:!fill-none [&_svg]:!stroke-white [&_svg]:!stroke-2 hover:[&_svg]:!text-white hover:[&_svg]:!fill-none hover:[&_svg]:!stroke-white hover:[&_svg]:!stroke-2 active:[&_svg]:!text-white active:[&_svg]:!fill-none active:[&_svg]:!stroke-white active:[&_svg]:!stroke-2",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 [&_svg]:!stroke-2 [&_svg]:!fill-none",
        outline:
          "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 [&_svg]:text-blue-600 [&_svg]:!fill-none [&_svg]:!stroke-blue-600 [&_svg]:!stroke-2 hover:[&_svg]:!text-white hover:[&_svg]:!fill-none hover:[&_svg]:!stroke-white hover:[&_svg]:!stroke-2 transition-all duration-300 hover:!text-white",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-blue-600 hover:bg-secondary/80 hover:text-blue-600 hover:border-blue-600 [&_svg]:text-secondary-foreground hover:[&_svg]:text-blue-600 transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground [&_svg]:!stroke-2 [&_svg]:!fill-none",
        link: "text-primary underline-offset-4 hover:underline [&_svg]:!stroke-2 [&_svg]:!fill-none",
      },
      size: {
        default: "h-auto px-6 py-3 text-base font-medium [&_svg]:h-5 [&_svg]:w-5",
        sm: "h-9 rounded-md px-3 text-sm font-medium [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-12 px-8 py-3 text-lg font-medium [&_svg]:h-6 [&_svg]:w-6",
        icon: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5",
      },
    },
    defaultVariants: {
      variant: "default",
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
