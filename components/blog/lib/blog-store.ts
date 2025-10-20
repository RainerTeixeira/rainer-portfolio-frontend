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
import { INITIAL_POSTS } from './blog-mock-data'

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

