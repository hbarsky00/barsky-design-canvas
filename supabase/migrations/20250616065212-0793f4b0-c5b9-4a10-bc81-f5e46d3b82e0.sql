
-- Create a table to store dev mode changes
CREATE TABLE public.dev_mode_changes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  change_type TEXT NOT NULL, -- 'text', 'image', 'content_block'
  change_key TEXT NOT NULL,
  change_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, change_type, change_key)
);

-- Create index for faster queries
CREATE INDEX idx_dev_mode_changes_project_type ON public.dev_mode_changes(project_id, change_type);

-- Enable RLS (Row Level Security)
ALTER TABLE public.dev_mode_changes ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (since this is dev mode data)
CREATE POLICY "Allow all operations on dev_mode_changes" 
  ON public.dev_mode_changes 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
