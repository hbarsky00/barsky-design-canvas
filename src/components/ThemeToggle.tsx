import React from "react";

interface ThemeToggleProps {
  className?: string;
}

// No-op while theme is forced to light via ThemeProvider
const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  return null;
};

export default ThemeToggle;