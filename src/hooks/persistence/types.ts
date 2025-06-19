
export interface ProjectData {
  textContent: Record<string, string>;
  imageReplacements: Record<string, string>;
  contentBlocks: Record<string, any[]>;
  lastSaved?: string;
}

export interface ProjectPersistenceHooks {
  saveTextContent: (key: string, content: string) => Promise<void>;
  saveImageReplacement: (originalSrc: string, newSrc: string) => Promise<void>;
  saveContentBlocks: (sectionKey: string, blocks: any[]) => Promise<void>;
  getProjectData: () => ProjectData;
  getTextContent: (key: string, fallback?: string) => string;
  getImageSrc: (originalSrc: string) => string;
  clearProjectData: () => void;
  isSaving: boolean;
  lastSaved: Date | null;
}
