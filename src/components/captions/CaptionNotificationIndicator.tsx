
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';
import { useCaptionNotifications } from '@/hooks/useCaptionNotifications';

interface CaptionNotificationIndicatorProps {
  projectId?: string;
  className?: string;
}

const CaptionNotificationIndicator: React.FC<CaptionNotificationIndicatorProps> = ({
  projectId,
  className = ''
}) => {
  const { getUnpublishedCount, hasUnpublishedCaptions } = useCaptionNotifications();
  
  const unpublishedCount = projectId ? getUnpublishedCount(projectId) : 0;
  const showGlobalIndicator = !projectId && hasUnpublishedCaptions;
  const showProjectIndicator = projectId && unpublishedCount > 0;

  if (!showGlobalIndicator && !showProjectIndicator) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Bell className="h-4 w-4 text-orange-600" />
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          {projectId ? unpublishedCount : '!'}
        </Badge>
      </div>
      <span className="text-sm text-orange-600 font-medium">
        {projectId 
          ? `${unpublishedCount} new captions ready`
          : 'New AI captions ready to publish'
        }
      </span>
    </div>
  );
};

export default CaptionNotificationIndicator;
