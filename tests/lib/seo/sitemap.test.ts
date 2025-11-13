/**
 * Testes para lib/seo/sitemap.ts
 */

import { generateSitemap, generateRobotsTxt } from '@/lib/seo/sitemap';
import type { Category, Post } from '@/lib/api/types';

describe('lib/seo/sitemap', () => {
  describe('generateSitemap', () => {
    it('deve gerar sitemap XML', () => {
      const posts: Post[] = [];
      const categories: Category[] = [];

      const sitemap = generateSitemap(posts, categories);

      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemap).toContain('<urlset');
      expect(sitemap).toContain('</urlset>');
    });

    it('deve incluir páginas estáticas', () => {
      const posts: Post[] = [];
      const categories: Category[] = [];

      const sitemap = generateSitemap(posts, categories);

      expect(sitemap).toContain('<loc>https://rainersoft.com.br/</loc>');
      expect(sitemap).toContain('<loc>https://rainersoft.com.br/blog</loc>');
    });

    it('deve incluir posts no sitemap', () => {
      const posts: Post[] = [
        {
          id: '1',
          title: 'Meu Post',
          slug: 'meu-post',
          updatedAt: '2024-01-15T00:00:00Z',
        } as Post,
      ];
      const categories: Category[] = [];

      const sitemap = generateSitemap(posts, categories);

      expect(sitemap).toContain('/blog/meu-post');
    });
  });

  describe('generateRobotsTxt', () => {
    it('deve gerar robots.txt', () => {
      const robots = generateRobotsTxt();

      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Sitemap:');
    });
  });
});

