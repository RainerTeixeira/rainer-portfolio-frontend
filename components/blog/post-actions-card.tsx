/**
 * Post Actions Card Component
 *
 * Componente de card para ações do post (like, bookmark, share).
 * Usado na página individual do post para interações sociais.
 *
 * @module components/blog/post-actions-card
 * @fileoverview Card de ações do post
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BookmarkButton, LikeButton, ShareButton } from './social';

interface PostActionsCardProps {
  postId: string;
  initialLikes?: number;
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function PostActionsCard({
  postId,
  initialLikes = 0,
  url,
  title,
  description,
  className,
}: PostActionsCardProps) {
  return (
    <Card
      className={`dark:bg-black/50 dark:border-cyan-400/20 ${className || ''}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <LikeButton
              postId={postId}
              initialLikes={initialLikes}
              variant="default"
            />
            <BookmarkButton
              postId={postId}
              variant="outline"
              size="sm"
              showLabel={true}
            />
            <ShareButton
              url={url}
              title={title}
              description={description}
              variant="outline"
              size="sm"
              showLabel={true}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
