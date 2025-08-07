import * as React from "react"
import { cn } from "@/lib/utils"

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export const SkipLink: React.FC<SkipLinkProps> = ({ 
  href, 
  children, 
  className 
}) => {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50",
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </a>
  )
}

export const MainContentSkipLink = () => (
  <SkipLink href="#main-content">
    Skip to main content
  </SkipLink>
)

export const NavigationSkipLink = () => (
  <SkipLink href="#navigation">
    Skip to navigation
  </SkipLink>
)