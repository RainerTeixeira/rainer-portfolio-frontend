/**
 * Post Metadata Card Component
 *
 * Componente de card para exibir metadados do post (autor, data, categoria, tempo de leitura, estatísticas).
 * Usado na página individual do post para mostrar informações sobre o artigo.
 *
 * @module components/blog/post-metadata-card
 * @fileoverview Card de metadados do post
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { Badge } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { Calendar, Eye, Heart, Tag, User } from 'lucide-react';
import { ReadingTime } from './social';
import type { TiptapJSON } from '@/lib/api/types/common';
import { formatRelativeDate } from '@rainersoft/utils';

interface PostMetadataCardProps {
  author?: string;
  date?: string;
  category?: string;
  tags?: readonly string[];
  views?: number;
  likesCount?: number;
  content: string | TiptapJSON;
  className?: string;
}

export function PostMetadataCard({
  author = 'Rainer Teixeira',
  date,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category: _category,
  tags,
  views = 0,
  likesCount = 0,
  content,
  className,
}: PostMetadataCardProps) {
  return (
    <Card
      className={`dark:bg-black/80 dark:border-cyan-400/20 backdrop-blur-sm ${className || ''}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-4">
            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span className="font-medium">{author}</span>
            </div>

            <Separator
              orientation="vertical"
              className="h-4 dark:bg-cyan-400/20"
              aria-hidden="true"
            />

            {/* Date */}
            {date && (
              <>
                <div className="flex items-center gap-2">
                  <Calendar
                    className="w-4 h-4 text-cyan-400"
                    aria-hidden="true"
                  />
                  <time dateTime={date} className="font-mono">
                    {formatRelativeDate(date)}
                  </time>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-4 dark:bg-cyan-400/20"
                  aria-hidden="true"
                />
              </>
            )}

            {/* Reading Time */}
            <ReadingTime content={content} showIcon={true} />
          </div>

          {/* Statistics */}
          <div
            className="flex items-center gap-4"
            aria-label="Estatísticas do post"
          >
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span>{views}</span>
              <span className="sr-only">visualizações</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" aria-hidden="true" />
              <span>{likesCount}</span>
              <span className="sr-only">curtidas</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <>
            <Separator className="my-4 dark:bg-cyan-400/10" />
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs font-mono dark:border-cyan-400/30 dark:text-cyan-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}


