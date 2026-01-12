import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    const contentKey = url.searchParams.get('contentKey');

    // GET - Fetch content by key
    if (req.method === 'GET' && action === 'fetch') {
      if (contentKey) {
        const { data, error } = await supabase
          .from('editable_content')
          .select('*')
          .eq('content_key', contentKey)
          .maybeSingle();

        if (error) throw error;
        
        return new Response(
          JSON.stringify({ data }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        const { data, error } = await supabase
          .from('editable_content')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;
        
        return new Response(
          JSON.stringify({ data: data || [] }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // POST - Upsert content
    if (req.method === 'POST' && action === 'upsert') {
      const body = await req.json();
      
      if (!body.content_key) {
        return new Response(
          JSON.stringify({ error: 'content_key is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const contentData = {
        content_key: body.content_key,
        content_html: body.content_html || '',
        content_json: body.content_json || null,
        page_path: body.page_path || '',
        section_name: body.section_name || '',
        last_edited_by: body.last_edited_by || 'system',
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('editable_content')
        .upsert(contentData, { onConflict: 'content_key' })
        .select()
        .single();

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true, data }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // PUT - Update content
    if (req.method === 'PUT' && action === 'update') {
      const body = await req.json();
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(
          JSON.stringify({ error: 'id is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };
      
      if (body.content_html !== undefined) updateData.content_html = body.content_html;
      if (body.content_json !== undefined) updateData.content_json = body.content_json;
      if (body.last_edited_by !== undefined) updateData.last_edited_by = body.last_edited_by;

      const { error } = await supabase
        .from('editable_content')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE - Delete content
    if (req.method === 'DELETE' && action === 'delete') {
      const id = url.searchParams.get('id');
      
      if (!id) {
        return new Response(
          JSON.stringify({ error: 'id is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { error } = await supabase
        .from('editable_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action or method' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});