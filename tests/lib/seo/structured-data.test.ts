/**
 * Testes para lib/seo/structured-data.ts
 */

import type { Post } from '@/lib/api/types';
import {
  generateArticleStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/metadata/structured-data';

describe('lib/seo/structured-data', () => {
  describe('generateArticleStructuredData', () => {
    it('deve gerar structured data para artigo', () => {
      const post: Partial<Post> = {
        id: '1',
        title: 'Meu Post',
        slug: 'meu-post',
        content: 'Conteúdo do post em formato string',
        publishedAt: '2025-01-15T00:00:00Z',
        updatedAt: '2025-01-15T00:00:00Z',
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
