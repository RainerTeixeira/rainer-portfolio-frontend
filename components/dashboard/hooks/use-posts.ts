/**
 * Hooks para Gerenciamento de Posts do Dashboard
 * 
 * Hooks React Query para CRUD completo de posts com cache inteligente,
 * optimistic updates e sincronização automática.
 * 
 * Funcionalidades:
 * - ✓ Listagem com paginação e filtros
 * - ✓ Busca por slug individual
 * - ✓ CRUD completo (Create, Read, Update, Delete)
 * - ✓ Publicar/Despublicar posts
 * - ✓ Sistema de curtidas
 * - ✓ Sistema de bookmarks
 * - ✓ Incremento de views
 * - ✓ Cache inteligente (5 minutos)
 * - ✓ Optimistic updates
 * - ✓ Rollback em caso de erro
 * - ✓ Notificações toast
 * 
 * Uso principal:
 * - Dashboard de administração de posts
 * - Editor de posts
 * - Listagens e filtros
 * 
 * @fileoverview Hooks React Query para gerenciamento de posts
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import {
  bookmarkPost,
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  incrementViews,
  likePost,
  publishPost,
  unbookmarkPost,
  unlikePost,
  unpublishPost,
  updatePost
} from '@/components/dashboard/lib/api-client'
import type { CreatePostDTO, UpdatePostDTO } from '@/types/database'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

// ═══════════════════════════════════════════════════════════════════════════
// QUERY KEYS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Keys padronizadas para cache do React Query
 * Permite invalidação e refetch granulares
 * 
 * @constant
 */
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: any) => [...postKeys.lists(), filters] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (slug: string) => [...postKeys.details(), slug] as const,
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS DE QUERY (LEITURA)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook usePosts
 * 
 * Lista posts com paginação, filtros e cache de 5 minutos.
 * 
 * @param {Object} [params] - Parâmetros de filtro
 * @param {number} [params.page] - Número da página
 * @param {number} [params.pageSize] - Itens por página
 * @param {string} [params.status] - Status do post (draft, published)
 * @param {string} [params.categoryId] - Filtrar por categoria
 * @param {string} [params.search] - Busca textual
 * @param {boolean} [params.featured] - Apenas posts destacados
 * 
 * @returns {UseQueryResult} Resultado do React Query
 * 
 * @example
 * import { usePosts } from '@/components/dashboard/hooks'
 * 
 * function PostsList() {
 *   const { data, isLoading, error } = usePosts({
 *     page: 1,
 *     pageSize: 10,
 *     status: 'published'
 *   })
 *   
 *   if (isLoading) return <Spinner />
 *   
 *   return (
 *     <div>
 *       {data?.posts.map(post => (
 *         <PostCard key={post.id} post={post} />
 *       ))}
 *     </div>
 *   )
 * }
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
 * Hook usePost
 * 
 * Busca um post específico por slug com cache.
 * 
 * @param {string} slug - Slug único do post
 * @param {boolean} [enabled=true] - Se a query está ativa
 * 
 * @returns {UseQueryResult} Resultado do React Query
 * 
 * @example
 * import { usePost } from '@/components/dashboard/hooks'
 * 
 * function PostEditor({ slug }) {
 *   const { data: post, isLoading } = usePost(slug)
 *   
 *   if (isLoading) return <Skeleton />
 *   
 *   return <Editor initialContent={post.content} />
 * }
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
// HOOKS DE MUTATION (ESCRITA)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook useCreatePost
 * 
 * Cria um novo post e atualiza o cache automaticamente.
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useCreatePost } from '@/components/dashboard/hooks'
 * 
 * function NewPostForm() {
 *   const createPost = useCreatePost()
 *   
 *   const handleSubmit = async (data) => {
 *     await createPost.mutateAsync(data)
 *     router.push('/dashboard')
 *   }
 *   
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input name="title" />
 *       <textarea name="content" />
 *       <button type="submit">Criar</button>
 *     </form>
 *   )
 * }
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
 * Hook useUpdatePost
 * 
 * Atualiza um post existente com optimistic update.
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useUpdatePost } from '@/components/dashboard/hooks'
 * 
 * function EditPostForm({ slug }) {
 *   const updatePost = useUpdatePost()
 *   
 *   const handleSave = async (data) => {
 *     await updatePost.mutateAsync({ slug, data })
 *   }
 *   
 *   return (
 *     <form onSubmit={handleSave}>
 *       <input name="title" defaultValue={post.title} />
 *       <button type="submit">Atualizar</button>
 *     </form>
 *   )
 * }
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
 * Hook useDeletePost
 * 
 * Deleta um post e atualiza o cache.
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useDeletePost } from '@/components/dashboard/hooks'
 * 
 * function DeleteButton({ slug }) {
 *   const deletePost = useDeletePost()
 *   
 *   const handleDelete = async () => {
 *     if (confirm('Tem certeza?')) {
 *       await deletePost.mutateAsync(slug)
 *     }
 *   }
 *   
 *   return <button onClick={handleDelete}>Deletar</button>
 * }
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
 * Hook usePublishPost
 * 
 * Publica um post (muda status de draft para published).
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { usePublishPost } from '@/components/dashboard/hooks'
 * 
 * function PublishButton({ slug }) {
 *   const publishPost = usePublishPost()
 *   
 *   return (
 *     <button onClick={() => publishPost.mutate(slug)}>
 *       Publicar
 *     </button>
 *   )
 * }
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
 * Hook useUnpublishPost
 * 
 * Despublica um post (volta para draft).
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useUnpublishPost } from '@/components/dashboard/hooks'
 * 
 * function UnpublishButton({ slug }) {
 *   const unpublishPost = useUnpublishPost()
 *   
 *   return (
 *     <button onClick={() => unpublishPost.mutate(slug)}>
 *       Despublicar
 *     </button>
 *   )
 * }
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
 * Hook useLikePost
 * 
 * Curtir ou descurtir post com optimistic update.
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useLikePost } from '@/components/dashboard/hooks'
 * 
 * function LikeButton({ postId, isLiked }) {
 *   const likePost = useLikePost()
 *   
 *   return (
 *     <button onClick={() => likePost.mutate({ postId, isLiked })}>
 *       {isLiked ? '❤️' : '🤍'}
 *     </button>
 *   )
 * }
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
 * Hook useBookmarkPost
 * 
 * Salvar ou remover post dos bookmarks com optimistic update.
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useBookmarkPost } from '@/components/dashboard/hooks'
 * 
 * function BookmarkButton({ postId, isBookmarked }) {
 *   const bookmarkPost = useBookmarkPost()
 *   
 *   return (
 *     <button 
 *       onClick={() => bookmarkPost.mutate({ 
 *         postId, 
 *         isBookmarked,
 *         collection: 'favorites' 
 *       })}
 *     >
 *       {isBookmarked ? '🔖' : '📑'}
 *     </button>
 *   )
 * }
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
 * Hook useIncrementViews
 * 
 * Incrementa contador de visualizações de um post.
 * Chamado automaticamente ao abrir um post.
 * 
 * @param {string} slug - Slug do post
 * 
 * @returns {UseMutationResult} Mutation do React Query
 * 
 * @example
 * import { useIncrementViews } from '@/components/dashboard/hooks'
 * 
 * function PostPage({ slug }) {
 *   const incrementViews = useIncrementViews(slug)
 *   
 *   useEffect(() => {
 *     incrementViews.mutate()
 *   }, [])
 *   
 *   return <Article slug={slug} />
 * }
 */
export function useIncrementViews(slug: string) {
  return useMutation({
    mutationFn: () => incrementViews(slug),
    // Silencioso, não mostra toast
  })
}

