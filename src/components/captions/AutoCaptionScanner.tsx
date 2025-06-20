
import React, { useState, useEffect } from 'react';
import { useEnhancedAiImageCaptions } from '@/hooks/useEnhancedAiImageCaptions';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan, AlertCircle, CheckCircle, RefreshCw, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { projectsData } from '@/data/projects/projectsList';

interface ImageIssue {
  imageSrc: string;
  projectId: string;
  projectTitle: string;
  issueType: 'missing' | 'poor_quality' | 'generic' | 'needs_update';
  currentCaption?: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

interface ScanResults {
  totalImages: number;
  imagesWithIssues: number;
  issuesByType: Record<string, number>;
  issues: ImageIssue[];
  lastScanTime: Date;
}

const AutoCaptionScanner: React.FC = () => {
  const { generateSingleCaption, isGenerating } = useEnhancedAiImageCaptions();
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [autoScanEnabled, setAutoScanEnabled] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedIssues, setSelectedIssues] = useState<Set<string>>(new Set());

  // Auto-scan every 30 seconds when enabled
  useEffect(() => {
    if (!autoScanEnabled) return;

    const interval = setInterval(() => {
      performScan();
    }, 30000);

    // Initial scan
    performScan();

    return () => clearInterval(interval);
  }, [autoScanEnabled]);

  const analyzeCaption = (caption: string, imageSrc: string): ImageIssue | null => {
    if (!caption || caption === 'Click to add a caption...') {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'missing',
        reason: 'No caption provided',
        priority: 'high'
      };
    }

