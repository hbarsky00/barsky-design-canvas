
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';

interface DatabaseEntry {
  id: string;
  project_id: string;
  change_type: string;
  change_key: string;
  change_value: any;
  created_at: string;
  updated_at: string;
}

const DatabaseViewer: React.FC = () => {
  const [entries, setEntries] = useState<DatabaseEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [showValues, setShowValues] = useState(false);

  const fetchDatabaseEntries = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching database entries...');
      
      let query = supabase
        .from('dev_mode_changes')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('change_type', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching database entries:', error);
        return;
      }

      console.log('✅ Database entries fetched:', data?.length || 0);
      setEntries(data || []);
    } catch (error) {
      console.error('❌ Error in fetchDatabaseEntries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseEntries();
  }, [filter]);

  const getFilterCounts = () => {
    const counts = entries.reduce((acc, entry) => {
      acc[entry.change_type] = (acc[entry.change_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: entries.length,
      text: counts['text'] || 0,
      image: counts['image'] || 0,
      image_caption: counts['image_caption'] || 0,
      content_block: counts['content_block'] || 0
    };
  };

  const counts = getFilterCounts();

  const formatValue = (value: any, type: string) => {
    if (!showValues) return '***hidden***';
    
    if (typeof value === 'string') {
      if (type === 'image_caption') {
        return value.length > 100 ? value.substring(0, 100) + '...' : value;
      }
      if (type === 'image') {
        return value.includes('lovable-uploads') ? 'Image URL: ' + value.split('/').pop() : value;
      }
      if (type === 'text') {
        return value.length > 50 ? value.substring(0, 50) + '...' : value;
      }
    }
    
    return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'image_caption': return 'bg-purple-100 text-purple-800';
      case 'content_block': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Database Viewer - dev_mode_changes
              <Button
                onClick={fetchDatabaseEntries}
                disabled={loading}
                size="sm"
                variant="outline"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </CardTitle>
            <Button
              onClick={() => setShowValues(!showValues)}
              size="sm"
              variant="outline"
            >
              {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showValues ? 'Hide Values' : 'Show Values'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
              >
                All ({counts.total})
              </Button>
              <Button
                onClick={() => setFilter('text')}
                variant={filter === 'text' ? 'default' : 'outline'}
                size="sm"
              >
                Text ({counts.text})
              </Button>
              <Button
                onClick={() => setFilter('image')}
                variant={filter === 'image' ? 'default' : 'outline'}
                size="sm"
              >
                Images ({counts.image})
              </Button>
              <Button
                onClick={() => setFilter('image_caption')}
                variant={filter === 'image_caption' ? 'default' : 'outline'}
                size="sm"
              >
                Captions ({counts.image_caption})
              </Button>
              <Button
                onClick={() => setFilter('content_block')}
                variant={filter === 'content_block' ? 'default' : 'outline'}
                size="sm"
              >
                Content ({counts.content_block})
              </Button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
              Loading database entries...
            </div>
          )}

          {!loading && entries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No entries found in the database.
            </div>
          )}

          {!loading && entries.length > 0 && (
            <div className="space-y-3">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(entry.change_type)}>
                        {entry.change_type}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Project: {entry.project_id}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(entry.created_at).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">Key:</span> {entry.change_key}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Value:</span>
                      <div className="mt-1 p-2 bg-gray-50 rounded text-xs font-mono max-h-32 overflow-y-auto">
                        {formatValue(entry.change_value, entry.change_type)}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseViewer;
