
import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { setTheme } = useTheme();

  // Set theme to light mode on component mount and prevent it from changing
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("rounded-full w-9 h-9", className)}
      aria-label="Light mode"
      onClick={() => setTheme("light")}
    >
      <Sun className="h-5 w-5" />
      <span className="sr-only">Light mode</span>
    </Button>
  );
};

export default ThemeToggle;
