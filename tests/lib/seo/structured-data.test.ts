/**
 * Testes para lib/seo/structured-data.ts
 */

import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/seo/structured-data';
import type { Post } from '@/lib/api/types';

describe('lib/seo/structured-data', () => {
  describe('generateArticleStructuredData', () => {
    it('deve gerar structured data para artigo', () => {
      const post: Partial<Post> = {
        id: '1',
        title: 'Meu Post',
        slug: 'meu-post',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Conteúdo do post' }],
            },
          ],
        },
        publishedAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      };

      const structuredData = generateArticleStructuredData(post as Post);

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('Article');
      expect(structuredData.headline).toBe('Meu Post');
    });
  });

  describe('generateBreadcrumbStructuredData', () => {
    it('deve gerar structured data para breadcrumbs', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: 'Post', url: '/blog/meu-post' },
      ];

      const structuredData = generateBreadcrumbStructuredData(items);

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('BreadcrumbList');
      expect(structuredData.itemListElement).toHaveLength(3);
    });
  });
});

