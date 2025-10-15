/**
 * Hooks para Posts
 * 
 * Hooks React Query para gerenciar posts com cache e optimistic updates.
 * 
 * @fileoverview Hooks de posts com React Query
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  getPosts, 
  getPostBySlug, 
  createPost, 
  updatePost, 
  deletePost,
  publishPost,
  unpublishPost,
  incrementViews,
  likePost,
  unlikePost,
  bookmarkPost,
  unbookmarkPost
} from '@/lib/api-client'
import type { CreatePostDTO, UpdatePostDTO, Post } from '@/types/database'
import { toast } from 'sonner'

// ═══════════════════════════════════════════════════════════════════════════
// QUERY KEYS
// ═══════════════════════════════════════════════════════════════════════════

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: any) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (slug: string) => [...postKeys.details(), slug] as const,
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS DE QUERY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook para listar posts com paginação e filtros
 */
export function usePosts(params?: {
  page?: number
  pageSize?: number
  status?: string
  categoryId?: string
  search?: string
  featured?: boolean
}) {
  return useQuery({
    queryKey: postKeys.list(params || {}),
    queryFn: () => getPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

/**
 * Hook para buscar post por slug
 */
export function usePost(slug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: postKeys.detail(slug),
    queryFn: () => getPostBySlug(slug),
    enabled: enabled && !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS DE MUTATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook para criar post
 */
export function useCreatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreatePostDTO) => createPost(data),
    onSuccess: (newPost) => {
      // Invalida cache de listagens
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      
      // Adiciona ao cache de detalhes
      queryClient.setQueryData(postKeys.detail(newPost.slug), newPost)
      
      toast.success('Post criado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Erro ao criar post')
    },
  })
}

/**
 * Hook para atualizar post
 */
export function useUpdatePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: UpdatePostDTO }) =>
      updatePost(slug, data),
    onMutate: async ({ slug, data }) => {
      // Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: postKeys.detail(slug) })
      
      // Snapshot do valor anterior
      const previousPost = queryClient.getQueryData(postKeys.detail(slug))
      
      // Atualização otimista
      queryClient.setQueryData(postKeys.detail(slug), (old: any) => ({
        ...old,
        ...data,
      }))
      
      return { previousPost }
    },
    onError: (err, { slug }, context) => {
      // Reverte em caso de erro
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(slug), context.previousPost)
      }
      toast.error('Erro ao atualizar post')
    },
    onSuccess: (updatedPost) => {
      // Invalida listagens
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      toast.success('Post atualizado!')
    },
  })
}

/**
 * Hook para deletar post
 */
export function useDeletePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (slug: string) => deletePost(slug),
    onSuccess: (_, slug) => {
      // Remove do cache
      queryClient.removeQueries({ queryKey: postKeys.detail(slug) })
      
      // Invalida listagens
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      
      toast.success('Post deletado!')
    },
    onError: () => {
      toast.error('Erro ao deletar post')
    },
  })
}

/**
 * Hook para publicar post
 */
export function usePublishPost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (slug: string) => publishPost(slug),
    onSuccess: (updatedPost) => {
      // Atualiza cache
      queryClient.setQueryData(postKeys.detail(updatedPost.slug), updatedPost)
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      
      toast.success('Post publicado!')
    },
    onError: () => {
      toast.error('Erro ao publicar post')
    },
  })
}

/**
 * Hook para despublicar post
 */
export function useUnpublishPost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (slug: string) => unpublishPost(slug),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.detail(updatedPost.slug), updatedPost)
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      
      toast.success('Post despublicado!')
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERAÇÕES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook para curtir/descurtir post
 */
export function useLikePost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ postId, isLiked }: { postId: string; isLiked: boolean }) =>
      isLiked ? unlikePost(postId) : likePost(postId),
    onMutate: async ({ postId, isLiked }) => {
      // Atualização otimista
      await queryClient.cancelQueries({ queryKey: postKeys.all })
      
      // Atualiza contador localmente
      queryClient.setQueriesData({ queryKey: postKeys.all }, (old: any) => {
        if (!old) return old
        
        return {
          ...old,
          likesCount: isLiked ? old.likesCount - 1 : old.likesCount + 1
        }
      })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
      toast.error('Erro ao curtir post')
    },
  })
}

/**
 * Hook para salvar/remover bookmark
 */
export function useBookmarkPost() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ postId, isBookmarked, collection }: { 
      postId: string
      isBookmarked: boolean
      collection?: string 
    }) =>
      isBookmarked ? unbookmarkPost(postId) : bookmarkPost(postId, collection),
    onMutate: async ({ postId, isBookmarked }) => {
      await queryClient.cancelQueries({ queryKey: postKeys.all })
      
      queryClient.setQueriesData({ queryKey: postKeys.all }, (old: any) => {
        if (!old) return old
        
        return {
          ...old,
          bookmarksCount: isBookmarked ? old.bookmarksCount - 1 : old.bookmarksCount + 1
        }
      })
    },
    onSuccess: (_, { isBookmarked }) => {
      toast.success(isBookmarked ? 'Removido dos salvos' : 'Post salvo!')
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
      toast.error('Erro ao salvar post')
    },
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// VIEWS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook para incrementar views (chamado automaticamente ao abrir post)
 */
export function useIncrementViews(slug: string) {
  return useMutation({
    mutationFn: () => incrementViews(slug),
    // Silencioso, não mostra toast
  })
}

