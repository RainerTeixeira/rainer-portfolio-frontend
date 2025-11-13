/**
 * Testes para lib/api/helpers/post-helpers.ts
 */

import {
  preparePostForCreate,
  preparePostForUpdate,
  validatePostData,
} from '@/lib/api/helpers/post-helpers';
import type { CreatePostData, UpdatePostData } from '@/lib/api/types/posts';
import { PostStatus } from '@/lib/api/types/posts';

describe('lib/api/helpers/post-helpers', () => {
  describe('preparePostForCreate', () => {
    it('deve preparar dados de post para criação', () => {
      const formData = {
        title: 'Meu Post',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Conteúdo do post' }],
            },
          ],
        },
        subcategoryId: 'category-1',
        status: PostStatus.DRAFT,
      };

      const authorId = 'author-1';
      const result = preparePostForCreate(formData, authorId);

      expect(result.title).toBe('Meu Post');
      expect(result.authorId).toBe(authorId);
      expect(result.status).toBe(PostStatus.DRAFT);
      expect(result.slug).toBe('meu-post');
    });

    it('deve gerar slug automaticamente a partir do título', () => {
      const formData = {
        title: 'Meu Primeiro Post!',
        content: {
          type: 'doc',
          content: [],
        },
      };

      const authorId = 'author-1';
      const result = preparePostForCreate(formData, authorId);

      expect(result.slug).toBe('meu-primeiro-post');
    });
  });

  describe('preparePostForUpdate', () => {
    it('deve preparar dados de post para atualização', () => {
      const formData = {
        title: 'Post Atualizado',
        status: PostStatus.PUBLISHED,
      };

      const result = preparePostForUpdate(formData);

      expect(result.title).toBe('Post Atualizado');
      expect(result.status).toBe(PostStatus.PUBLISHED);
    });

    it('deve atualizar slug se título mudou', () => {
      const formData = {
        title: 'Novo Título',
      };

      const result = preparePostForUpdate(formData);

      expect(result.slug).toBe('novo-titulo');
    });
  });

  describe('validatePostData', () => {
    it('deve validar dados de post válidos', () => {
      const data: CreatePostData = {
        title: 'Meu Post',
        slug: 'meu-post',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Conteúdo com mais de 10 caracteres' }],
            },
          ],
        },
        authorId: 'author-1',
        status: PostStatus.DRAFT,
        subcategoryId: 'category-1',
      };

      const errors = validatePostData(data);

      expect(errors.length).toBe(0);
    });

    it('deve retornar erros para dados inválidos', () => {
      const data: Partial<CreatePostData> = {
        title: 'AB', // Muito curto
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Curto' }], // Muito curto
            },
          ],
        },
      };

      const errors = validatePostData(data as CreatePostData);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});

