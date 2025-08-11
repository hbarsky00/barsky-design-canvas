import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface ThemeToggleProps {
  className?: string;
}
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className
}) => {
  const {
    setTheme
  } = useTheme();

// Set theme to light mode on component mount and prevent it from changing
useEffect(() => {
  setTheme("light");
}, [setTheme]);
return null;
};
export default ThemeToggle;