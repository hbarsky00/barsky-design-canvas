
import React from "react";
import { List } from "lucide-react";
import DraggableProjectSection, { ProjectContentItem } from "../enhanced/DraggableProjectSection";
import { useDraggableContent } from "@/hooks/useDraggableContent";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ProcessSectionProps {
  processBeforeGallery: string;
  processAfterGallery: string;
  isInvestorProject: boolean;
  isDaeSearchProject: boolean;
  inspirationImages: string[];
  inspirationCaptions: Record<string, string>;
  servicesGalleryImages: string[];
  servicesCaptions: Record<string, string>;
  processImage?: string;
  processBottomImage?: string;
  imageCaptions: Record<string, string>;
  projectId?: string;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({
  processBeforeGallery,
  processAfterGallery,
  isInvestorProject,
  isDaeSearchProject,
  inspirationImages,
  inspirationCaptions,
  servicesGalleryImages,
  servicesCaptions,
  processImage,
  processBottomImage,
  imageCaptions,
  projectId
}) => {
  // Convert existing content to draggable items format
  const initialItems: ProjectContentItem[] = React.useMemo(() => {
    const items: ProjectContentItem[] = [];
    let order = 0;

    // Add before gallery text
    if (processBeforeGallery) {
      items.push({
        id: 'process-text-before',
        type: 'text',
        content: processBeforeGallery,
        order: order++
      });
    }

    // Add process image
    if (processImage) {
      items.push({
        id: 'process-image-main',
        type: 'image',
        content: processImage,
        order: order++
      });
    }

    // Add after gallery text
    if (processAfterGallery) {
      items.push({
        id: 'process-text-after',
        type: 'text',
        content: processAfterGallery,
        order: order++
      });
    }

    // Add bottom image
    if (processBottomImage) {
      items.push({
        id: 'process-image-bottom',
        type: 'image',
        content: processBottomImage,
        order: order++
      });
    }

    return items;
  }, [processBeforeGallery, processAfterGallery, processImage, processBottomImage]);

  const {
    items,
    handleItemsReorder,
    handleItemUpdate,
    handleItemDelete,
    handleItemAdd
  } = useDraggableContent(initialItems);

  // Remove duplicates by converting to Set and back to array
  const uniqueServicesGalleryImages = Array.from(new Set(servicesGalleryImages));
  
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <List className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">What I Did</h2>
      </div>
      
      <DraggableProjectSection
        items={items}
        onItemsReorder={handleItemsReorder}
        onItemUpdate={handleItemUpdate}
        onItemDelete={handleItemDelete}
        onItemAdd={handleItemAdd}
        projectId={projectId}
      />

      {/* Professional Search Interface Gallery - Only for investor project */}
      {isInvestorProject && inspirationImages.length > 0 && (
        <div className="mt-6">
          <ProjectMultiImageGallery 
            images={inspirationImages}
            captions={inspirationCaptions}
          />
        </div>
      )}

      {/* Services Gallery - Only for DAE Search project */}
      {isDaeSearchProject && uniqueServicesGalleryImages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-barsky-dark">Services Provided</h3>
          <ProjectMultiImageGallery 
            images={uniqueServicesGalleryImages}
            captions={servicesCaptions}
          />
        </div>
      )}
    </div>
  );
};

export default ProcessSection;
