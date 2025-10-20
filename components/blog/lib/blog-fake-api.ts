/**
 * Fake Blog API
 * 
 * Camada assíncrona que simula um backend para o blog usando o blog-local-store por baixo.
 * Inclui latência artificial configurável para testes realistas.
 */

import { blogStore } from "./blog-local-store"
import type { BlogPost } from "./blog-local-store"
export type { BlogPost } from "./blog-local-store"

const DEFAULT_DELAY_MS = Number(process.env.NEXT_PUBLIC_FAKE_API_DELAY ?? 300)

const delay = (ms: number = DEFAULT_DELAY_MS) => new Promise(res => setTimeout(res, ms))

export const blogApi = {
  async getPosts(): Promise<BlogPost[]> {
    await delay()
    return blogStore.getPosts()
  },
  async getPublishedPosts(): Promise<BlogPost[]> {
    await delay()
    return blogStore.getPublishedPosts()
  },
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await delay()
    return blogStore.getPostBySlug(slug)
  },
  async createPost(postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    await delay()
    return blogStore.createPost(postData)
  },
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    await delay()
    return blogStore.updatePost(id, updates)
  },
  async deletePost(id: string): Promise<boolean> {
    await delay()
    return blogStore.deletePost(id)
  },
  async reset(): Promise<void> {
    await delay()
    return blogStore.reset()
  }
}

// Public (read-only) facade for Blog pages
export const blogPublicApi = {
  async getPublishedPosts(): Promise<BlogPost[]> {
    await delay()
    return blogStore.getPublishedPosts()
  },
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await delay()
    return blogStore.getPostBySlug(slug)
  }
}

// Admin (private) facade for Dashboard (CRUD + listing)
export const blogAdminApi = {
  async getPosts(): Promise<BlogPost[]> {
    await delay()
    return blogStore.getPosts()
  },
  async createPost(postData: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    await delay()
    return blogStore.createPost(postData)
  },
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    await delay()
    return blogStore.updatePost(id, updates)
  },
  async deletePost(id: string): Promise<boolean> {
    await delay()
    return blogStore.deletePost(id)
  },
  async reset(): Promise<void> {
    await delay()
    return blogStore.reset()
  }
}