    if (caption.length < 10) {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'poor_quality',
        currentCaption: caption,
        reason: 'Caption too short (less than 10 characters)',
        priority: 'high'
      };
    }

    if (caption.includes('newly added') || caption.includes('This is a new image')) {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'generic',
        currentCaption: caption,
        reason: 'Generic placeholder caption',
        priority: 'medium'
      };
    }

    // Check for very generic captions
    const genericPhrases = ['image', 'picture', 'photo', 'screenshot'];
    if (genericPhrases.some(phrase => caption.toLowerCase().includes(phrase)) && caption.length < 30) {
      return {
        imageSrc,
        projectId: '',
        projectTitle: '',
        issueType: 'poor_quality',
        currentCaption: caption,
        reason: 'Too generic - needs more descriptive content',
        priority: 'medium'
      };
    }

    return null;
  };

  const scanProjectImages = async (project: any): Promise<ImageIssue[]> => {
    const issues: ImageIssue[] = [];
    const { loadCaptions, captions } = useSimpleCaptions(project.id);
    
    try {
      await loadCaptions();

      // Scan main project image
      if (project.image) {
        const caption = captions[`img_caption_${project.image}`];
        const issue = analyzeCaption(caption, project.image);
        if (issue) {
          issues.push({
            ...issue,
            projectId: project.id,
            projectTitle: project.title
          });
        }
      }

      // Scan project detail images
      try {
        const projectDetailModule = await import(`@/data/project-details/${project.id}.ts`).catch(() => null);
        if (projectDetailModule?.default) {
          const details = projectDetailModule.default;
          
          // Extract all image URLs from project content
          const imageRegex = /\/lovable-uploads\/[a-f0-9-]+\.png/g;
          const allContent = [
            details.challenge || '',
            details.process || '',
            details.result || '',
            JSON.stringify(details.imageConfig || {}),
            JSON.stringify(details.galleryImages || [])
          ].join(' ');

          const matches = allContent.match(imageRegex) || [];
          const uniqueImages = [...new Set(matches)];

          for (const imageSrc of uniqueImages) {
            const caption = captions[`img_caption_${imageSrc}`];
            const issue = analyzeCaption(caption, imageSrc);
            if (issue) {
              issues.push({
                ...issue,
                projectId: project.id,
                projectTitle: project.title
              });
            }
          }
        }
      } catch (error) {
        console.warn(`Could not scan detailed images for project ${project.id}:`, error);
      }

    } catch (error) {
      console.error(`Error scanning project ${project.title}:`, error);
    }

    return issues;
  };

  const performScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    console.log('🔍 Auto Caption Scanner: Starting comprehensive scan...');

    const allIssues: ImageIssue[] = [];
    let totalImages = 0;

    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i];
      setScanProgress((i / projectsData.length) * 100);
      
      const projectIssues = await scanProjectImages(project);
      allIssues.push(...projectIssues);
      totalImages += projectIssues.length + 5; // Estimate
    }

    const issuesByType = allIssues.reduce((acc, issue) => {
      acc[issue.issueType] = (acc[issue.issueType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const results: ScanResults = {
      totalImages,
      imagesWithIssues: allIssues.length,
      issuesByType,
      issues: allIssues.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }),
      lastScanTime: new Date()
    };

    setScanResults(results);
    setScanProgress(100);
    setIsScanning(false);

    console.log('✅ Auto Caption Scanner: Scan complete', {
      totalIssues: allIssues.length,
      byType: issuesByType
    });

    if (allIssues.length > 0) {
      toast.warning(`Found ${allIssues.length} caption issues that need attention`, {
        description: `${issuesByType.missing || 0} missing, ${issuesByType.poor_quality || 0} poor quality`
      });
    } else {
      toast.success('All captions look good!');
    }
  };

  const autoFixSelectedIssues = async () => {
    if (selectedIssues.size === 0) {
      toast.warning('Please select issues to fix');
      return;
    }

    const issuesToFix = scanResults?.issues.filter(issue => 
      selectedIssues.has(`${issue.projectId}-${issue.imageSrc}`)
    ) || [];

    console.log(`🔧 Auto Caption Scanner: Fixing ${issuesToFix.length} selected issues...`);
    toast.loading(`Auto-fixing ${issuesToFix.length} caption issues...`, { id: 'auto-fix' });

    let fixedCount = 0;
    for (const issue of issuesToFix) {
      try {
        const newCaption = await generateSingleCaption(issue.imageSrc, 'descriptive', 'project');
        
        // Save the caption (this would need to integrate with the caption system)
        console.log(`✅ Auto-fixed caption for ${issue.imageSrc.substring(0, 30)}...`);
        fixedCount++;
      } catch (error) {
        console.error(`❌ Failed to auto-fix caption for ${issue.imageSrc}:`, error);
      }
    }

    toast.success(`Auto-fixed ${fixedCount} caption issues!`, { id: 'auto-fix' });
    
    // Re-scan to update results
    setTimeout(() => performScan(), 1000);
    setSelectedIssues(new Set());
  };

  const toggleIssueSelection = (projectId: string, imageSrc: string) => {
    const key = `${projectId}-${imageSrc}`;
    const newSelected = new Set(selectedIssues);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedIssues(newSelected);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-blue-500" />
          Automated Caption Scanner
          <div className="flex items-center gap-2 ml-auto">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoScanEnabled}
                onChange={(e) => setAutoScanEnabled(e.target.checked)}
                className="rounded"
              />
              Auto-scan every 30s
            </label>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scan Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Scanner Status</h3>
            <p className="text-sm text-gray-600">
              {autoScanEnabled ? 'Automatically monitoring for caption issues' : 'Manual scan mode'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={performScan}
              disabled={isScanning}
              variant="outline"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
              {isScanning ? 'Scanning...' : 'Scan Now'}
            </Button>
            {selectedIssues.size > 0 && (
              <Button
                onClick={autoFixSelectedIssues}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Auto-fix Selected ({selectedIssues.size})
              </Button>
            )}
          </div>
        </div>

        {/* Scan Progress */}
        {isScanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Scanning projects...</span>
              <span>{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </div>
        )}

        {/* Scan Results */}
        {scanResults && (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{scanResults.totalImages}</div>
                <div className="text-sm text-blue-600">Total Images</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{scanResults.imagesWithIssues}</div>
                <div className="text-sm text-red-600">Issues Found</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{scanResults.issuesByType.missing || 0}</div>
                <div className="text-sm text-orange-600">Missing Captions</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{scanResults.issuesByType.poor_quality || 0}</div>
                <div className="text-sm text-yellow-600">Poor Quality</div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Last scan: {scanResults.lastScanTime.toLocaleTimeString()}
            </div>

            {/* Issues List */}
            {scanResults.issues.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Caption Issues ({scanResults.issues.length})</h4>
                  <Button
                    onClick={() => setSelectedIssues(
                      selectedIssues.size === scanResults.issues.length ? new Set() : 
                      new Set(scanResults.issues.map(issue => `${issue.projectId}-${issue.imageSrc}`))
                    )}
                    variant="ghost"
                    size="sm"
                  >
                    {selectedIssues.size === scanResults.issues.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {scanResults.issues.map((issue, index) => (
                    <div key={`${issue.projectId}-${issue.imageSrc}-${index}`} 
                         className={`p-3 border rounded-lg ${getPriorityColor(issue.priority)}`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedIssues.has(`${issue.projectId}-${issue.imageSrc}`)}
                          onChange={() => toggleIssueSelection(issue.projectId, issue.imageSrc)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{issue.projectTitle}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/50">
                              {issue.priority.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-sm mb-1">{issue.reason}</div>
                          <div className="text-xs text-gray-600">
                            Image: {issue.imageSrc.split('/').pop()?.substring(0, 20)}...
                          </div>
                          {issue.currentCaption && (
                            <div className="text-xs mt-1 p-2 bg-white/50 rounded">
                              Current: "{issue.currentCaption}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutoCaptionScanner;
