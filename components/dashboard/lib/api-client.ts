/**
 * API Client
 *
 * Cliente HTTP centralizado para comunicação com backend.
 * Gerencia autenticação, erros e transformações de dados.
 *
 * @fileoverview Cliente de API com tratamento de erros
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type {
  Category,
  CreatePostData,
  Post,
  PostFilters,
  PostsListResponse,
  UpdatePostData,
  User,
} from '@/lib/api/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

/**
 * Classe de erro customizada para API
 */
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Obtém token de autenticação do localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  const authUser = localStorage.getItem('auth_user');
  if (!authUser) return null;

  try {
    const user = JSON.parse(authUser);
    // TODO: Quando implementar JWT real, retornar o token
    return user.token || null;
  } catch {
    return null;
  }
}

/**
 * Função base para fazer requisições HTTP
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Trata erros HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Redireciona para login se não autorizado
      if (response.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('auth_user');
        window.location.href = '/';
      }

      throw new APIError(
        errorData.message || 'Erro na requisição',
        response.status,
        errorData
      );
    }

    // Retorna JSON
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    // Erro de rede ou parse
    throw new APIError('Erro de conexão com o servidor', 0, error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// POSTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Lista posts com paginação e filtros
 */
export async function getPosts(
  params?: PostFilters
): Promise<PostsListResponse> {
  const query = new URLSearchParams();

  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());
  if (params?.status) query.set('status', params.status);
  if (params?.subcategoryId) query.set('subcategoryId', params.subcategoryId);
  if (params?.authorId) query.set('authorId', params.authorId);
  if (params?.search) query.set('search', params.search);
  if (params?.featured !== undefined)
    query.set('featured', params.featured.toString());

  const queryString = query.toString();
  return fetchAPI<PostsListResponse>(
    `/posts${queryString ? `?${queryString}` : ''}`
  );
}

/**
 * Busca post por slug
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/posts/${slug}`);
}

/**
 * Cria novo post
 */
export async function createPost(data: CreatePostData): Promise<Post> {
  return fetchAPI<Post>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Atualiza post existente
 */
export async function updatePost(
  slug: string,
  data: UpdatePostData
): Promise<Post> {
  return fetchAPI<Post>(`/posts/${slug}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Deleta post
 */
export async function deletePost(slug: string): Promise<void> {
  return fetchAPI<void>(`/posts/${slug}`, {
    method: 'DELETE',
  });
}

/**
 * Publica post (muda status para PUBLISHED)
 */
export async function publishPost(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/posts/${slug}/publish`, {
    method: 'POST',
  });
}

/**
 * Despublica post (volta para DRAFT)
 */
export async function unpublishPost(slug: string): Promise<Post> {
  return fetchAPI<Post>(`/posts/${slug}/unpublish`, {
    method: 'POST',
  });
}

/**
 * Incrementa visualizações de um post
 */
export async function incrementViews(slug: string): Promise<void> {
  return fetchAPI<void>(`/posts/${slug}/view`, {
    method: 'POST',
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// LIKES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Curtir post
 */
export async function likePost(postId: string): Promise<void> {
  return fetchAPI<void>(`/posts/${postId}/like`, {
    method: 'POST',
  });
}

/**
 * Descurtir post
 */
export async function unlikePost(postId: string): Promise<void> {
  return fetchAPI<void>(`/posts/${postId}/like`, {
    method: 'DELETE',
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// BOOKMARKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Salvar post (bookmark)
 */
export async function bookmarkPost(
  postId: string,
  collection?: string
): Promise<void> {
  return fetchAPI<void>(`/posts/${postId}/bookmark`, {
    method: 'POST',
    body: JSON.stringify({ collection }),
  });
}

/**
 * Remover bookmark
 */
export async function unbookmarkPost(postId: string): Promise<void> {
  return fetchAPI<void>(`/posts/${postId}/bookmark`, {
    method: 'DELETE',
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Lista todas as categorias
 */
export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>('/categories');
}

/**
 * Cria nova categoria
 */
export async function createCategory(
  data: Partial<Category>
): Promise<Category> {
  return fetchAPI<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// UPLOADS
// ═══════════════════════════════════════════════════════════════════════════

export interface PresignedUpload {
  url: string;
  fields: Record<string, string>;
  fileUrl: string;
}

/**
 * Solicita URL pré-assinada para upload S3
 */
export async function getPresignedUpload(
  filename: string,
  contentType: string
): Promise<PresignedUpload> {
  return fetchAPI<PresignedUpload>('/uploads/presign', {
    method: 'POST',
    body: JSON.stringify({ filename, contentType }),
  });
}

/**
 * Faz upload de arquivo para S3 usando presigned URL
 */
export async function uploadFile(
  file: File,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onProgress?: (progress: number) => void
): Promise<string> {
  // 1. Solicita presigned URL
  const { url, fields, fileUrl } = await getPresignedUpload(
    file.name,
    file.type
  );

  // 2. Prepara form data
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('file', file);

  // 3. Upload para S3
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Falha no upload');
  }

  // 4. Retorna URL da imagem
  return fileUrl;
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════════════════════

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Faz login
 */
export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return fetchAPI<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

/**
 * Busca dados do usuário logado
 */
export async function getCurrentUser(): Promise<User> {
  return fetchAPI<User>('/auth/me');
}

/**
 * Faz logout (invalida token)
 */
export async function logout(): Promise<void> {
  return fetchAPI<void>('/auth/logout', {
    method: 'POST',
  });
}
