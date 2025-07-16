import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, ExternalLink, Eye, Trash2, Calendar, User, Wand2, Copy, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  published_date: string;
  featured_image?: string;
  tags: string[];
}

interface PageMetadata {
  id: string;
  path: string;
  seo_title: string;
  seo_description: string;
  featured_image?: string;
}

// Social Media Template System
const EXCERPT_TEMPLATES = {
  'problem-solution': "Struggling with [specific UX problem]? Here's how I helped [client type] achieve [specific result] using AI-enhanced design. Read the full case study →",
  'insight-value': "After 15+ years in UX design, here's the #1 mistake I see [target audience] making with [topic]. Plus my proven framework to fix it.",
  'behind-scenes': "Inside look: How I used [specific AI tool/method] to [achieve result] for a [industry] client. The process might surprise you...",
  'ux-teardown': "I analyzed [company name]'s UX and found 5 critical issues costing them conversions. Here's what every [industry] business needs to know about [specific topic].",
  'design-process': "From wireframes to AI-powered prototypes: My step-by-step process for turning user research into revenue-generating designs. Real client example inside.",
  'industry-insight': "Why 90% of [industry] websites fail at [specific issue] - and the AI-enhanced solution that's changing everything. Case study included."
};

const PLATFORM_LIMITS = {
  facebook: { optimal: 125, max: 250 },
  linkedin: { optimal: 150, max: 300 },
  twitter: { optimal: 240, max: 280 }
};

const CTA_PHRASES = [
  "Read the full breakdown →",
  "See the before/after →",
  "Get the free template →",
  "Watch the process →",
  "View the case study →",
  "Download the guide →"
];

const MetaTagManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [pageMetadata, setPageMetadata] = useState<PageMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blog');

  // New blog post form
  const [newBlogPost, setNewBlogPost] = useState({
    title: '',
    slug: '',
    excerpt: '',
    author: 'Hiram Barsky',
    featured_image: '',
    tags: [] as string[],
    tagInput: '',
    selectedTemplate: '',
    targetPlatform: 'linkedin' as keyof typeof PLATFORM_LIMITS,
  });

  // New page form
  const [newPage, setNewPage] = useState({
    path: '',
    seo_title: '',
    seo_description: '',
    featured_image: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogResponse, pageResponse] = await Promise.all([
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('page_metadata').select('*').order('path')
      ]);

      if (blogResponse.data) setBlogPosts(blogResponse.data);
      if (pageResponse.data) setPageMetadata(pageResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load metadata",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async () => {
    if (!newBlogPost.title || !newBlogPost.slug || !newBlogPost.excerpt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          title: newBlogPost.title,
          slug: newBlogPost.slug,
          excerpt: newBlogPost.excerpt,
          author: newBlogPost.author,
          featured_image: newBlogPost.featured_image || null,
          tags: newBlogPost.tags,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully",
      });

      setNewBlogPost({
        title: '',
        slug: '',
        excerpt: '',
        author: 'Hiram Barsky',
        featured_image: '',
        tags: [],
        tagInput: '',
        selectedTemplate: '',
        targetPlatform: 'linkedin',
      });

      fetchData();
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
    }
  };

  const createPageMetadata = async () => {
    if (!newPage.path || !newPage.seo_title || !newPage.seo_description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('page_metadata')
        .insert([newPage]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page metadata created successfully",
      });

      setNewPage({
        path: '',
        seo_title: '',
        seo_description: '',
        featured_image: '',
      });

      fetchData();
    } catch (error) {
      console.error('Error creating page metadata:', error);
      toast({
        title: "Error",
        description: "Failed to create page metadata",
        variant: "destructive",
      });
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  const addTag = () => {
    if (newBlogPost.tagInput.trim() && !newBlogPost.tags.includes(newBlogPost.tagInput.trim())) {
      setNewBlogPost(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewBlogPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateExcerptFromTemplate = (templateKey: string) => {
    const template = EXCERPT_TEMPLATES[templateKey as keyof typeof EXCERPT_TEMPLATES];
    if (!template) return;

    // Pre-fill with Hiram's case study examples
    let filledTemplate = template;
    
    // Replace placeholders based on template type
    switch (templateKey) {
      case 'problem-solution':
        filledTemplate = template
          .replace('[specific UX problem]', 'fragmented co-parenting communication')
          .replace('[client type]', 'separated parents')
          .replace('[specific result]', '73% reduction in scheduling conflicts');
        break;
      case 'ux-teardown':
        filledTemplate = template
          .replace('[company name]', 'Splittime')
          .replace('[industry]', 'family tech')
          .replace('[specific topic]', 'co-parenting coordination');
        break;
      case 'design-process':
        filledTemplate = template;
        break;
      case 'industry-insight':
        filledTemplate = template
          .replace('[industry]', 'healthcare')
          .replace('[specific issue]', 'accessibility compliance');
        break;
      default:
        filledTemplate = template;
    }

    setNewBlogPost(prev => ({ ...prev, excerpt: filledTemplate }));
  };

  const getCharacterCount = (text: string) => {
    return {
      count: text.length,
      facebook: {
        status: text.length <= PLATFORM_LIMITS.facebook.optimal ? 'optimal' : text.length <= PLATFORM_LIMITS.facebook.max ? 'acceptable' : 'too-long',
        remaining: PLATFORM_LIMITS.facebook.optimal - text.length
      },
      linkedin: {
        status: text.length <= PLATFORM_LIMITS.linkedin.optimal ? 'optimal' : text.length <= PLATFORM_LIMITS.linkedin.max ? 'acceptable' : 'too-long',
        remaining: PLATFORM_LIMITS.linkedin.optimal - text.length
      },
      twitter: {
        status: text.length <= PLATFORM_LIMITS.twitter.optimal ? 'optimal' : text.length <= PLATFORM_LIMITS.twitter.max ? 'acceptable' : 'too-long',
        remaining: PLATFORM_LIMITS.twitter.optimal - text.length
      }
    };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Excerpt copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-lg text-gray-600">Loading metadata...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Meta Tag Manager
        </h1>
        <p className="text-lg text-gray-600">
          Manage dynamic SEO metadata for blog posts and pages
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="pages">Page Metadata</TabsTrigger>
          <TabsTrigger value="testing">SEO Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="space-y-6">
          {/* Create New Blog Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Blog Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Blog post title"
                  value={newBlogPost.title}
                  onChange={(e) => setNewBlogPost(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="URL slug (e.g., my-blog-post)"
                  value={newBlogPost.slug}
                  onChange={(e) => setNewBlogPost(prev => ({ ...prev, slug: e.target.value }))}
                />
              </div>
              
              {/* Template Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Excerpt Template</label>
                  <Select value={newBlogPost.selectedTemplate} onValueChange={(value) => setNewBlogPost(prev => ({ ...prev, selectedTemplate: value }))}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Choose template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="problem-solution">Problem/Solution</SelectItem>
                      <SelectItem value="insight-value">Insight/Value</SelectItem>
                      <SelectItem value="behind-scenes">Behind-the-Scenes</SelectItem>
                      <SelectItem value="ux-teardown">UX Teardown</SelectItem>
                      <SelectItem value="design-process">Design Process</SelectItem>
                      <SelectItem value="industry-insight">Industry Insight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newBlogPost.selectedTemplate && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Template Preview:</p>
                    <p className="text-sm italic">{EXCERPT_TEMPLATES[newBlogPost.selectedTemplate as keyof typeof EXCERPT_TEMPLATES]}</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => generateExcerptFromTemplate(newBlogPost.selectedTemplate)}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </div>
                )}
              </div>

              {/* Excerpt Input with Character Counter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Social Media Excerpt</label>
                  <div className="flex items-center gap-2">
                    <Select value={newBlogPost.targetPlatform} onValueChange={(value) => setNewBlogPost(prev => ({ ...prev, targetPlatform: value as keyof typeof PLATFORM_LIMITS }))}>
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(newBlogPost.excerpt)}
                      disabled={!newBlogPost.excerpt}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Textarea
                  placeholder="Craft your social media excerpt..."
                  value={newBlogPost.excerpt}
                  onChange={(e) => setNewBlogPost(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="min-h-20"
                />
                
                {/* Character Counter */}
                {newBlogPost.excerpt && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(getCharacterCount(newBlogPost.excerpt))
                        .filter(([key]) => key !== 'count')
                        .map(([platform, data]) => {
                          const platformData = data as { status: string; remaining: number };
                          return (
                            <div key={platform} className={`p-2 rounded text-center ${
                              platformData.status === 'optimal' ? 'bg-green-50 text-green-700' :
                              platformData.status === 'acceptable' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              <div className="font-medium capitalize">{platform}</div>
                              <div>{platformData.remaining >= 0 ? `${platformData.remaining} left` : `${Math.abs(platformData.remaining)} over`}</div>
                            </div>
                          );
                        })}
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      Total: {getCharacterCount(newBlogPost.excerpt).count} characters
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Suggestions */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Call-to-Action Suggestions</label>
                <div className="flex flex-wrap gap-1">
                  {CTA_PHRASES.map(cta => (
                    <Badge 
                      key={cta} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        const currentExcerpt = newBlogPost.excerpt;
                        const hasEndPunctuation = /[.!?→]$/.test(currentExcerpt.trim());
                        const separator = hasEndPunctuation ? ' ' : '. ';
                        setNewBlogPost(prev => ({ 
                          ...prev, 
                          excerpt: currentExcerpt + separator + cta 
                        }));
                      }}
                    >
                      {cta}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Author name"
                  value={newBlogPost.author}
                  onChange={(e) => setNewBlogPost(prev => ({ ...prev, author: e.target.value }))}
                />
                <Input
                  placeholder="Featured image URL"
                  value={newBlogPost.featured_image}
                  onChange={(e) => setNewBlogPost(prev => ({ ...prev, featured_image: e.target.value }))}
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag"
                    value={newBlogPost.tagInput}
                    onChange={(e) => setNewBlogPost(prev => ({ ...prev, tagInput: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="outline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newBlogPost.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <Button onClick={createBlogPost} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Create Blog Post
              </Button>
            </CardContent>
          </Card>

          {/* Existing Blog Posts */}
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map(post => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                    
                    {/* Character count display */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {post.excerpt.length} chars
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        post.excerpt.length <= 150 ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {post.excerpt.length <= 125 ? 'FB Optimal' : 
                         post.excerpt.length <= 150 ? 'LI Optimal' : 'Long'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <User className="h-4 w-4" />
                      {post.author}
                      <Calendar className="h-4 w-4 ml-2" />
                      {post.published_date}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(post.excerpt)}
                        title="Copy excerpt"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteBlogPost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-6">
          {/* Create New Page Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Page Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Page path (e.g., /about, /services)"
                value={newPage.path}
                onChange={(e) => setNewPage(prev => ({ ...prev, path: e.target.value }))}
              />
              <Input
                placeholder="SEO Title"
                value={newPage.seo_title}
                onChange={(e) => setNewPage(prev => ({ ...prev, seo_title: e.target.value }))}
              />
              <Textarea
                placeholder="SEO Description (160 characters max)"
                value={newPage.seo_description}
                onChange={(e) => setNewPage(prev => ({ ...prev, seo_description: e.target.value }))}
                maxLength={160}
              />
              <Input
                placeholder="Featured image URL (optional)"
                value={newPage.featured_image}
                onChange={(e) => setNewPage(prev => ({ ...prev, featured_image: e.target.value }))}
              />
              <Button onClick={createPageMetadata} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Create Page Metadata
              </Button>
            </CardContent>
          </Card>

          {/* Existing Page Metadata */}
          <div className="grid grid-cols-1 gap-4">
            {pageMetadata.map(page => (
              <Card key={page.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{page.path}</h3>
                      <p className="text-sm text-gray-600 mb-2">{page.seo_title}</p>
                      <p className="text-xs text-gray-500">{page.seo_description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(page.path, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle>SEO Testing Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 mb-4">
                Use these tools to test your dynamic meta tags:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open('/social-sharing-test', '_blank')}
                  className="justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Social Sharing Tester
                </Button>
                <Button
                  onClick={() => window.open('https://developers.facebook.com/tools/debug/', '_blank')}
                  variant="outline"
                  className="justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Facebook Debugger
                </Button>
                <Button
                  onClick={() => window.open('https://www.linkedin.com/post-inspector/', '_blank')}
                  variant="outline"
                  className="justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn Post Inspector
                </Button>
                <Button
                  onClick={() => window.open('https://cards-dev.twitter.com/validator', '_blank')}
                  variant="outline"
                  className="justify-start"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Twitter Card Validator
                </Button>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Testing Checklist:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>✅ Dynamic og:title for each page</li>
                  <li>✅ Dynamic og:description for each page</li>
                  <li>✅ Dynamic og:image with fallbacks</li>
                  <li>✅ Article type for blog posts</li>
                  <li>✅ Author and publish date for articles</li>
                  <li>✅ Twitter Card tags</li>
                  <li>✅ Schema.org structured data</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetaTagManager;
