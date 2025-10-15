/**
 * Validações com Zod
 * 
 * Schemas de validação para formulários e dados do backend.
 * 
 * @fileoverview Validações usando Zod
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import { z } from 'zod'

// ═══════════════════════════════════════════════════════════════════════════
// SCHEMAS DE VALIDAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Schema para conteúdo JSON do Tiptap
 */
export const tiptapJSONSchema = z.object({
  type: z.literal('doc'),
  content: z.array(z.any()).optional(),
})

/**
 * Schema para criar post
 */
export const createPostSchema = z.object({
  title: z.string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(200, 'Título não pode ter mais de 200 caracteres'),
  
  slug: z.string()
    .min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  
  content: tiptapJSONSchema,
  
  categoryId: z.string().optional().nullable(),
  
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED', 'TRASH']).default('DRAFT'),
  
  featured: z.boolean().default(false),
  
  allowComments: z.boolean().default(true),
  
  pinned: z.boolean().default(false),
  
  priority: z.number().int().min(0).max(100).default(0),
  
  publishedAt: z.date().optional().nullable(),
})

/**
 * Schema para atualizar post
 */
export const updatePostSchema = z.object({
  title: z.string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .max(200, 'Título não pode ter mais de 200 caracteres')
    .optional(),
  
  slug: z.string()
    .regex(/^[a-z0-9-]+$/, 'Slug inválido')
    .optional(),
  
  content: tiptapJSONSchema.optional(),
  
  categoryId: z.string().optional().nullable(),
  
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED', 'TRASH']).optional(),
  
  featured: z.boolean().optional(),
  
  allowComments: z.boolean().optional(),
  
  pinned: z.boolean().optional(),
  
  priority: z.number().int().min(0).max(100).optional(),
  
  publishedAt: z.date().optional().nullable(),
})

/**
 * Schema para login
 */
export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  
  password: z.string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

/**
 * Schema para upload de arquivo
 */
export const uploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
      'Apenas imagens são permitidas (JPEG, PNG, WebP, GIF)'
    ),
})

/**
 * Schema para criar categoria
 */
export const categorySchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome não pode ter mais de 50 caracteres'),
  
  slug: z.string()
    .regex(/^[a-z0-9-]+$/, 'Slug inválido'),
  
  description: z.string().optional(),
  
  color: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser hexadecimal (#RRGGBB)')
    .optional(),
  
  icon: z.string().optional(),
  
  parentId: z.string().optional().nullable(),
  
  order: z.number().int().min(0).default(0),
})

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS INFERIDOS
// ═══════════════════════════════════════════════════════════════════════════

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UploadInput = z.infer<typeof uploadSchema>
export type CategoryInput = z.infer<typeof categorySchema>

// ═══════════════════════════════════════════════════════════════════════════
// FUNÇÕES DE VALIDAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Valida dados de post
 * 
 * @param data - Dados a validar
 * @returns Objeto com sucesso e erros
 */
export function validatePost(data: unknown): {
  success: boolean
  errors?: Record<string, string[]>
  data?: CreatePostInput | UpdatePostInput
} {
  try {
    const validated = createPostSchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })
      
      return { success: false, errors }
    }
    
    return { success: false, errors: { _form: ['Erro de validação'] } }
  }
}

/**
 * Valida login
 */
export function validateLogin(data: unknown): {
  success: boolean
  errors?: Record<string, string[]>
  data?: LoginInput
} {
  try {
    const validated = loginSchema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })
      
      return { success: false, errors }
    }
    
    return { success: false, errors: { _form: ['Erro de validação'] } }
  }
}

