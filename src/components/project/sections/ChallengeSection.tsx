
import React from "react";
import { Lightbulb } from "lucide-react";
import DraggableProjectSection, { ProjectContentItem } from "../enhanced/DraggableProjectSection";
import { useDraggableContent } from "@/hooks/useDraggableContent";
import EditableText from "@/components/dev/EditableText";
import MaximizableImage from "../MaximizableImage";

interface ChallengeSectionProps {
  challenge: string;
  challengeImage?: string;
  challengeBottomImage?: string;
  challengeGalleryImages?: string[];
  imageCaptions?: Record<string, string>;
  projectId?: string;
}

const ChallengeSection: React.FC<ChallengeSectionProps> = ({
  challenge,
  challengeImage,
  challengeBottomImage,
  challengeGalleryImages = [],
  imageCaptions = {},
  projectId
}) => {
  // Convert existing content to draggable items format
  const initialItems: ProjectContentItem[] = React.useMemo(() => {
    const items: ProjectContentItem[] = [];
    let order = 0;

    // Add main challenge text
    if (challenge) {
      items.push({
        id: 'challenge-text-main',
        type: 'text',
        content: challenge,
        order: order++
      });
    }

    // Add challenge image
    if (challengeImage) {
      items.push({
        id: 'challenge-image-main',
        type: 'image',
        content: challengeImage,
        order: order++
      });
    }

    // Add gallery images
    challengeGalleryImages.forEach((image, index) => {
      items.push({
        id: `challenge-gallery-${index}`,
        type: 'image',
        content: image,
        order: order++
      });
    });

    // Add bottom image
    if (challengeBottomImage) {
      items.push({
        id: 'challenge-image-bottom',
        type: 'image',
        content: challengeBottomImage,
        order: order++
      });
    }

    return items;
  }, [challenge, challengeImage, challengeBottomImage, challengeGalleryImages]);

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
        <Lightbulb className="h-5 w-5 text-barsky-blue" />
        <h2 className="text-2xl font-bold">The Challenge</h2>
      </div>
      
      <DraggableProjectSection
        items={items}
        onItemsReorder={handleItemsReorder}
        onItemUpdate={handleItemUpdate}
        onItemDelete={handleItemDelete}
        onItemAdd={handleItemAdd}
        projectId={projectId}
      />
    </div>
  );
};

export default ChallengeSection;
