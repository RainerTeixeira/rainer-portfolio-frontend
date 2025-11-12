/**
 * Types - Notifications
 */

export enum NotificationType {
  NEW_COMMENT = 'NEW_COMMENT',
  NEW_LIKE = 'NEW_LIKE',
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  POST_PUBLISHED = 'POST_PUBLISHED',
  MENTION = 'MENTION',
  SYSTEM = 'SYSTEM',
}

export interface Notification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly link?: string;
  readonly metadata?: Record<string, unknown>;
  readonly isRead: boolean;
  readonly userId: string;
  readonly createdAt: string;
  readonly readAt?: string;
}

export interface CreateNotificationData {
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly link?: string;
  readonly metadata?: Record<string, unknown>;
  readonly userId: string;
}

export interface UpdateNotificationData {
  readonly isRead?: boolean;
}

export interface NotificationFilters {
  readonly page?: number;
  readonly limit?: number;
  readonly userId: string;
  readonly isRead?: boolean;
  readonly type?: NotificationType;
}
