import { supabase } from '@/integrations/supabase/client';

export const saveChangeToDatabase = async (
  projectId: string,
  changeType: 'text' | 'image' | 'image_caption' | 'content_block',
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
      .from('dev_mode_changes')
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
      .from('dev_mode_changes')
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
      .from('dev_mode_changes')
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
