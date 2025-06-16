
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
    if (!projectId) {
      console.error('No project ID provided');
      return false;
    }

    try {
      setIsSaving(true);
      console.log('💾 Saving to database:', { projectId, changeType, changeKey, changeValue });

      const { error } = await supabase
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

      if (error) {
        console.error('❌ Database save error:', error);
        toast.error('Failed to save changes', {
          description: error.message
        });
        return false;
      }

      console.log('✅ Successfully saved to database');
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
    if (!projectId) {
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

      const result = {
        textContent: {} as Record<string, string>,
        imageReplacements: {} as Record<string, string>,
        contentBlocks: {} as Record<string, any[]>
      };

      data?.forEach((change: DevModeChange) => {
        if (change.change_type === 'text') {
          result.textContent[change.change_key] = change.change_value;
        } else if (change.change_type === 'image') {
          result.imageReplacements[change.change_key] = change.change_value;
        } else if (change.change_type === 'content_block') {
          result.contentBlocks[change.change_key] = change.change_value;
        }
      });

      console.log('📤 Loaded changes from database:', result);
      return result;
    } catch (error) {
      console.error('❌ Unexpected error fetching changes:', error);
      return { textContent: {}, imageReplacements: {}, contentBlocks: {} };
    }
  }, [projectId]);

  const clearChanges = useCallback(async () => {
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

      return (count || 0) > 0;
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
