-- Create leads table for capturing potential clients
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  budget_range TEXT,
  project_description TEXT,
  phone TEXT,
  website TEXT,
  lead_source TEXT DEFAULT 'website',
  lead_status TEXT DEFAULT 'new' CHECK (lead_status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost')),
  priority_score INTEGER DEFAULT 0,
  notes TEXT,
  contacted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lead interactions table for tracking communications
CREATE TABLE public.lead_interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL CHECK (interaction_type IN ('email', 'call', 'meeting', 'proposal', 'note')),
  subject TEXT,
  content TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is lead capture)
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view all leads" 
ON public.leads 
FOR SELECT 
USING (true);

CREATE POLICY "Public can update leads" 
ON public.leads 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can view lead interactions" 
ON public.lead_interactions 
FOR SELECT 
USING (true);

CREATE POLICY "Public can create lead interactions" 
ON public.lead_interactions 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to calculate lead priority score
CREATE OR REPLACE FUNCTION public.calculate_lead_priority_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.priority_score := 0;
  
  -- Budget range scoring
  CASE NEW.budget_range
    WHEN '$50k+' THEN NEW.priority_score := NEW.priority_score + 50;
    WHEN '$20k-$50k' THEN NEW.priority_score := NEW.priority_score + 30;
    WHEN '$10k-$20k' THEN NEW.priority_score := NEW.priority_score + 20;
    WHEN '$5k-$10k' THEN NEW.priority_score := NEW.priority_score + 10;
    ELSE NEW.priority_score := NEW.priority_score + 5;
  END CASE;
  
  -- Project type scoring
  CASE NEW.project_type
    WHEN 'Full Product Design' THEN NEW.priority_score := NEW.priority_score + 30;
    WHEN 'AI Integration' THEN NEW.priority_score := NEW.priority_score + 25;
    WHEN 'UX Research' THEN NEW.priority_score := NEW.priority_score + 20;
    WHEN 'UI Design' THEN NEW.priority_score := NEW.priority_score + 15;
    ELSE NEW.priority_score := NEW.priority_score + 10;
  END CASE;
  
  -- Company presence scoring
  IF NEW.website IS NOT NULL AND NEW.website != '' THEN
    NEW.priority_score := NEW.priority_score + 10;
  END IF;
  
  IF NEW.company IS NOT NULL AND NEW.company != '' THEN
    NEW.priority_score := NEW.priority_score + 10;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for priority scoring
CREATE TRIGGER calculate_lead_priority
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_lead_priority_score();