import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, ExternalLink, Eye, Trash2, Calendar, User } from 'lucide-react';
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
              
              <Textarea
                placeholder="Brief excerpt (150 characters max)"
                value={newBlogPost.excerpt}
                onChange={(e) => setNewBlogPost(prev => ({ ...prev, excerpt: e.target.value }))}
                maxLength={150}
              />
              
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
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
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
