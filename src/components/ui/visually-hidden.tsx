import * as React from "react"
import { cn } from "@/lib/utils"

interface VisuallyHiddenProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ 
  children, 
  className,
  asChild = false 
}) => {
  const classes = cn(
    "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0",
    "clip-[rect(0,0,0,0)]", // Modern clip-path equivalent
    className
  )

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn((children as React.ReactElement).props.className, classes)
    })
  }

  return (
    <span className={classes}>
      {children}
    </span>
  )
}