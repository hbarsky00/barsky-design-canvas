-- Fix the calculate_lead_priority_score function with proper security settings
CREATE OR REPLACE FUNCTION public.calculate_lead_priority_score()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;