
export interface ChangeQueue {
  id: string;
  type: 'text' | 'image' | 'content_block';
  key: string;
  value: any;
  timestamp: number;
}

export interface SyncState {
  isSyncing: boolean;
  hasQueuedChanges: boolean;
  lastSyncTime: number;
  pendingChanges: number;
  isStuck: boolean;
}

export interface SyncConfig {
  DEBOUNCE_DELAY: number;
  THROTTLE_INTERVAL: number;
  BATCH_SIZE: number;
  MAX_QUEUE_SIZE: number;
  STUCK_TIMEOUT: number;
}

export const DEFAULT_SYNC_CONFIG: SyncConfig = {
  DEBOUNCE_DELAY: 2500,
  THROTTLE_INTERVAL: 5000,
  BATCH_SIZE: 10,
  MAX_QUEUE_SIZE: 50,
  STUCK_TIMEOUT: 15000
};
