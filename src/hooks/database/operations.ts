
import { supabase } from '@/integrations/supabase/client';
import { ChangeType } from './types';

export const saveChangeToDatabase = async (
  projectId: string, 
  changeType: ChangeType, 
  changeKey: string, 
  changeValue: any
): Promise<boolean> => {
  if (!projectId) {
    console.error('❌ saveChangeToDatabase: No projectId provided');
    return false;
  }

  console.log('💾 saveChangeToDatabase: Saving change:', {
    projectId,
    changeType,
    changeKey,
    changeValueType: typeof changeValue,
    changeValueLength: Array.isArray(changeValue) ? changeValue.length : typeof changeValue === 'string' ? changeValue.length : 'unknown'
  });

  try {
    const { error: upsertError } = await supabase
      .from('dev_mode_changes')
      .upsert({
        project_id: projectId,
        change_type: changeType,
        change_key: changeKey,
        change_value: changeValue,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'project_id,change_type,change_key'
      });

    if (upsertError) {
      console.error('❌ saveChangeToDatabase: Database error:', upsertError);
      return false;
    }

    console.log('✅ saveChangeToDatabase: Successfully saved change to database');
    return true;
  } catch (error) {
    console.error('❌ saveChangeToDatabase: Unexpected error:', error);
    return false;
  }
};

export const fetchChangesFromDatabase = async (projectId: string) => {
  if (!projectId) {
    console.log('⚠️ fetchChangesFromDatabase: No projectId, returning null');
    return null;
  }

  console.log('📤 fetchChangesFromDatabase: Fetching changes for project:', projectId);

  try {
    const { data, error: fetchError } = await supabase
      .from('dev_mode_changes')
      .select('*')
      .eq('project_id', projectId);

    if (fetchError) {
      console.error('❌ fetchChangesFromDatabase: Error fetching changes:', fetchError);
      throw fetchError;
    }

    console.log('📊 fetchChangesFromDatabase: Raw data from database:', data);
    return data;
  } catch (error) {
    console.error('❌ fetchChangesFromDatabase: Error in fetchChangesFromDatabase:', error);
    return null;
  }
};

export const checkHasChangesInDatabase = async (projectId: string): Promise<boolean> => {
  if (!projectId) {
    console.log('⚠️ checkHasChangesInDatabase: No projectId for hasChanges check');
    return false;
  }

  console.log('🔍 checkHasChangesInDatabase: Checking for changes for project:', projectId);

  try {
    const { data, error: fetchError } = await supabase
      .from('dev_mode_changes')
      .select('id')
      .eq('project_id', projectId)
      .limit(1);

    if (fetchError) {
      console.error('❌ checkHasChangesInDatabase: Error checking changes:', fetchError);
      return false;
    }

    const hasData = data && data.length > 0;
    console.log('🔍 checkHasChangesInDatabase: hasChanges result:', {
      hasData,
      dataLength: data?.length || 0
    });

    return hasData;
  } catch (error) {
    console.error('❌ checkHasChangesInDatabase: Error in hasChanges:', error);
    return false;
  }
};

export const clearChangesFromDatabase = async (projectId: string): Promise<boolean> => {
  if (!projectId) {
    console.error('❌ clearChangesFromDatabase: No projectId for clearChanges');
    return false;
  }

  console.log('🗑️ clearChangesFromDatabase: Clearing changes for project:', projectId);

  try {
    const { error: deleteError } = await supabase
      .from('dev_mode_changes')
      .delete()
      .eq('project_id', projectId);

    if (deleteError) {
      console.error('❌ clearChangesFromDatabase: Error clearing changes:', deleteError);
      return false;
    }

    console.log('✅ clearChangesFromDatabase: Successfully cleared changes');
    return true;
  } catch (error) {
    console.error('❌ clearChangesFromDatabase: Error in clearChanges:', error);
    return false;
  }
};
