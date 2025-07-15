import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Edit2, Save, X } from 'lucide-react';

interface MetaTag {
  id: string;
  path: string;
  seo_title: string;
  seo_description: string;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
}

const MetaTagManager = () => {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState({
    path: '',
    seo_title: '',
    seo_description: '',
    featured_image: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const fetchMetaTags = async () => {
    try {
      const { data, error } = await supabase
        .from('page_metadata')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMetaTags(data || []);
    } catch (error) {
      console.error('Error fetching meta tags:', error);
      toast({
        title: "Error",
        description: "Failed to fetch meta tags",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newTag.path || !newTag.seo_title || !newTag.seo_description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('page_metadata')
        .insert([{
          path: newTag.path,
          seo_title: newTag.seo_title,
          seo_description: newTag.seo_description,
          featured_image: newTag.featured_image || null
        }])
        .select()
        .single();

      if (error) throw error;

      setMetaTags([data, ...metaTags]);
      setNewTag({ path: '', seo_title: '', seo_description: '', featured_image: '' });
      toast({
        title: "Success",
        description: "Meta tag created successfully"
      });
    } catch (error) {
      console.error('Error creating meta tag:', error);
      toast({
        title: "Error",
        description: "Failed to create meta tag",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (id: string, updatedData: Partial<MetaTag>) => {
    try {
      const { error } = await supabase
        .from('page_metadata')
        .update(updatedData)
        .eq('id', id);

      if (error) throw error;

      setMetaTags(metaTags.map(tag => 
        tag.id === id ? { ...tag, ...updatedData } : tag
      ));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Meta tag updated successfully"
      });
    } catch (error) {
      console.error('Error updating meta tag:', error);
      toast({
        title: "Error",
        description: "Failed to update meta tag",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('page_metadata')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMetaTags(metaTags.filter(tag => tag.id !== id));
      toast({
        title: "Success",
        description: "Meta tag deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting meta tag:', error);
      toast({
        title: "Error",
        description: "Failed to delete meta tag",
        variant: "destructive"
      });
    }
  };

  const EditableField = ({ 
    tag, 
    field, 
    value, 
    onChange 
  }: { 
    tag: MetaTag; 
    field: string; 
    value: string; 
    onChange: (value: string) => void;
  }) => {
    if (editingId === tag.id) {
      return (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mb-2"
        />
      );
    }
    return <p className="text-sm text-gray-600 mb-2">{value}</p>;
  };

  if (loading) {
    return <div className="p-4">Loading meta tags...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Meta Tag Manager</h1>
      
      {/* Create new meta tag */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create New Meta Tag</CardTitle>
          <CardDescription>Add SEO metadata for a page</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="path">Path *</Label>
              <Input
                id="path"
                value={newTag.path}
                onChange={(e) => setNewTag({...newTag, path: e.target.value})}
                placeholder="/about"
              />
            </div>
            <div>
              <Label htmlFor="seo_title">SEO Title *</Label>
              <Input
                id="seo_title"
                value={newTag.seo_title}
                onChange={(e) => setNewTag({...newTag, seo_title: e.target.value})}
                placeholder="About Us - Company Name"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="seo_description">SEO Description *</Label>
              <Input
                id="seo_description"
                value={newTag.seo_description}
                onChange={(e) => setNewTag({...newTag, seo_description: e.target.value})}
                placeholder="Learn more about our company and mission..."
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                value={newTag.featured_image}
                onChange={(e) => setNewTag({...newTag, featured_image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <Button onClick={handleCreate} className="mt-4">
            Create Meta Tag
          </Button>
        </CardContent>
      </Card>

      {/* Existing meta tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metaTags.map((tag) => {
          const [editData, setEditData] = useState({
            path: tag.path,
            seo_title: tag.seo_title,
            seo_description: tag.seo_description,
            featured_image: tag.featured_image || ''
          });

          return (
            <Card key={tag.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tag.path}</CardTitle>
                  <div className="flex gap-2">
                    {editingId === tag.id ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            handleUpdate(tag.id, editData);
                          }}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(tag.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(tag.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <Label className="text-sm font-medium">SEO Title</Label>
                  <EditableField
                    tag={tag}
                    field="seo_title"
                    value={editingId === tag.id ? editData.seo_title : tag.seo_title}
                    onChange={(value) => setEditData({...editData, seo_title: value})}
                  />
                </div>
                <div className="mb-2">
                  <Label className="text-sm font-medium">SEO Description</Label>
                  <EditableField
                    tag={tag}
                    field="seo_description"
                    value={editingId === tag.id ? editData.seo_description : tag.seo_description}
                    onChange={(value) => setEditData({...editData, seo_description: value})}
                  />
                </div>
                {(tag.featured_image || editingId === tag.id) && (
                  <div className="mb-2">
                    <Label className="text-sm font-medium">Featured Image</Label>
                    <EditableField
                      tag={tag}
                      field="featured_image"
                      value={editingId === tag.id ? editData.featured_image : tag.featured_image || ''}
                      onChange={(value) => setEditData({...editData, featured_image: value})}
                    />
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  Created: {new Date(tag.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MetaTagManager;
