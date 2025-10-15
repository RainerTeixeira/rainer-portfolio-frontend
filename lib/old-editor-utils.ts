/**
 * Utilitários para Editor - Otimizado para MongoDB
 * 
 * Gerencia conversão, validação e otimização de conteúdo do editor
 * para armazenamento eficiente no MongoDB (NoSQL).
 * 
 * @fileoverview Utilities para editor com foco em performance
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { TiptapJSON } from "@/types/database"

export interface EditorContent {
  json: Record<string, unknown>  // Formato estruturado (salvar no MongoDB)
  html: string             // Formato renderizado (cache/preview)
  text: string             // Texto puro (busca/indexação)
  metadata?: ContentMetadata
}

export interface ContentMetadata {
  wordCount: number
  charCount: number
  readingTime: number      // Tempo de leitura em minutos
  hasImages: boolean
  hasTables: boolean
  hasCode: boolean
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Estrutura otimizada para MongoDB
 */
export interface MongoDBPost {
  _id?: string
  title: string
  slug: string
  content: Record<string, unknown>  // JSON do Tiptap (LEVE!)
  excerpt: string          // Primeiros 160 caracteres para SEO
  plainText: string        // Para busca full-text
  metadata: ContentMetadata
  author: {
    id: string
    name: string
  }
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  category: string
  featuredImage?: string
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

/**
 * Extrai metadados do conteúdo JSON
 */
export function extractMetadata(content: EditorContent): ContentMetadata {
  const wordCount = content.text.split(/\s+/).filter(word => word.length > 0).length
  const charCount = content.text.length
  const readingTime = Math.ceil(wordCount / 200) // ~200 palavras por minuto
  
  // Detecta tipos de conteúdo
  const hasImages = JSON.stringify(content.json).includes('"type":"image"')
  const hasTables = JSON.stringify(content.json).includes('"type":"table"')
  const hasCode = JSON.stringify(content.json).includes('"type":"codeBlock"')
  
  return {
    wordCount,
    charCount,
    readingTime,
    hasImages,
    hasTables,
    hasCode,
    updatedAt: new Date()
  }
}

/**
 * Gera excerpt otimizado para SEO (160 caracteres)
 */
export function generateExcerpt(text: string, maxLength: number = 160): string {
  const cleaned = text
    .replace(/\s+/g, ' ')           // Remove múltiplos espaços
    .trim()
  
  if (cleaned.length <= maxLength) {
    return cleaned
  }
  
  // Corta no último espaço antes do limite
  const trimmed = cleaned.substring(0, maxLength)
  const lastSpace = trimmed.lastIndexOf(' ')
  
  return lastSpace > 0 
    ? trimmed.substring(0, lastSpace) + '...'
    : trimmed + '...'
}

/**
 * Prepara conteúdo para salvar no MongoDB
 * Retorna apenas dados essenciais (OTIMIZADO!)
 */
export function prepareForMongoDB(
  editorContent: EditorContent,
  postData: Partial<MongoDBPost>
): MongoDBPost {
  const metadata = extractMetadata(editorContent)
  const excerpt = generateExcerpt(editorContent.text)
  
  return {
    title: postData.title || 'Sem título',
    slug: postData.slug || generateSlug(postData.title || 'sem-titulo'),
    content: editorContent.json,           // SALVA JSON (não HTML!)
    excerpt,
    plainText: editorContent.text,         // Para busca
    metadata,
    author: postData.author || { id: '', name: '' },
    status: postData.status || 'draft',
    tags: postData.tags || [],
    category: postData.category || 'Geral',
    featuredImage: postData.featuredImage,
    publishedAt: postData.status === 'published' ? new Date() : undefined,
    createdAt: postData.createdAt || new Date(),
    updatedAt: new Date(),
  } as MongoDBPost
}

/**
 * Gera slug otimizado para URLs
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')                    // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')            // Remove caracteres especiais
    .replace(/\s+/g, '-')                // Substitui espaços por hífens
    .replace(/-+/g, '-')                 // Remove hífens duplicados
    .trim()
}

/**
 * Valida conteúdo antes de salvar
 */
export function validateContent(post: Partial<MongoDBPost>): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (!post.title || post.title.trim().length === 0) {
    errors.push('Título é obrigatório')
  }
  
