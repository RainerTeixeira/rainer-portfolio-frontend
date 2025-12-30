/**
 * Exemplo de como consumir a API do Backend no Frontend
 * 
 * Este arquivo demonstra como usar os clientes HTTP para buscar
 * e manipular dados do backend.
 */

import { publicClient } from '@/lib/api/clients/public-client';
import { API_ENDPOINTS } from '@/lib/api/config/endpoints';

// Exemplo 1: Buscar todos os posts
export async function getPosts() {
  try {
    const posts = await publicClient.get(API_ENDPOINTS.PUBLIC.POSTS.LIST);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

// Exemplo 2: Buscar post por ID
export async function getPostById(id: string) {
  try {
    const post = await publicClient.get(API_ENDPOINTS.PUBLIC.POSTS.BY_ID(id));
    return post;
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    throw error;
  }
}

// Exemplo 3: Buscar posts por slug
export async function getPostBySlug(slug: string) {
  try {
    const post = await publicClient.get(API_ENDPOINTS.PUBLIC.POSTS.BY_SLUG(slug));
    return post;
  } catch (error) {
    console.error('Erro ao buscar post por slug:', error);
    throw error;
  }
}

// Exemplo 4: Buscar categorias
export async function getCategories() {
  try {
    const categories = await publicClient.get(API_ENDPOINTS.PUBLIC.CATEGORIES.LIST);
    return categories;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
}

// Exemplo 5: Buscar categoria por ID
export async function getCategoryById(id: string) {
  try {
    const category = await publicClient.get(API_ENDPOINTS.PUBLIC.CATEGORIES.BY_ID(id));
    return category;
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    throw error;
  }
}

// Exemplo 6: Buscar comentários de um post
export async function getCommentsByPost(postId: string) {
  try {
    const comments = await publicClient.get('/comments', { postId });
    return comments;
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    throw error;
  }
}

// Exemplo 7: Buscar usuários
export async function getUsers() {
  try {
    const users = await publicClient.get(API_ENDPOINTS.PUBLIC.USERS?.LIST || '/users');
    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
}

// Exemplo 8: Health Check
export async function checkHealth() {
  try {
    const health = await publicClient.get(API_ENDPOINTS.PUBLIC.HEALTH.BASIC);
    return health;
  } catch (error) {
    console.error('Erro ao verificar saúde da API:', error);
    throw error;
  }
}

// Exemplo 9: Buscar posts populares
export async function getPopularPosts() {
  try {
    const posts = await publicClient.get(API_ENDPOINTS.PUBLIC.POSTS.POPULAR);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts populares:', error);
    throw error;
  }
}

// Exemplo 10: Buscar posts com filtros
export async function getPostsWithFilters(filters: {
  page?: number;
  limit?: number;
  status?: string;
  categoryId?: string;
}) {
  try {
    const posts = await publicClient.get(API_ENDPOINTS.PUBLIC.POSTS.LIST, filters);
    return posts;
  } catch (error) {
    console.error('Erro ao buscar posts com filtros:', error);
    throw error;
  }
}

// Exemplo de uso em um componente React:
/*
import { useEffect, useState } from 'react';
import { getPosts, getCategories } from '@/lib/api/blog-service';

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getPosts(),
          getCategories()
        ]);
        setPosts(postsData.data || postsData);
        setCategories(categoriesData.data || categoriesData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
*/
