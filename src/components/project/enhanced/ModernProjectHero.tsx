import React from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProjectProps } from "@/components/ProjectCard";
import { ProjectDetails } from "@/data/types/project";
import { Badge } from "@/components/ui/badge";
import MaximizableImage from "../MaximizableImage";
import EditableText from "@/components/dev/EditableText";
import EditImageButton from "@/components/dev/EditImageButton";
import AddContentButton from "@/components/dev/AddContentButton";
import DraggableContentBlock, { ContentBlock } from "@/components/dev/DraggableContentBlock";
import { useDevMode } from "@/context/DevModeContext";
import { useProjectDataUpdater } from "@/hooks/useProjectDataUpdater";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
import SaveIndicator from "@/components/dev/SaveIndicator";

interface ModernProjectHeroProps {
  project: ProjectProps;
  details: ProjectDetails;
  imageCaptions: Record<string, string>;
  projectId?: string;
}

const ModernProjectHero: React.FC<ModernProjectHeroProps> = ({
  project,
  details,
  imageCaptions,
  projectId
}) => {
  const { isDevMode } = useDevMode();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  const { updateImageInProjectData } = useProjectDataUpdater();
  const { 
    saveImageReplacement, 
    saveContentBlocks, 
    getProjectData, 
    isSaving, 
    lastSaved 
  } = useProjectPersistence(currentProjectId);
  
  // Load saved data on mount and when project data updates
  const [heroImage, setHeroImage] = React.useState(() => {
    const savedData = getProjectData();
    return savedData.imageReplacements[project.image] || project.image;
  });
  
  const [contentBlocks, setContentBlocks] = React.useState<ContentBlock[]>(() => {
    const savedData = getProjectData();
    return savedData.contentBlocks['hero'] || [];
  });

  // Listen for project data updates to reload published changes
  React.useEffect(() => {
    const handleProjectDataUpdate = () => {
      console.log('ModernProjectHero: Project data updated, reloading');
      const savedData = getProjectData();
      setHeroImage(savedData.imageReplacements[project.image] || project.image);
      setContentBlocks(savedData.contentBlocks['hero'] || []);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [project.image, getProjectData]);

  const handleImageReplace = (newSrc: string) => {
    console.log('ModernProjectHero: Replacing image with', newSrc, 'for project', currentProjectId);
    setHeroImage(newSrc);
    
    // Save the replacement persistently
    saveImageReplacement(project.image, newSrc);
    
    if (currentProjectId) {
      updateImageInProjectData(currentProjectId, project.image, newSrc);
    }
  };

  const createNewBlock = (type: 'text' | 'image' | 'header' | 'video' | 'pdf'): ContentBlock => {
    switch (type) {
      case 'text':
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
      case 'image':
        return { type: 'image', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added image.' };
      case 'header':
        return { type: 'header', value: 'New Header', level: 2 };
      case 'video':
        return { type: 'video', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added video.' };
      case 'pdf':
        return { type: 'pdf', src: '/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png', caption: 'A newly added PDF document.' };
      default:
        return { type: 'text', value: 'This is a new paragraph. Click to edit me.' };
    }
  };

  const handleAddContent = (type: 'text' | 'image' | 'header' | 'video' | 'pdf') => {
    const newBlock = createNewBlock(type);
    const updatedBlocks = [...contentBlocks, newBlock];
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks('hero', updatedBlocks);
  };

  const handleUpdateContent = (index: number, newValue: string) => {
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && (block.type === 'text' || block.type === 'header') 
        ? { ...block, value: newValue }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks('hero', updatedBlocks);
  };

  const handleDeleteContent = (index: number) => {
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks('hero', updatedBlocks);
  };

  const handleContentImageReplace = (index: number, newSrc: string) => {
    console.log('ModernProjectHero: Replacing content image at index', index, 'with', newSrc, 'for project', currentProjectId);
    
    const oldBlock = contentBlocks[index];
    const updatedBlocks = contentBlocks.map((block, i) => 
      i === index && block.type === 'image'
        ? { ...block, src: newSrc }
        : block
    );
    setContentBlocks(updatedBlocks);
    
    // Save content blocks persistently
    saveContentBlocks('hero', updatedBlocks);
    
    if (currentProjectId && oldBlock && oldBlock.type === 'image' && oldBlock.src) {
      saveImageReplacement(oldBlock.src, newSrc);
      updateImageInProjectData(currentProjectId, oldBlock.src, newSrc);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex) return;

    const newBlocks = [...contentBlocks];
    const draggedBlock = newBlocks[dragIndex];
    
    newBlocks.splice(dragIndex, 1);
    const insertIndex = dragIndex < dropIndex ? dropIndex - 1 : dropIndex;
    newBlocks.splice(insertIndex, 0, draggedBlock);
    
    setContentBlocks(newBlocks);
    
    // Save reordered content blocks persistently
    saveContentBlocks('hero', newBlocks);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Save Indicator */}
      {isDevMode && <SaveIndicator isSaving={isSaving} lastSaved={lastSaved} />}
      
      {/* Layered Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-indigo-50/20" />
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-20" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl gentle-float opacity-30" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-4xl mx-auto px-6 py-16 z-10">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/projects" 
            className="glass-button inline-flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header - Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card-elevated p-8 text-center space-y-6 layered-depth mb-12 relative group"
        >
          {isDevMode && <AddContentButton onAdd={handleAddContent} />}
          
          {/* Project Meta */}
          <div className="flex items-center justify-center space-x-3 text-sm">
            <span className="font-medium text-blue-600 glass-button px-3 py-1 rounded-full">{details.client}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{details.duration}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{details.role}</span>
          </div>
          
          {/* Project Title */}
          <EditableText 
            initialText={project.title}
            textKey={`hero_title_${currentProjectId}`}
          >
            {(text) => (
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight text-center">
                {text}
              </h1>
            )}
          </EditableText>
          
          {/* Project Description */}
          <EditableText 
            initialText={project.description} 
            multiline
            textKey={`hero_description_${currentProjectId}`}
          >
            {(text) => (
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
                {text}
              </p>
            )}
          </EditableText>

          {/* Additional Content Blocks */}
          {contentBlocks.length > 0 && (
            <div className="space-y-4">
              {contentBlocks.map((block, index) => (
                <DraggableContentBlock
                  key={`hero-${block.type}-${index}`}
                  block={block}
                  index={index}
                  onUpdate={handleUpdateContent}
                  onDelete={handleDeleteContent}
                  onImageReplace={handleContentImageReplace}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isDragging={false}
                  projectId={currentProjectId}
                />
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="glass-button px-3 py-1 bg-blue-50/80 text-blue-700 hover:bg-blue-100/80 backdrop-blur-sm transition-all duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Project Links */}
          {details.projectLink && (
            <div className="flex justify-center pt-4">
              <a
                href={details.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-accent inline-flex items-center px-6 py-3 border border-blue-300/30 text-blue-800 font-medium rounded-lg transition-all duration-300 hover:bg-blue-500/30 hover:scale-105 shadow-elevated backdrop-blur-md"
              >
                View Live Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>

        {/* Hero Image - Glass Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="floating-element"
        >
          <div className="glass-card p-4 layered-depth relative group">
            <EditImageButton
              src={heroImage}
              onImageReplace={handleImageReplace}
              projectId={currentProjectId}
            />
            <MaximizableImage
              src={heroImage}
              alt={project.title}
              caption={imageCaptions[heroImage] || project.title}
              imageList={[heroImage]}
              currentIndex={0}
              priority={true}
              className="rounded-xl shadow-elevated-lg w-full overflow-hidden"
              onImageReplace={handleImageReplace}
              projectId={currentProjectId}
              hideEditButton={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModernProjectHero;
