
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle, Globe, Share2 } from 'lucide-react';
import { useProjectPersistence } from '@/hooks/useProjectPersistence';

interface ProjectPublisherProps {
  projectId: string;
  projectTitle: string;
}

const ProjectPublisher: React.FC<ProjectPublisherProps> = ({ projectId, projectTitle }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishUrl, setPublishUrl] = useState('');
  const [customSlug, setCustomSlug] = useState(projectId);
  const { getProjectData } = useProjectPersistence(projectId);

  const handlePublish = async () => {
    setIsPublishing(true);
    toast.loading('Publishing project...', { id: 'publish' });

    try {
      // Get all project data including captions and content
      const projectData = getProjectData();
      
      // Simulate publishing process (replace with actual publishing logic)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const publishedUrl = `https://barskydesign.pro/projects/${customSlug}`;
      setPublishUrl(publishedUrl);
      setIsPublished(true);
      
      toast.success('Project published successfully!', { id: 'publish' });
      
      console.log('📤 Published project data:', {
        projectId,
        slug: customSlug,
        data: projectData
      });
      
    } catch (error) {
      console.error('❌ Error publishing project:', error);
      toast.error('Failed to publish project', { id: 'publish' });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(publishUrl);
    toast.success('URL copied to clipboard!');
  };

  if (isPublished) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-800">Project Published!</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Your project is now live and accessible to everyone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="published-url">Published URL</Label>
            <div className="flex space-x-2">
              <Input
                id="published-url"
                value={publishUrl}
                readOnly
                className="bg-white"
              />
              <Button onClick={handleCopyUrl} variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => window.open(publishUrl, '_blank')} 
            className="w-full"
          >
            <Globe className="h-4 w-4 mr-2" />
            View Published Project
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish Project</CardTitle>
        <CardDescription>
          Make your project public and share it with the world.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="project-slug">Project URL Slug</Label>
          <Input
            id="project-slug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="my-awesome-project"
          />
          <p className="text-sm text-gray-600 mt-1">
            Your project will be available at: https://barskydesign.pro/projects/{customSlug}
          </p>
        </div>
        
        <Button 
          onClick={handlePublish} 
          disabled={isPublishing || !customSlug.trim()}
          className="w-full"
        >
          {isPublishing ? 'Publishing...' : 'Publish Project'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectPublisher;
