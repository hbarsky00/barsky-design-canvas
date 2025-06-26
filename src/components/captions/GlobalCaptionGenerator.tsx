
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Download, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { projectsData } from '@/data/projects/projectsList';

interface ProjectImageStats {
  projectId: string;
  projectTitle: string;
  totalImages: number;
  processedImages: number;
  failedImages: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

const GlobalCaptionGenerator: React.FC = () => {
  const [projectStats, setProjectStats] = useState<ProjectImageStats[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [totalImagesFound, setTotalImagesFound] = useState(0);

  const scanAllProjectsForImages = async () => {
    setIsScanning(true);
    console.log('🔍 Starting global image scan across all projects...');
    
    const stats: ProjectImageStats[] = [];
    let totalFound = 0;

    for (const project of projectsData) {
      try {
        const projectImages = new Set<string>();
        
        if (project.image) {
          projectImages.add(project.image);
        }

        const projectStat: ProjectImageStats = {
          projectId: project.id,
          projectTitle: project.title,
          totalImages: projectImages.size,
          processedImages: 0,
          failedImages: 0,
          status: 'completed'
        };

        stats.push(projectStat);
        console.log(`📊 Project ${project.title}: ${projectImages.size} images found`);
      } catch (error) {
        console.error(`❌ Error scanning project ${project.title}:`, error);
        stats.push({
          projectId: project.id,
          projectTitle: project.title,
          totalImages: 0,
          processedImages: 0,
          failedImages: 0,
          status: 'failed'
        });
      }
    }

    setProjectStats(stats);
    setTotalImagesFound(totalFound);
    setIsScanning(false);
    
    console.log(`✅ Global scan complete: ${totalFound} images found across ${stats.length} projects`);
    toast.info(`Found ${totalFound} images across ${stats.length} projects`);
  };

  const exportAllCaptions = () => {
    console.log('📁 Exporting all captions...');
    toast.info('Caption export feature coming soon!');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          Global Caption Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Scan All Projects</h3>
              <p className="text-sm text-gray-600">Discover images in all projects</p>
            </div>
            <Button
              onClick={scanAllProjectsForImages}
              disabled={isScanning}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Scan Projects'}
            </Button>
          </div>
          
          {projectStats.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Project Status</h4>
              <div className="space-y-1">
                {projectStats.map((stat) => (
                  <div key={stat.projectId} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{stat.projectTitle}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {stat.totalImages} images
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <h3 className="font-medium">Export Results</h3>
            <p className="text-sm text-gray-600">Download project information</p>
          </div>
          <Button
            onClick={exportAllCaptions}
            variant="outline"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Project Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalCaptionGenerator;
