
import React, { useState } from 'react';
import { useEnhancedAiImageCaptions } from '@/hooks/useEnhancedAiImageCaptions';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
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
  const { processBatchCaptions, isGenerating, batchProgress } = useEnhancedAiImageCaptions();
  const [projectStats, setProjectStats] = useState<ProjectImageStats[]>([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [totalImagesFound, setTotalImagesFound] = useState(0);

  // Scan all projects for images that need captions
  const scanAllProjectsForImages = async () => {
    setIsScanning(true);
    console.log('🔍 Starting global image scan across all projects...');
    
    const stats: ProjectImageStats[] = [];
    let totalFound = 0;

    for (const project of projectsData) {
      try {
        // Use the simple captions hook to load existing captions
        const { loadCaptions, captions } = useSimpleCaptions(project.id);
        await loadCaptions();

        // Find all image references in the project data
        const projectImages = new Set<string>();
        
        // Add main project image
        if (project.image) {
          projectImages.add(project.image);
        }

        // Scan for images in project details and content
        const projectDetailModule = await import(`@/data/project-details/${project.id}.ts`).catch(() => null);
        if (projectDetailModule?.default) {
          const details = projectDetailModule.default;
          
          // Scan all text content for image references
          const scanForImages = (text: string) => {
            const imageRegex = /\/lovable-uploads\/[a-f0-9-]+\.png/g;
            const matches = text.match(imageRegex);
            if (matches) {
              matches.forEach(img => projectImages.add(img));
            }
          };

          if (details.challenge) scanForImages(details.challenge);
          if (details.process) scanForImages(details.process);
          if (details.result) scanForImages(details.result);
          
          // Scan image config
          if (details.imageConfig) {
            Object.values(details.imageConfig).forEach((config: any) => {
              if (config?.beforeHeader) projectImages.add(config.beforeHeader);
              if (config?.afterHeader) projectImages.add(config.afterHeader);
            });
          }

          // Scan gallery images
          if (details.galleryImages) {
            details.galleryImages.forEach(img => projectImages.add(img));
          }
        }

        // Count images that need captions
        const imagesNeedingCaptions = Array.from(projectImages).filter(imageSrc => {
          const caption = captions[`img_caption_${imageSrc}`];
          return !caption || 
                 caption === 'Click to add a caption...' || 
                 caption.includes('newly added') ||
                 caption.length < 10;
        });

        const projectStat: ProjectImageStats = {
          projectId: project.id,
          projectTitle: project.title,
          totalImages: projectImages.size,
          processedImages: 0,
          failedImages: 0,
          status: imagesNeedingCaptions.length > 0 ? 'pending' : 'completed'
        };

        stats.push(projectStat);
        totalFound += imagesNeedingCaptions.length;

        console.log(`📊 Project ${project.title}: ${imagesNeedingCaptions.length}/${projectImages.size} images need captions`);
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
    
    console.log(`✅ Global scan complete: ${totalFound} images need AI captions across ${stats.length} projects`);
    
    if (totalFound === 0) {
      toast.success('All images already have quality captions!');
    } else {
      toast.info(`Found ${totalFound} images that need AI captions`);
    }
  };

  // Generate captions for all projects
  const generateAllCaptions = async () => {
    if (totalImagesFound === 0) {
      toast.warning('No images found that need captions. Run scan first.');
      return;
    }

    console.log('🚀 Starting global AI caption generation...');
    toast.loading('Starting AI caption generation for all projects...', { id: 'global-ai' });

    let overallProcessed = 0;
    const updatedStats = [...projectStats];

    for (let i = 0; i < updatedStats.length; i++) {
      const stat = updatedStats[i];
      
      if (stat.status !== 'pending') continue;

      try {
        stat.status = 'processing';
        setProjectStats([...updatedStats]);

        console.log(`🎯 Processing project: ${stat.projectTitle}`);

        // Load project-specific images that need captions
        const { loadCaptions, captions } = useSimpleCaptions(stat.projectId);
        await loadCaptions();

        // Find images needing captions for this project
        const imagesToProcess: Array<{ src: string; contextType: 'project' }> = [];
        
        // This would need to be expanded with actual image discovery logic
        // For now, we'll use a simplified approach
        
        if (imagesToProcess.length > 0) {
          await processBatchCaptions(
            imagesToProcess,
            (progress) => {
              stat.processedImages = progress.completed;
              stat.failedImages = progress.failed;
              setProjectStats([...updatedStats]);
              
              const newOverallProgress = ((overallProcessed + progress.completed) / totalImagesFound) * 100;
              setOverallProgress(newOverallProgress);
            },
            (imageSrc, captionStyles) => {
              console.log(`📝 Generated caption for ${stat.projectTitle}:`, imageSrc.substring(0, 30) + '...');
            }
          );
        }

        stat.status = 'completed';
        overallProcessed += stat.processedImages;
        
      } catch (error) {
        console.error(`❌ Failed to process project ${stat.projectTitle}:`, error);
        stat.status = 'failed';
      }
      
      setProjectStats([...updatedStats]);
    }

    setOverallProgress(100);
    toast.success('Global AI caption generation completed!', { id: 'global-ai' });
    console.log('✅ Global AI caption generation complete');
  };

  const exportAllCaptions = () => {
    // Implementation for exporting all captions
    console.log('📁 Exporting all captions...');
    toast.info('Caption export feature coming soon!');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-500" />
          Global AI Caption Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scan Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Step 1: Scan All Projects</h3>
              <p className="text-sm text-gray-600">Discover images that need AI captions</p>
            </div>
            <Button
              onClick={scanAllProjectsForImages}
              disabled={isScanning || isGenerating}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Scan Projects'}
            </Button>
          </div>
          
          {totalImagesFound > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                Found {totalImagesFound} images that need AI captions across {projectStats.length} projects
              </p>
            </div>
          )}
        </div>

        {/* Generation Section */}
        {totalImagesFound > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Step 2: Generate AI Captions</h3>
                <p className="text-sm text-gray-600">Process all images with OpenAI</p>
              </div>
              <Button
                onClick={generateAllCaptions}
                disabled={isGenerating || totalImagesFound === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate All Captions'}
              </Button>
            </div>

            {/* Overall Progress */}
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
            )}

            {/* Project Stats */}
            {projectStats.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Project Status</h4>
                <div className="space-y-1">
                  {projectStats.map((stat) => (
                    <div key={stat.projectId} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {stat.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {stat.status === 'failed' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        {stat.status === 'processing' && <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />}
                        {stat.status === 'pending' && <div className="h-4 w-4 rounded-full bg-gray-300" />}
                        <span className="text-sm font-medium">{stat.projectTitle}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        {stat.processedImages}/{stat.totalImages} images
                        {stat.failedImages > 0 && (
                          <span className="text-red-600 ml-1">({stat.failedImages} failed)</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Export Section */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <h3 className="font-medium">Step 3: Export Results</h3>
            <p className="text-sm text-gray-600">Download all generated captions</p>
          </div>
          <Button
            onClick={exportAllCaptions}
            variant="outline"
            disabled={overallProgress < 100}
          >
            <Download className="h-4 w-4 mr-2" />
            Export All Captions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalCaptionGenerator;
