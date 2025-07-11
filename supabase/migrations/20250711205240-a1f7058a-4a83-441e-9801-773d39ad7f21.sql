-- Create blog_posts table for dynamic SEO
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT,
  author TEXT NOT NULL DEFAULT 'Hiram Barsky',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_metadata table for dynamic page SEO
CREATE TABLE public.page_metadata (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL UNIQUE,
  seo_title TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  featured_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can read blog posts" 
ON public.blog_posts 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can read page metadata" 
ON public.page_metadata 
FOR SELECT 
USING (true);

-- Insert default page metadata
INSERT INTO public.page_metadata (path, seo_title, seo_description) VALUES 
('/services', 'Design Services - AI-Enhanced Product Design', 'Expert product design services specializing in Gen AI integration, UX research, UI design, and user-centered solutions that drive business growth and user satisfaction.'),
('/contact', 'Contact - Get Your Free UX Audit', 'Ready to transform your digital product? Contact Hiram Barsky for expert product design consultation and get a free UX audit to identify improvement opportunities.'),
('/store', 'Design Resources & Templates', 'Professional design resources, UX templates, and digital products to accelerate your design process and create better user experiences.'),
('/free-audit', 'Free UX Audit - Identify Design Opportunities', 'Get a comprehensive free UX audit of your digital product. Receive actionable insights and recommendations to improve user experience and drive business results.');

-- Create triggers for updating timestamps
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_metadata_updated_at
BEFORE UPDATE ON public.page_metadata
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();