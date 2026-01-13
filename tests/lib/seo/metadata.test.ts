/**
 * Testes para lib/seo/metadata.ts
 */

import type { Category, Post } from '@/lib/api/types';
import {
  generateCategoryMetadata,
  generateMetadata,
  generatePostMetadata,
} from '@/lib/metadata/page-metadata';

describe('lib/seo/metadata', () => {
  describe('generateMetadata', () => {
    it('deve gerar metadados básicos', () => {
      const metadata = generateMetadata({
        title: 'Teste',
        description: 'Descrição de teste',
      });

      expect(metadata.title).toBe('Teste');
      expect(metadata.description).toBe('Descrição de teste');
    });

    it('deve gerar metadados com Open Graph', () => {
      const metadata = generateMetadata({
        title: 'Teste',
        description: 'Descrição de teste',
        type: 'article',
      });

      expect(metadata.openGraph).toBeDefined();
      // Cast para any apenas no teste, pois o tipo OpenGraph do Next.js pode mudar
      // entre versões e não expor explicitamente a propriedade `type` nas typings.
      expect((metadata.openGraph as any)?.title).toBe('Teste');
      expect((metadata.openGraph as any)?.type).toBe('article');
    });

    it('deve gerar metadados com Twitter Cards', () => {
      const metadata = generateMetadata({
        title: 'Teste',
        description: 'Descrição de teste',
      });

      expect(metadata.twitter).toBeDefined();
    });
  });

  describe('generatePostMetadata', () => {
    it('deve gerar metadados para post', () => {
      const post: Partial<Post> = {
        title: 'Meu Post',
        slug: 'meu-post',
        content: 'Conteúdo do post em formato string',
        publishedAt: '2025-01-15T00:00:00Z',
        updatedAt: '2025-01-15T00:00:00Z',
      };

      const metadata = generatePostMetadata(post as Post);

      expect(metadata.title).toBe('Meu Post');
      expect(metadata.description).toBeDefined();
    });

    it('deve usar excerpt se disponível', () => {
      const post: Partial<Post> = {
        title: 'Meu Post',
        slug: 'meu-post',
        excerpt: 'Excerpt do post',
        content: 'Conteúdo do post em formato string',
        publishedAt: '2025-01-15T00:00:00Z',
        updatedAt: '2025-01-15T00:00:00Z',
      };

      const metadata = generatePostMetadata(post as Post);

      expect(metadata.description).toBe('Excerpt do post');
    });
  });

  describe('generateCategoryMetadata', () => {
    it('deve gerar metadados para categoria', () => {
      const category: Partial<Category> = {
        name: 'Tecnologia',
        slug: 'tecnologia',
      };

      const metadata = generateCategoryMetadata(category as Category);

      expect(metadata.title).toContain('Tecnologia');
      expect(metadata.description).toBeDefined();
    });

    it('deve usar fullName se disponível', () => {
      const category: Partial<Category> = {
        name: 'Tecnologia',
        fullName: 'Tecnologia da Informação',
        slug: 'tecnologia',
      };

      const metadata = generateCategoryMetadata(category as Category);

      expect(metadata.title).toContain('Tecnologia da Informação');
    });
  });
});
