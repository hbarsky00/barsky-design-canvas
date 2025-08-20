import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Floating3DButton from "./Floating3DButton";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface Enhanced3DNavigationProps {
  items: NavItem[];
  className?: string;
  variant?: "horizontal" | "vertical";
}

const Enhanced3DNavigation: React.FC<Enhanced3DNavigationProps> = ({
  items,
  className,
  variant = "horizontal",
}) => {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex gap-2",
        variant === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = location.pathname === item.href;
        
        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: variant === "vertical" ? 20 : 0, x: variant === "horizontal" ? 20 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link to={item.href}>
              <Floating3DButton
                variant={isActive ? "primary" : "ghost"}
                size="sm"
                floating={true}
                className={cn(
                  "relative overflow-hidden transition-all duration-300",
                  isActive && "ring-2 ring-primary/30"
                )}
              >
                {item.icon && (
                  <motion.span
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {item.icon}
                  </motion.span>
                )}
                {item.label}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary-accent to-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </Floating3DButton>
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default Enhanced3DNavigation;