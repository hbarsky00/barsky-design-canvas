-- Create table for storing project content with text editor data
CREATE TABLE IF NOT EXISTS public.project_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, content_key)
);

-- Enable Row Level Security
ALTER TABLE public.project_content ENABLE ROW LEVEL SECURITY;

-- Create policies for project content access
CREATE POLICY "Anyone can view project content" 
ON public.project_content 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert project content" 
ON public.project_content 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update project content" 
ON public.project_content 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete project content" 
ON public.project_content 
FOR DELETE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_content_updated_at
BEFORE UPDATE ON public.project_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();