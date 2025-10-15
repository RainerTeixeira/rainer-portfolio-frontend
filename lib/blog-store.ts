/**
 * Blog Store
 * 
 * Gerenciamento de estado e persistência de posts do blog.
 * Usa localStorage para simular banco de dados MongoDB.
 * Estrutura baseada no Prisma Schema.
 * 
 * @fileoverview Store de posts do blog compatível com MongoDB/Prisma
 * @author Rainer Teixeira
 * @version 2.0.0
 */

import type { PostStatus, TiptapJSON } from '@/types/database'

/**
 * Interface BlogPost (baseada no schema Prisma simplificado)
 * Compatível com MongoDB via Prisma
 */
export interface BlogPost {
  // --- Campos do Schema Prisma (obrigatórios/principais) ---
  id: string
  title: string
  slug: string
  content: TiptapJSON // JSON do Tiptap (OBRIGATÓRIO!)
  categoryId?: string | null
  authorId: string
  status: PostStatus
  featured: boolean
  allowComments: boolean
  pinned: boolean
  priority: number
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  views: number
  likesCount: number
  commentsCount: number
  bookmarksCount: number
  
  // --- Campos legados (para compatibilidade com UI antiga) ---
  date?: string // Gerado de publishedAt
  category?: string // Nome da categoria (não ID)
  image?: string // Alias para coverImage
  coverImage?: string // Imagem de capa (UI)
  author?: string // Nome do autor (não ID)
  published?: boolean // Deprecated: usar status === 'PUBLISHED'
  description?: string // Alias para excerpt
  excerpt?: string // Resumo do post (UI)
  tags?: string[] // Tags do post (UI)
  readingTime?: number // Tempo de leitura calculado (UI)
}

const STORAGE_KEY = "blog_posts"

/**
 * Posts mockados iniciais (Schema Prisma Simplificado)
 * 
 * Posts de exemplo ricos e completos para demonstração.
 * Estrutura reflete exatamente o schema Prisma.
 */
