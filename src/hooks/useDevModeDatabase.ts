
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DevModeChange {
  id: string;
  project_id: string;
  change_type: string;
  change_key: string;
  change_value: any;
  created_at: string;
  updated_at: string;
}

export const useDevModeDatabase = (projectId: string) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveChange = useCallback(async (changeType: string, changeKey: string, changeValue: any) => {
    console.log('🔵 useDevModeDatabase.saveChange called:', { 
      projectId, 
      changeType, 
      changeKey, 
      changeValueType: typeof changeValue,
      changeValueLength: typeof changeValue === 'string' ? changeValue.length : 'N/A'
    });

    if (!projectId) {
      console.error('❌ No project ID provided to saveChange');
      return false;
    }

    try {
      setIsSaving(true);
      console.log('💾 Attempting to save to Supabase database...');

      const { data, error } = await supabase
        .from('dev_mode_changes')
        .upsert({
          project_id: projectId,
          change_type: changeType,
          change_key: changeKey,
          change_value: changeValue,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'project_id,change_type,change_key'
        })
        .select();

      if (error) {
        console.error('❌ Supabase error:', error);
        toast.error('Failed to save changes', {
          description: error.message
        });
        return false;
      }

      console.log('✅ Successfully saved to database:', data);
      return true;
    } catch (error) {
      console.error('❌ Unexpected error saving to database:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [projectId]);

  const getChanges = useCallback(async (): Promise<{
    textContent: Record<string, string>;
    imageReplacements: Record<string, string>;
    contentBlocks: Record<string, any[]>;
  }> => {
    console.log('🔍 getChanges called for projectId:', projectId);

    if (!projectId) {
      console.log('❌ No projectId provided to getChanges');
      return { textContent: {}, imageReplacements: {}, contentBlocks: {} };
    }

    try {
      const { data, error } = await supabase
        .from('dev_mode_changes')
        .select('*')
        .eq('project_id', projectId);

      if (error) {
        console.error('❌ Error fetching changes:', error);
        return { textContent: {}, imageReplacements: {}, contentBlocks: {} };
      }

      console.log('📤 Raw data from database:', data);

      const result = {
        textContent: {} as Record<string, string>,
        imageReplacements: {} as Record<string, string>,
        contentBlocks: {} as Record<string, any[]>
      };

      data?.forEach((change: DevModeChange) => {
        console.log('🔍 Processing change:', { 
          type: change.change_type, 
          key: change.change_key,
          hasValue: !!change.change_value 
        });

        if (change.change_type === 'text') {
          result.textContent[change.change_key] = change.change_value;
        } else if (change.change_type === 'image') {
          result.imageReplacements[change.change_key] = change.change_value;
        } else if (change.change_type === 'content_block') {
          result.contentBlocks[change.change_key] = change.change_value;
        }
      });

      console.log('📤 Processed changes result:', {
        textCount: Object.keys(result.textContent).length,
        imageCount: Object.keys(result.imageReplacements).length,
        blockCount: Object.keys(result.contentBlocks).length
      });

      return result;
    } catch (error) {
      console.error('❌ Unexpected error fetching changes:', error);
      return { textContent: {}, imageReplacements: {}, contentBlocks: {} };
    }
  }, [projectId]);

  const clearChanges = useCallback(async () => {
    console.log('🗑️ clearChanges called for projectId:', projectId);

    if (!projectId) return false;

    try {
      const { error } = await supabase
        .from('dev_mode_changes')
        .delete()
        .eq('project_id', projectId);

      if (error) {
        console.error('❌ Error clearing changes:', error);
        return false;
      }

      console.log('✅ Cleared all changes from database');
      return true;
    } catch (error) {
      console.error('❌ Unexpected error clearing changes:', error);
      return false;
    }
  }, [projectId]);

  const hasChanges = useCallback(async (): Promise<boolean> => {
    console.log('🔍 hasChanges called for projectId:', projectId);

    if (!projectId) return false;

    try {
      const { count, error } = await supabase
        .from('dev_mode_changes')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', projectId);

      if (error) {
        console.error('❌ Error checking for changes:', error);
        return false;
      }

      const hasAny = (count || 0) > 0;
      console.log('🔍 hasChanges result:', { count, hasAny });
      return hasAny;
    } catch (error) {
      console.error('❌ Unexpected error checking for changes:', error);
      return false;
    }
  }, [projectId]);

  return {
    saveChange,
    getChanges,
    clearChanges,
    hasChanges,
    isSaving
  };
};
