/**
 * Tipos TypeScript baseados no Prisma Schema
 * 
 * Estes tipos refletem exatamente a estrutura do banco MongoDB
 * e devem ser mantidos sincronizados com o schema.prisma
 * 
 * @fileoverview Tipos do banco de dados
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ═══════════════════════════════════════════════════════════════════════════
// ENUMS
// ═══════════════════════════════════════════════════════════════════════════

export enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  AUTHOR = "AUTHOR",
  SUBSCRIBER = "SUBSCRIBER"
}

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  SCHEDULED = "SCHEDULED",
  TRASH = "TRASH"
}

export enum NotificationType {
  NEW_COMMENT = "NEW_COMMENT",
  NEW_LIKE = "NEW_LIKE",
  NEW_FOLLOWER = "NEW_FOLLOWER",
  POST_PUBLISHED = "POST_PUBLISHED",
  MENTION = "MENTION",
  SYSTEM = "SYSTEM"
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES - MODELS DO PRISMA
// ═══════════════════════════════════════════════════════════════════════════

/**
 * User - Usuário do sistema
 */
export interface User {
  id: string
  email: string
  username: string
  password: string
  name: string
  avatar?: string | null
  bio?: string | null
  website?: string | null
  socialLinks?: Record<string, string> | null
  role: UserRole
  isActive: boolean
  isVerified: boolean
  isBanned: boolean
  banReason?: string | null
  lastLogin?: Date | null
  postsCount: number
  commentsCount: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Post - Artigo/Post do blog (Schema Simplificado)
 * 
 * IMPORTANTE: Campo 'content' é OBRIGATÓRIO e deve ser JSON do Tiptap:
 * {
 *   type: 'doc',
 *   content: [
 *     { type: 'paragraph', content: [...] },
 *     { type: 'heading', attrs: { level: 1 }, content: [...] },
 *     ...
 *   ]
 * }
 */
export interface Post {
  // Identificação
  id: string
  
  // Conteúdo Principal (OBRIGATÓRIOS)
  title: string
  slug: string
  content: TiptapJSON // JSON do editor Tiptap (OBRIGATÓRIO!)
  
  // Classificação
  categoryId?: string | null
  authorId: string
  
  // Status e Publicação
  status: PostStatus
  featured: boolean
  allowComments: boolean
  pinned: boolean
  priority: number
  
  // Datas
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  
  // Estatísticas (atualizadas via relações)
  views: number
  likesCount: number
  commentsCount: number
  bookmarksCount: number
}

/**
 * Category - Categoria de posts
 */
export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  color?: string | null
  icon?: string | null
  coverImage?: string | null
  parentId?: string | null
  order: number
  metaDescription?: string | null
  isActive: boolean
  postsCount: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Comment - Comentário em posts
 */
export interface Comment {
  id: string
  content: string
  contentJson?: TiptapJSON | null
  authorId: string
  postId: string
  parentId?: string | null
  isApproved: boolean
  isReported: boolean
  reportReason?: string | null
  isEdited: boolean
  likesCount: number
  createdAt: Date
  updatedAt: Date
  editedAt?: Date | null
}

/**
 * Like - Curtidas em posts
 */
export interface Like {
  id: string
  userId: string
  postId: string
  createdAt: Date
}

/**
 * Bookmark - Posts salvos
 */
export interface Bookmark {
  id: string
  userId: string
  postId: string
  collection?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Notification - Notificações do sistema
 */
export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  link?: string | null
  metadata?: Record<string, any> | null
  isRead: boolean
  userId: string
  createdAt: Date
  readAt?: Date | null
}

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Estrutura JSON do Tiptap
 * Representa o documento completo do editor
 */
export interface TiptapJSON {
  type: 'doc'
  content?: TiptapNode[]
}

/**
 * Nó do documento Tiptap
 */
export interface TiptapNode {
  type: string
  attrs?: Record<string, any>
  content?: TiptapNode[]
  marks?: TiptapMark[]
  text?: string
}

/**
 * Marca de formatação do Tiptap
 */
export interface TiptapMark {
  type: string
  attrs?: Record<string, any>
}

/**
 * Imagem da galeria
 */
export interface GalleryImage {
  url: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

/**
 * Dados do Open Graph para SEO
 */
export interface OpenGraphData {
  title?: string
  description?: string
  image?: string
  type?: string
  url?: string
  siteName?: string
  locale?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// DTOS - DATA TRANSFER OBJECTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * DTO para criar um novo post (baseado no schema simplificado)
 */
export interface CreatePostDTO {
  // Obrigatórios
  title: string
  slug: string
  content: TiptapJSON
  authorId: string
  
  // Opcionais
  categoryId?: string
  status?: PostStatus
  featured?: boolean
  allowComments?: boolean
  pinned?: boolean
  priority?: number
  publishedAt?: Date
}

/**
 * DTO para atualizar um post (baseado no schema simplificado)
 */
export interface UpdatePostDTO {
  title?: string
  slug?: string
  content?: TiptapJSON
  categoryId?: string
  status?: PostStatus
  featured?: boolean
  allowComments?: boolean
  pinned?: boolean
  priority?: number
  publishedAt?: Date
}

/**
 * Post com relações populadas
 */
export interface PostWithRelations extends Post {
  author?: User
  category?: Category
  comments?: Comment[]
}

/**
 * Resposta paginada de posts
 */
export interface PaginatedPosts {
  posts: PostWithRelations[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

