
import { ProjectData } from './types';

export interface SimplifiedProjectPersistenceHooks {
  saveTextContent: (key: string, content: string) => Promise<void>;
  saveImageReplacement: (originalSrc: string, newSrc: string) => Promise<void>;
  saveImageCaption: (imageSrc: string, caption: string) => Promise<void>;
  getTextContent: (key: string, fallback?: string) => string;
  getImageSrc: (originalSrc: string) => string;
  getImageCaption: (imageSrc: string, fallback?: string) => string;
  isSaving: boolean;
  lastSaved: Date | null;
}

export type SimplifiedProjectData = ProjectData;