const INITIAL_POSTS: BlogPost[] = [
  {
    // --- Campos Prisma (obrigatórios) ---
    id: "1",
    title: "Arquiteturas Escaláveis com React e TypeScript",
    slug: "arquiteturas-escalaveis-react-typescript",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Arquiteturas Escaláveis com React e TypeScript" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Construir aplicações React escaláveis requer mais do que conhecer a biblioteca. Você precisa entender " },
            { type: "text", marks: [{ type: "bold" }], text: "padrões de arquitetura" },
            { type: "text", text: ", " },
            { type: "text", marks: [{ type: "italic" }], text: "separação de responsabilidades" },
            { type: "text", text: " e como estruturar código para crescer sem se tornar um pesadelo de manutenção." }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Padrões de Componentização" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A chave para uma aplicação escalável está em como você organiza seus componentes. Siga estes princípios:" }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Single Responsibility:" },
                  { type: "text", text: " Cada componente faz apenas uma coisa" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Composition over Props:" },
                  { type: "text", text: " Use children e slots em vez de muitas props" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Type Safety:" },
                  { type: "text", text: " TypeScript em tudo, sem " },
                  { type: "text", marks: [{ type: "code" }], text: "any" }
                ]
              }]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Gerenciamento de Estado" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Para estado global, considere:" }
          ]
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "React Query:" },
                  { type: "text", text: " Para dados do servidor (cache, sync)" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Zustand:" },
                  { type: "text", text: " Para estado de UI global" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Context:" },
                  { type: "text", text: " Para temas e autenticação" }
                ]
              }]
            }
          ]
        },
        {
          type: "blockquote",
          content: [{
            type: "paragraph",
            content: [
              { type: "text", marks: [{ type: "italic" }], text: "\"A melhor arquitetura é aquela que cresce com seu time e produto, não aquela que parece impressionante no início mas trava depois.\"" }
            ]
          }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Conclusão" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Arquiteturas escaláveis não surgem por acaso. São resultado de " },
            { type: "text", marks: [{ type: "bold" }], text: "decisões conscientes" },
            { type: "text", text: ", " },
            { type: "text", marks: [{ type: "bold" }], text: "refatorações contínuas" },
            { type: "text", text: " e " },
            { type: "text", marks: [{ type: "bold" }], text: "testes constantes" },
            { type: "text", text: "." }
          ]
        }
      ]
    },
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
    
    // --- Campos de UI (compatibilidade) ---
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
    // --- Campos Prisma ---
    id: "2",
    title: "Microserviços na Prática: Quando Migrar e Como Fazer",
    slug: "microservicos-na-pratica",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Microserviços na Prática" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A migração de monolito para microserviços é uma das decisões mais " },
            { type: "text", marks: [{ type: "bold" }], text: "complexas e arriscadas" },
            { type: "text", text: " na evolução de um sistema. Neste artigo, vou compartilhar experiências reais de quando vale a pena migrar e " },
            { type: "text", marks: [{ type: "italic" }], text: "principalmente quando não vale" },
            { type: "text", text: "." }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Quando Migrar para Microserviços?" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Considere microserviços quando você tem:" }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Equipes grandes:" },
                  { type: "text", text: " +50 desenvolvedores, múltiplos times" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Domínios bem definidos:" },
                  { type: "text", text: " Bounded contexts claros" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Escalabilidade diferenciada:" },
                  { type: "text", text: " Partes do sistema com cargas muito diferentes" }
                ]
              }]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "DDD e Bounded Contexts" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Domain-Driven Design não é opcional em microserviços. Use " },
            { type: "text", marks: [{ type: "code" }], text: "Event Storming" },
            { type: "text", text: " para mapear domínios e encontrar fronteiras naturais." }
          ]
        },
        {
          type: "blockquote",
          content: [{
            type: "paragraph",
            content: [
              { type: "text", text: "\"Se você não consegue desenhar fronteiras claras entre contextos, você não está pronto para microserviços.\"" }
            ]
          }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Trade-offs Reais" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Microserviços trazem " },
            { type: "text", marks: [{ type: "bold" }], text: "complexidade distribuída" },
            { type: "text", text: ": network latency, consistência eventual, debugging complexo, deploy coordenado. Só vale a pena se os benefícios superarem esses custos." }
          ]
        }
      ]
    },
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
    
    // --- Campos UI ---
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
    // --- Campos Prisma ---
    id: "3",
    title: "Next.js 15: Dominando App Router e Server Components",
    slug: "nextjs-15-app-router",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Next.js 15: Dominando App Router e Server Components" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "O Next.js 15 trouxe mudanças " },
            { type: "text", marks: [{ type: "bold" }], text: "revolucionárias" },
            { type: "text", text: " com o App Router e React Server Components. Vamos explorar como essas tecnologias mudam completamente a forma como construímos aplicações web." }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "O Que São Server Components?" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "React Server Components (RSC) permitem renderizar componentes " },
            { type: "text", marks: [{ type: "italic" }], text: "apenas no servidor" },
            { type: "text", text: ", sem enviar JavaScript para o cliente. Isso significa:" }
          ]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Bundle menor:" },
                  { type: "text", text: " Menos JavaScript no navegador" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Performance:" },
                  { type: "text", text: " Carregamento mais rápido" }
                ]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [
                  { type: "text", marks: [{ type: "bold" }], text: "Acesso direto:" },
                  { type: "text", text: " Banco de dados sem API" }
                ]
              }]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "App Router: Nova Era" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "O App Router traz layouts aninhados, loading e error states automáticos, e streaming SSR. Compare:" }
          ]
        },
        {
          type: "codeBlock",
          attrs: { language: "typescript" },
          content: [{
            type: "text",
            text: `// app/blog/[slug]/page.tsx (Server Component)
export default async function PostPage({ params }) {
  // Fetch direto no componente!
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  })
  
  return <Article post={post} />
}`
          }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Performance de Ponta" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Com Next.js 15, você pode alcançar " },
            { type: "text", marks: [{ type: "bold" }], text: "Core Web Vitals perfeitos" },
            { type: "text", text: ": LCP < 2.5s, FID < 100ms, CLS < 0.1. Use ISR incremental, edge runtime e otimizações automáticas." }
          ]
        }
      ]
    },
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
    
    // --- Campos UI ---
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
    // --- Campos Prisma ---
    id: "4",
    title: "CI/CD Avançado: Pipelines Robustos com GitHub Actions",
    slug: "cicd-github-actions",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "CI/CD Avançado com GitHub Actions" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Pipelines de " },
            { type: "text", marks: [{ type: "bold" }], text: "CI/CD robustos" },
            { type: "text", text: " são essenciais para times modernos. Vou mostrar como configurar GitHub Actions para " },
            { type: "text", marks: [{ type: "italic" }], text: "build matrix" },
            { type: "text", text: ", cache inteligente e deploy automatizado." }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Pipeline Básico" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Todo projeto moderno precisa de um pipeline básico que execute:" }
          ]
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [{ type: "text", text: "Linting e formatação (ESLint, Prettier)" }]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [{ type: "text", text: "Testes unitários e integração" }]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [{ type: "text", text: "Build da aplicação" }]
              }]
            },
            {
              type: "listItem",
              content: [{
                type: "paragraph",
                content: [{ type: "text", text: "Deploy para staging/production" }]
              }]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Exemplo de Workflow" }]
        },
        {
          type: "codeBlock",
          attrs: { language: "yaml" },
          content: [{
            type: "text",
            text: `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test`
          }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Cache Inteligente" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Use cache de dependências para acelerar builds em " },
            { type: "text", marks: [{ type: "bold" }], text: "70-80%" },
            { type: "text", text: ". Configure " },
            { type: "text", marks: [{ type: "code" }], text: "actions/cache" },
            { type: "text", text: " corretamente e economize tempo e dinheiro." }
          ]
        },
        {
          type: "blockquote",
          content: [{
            type: "paragraph",
            content: [
              { type: "text", text: "\"Um bom pipeline de CI/CD economiza horas de trabalho manual e previne bugs em produção.\"" }
            ]
          }]
        }
      ]
    },
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
    
    // --- Campos UI ---
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

