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
    const projectId = url.searchParams.get('projectId');

    if (!projectId) {
      return new Response(
        JSON.stringify({ error: 'Project ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // GET - Fetch changes
    if (req.method === 'GET' && action === 'fetch') {
      const { data, error } = await supabase
        .from('dev_mode_changes')
        .select('*')
        .eq('project_id', projectId);

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ data: data || [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // POST - Save change
    if (req.method === 'POST' && action === 'save') {
      const body = await req.json();
      
      const changeData = {
        project_id: projectId,
        change_type: body.change_type,
        change_key: body.change_key,
        change_value: typeof body.change_value === 'string' 
          ? body.change_value 
          : JSON.stringify(body.change_value),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('dev_mode_changes')
        .upsert(changeData, {
          onConflict: 'project_id,change_type,change_key'
        });

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // DELETE - Clear changes
    if (req.method === 'DELETE' && action === 'clear') {
      const { error } = await supabase
        .from('dev_mode_changes')
        .delete()
        .eq('project_id', projectId);

      if (error) throw error;
      
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
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