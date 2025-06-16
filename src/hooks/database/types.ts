
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export interface DatabaseChanges {
  textContent: Record<string, string>;
  imageReplacements: Record<string, string>;
  contentBlocks: Record<string, ContentBlock[]>;
}

export type ChangeType = 'text' | 'image' | 'content_block';

export interface DevModeChange {
  id: string;
  project_id: string;
  change_type: ChangeType;
  change_key: string;
  change_value: any;
  created_at: string;
  updated_at: string;
}
