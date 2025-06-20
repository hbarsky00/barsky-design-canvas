
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

    return data;
  } catch (error) {
    console.error('Error in fetchProjectChanges:', error);
    return null;
  }
};

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
