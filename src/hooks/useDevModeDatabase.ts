
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContentBlock } from '@/components/dev/DraggableContentBlock';

export const useDevModeDatabase = (projectId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('🎯 useDevModeDatabase: Initialized for project:', projectId);

  const saveChange = useCallback(async (changeType: 'text' | 'image' | 'content_block', changeKey: string, changeValue: any): Promise<boolean> => {
    if (!projectId) {
      console.error('❌ useDevModeDatabase: No projectId provided');
      return false;
    }

    console.log('💾 useDevModeDatabase: Saving change:', {
      projectId,
      changeType,
      changeKey,
      changeValueType: typeof changeValue,
      changeValueLength: Array.isArray(changeValue) ? changeValue.length : typeof changeValue === 'string' ? changeValue.length : 'unknown'
    });

    setIsLoading(true);
    setError(null);

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
        console.error('❌ useDevModeDatabase: Database error:', upsertError);
        setError(upsertError.message);
        return false;
      }

      console.log('✅ useDevModeDatabase: Successfully saved change to database');
      return true;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Unexpected error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const getChanges = useCallback(async () => {
    if (!projectId) {
      console.log('⚠️ useDevModeDatabase: No projectId, returning empty data');
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {}
      };
    }

    console.log('📤 useDevModeDatabase: Fetching changes for project:', projectId);

    try {
      const { data, error: fetchError } = await supabase
        .from('dev_mode_changes')
        .select('*')
        .eq('project_id', projectId);

      if (fetchError) {
        console.error('❌ useDevModeDatabase: Error fetching changes:', fetchError);
        throw fetchError;
      }

      console.log('📊 useDevModeDatabase: Raw data from database:', data);

      const result = {
        textContent: {} as Record<string, string>,
        imageReplacements: {} as Record<string, string>,
        contentBlocks: {} as Record<string, ContentBlock[]>
      };

      if (data && data.length > 0) {
        data.forEach(change => {
          console.log('🔍 useDevModeDatabase: Processing change:', {
            type: change.change_type,
            key: change.change_key,
            value: change.change_value
          });

          switch (change.change_type) {
            case 'text':
              result.textContent[change.change_key] = change.change_value;
              break;
            case 'image':
              result.imageReplacements[change.change_key] = change.change_value;
              break;
            case 'content_block':
              result.contentBlocks[change.change_key] = change.change_value;
              break;
            default:
              console.warn('⚠️ useDevModeDatabase: Unknown change type:', change.change_type);
          }
        });
      }

      console.log('📋 useDevModeDatabase: Processed changes:', {
        textCount: Object.keys(result.textContent).length,
        imageCount: Object.keys(result.imageReplacements).length,
        contentBlockSections: Object.keys(result.contentBlocks).length,
        contentBlocks: result.contentBlocks
      });

      return result;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error in getChanges:', error);
      return {
        textContent: {},
        imageReplacements: {},
        contentBlocks: {}
      };
    }
  }, [projectId]);

  const hasChanges = useCallback(async (): Promise<boolean> => {
    if (!projectId) {
      console.log('⚠️ useDevModeDatabase: No projectId for hasChanges check');
      return false;
    }

    console.log('🔍 useDevModeDatabase: Checking for changes for project:', projectId);

    try {
      const { data, error: fetchError } = await supabase
        .from('dev_mode_changes')
        .select('id')
        .eq('project_id', projectId)
        .limit(1);

      if (fetchError) {
        console.error('❌ useDevModeDatabase: Error checking changes:', fetchError);
        return false;
      }

      const hasData = data && data.length > 0;
      console.log('🔍 useDevModeDatabase: hasChanges result:', {
        hasData,
        dataLength: data?.length || 0
      });

      return hasData;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error in hasChanges:', error);
      return false;
    }
  }, [projectId]);

  const clearChanges = useCallback(async (): Promise<boolean> => {
    if (!projectId) {
      console.error('❌ useDevModeDatabase: No projectId for clearChanges');
      return false;
    }

    console.log('🗑️ useDevModeDatabase: Clearing changes for project:', projectId);

    try {
      const { error: deleteError } = await supabase
        .from('dev_mode_changes')
        .delete()
        .eq('project_id', projectId);

      if (deleteError) {
        console.error('❌ useDevModeDatabase: Error clearing changes:', deleteError);
        return false;
      }

      console.log('✅ useDevModeDatabase: Successfully cleared changes');
      return true;
    } catch (error) {
      console.error('❌ useDevModeDatabase: Error in clearChanges:', error);
      return false;
    }
  }, [projectId]);

  return {
    saveChange,
    getChanges,
    hasChanges,
    clearChanges,
    isLoading,
    error
  };
};