  if (!post.content || Object.keys(post.content).length === 0) {
    errors.push('Conteúdo é obrigatório')
  }
  
  if (!post.author || !post.author.id) {
    errors.push('Autor é obrigatório')
  }
  
  if (post.title && post.title.length > 200) {
    errors.push('Título muito longo (máximo: 200 caracteres)')
  }
  
  if (post.plainText && post.plainText.length > 50000) {
    errors.push('Conteúdo muito longo (máximo: 50.000 caracteres)')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Calcula tamanho estimado em KB para MongoDB
 */
export function estimateSize(content: EditorContent): {
  jsonSize: number
  htmlSize: number
  savings: number
  savingsPercent: number
} {
  const jsonStr = JSON.stringify(content.json)
  const htmlStr = content.html
  
  const jsonSize = new Blob([jsonStr]).size / 1024  // KB
  const htmlSize = new Blob([htmlStr]).size / 1024  // KB
  const savings = htmlSize - jsonSize
  const savingsPercent = ((savings / htmlSize) * 100)
  
  return {
    jsonSize: Math.round(jsonSize * 100) / 100,
    htmlSize: Math.round(htmlSize * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    savingsPercent: Math.round(savingsPercent)
  }
}

/**
 * Sanitiza conteúdo HTML para exibição segura
 * (use quando precisar renderizar o HTML)
 */
export function sanitizeHTML(html: string): string {
  // Remove scripts e tags perigosas
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')      // Remove event handlers
    .replace(/on\w+='[^']*'/gi, '')
}

/**
 * Converte JSON do Tiptap para HTML
 * (para renderizar posts salvos)
 */
export function jsonToHTML(json: TiptapJSON): string {
  // Esta é uma implementação básica
  // O Tiptap tem seu próprio método generateHTML que é mais completo
  // Aqui está um exemplo simplificado
  
  if (!json || !json.type) return ''
  
  // Para produção, use: generateHTML(json, extensions)
  // onde extensions são as mesmas do editor
  return JSON.stringify(json) // Placeholder
}

/**
 * Índices recomendados para MongoDB
 */
export const MONGODB_INDEXES = {
  // Índice composto para busca e filtro
  search: { plainText: 'text', title: 'text' },
  
  // Índices para queries comuns
  slug: { slug: 1 },
  status: { status: 1, publishedAt: -1 },
  author: { 'author.id': 1, createdAt: -1 },
  category: { category: 1, createdAt: -1 },
  tags: { tags: 1 },
  
  // Índice TTL para drafts antigos (opcional)
  // drafts: { createdAt: 1, status: 1 }, expireAfterSeconds: 2592000 (30 dias)
}

/**
 * Schema de exemplo para MongoDB/Mongoose
 */
export const MONGOOSE_SCHEMA_EXAMPLE = `
import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true, index: true },
  content: { type: Object, required: true },  // JSON do Tiptap
  excerpt: { type: String, maxlength: 200 },
  plainText: { type: String, required: true },
  metadata: {
    wordCount: Number,
    charCount: Number,
    readingTime: Number,
    hasImages: Boolean,
    hasTables: Boolean,
    hasCode: Boolean
  },
  author: {
    id: { type: String, required: true },
    name: String
  },
  status: { 
    type: String, 
    enum: ['draft', 'published', 'archived'], 
    default: 'draft' 
  },
  tags: [String],
  category: String,
  featuredImage: String,
  publishedAt: Date
}, {
  timestamps: true  // Adiciona createdAt e updatedAt automaticamente
})

// Índice de busca full-text
PostSchema.index({ plainText: 'text', title: 'text' })

export const Post = mongoose.model('Post', PostSchema)
`

