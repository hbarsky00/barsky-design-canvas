
export interface NavigationProps {
  navigateUp?: () => void;
  navigateDown?: () => void;
  canNavigateUp?: boolean;
  canNavigateDown?: boolean;
  isMobile?: boolean;
}
