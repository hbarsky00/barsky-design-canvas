import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, ArrowUp } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
  label: string;
  anchor: string;
}

interface FloatingCaseStudyNavigationProps {
  navigation: NavItem[];
  activeSection: string;
  onSectionClick: (anchor: string) => void;
}

const FloatingCaseStudyNavigation: React.FC<FloatingCaseStudyNavigationProps> = ({
  navigation,
  activeSection,
  onSectionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Lock background scroll on mobile when drawer is open
  useEffect(() => {
    if (!isMobile) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  const handleSectionClick = (anchor: string) => {
    onSectionClick(anchor);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const activeIndex = navigation.findIndex(item => item.anchor === activeSection);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / navigation.length) * 100 : 0;

  return (
    <div className="fixed bottom-6 md:bottom-6 left-4 z-50 flex items-center gap-2" style={{ bottom: isMobile ? 'calc(env(safe-area-inset-bottom) + 88px)' : undefined }}>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <motion.button
            className="relative bg-primary text-primary-foreground rounded-full p-3 shadow-lg border border-border/20 backdrop-blur-sm"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.2"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>
            <Menu className="h-5 w-5 relative z-10" />
          </motion.button>
        </DrawerTrigger>
        <motion.button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-muted/60 text-muted-foreground rounded-full px-3 py-1.5 border border-border/40 backdrop-blur-sm"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Open sections"
        >
          <span className="text-sm font-medium">Sections</span>
        </motion.button>
        
        <DrawerContent className={isMobile ? "max-h-[90dvh] flex flex-col" : "max-h-[70vh]"}>
          <DrawerHeader className="flex-shrink-0">
            <DrawerTitle className="text-center">Sections</DrawerTitle>
          </DrawerHeader>
          
          <div className={isMobile ? "flex-1 min-h-0 flex flex-col" : "px-4 pb-4"}>
            <div className={
              isMobile 
                ? "flex-1 overflow-y-auto overscroll-contain px-4 pb-4 space-y-2 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent" 
                : "space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-2"
            } style={isMobile ? { WebkitOverflowScrolling: 'touch' } : undefined}>
              {navigation.map((item, index) => (
                <motion.button
                  key={item.anchor}
                  onClick={() => handleSectionClick(item.anchor)}
                  className={`w-full text-left p-4 md:p-3 rounded-lg transition-all duration-200 flex items-center justify-between min-h-[44px] ${
                    activeSection === item.anchor
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.anchor && (
                    <div className="w-2 h-2 rounded-full bg-current" />
                  )}
                </motion.button>
              ))}
              
              <motion.button
                onClick={scrollToTop}
                className="w-full text-left p-4 md:p-3 rounded-lg bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-all duration-200 flex items-center justify-between mt-4 md:col-span-2 min-h-[44px]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navigation.length * 0.1 }}
              >
                <span className="font-medium">Back to Top</span>
                <ArrowUp className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FloatingCaseStudyNavigation;