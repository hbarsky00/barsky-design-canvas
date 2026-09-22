
export interface UseImageStateManagerProps {
  src: string;
  projectId: string;
  imageReplacements?: Record<string, string>;
}

export interface ImageStateManagerReturn {
  displayedImage: string;
  updateDisplayedImage: (newSrc: string) => void;
  forceRefresh: () => void;
  hasDevModeChanges: boolean;
  isLoading: boolean;
  hasError: boolean;
  isValidUrl: boolean;
}
