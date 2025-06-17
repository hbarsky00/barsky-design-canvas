import { supabase } from '@/integrations/supabase/client';
import { ChangeType, DevModeChange } from './types';

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

  // For image changes, we now expect storage URLs instead of base64 data
  if (changeType === 'image' && typeof changeValue === 'string') {
    if (changeValue.startsWith('data:')) {
      console.error('❌ saveChangeToDatabase: Base64 images no longer supported. Use storage URLs instead.');
      throw new Error('Large image data should be uploaded to storage, not saved directly to database. Please use the image upload functionality.');
    }
    
    // Validate that it's a proper URL
    if (!changeValue.startsWith('http') && !changeValue.startsWith('/')) {
      console.error('❌ saveChangeToDatabase: Invalid image URL format:', changeValue);
      throw new Error('Invalid image URL format. Expected storage URL or valid path.');
    }
    
    console.log(`✅ Image URL validation passed: ${changeValue.substring(0, 100)}...`);
  }

  console.log('💾 saveChangeToDatabase: Saving change:', {
    projectId,
    changeType,
    changeKey,
    changeValueType: typeof changeValue,
    changeValuePreview: typeof changeValue === 'string' ? changeValue.substring(0, 100) + '...' : changeValue
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
      
      // Provide specific error messages
      if (upsertError.message.includes('index row requires') || 
          upsertError.message.includes('maximum size') ||
          upsertError.message.includes('row size')) {
        throw new Error('Data is too large for database storage. For images, please use the image upload functionality which stores files in cloud storage.');
      }
      
      if (upsertError.message.includes('payload too large')) {
        throw new Error('Data payload is too large. Please use storage for large files instead of direct database storage.');
      }
      
      throw new Error(`Database error: ${upsertError.message}`);
    }

    console.log('✅ saveChangeToDatabase: Successfully saved change to database');
    return true;
  } catch (error) {
    console.error('❌ saveChangeToDatabase: Unexpected error:', error);
    throw error;
  }
};

export const fetchChangesFromDatabase = async (projectId: string): Promise<DevModeChange[] | null> => {
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
    
    // Transform the data to match our DevModeChange type
    const transformedData: DevModeChange[] = (data || []).map(item => ({
      id: item.id,
      project_id: item.project_id,
      change_type: item.change_type as ChangeType, // Type assertion since we know these are valid
      change_key: item.change_key,
      change_value: item.change_value,
      created_at: item.created_at,
      updated_at: item.updated_at
    }));
    
    return transformedData;
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
