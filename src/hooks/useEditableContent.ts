import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface EditableContentData {
  id: string;
  content_key: string;
  content_html: string;
  content_json: any;
  page_path: string;
  section_name: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  last_edited_by: string | null;
}

interface UseEditableContentReturn {
  content: string;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  lastSaved: Date | null;
  saveContent: (html: string, json?: any) => Promise<void>;
  refreshContent: () => Promise<void>;
}

export const useEditableContent = (
  contentKey: string,
  defaultContent: string = '',
  pagePath: string = '/',
  sectionName: string = 'default'
): UseEditableContentReturn => {
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  // Load content from database
  const loadContent = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('editable_content')
        .select('*')
        .eq('content_key', contentKey)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      if (data) {
        setContent(data.content_html || defaultContent);
      } else {
        setContent(defaultContent);
      }
    } catch (err: any) {
      console.error('Error loading content:', err);
      setError(err.message);
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  }, [contentKey, defaultContent]);

  // Save content to database
  const saveContent = useCallback(async (html: string, json?: any) => {
    try {
      setIsSaving(true);
      setError(null);

      // First check if content exists
      const { data: existingData } = await supabase
        .from('editable_content')
        .select('id')
        .eq('content_key', contentKey)
        .single();

      if (existingData) {
        // Update existing content
        const { error } = await supabase
          .from('editable_content')
          .update({
            content_html: html,
            content_json: json || {},
            last_edited_by: (await supabase.auth.getUser()).data.user?.id,
            updated_at: new Date().toISOString(),
          })
          .eq('content_key', contentKey);

        if (error) throw error;
      } else {
        // Insert new content
        const { error } = await supabase
          .from('editable_content')
          .insert({
            content_key: contentKey,
            content_html: html,
            content_json: json || {},
            page_path: pagePath,
            section_name: sectionName,
            created_by: (await supabase.auth.getUser()).data.user?.id,
            last_edited_by: (await supabase.auth.getUser()).data.user?.id,
          });

        if (error) throw error;
      }

      setContent(html);
      setLastSaved(new Date());
      
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (err: any) {
      console.error('Error saving content:', err);
      setError(err.message);
      
      toast({
        title: "Save failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [contentKey, pagePath, sectionName, toast]);

  // Refresh content
  const refreshContent = useCallback(async () => {
    await loadContent();
  }, [loadContent]);

  // Load content on mount
  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`editable-content-${contentKey}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'editable_content',
          filter: `content_key=eq.${contentKey}`,
        },
        (payload) => {
          if (payload.new && typeof payload.new === 'object') {
            const newData = payload.new as EditableContentData;
            setContent(newData.content_html || defaultContent);
            setLastSaved(new Date(newData.updated_at));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [contentKey, defaultContent]);

  return {
    content,
    isLoading,
    isSaving,
    error,
    lastSaved,
    saveContent,
    refreshContent,
  };
};