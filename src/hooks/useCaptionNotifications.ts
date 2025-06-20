
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface CaptionNotification {
  id: string;
  projectId: string;
  captionCount: number;
  timestamp: number;
  isPublished: boolean;
}

export const useCaptionNotifications = () => {
  const [notifications, setNotifications] = useState<CaptionNotification[]>([]);
  const [hasUnpublishedCaptions, setHasUnpublishedCaptions] = useState(false);

  // Load existing notifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('caption_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed);
        setHasUnpublishedCaptions(parsed.some((n: CaptionNotification) => !n.isPublished));
      } catch (error) {
        console.error('Failed to load caption notifications:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  const saveNotifications = useCallback((newNotifications: CaptionNotification[]) => {
    localStorage.setItem('caption_notifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
    setHasUnpublishedCaptions(newNotifications.some(n => !n.isPublished));
  }, []);

  // Add a new caption notification
  const addCaptionNotification = useCallback((projectId: string, captionCount: number) => {
    const notification: CaptionNotification = {
      id: `${projectId}_${Date.now()}`,
      projectId,
      captionCount,
      timestamp: Date.now(),
      isPublished: false
    };

    const newNotifications = [...notifications, notification];
    saveNotifications(newNotifications);

    // Show toast notification
    toast.success(`AI generated ${captionCount} new captions!`, {
      description: 'Ready to publish to live site',
      action: {
        label: 'Publish Now',
        onClick: () => {
          window.dispatchEvent(new CustomEvent('triggerManualSync', {
            detail: { projectId, source: 'caption_notification' }
          }));
        }
      },
      duration: 8000
    });
  }, [notifications, saveNotifications]);

  // Mark notifications as published
  const markAsPublished = useCallback((projectId: string) => {
    const updatedNotifications = notifications.map(n => 
      n.projectId === projectId ? { ...n, isPublished: true } : n
    );
    saveNotifications(updatedNotifications);
  }, [notifications, saveNotifications]);

  // Get unpublished count for a project
  const getUnpublishedCount = useCallback((projectId: string) => {
    return notifications
      .filter(n => n.projectId === projectId && !n.isPublished)
      .reduce((sum, n) => sum + n.captionCount, 0);
  }, [notifications]);

  // Clear old notifications (older than 24 hours)
  const cleanupOldNotifications = useCallback(() => {
    const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
    const filtered = notifications.filter(n => n.timestamp > cutoff);
    if (filtered.length !== notifications.length) {
      saveNotifications(filtered);
    }
  }, [notifications, saveNotifications]);

  return {
    notifications,
    hasUnpublishedCaptions,
    addCaptionNotification,
    markAsPublished,
    getUnpublishedCount,
    cleanupOldNotifications
  };
};
