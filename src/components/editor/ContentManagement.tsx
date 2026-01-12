import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SimpleTextEditor } from './SimpleTextEditor';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface ContentItem {
  id: string;
  content_key: string;
  content_html: string;
  page_path: string;
  section_name: string;
  updated_at: string;
  last_edited_by: string | null;
}

export const ContentManagement: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [editContent, setEditContent] = useState('');
  const { toast } = useToast();

  // Load content (public read is still allowed)
  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('editable_content')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error: any) {
      console.error('Error loading content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Delete via secure edge function
  const handleDelete = async (id: string, contentKey: string) => {
    if (!confirm(`Are you sure you want to delete "${contentKey}"?`)) return;

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/manage-content?action=delete&id=${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete content');
      }

      setContent(content.filter(item => item.id !== id));
      toast({
        title: "Content deleted",
        description: "Content has been permanently deleted",
      });
    } catch (error: any) {
      console.error('Error deleting content:', error);
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setEditContent(item.content_html);
  };

  // Save via secure edge function
  const handleSave = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/manage-content?action=update&id=${encodeURIComponent(editingItem.id)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY
          },
          body: JSON.stringify({
            content_html: editContent
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save content');
      }

      // Update local state
      setContent(content.map(item => 
        item.id === editingItem.id 
          ? { ...item, content_html: editContent, updated_at: new Date().toISOString() }
          : item
      ));

      setEditingItem(null);
      setEditContent('');

      toast({
        title: "Content updated",
        description: "Content has been saved successfully",
      });
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      });
    }
  };

  const filteredContent = content.filter(item =>
    item.content_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.page_path || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.section_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2 mb-4" />
              <div className="h-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredContent.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{item.content_key}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{item.page_path || 'No path'}</Badge>
                    <Badge variant="outline">{item.section_name || 'No section'}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog open={editingItem?.id === item.id} onOpenChange={(open) => !open && setEditingItem(null)}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Edit: {item.content_key}</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 overflow-hidden">
                        <SimpleTextEditor
                          content={editContent}
                          onChange={setEditContent}
                          placeholder="Edit content..."
                          className="h-full"
                          height={400}
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setEditingItem(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSave}>
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id, item.content_key)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: item.content_html }}
              />
              <div className="text-xs text-muted-foreground mt-4">
                Last updated: {new Date(item.updated_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content found matching your search.</p>
        </div>
      )}
    </div>
  );
};