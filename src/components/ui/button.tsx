
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 duration-300 w-full sm:w-auto",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-2xl backdrop-blur-md !text-white hover:!text-white [&_svg]:!text-white [&_svg]:!fill-white hover:[&_svg]:!text-white hover:[&_svg]:!fill-white active:[&_svg]:!text-white active:[&_svg]:!fill-white [&_svg]:!stroke-white hover:[&_svg]:!stroke-white active:[&_svg]:!stroke-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-blue-600 bg-transparent text-blue-600 hover:bg-blue-700 hover:text-white hover:border-blue-700 [&_svg]:text-blue-600 [&_svg]:fill-blue-600 [&_svg]:stroke-blue-600 hover:[&_svg]:!text-white hover:[&_svg]:!fill-white hover:[&_svg]:!stroke-white hover:[&_svg]:color-white transition-all duration-300 hover:!text-white",
        secondary:
          "bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-600 !text-white hover:!text-white active:!text-white [&_svg]:!text-white [&_svg]:!fill-white hover:[&_svg]:!text-white hover:[&_svg]:!fill-white active:[&_svg]:!text-white active:[&_svg]:!fill-white [&_svg]:!stroke-white hover:[&_svg]:!stroke-white active:[&_svg]:!stroke-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto px-6 py-3 text-base font-medium",
        sm: "h-9 rounded-md px-3 text-sm font-medium",
        lg: "h-auto px-8 py-4 text-lg font-medium",
        icon: "h-10 w-10",
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
