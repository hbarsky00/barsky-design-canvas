
import React from "react";
import { CheckCircle } from "lucide-react";
import DraggableProjectSection, { ProjectContentItem } from "../enhanced/DraggableProjectSection";
import { useDraggableContent } from "@/hooks/useDraggableContent";
import ProjectMultiImageGallery from "../ProjectMultiImageGallery";

interface ResultSectionProps {
  result: string;
  resultGalleryImages?: string[];
  resultImage?: string;
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  result,
  resultGalleryImages = [],
  resultImage,
  imageCaptions = {},
  projectId
}) => {
  // Convert existing content to draggable items format
  const initialItems: ProjectContentItem[] = React.useMemo(() => {
    const items: ProjectContentItem[] = [];
    let order = 0;

    // Add main result text
    if (result) {
      items.push({
        id: 'result-text-main',
        type: 'text',
        content: result,
        order: order++
      });
    }

    // Add result image
    if (resultImage) {
      items.push({
        id: 'result-image-main',
        type: 'image',
        content: resultImage,
        order: order++
      });
    }

    return items;
  }, [result, resultImage]);

  const {
    items,
    handleItemsReorder,
    handleItemUpdate,
    handleItemDelete,
    handleItemAdd
  } = useDraggableContent(initialItems);

  return (
    <div className="mb-12">
      <div className="flex items-center mb-4 space-x-2">
        <CheckCircle className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">The Result</h2>
      </div>
      
      <DraggableProjectSection
        items={items}
        onItemsReorder={handleItemsReorder}
        onItemUpdate={handleItemUpdate}
        onItemDelete={handleItemDelete}
        onItemAdd={handleItemAdd}
        projectId={projectId}
      />

      {/* Result Gallery */}
      {resultGalleryImages.length > 0 && (
        <div className="mt-6">
          <ProjectMultiImageGallery 
            images={resultGalleryImages}
            captions={imageCaptions}
          />
        </div>
      )}
    </div>
  );
};

export default ResultSection;
