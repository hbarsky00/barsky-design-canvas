
import { supabase } from '@/integrations/supabase/client';

export interface DevModeChange {
  id?: string;
  project_id: string;
  change_type: 'text' | 'image' | 'content_block';
  change_key: string;
  change_value: any;
  created_at?: string;
}

export const fetchProjectChanges = async (projectId: string): Promise<DevModeChange[] | null> => {
  try {
    const { data, error } = await supabase
      .from('dev_mode_changes')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching project changes:', error);
      return null;
    }

    // Type cast and filter to ensure only valid change_type values
    return data?.map(item => ({
      ...item,
      change_type: item.change_type as 'text' | 'image' | 'content_block'
    })).filter(item => 
      ['text', 'image', 'content_block'].includes(item.change_type)
    ) || [];
  } catch (error) {
    console.error('Error in fetchProjectChanges:', error);
    return null;
  }
};

// Alias for compatibility with publishingService
export const fetchChangesFromDatabase = fetchProjectChanges;

export const saveProjectChange = async (
  projectId: string,
  changeType: 'text' | 'image' | 'content_block',
  changeKey: string,
  changeValue: any
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('dev_mode_changes')
      .upsert({
        project_id: projectId,
        change_type: changeType,
        change_key: changeKey,
        change_value: changeValue
      }, {
        onConflict: 'project_id,change_type,change_key'
      });

    if (error) {
      console.error('Error saving project change:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveProjectChange:', error);
    return false;
  }
};

export const clearChangesFromDatabase = async (projectId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('dev_mode_changes')
      .delete()
      .eq('project_id', projectId);

    if (error) {
      console.error('Error clearing project changes:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in clearChangesFromDatabase:', error);
    return false;
  }
};
