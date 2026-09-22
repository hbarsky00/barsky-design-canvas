import { supabase } from '@/integrations/supabase/client';

export const saveChangeToDatabase = async (
  projectId: string,
  changeType: 'text' | 'image' | 'image_caption' | 'content_block',
  key: string,
  value: any
) => {
  try {
    console.log(`💾 Saving ${changeType} change via edge function:`, { projectId, key });

    const { data, error } = await supabase.functions.invoke('dev-mode-changes', {
      body: {
        change_type: changeType,
        change_key: key,
        change_value: value
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Workaround: use query params for action and projectId
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dev-mode-changes?action=save&projectId=${encodeURIComponent(projectId)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        },
        body: JSON.stringify({
          change_type: changeType,
          change_key: key,
          change_value: value
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save change');
    }

    console.log('✅ Change saved via edge function successfully');
    return true;
  } catch (error) {
    console.error('❌ Error saving change via edge function:', error);
    throw error;
  }
};

export const fetchChangesFromDatabase = async (projectId: string) => {
  try {
    console.log('📖 Fetching changes via edge function for project:', projectId);

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dev-mode-changes?action=fetch&projectId=${encodeURIComponent(projectId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch changes');
    }

    const result = await response.json();
    console.log('✅ Changes fetched via edge function:', result.data?.length || 0, 'records');
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching changes via edge function:', error);
    return [];
  }
};

export const clearChangesFromDatabase = async (projectId: string) => {
  try {
    console.log('🗑️ Clearing changes via edge function for project:', projectId);

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dev-mode-changes?action=clear&projectId=${encodeURIComponent(projectId)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to clear changes');
    }

    console.log('✅ Changes cleared via edge function successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing changes via edge function:', error);
    return false;
  }
};

export const fetchPageMetadata = async (path: string) => {
  try {
    console.log('📖 Fetching page metadata for path:', path);

    const { data, error } = await supabase
      .from('page_metadata')
      .select('*')
      .eq('path', path)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Database fetch error for page metadata:', error);
      return null;
    }

    console.log('✅ Page metadata fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching page metadata:', error);
    return null;
  }
};

export const fetchBlogPost = async (slug: string) => {
  try {
    console.log('📖 Fetching blog post for slug:', slug);

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Database fetch error for blog post:', error);
      return null;
    }

    console.log('✅ Blog post fetched:', data);
    return data;
  } catch (error) {
    console.error('❌ Error fetching blog post:', error);
    return null;
  }
};