/**
 * Classe BlogStore
 * 
 * Gerencia posts do blog com persistência em localStorage.
 * Fornece métodos CRUD para manipular posts.
 */
class BlogStore {
  /**
   * Carrega posts do localStorage
   * 
   * Se não houver posts salvos, retorna posts iniciais mockados.
   * 
   * @returns {BlogPost[]} Array de posts
   */
  getPosts(): BlogPost[] {
    if (typeof window === "undefined") return INITIAL_POSTS
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error("Erro ao carregar posts:", error)
        return INITIAL_POSTS
      }
    }
    
    // Primeira vez: salva posts iniciais
    this.savePosts(INITIAL_POSTS)
    return INITIAL_POSTS
  }

  /**
   * Retorna apenas posts publicados
   * 
   * @returns {BlogPost[]} Array de posts publicados
   */
  getPublishedPosts(): BlogPost[] {
    return this.getPosts().filter(post => 
      post.status === "PUBLISHED" || post.published === true // Compatibilidade
    )
  }

  /**
   * Busca post por ID
   * 
   * @param {string} id - ID do post
   * @returns {BlogPost | null} Post encontrado ou null
   */
  getPostById(id: string): BlogPost | null {
    return this.getPosts().find(post => post.id === id) || null
  }

  /**
   * Busca post por SLUG (SEO-friendly)
   * 
   * @param {string} slug - Slug do post
   * @returns {BlogPost | null} Post encontrado ou null
   */
  getPostBySlug(slug: string): BlogPost | null {
    return this.getPosts().find(post => post.slug === slug) || null
  }

  /**
   * Salva posts no localStorage
   * 
   * @param {BlogPost[]} posts - Array de posts para salvar
   */
  private savePosts(posts: BlogPost[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }

  /**
   * Cria novo post
   * 
   * Gera ID único, define timestamps e salva.
   * 
   * @param {Omit<BlogPost, "id" | "createdAt" | "updatedAt">} postData - Dados do post
   * @returns {BlogPost} Post criado
   */
  createPost(postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): BlogPost {
    const posts = this.getPosts()
    const now = new Date()
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now
    }
    posts.unshift(newPost) // Adiciona no início
    this.savePosts(posts)
    return newPost
  }

  /**
   * Atualiza post existente
   * 
   * @param {string} id - ID do post
   * @param {Partial<BlogPost>} updates - Dados a atualizar
   * @returns {BlogPost | null} Post atualizado ou null se não encontrado
   */
  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getPosts()
    const index = posts.findIndex(post => post.id === id)
    
    if (index === -1 || !posts[index]) return null
    
    const currentPost = posts[index]
    posts[index] = {
      ...currentPost,
      ...updates,
      id: currentPost.id, // Não permite alterar ID
      createdAt: currentPost.createdAt, // Não permite alterar data de criação
      updatedAt: new Date()
    } as BlogPost
    
    this.savePosts(posts)
    return posts[index]
  }

  /**
   * Deleta post
   * 
   * @param {string} id - ID do post a deletar
   * @returns {boolean} True se deletado com sucesso
   */
  deletePost(id: string): boolean {
    const posts = this.getPosts()
    const filtered = posts.filter(post => post.id !== id)
    
    if (filtered.length === posts.length) return false
    
    this.savePosts(filtered)
    return true
  }

  /**
   * Reseta para posts iniciais
   * 
   * Útil para resetar dados de teste.
   */
  reset(): void {
    this.savePosts(INITIAL_POSTS)
  }
}

// Instância singleton
export const blogStore = new BlogStore()

