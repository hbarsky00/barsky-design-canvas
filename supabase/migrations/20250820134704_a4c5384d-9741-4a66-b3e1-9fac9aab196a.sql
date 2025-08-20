-- Create editable_content table for site-wide content management
CREATE TABLE public.editable_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key TEXT NOT NULL UNIQUE,
  content_html TEXT NOT NULL DEFAULT '',
  content_json JSONB NOT NULL DEFAULT '{}',
  page_path TEXT NOT NULL DEFAULT '/',
  section_name TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  last_edited_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.editable_content ENABLE ROW LEVEL SECURITY;

-- Create policies for editable content
CREATE POLICY "Anyone can read editable content" 
ON public.editable_content 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can create editable content" 
ON public.editable_content 
FOR INSERT 
WITH CHECK (is_admin());

CREATE POLICY "Admins can update editable content" 
ON public.editable_content 
FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

CREATE POLICY "Admins can delete editable content" 
ON public.editable_content 
FOR DELETE 
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_editable_content_updated_at
BEFORE UPDATE ON public.editable_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_editable_content_key ON public.editable_content(content_key);
CREATE INDEX idx_editable_content_page_path ON public.editable_content(page_path);

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.editable_content;