/**
 * Dados Mockados do Blog
 * 
 * Posts de exemplo para demonstração do sistema de blog.
 * Separados do blog-local-store.ts para melhor organização.
 * 
 * @fileoverview Mock data para posts do blog
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { PostStatus } from '@/types/database';
import type { BlogPost } from '../blog-local-store';

/**
 * Helper para criar conteúdo Tiptap de forma mais concisa
 */
const createTiptapContent = (sections: Array<{ type: string; content: string | string[] }>) => {
  return {
    type: "doc" as const,
    content: sections.map(section => {
      if (section.type === "heading") {
        return {
          type: "heading" as const,
          attrs: { level: 1 },
          content: [{ type: "text" as const, text: section.content as string }]
        }
      }
      if (section.type === "paragraph") {
        return {
          type: "paragraph" as const,
          content: [{ type: "text" as const, text: section.content as string }]
        }
      }
      return section
    })
  } as any
}

/**
 * Posts mockados iniciais
 */
export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Arquiteturas Escaláveis com React e TypeScript",
    slug: "arquiteturas-escalaveis-react-typescript",
    content: createTiptapContent([
      { type: "heading", content: "Arquiteturas Escaláveis com React e TypeScript" },
      { type: "paragraph", content: "Construir aplicações React escaláveis requer mais do que conhecer a biblioteca. Você precisa entender padrões de arquitetura, separação de responsabilidades e como estruturar código para crescer sem se tornar um pesadelo de manutenção." },
    ]),
    categoryId: null,
    authorId: "mock-author-id",
    status: "PUBLISHED" as PostStatus,
    featured: true,
    allowComments: true,
    pinned: false,
    priority: 10,
    publishedAt: new Date("2025-01-15"),
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    views: 245,
    likesCount: 18,
    commentsCount: 5,
    bookmarksCount: 12,
    date: "15 de Janeiro, 2025",
    category: "React & TypeScript",
    coverImage: "/images/b1.png",
    image: "/images/b1.png",
    author: "Rainer Teixeira",
    published: true,
    description: "Guia completo sobre como estruturar aplicações React com TypeScript de forma escalável usando padrões modernos e boas práticas.",
    excerpt: "Guia completo sobre como estruturar aplicações React com TypeScript de forma escalável usando padrões modernos e boas práticas.",
    tags: ["React", "TypeScript", "Arquitetura", "Clean Code"],
    readingTime: 8
  },
  {
    id: "2",
    title: "Microserviços na Prática: Quando Migrar e Como Fazer",
    slug: "microservicos-na-pratica",
    content: createTiptapContent([
      { type: "heading", content: "Microserviços na Prática" },
      { type: "paragraph", content: "A migração de monolito para microserviços é uma das decisões mais complexas e arriscadas na evolução de um sistema. Neste artigo, vou compartilhar experiências reais de quando vale a pena migrar e principalmente quando não vale." },
    ]),
    categoryId: null,
    authorId: "mock-author-id",
    status: "PUBLISHED" as PostStatus,
    featured: false,
    allowComments: true,
    pinned: false,
    priority: 5,
    publishedAt: new Date("2025-01-10"),
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
    views: 189,
    likesCount: 14,
    commentsCount: 8,
    bookmarksCount: 9,
    date: "10 de Janeiro, 2025",
    category: "Arquitetura de Software",
    coverImage: "/images/b2.png",
    image: "/images/b2.png",
    author: "Rainer Teixeira",
    published: true,
    description: "Análise profunda sobre arquitetura de microserviços: quando migrar de monolito, trade-offs reais e como definir fronteiras de contexto usando DDD.",
    excerpt: "Análise profunda sobre arquitetura de microserviços: quando migrar de monolito, trade-offs reais e como definir fronteiras de contexto usando DDD.",
    tags: ["Arquitetura", "Microserviços", "DDD", "Backend"],
    readingTime: 10
  },
  {
    id: "3",
    title: "Next.js 15: Dominando App Router e Server Components",
    slug: "nextjs-15-app-router",
    content: createTiptapContent([
      { type: "heading", content: "Next.js 15: Dominando App Router e Server Components" },
      { type: "paragraph", content: "O Next.js 15 trouxe mudanças revolucionárias com o App Router e React Server Components. Vamos explorar como essas tecnologias mudam completamente a forma como construímos aplicações web." },
    ]),
    categoryId: null,
    authorId: "mock-author-id",
    status: "PUBLISHED" as PostStatus,
    featured: true,
    allowComments: true,
    pinned: false,
    priority: 8,
    publishedAt: new Date("2025-01-05"),
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
    views: 312,
    likesCount: 24,
    commentsCount: 12,
    bookmarksCount: 18,
    date: "5 de Janeiro, 2025",
    category: "Next.js & React",
    coverImage: "/images/b3.png",
    image: "/images/b3.png",
    author: "Rainer Teixeira",
    published: true,
    description: "Domine o App Router e React Server Components do Next.js 15. Aprenda a construir aplicações web ultrarrápidas com streaming SSR e otimizações automáticas.",
    excerpt: "Domine o App Router e React Server Components do Next.js 15. Aprenda a construir aplicações web ultrarrápidas com streaming SSR e otimizações automáticas.",
    tags: ["Next.js", "React", "SSR", "Performance"],
    readingTime: 12
  },
  {
    id: "4",
    title: "CI/CD Avançado: Pipelines Robustos com GitHub Actions",
    slug: "cicd-github-actions",
    content: createTiptapContent([
      { type: "heading", content: "CI/CD Avançado com GitHub Actions" },
      { type: "paragraph", content: "Pipelines de CI/CD robustos são essenciais para times modernos. Vou mostrar como configurar GitHub Actions para build matrix, cache inteligente e deploy automatizado." },
    ]),
    categoryId: null,
    authorId: "mock-author-id",
    status: "PUBLISHED" as PostStatus,
    featured: false,
    allowComments: true,
    pinned: false,
    priority: 3,
    publishedAt: new Date("2025-01-01"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    views: 156,
    likesCount: 11,
    commentsCount: 3,
    bookmarksCount: 7,
    date: "1 de Janeiro, 2025",
    category: "DevOps & CI/CD",
    coverImage: "/images/b4.png",
    image: "/images/b4.png",
    author: "Rainer Teixeira",
    published: true,
    description: "Configure pipelines de CI/CD enterprise com GitHub Actions. Build matrix, cache inteligente, testes paralelos e deploy multi-ambiente.",
    excerpt: "Configure pipelines de CI/CD enterprise com GitHub Actions. Build matrix, cache inteligente, testes paralelos e deploy multi-ambiente.",
    tags: ["DevOps", "CI/CD", "GitHub Actions", "Automation"],
    readingTime: 9
  }
]
