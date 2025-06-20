
import { supabase } from '@/integrations/supabase/client';

export const saveChangeToDatabase = async (
  projectId: string,
  changeType: 'text' | 'image' | 'content_block',
  key: string,
  value: any
) => {
  try {
    console.log(`💾 Saving ${changeType} change to database:`, { projectId, key });

    const changeData = {
      project_id: projectId,
      change_type: changeType,
      change_key: key,
      change_value: typeof value === 'string' ? value : JSON.stringify(value),
      created_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('project_changes')
      .upsert(changeData, {
        onConflict: 'project_id,change_type,change_key'
      });

    if (error) {
      console.error('❌ Database save error:', error);
      throw error;
    }

    console.log('✅ Change saved to database successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving change to database:', error);
    throw error;
  }
};

export const fetchChangesFromDatabase = async (projectId: string) => {
  try {
    console.log('📖 Fetching changes from database for project:', projectId);

    const { data, error } = await supabase
      .from('project_changes')
      .select('*')
      .eq('project_id', projectId);

    if (error) {
      console.error('❌ Database fetch error:', error);
      throw error;
    }

    console.log('✅ Changes fetched from database:', data?.length || 0, 'records');
    return data || [];
  } catch (error) {
    console.error('❌ Error fetching changes from database:', error);
    return [];
  }
};

export const clearChangesFromDatabase = async (projectId: string) => {
  try {
    console.log('🗑️ Clearing changes from database for project:', projectId);

    const { error } = await supabase
      .from('project_changes')
      .delete()
      .eq('project_id', projectId);

    if (error) {
      console.error('❌ Database clear error:', error);
      return false;
    }

    console.log('✅ Changes cleared from database successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing changes from database:', error);
    return false;
  }
};
