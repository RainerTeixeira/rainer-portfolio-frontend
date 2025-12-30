/**
 * Componente de Lista de Posts
 * 
 * Exemplo simples de como consumir e exibir os posts da API
 */

'use client';

import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: any;
  publishedAt: string;
  authorId: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  featured: boolean;
  status: string;
}

export function BlogPostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Usando proxy do Next.js em desenvolvimento
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();
        
        // Extrair posts da resposta
        const postsData = data.data || data;
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (err) {
        console.error('Erro ao buscar posts:', err);
        setError('Não foi possível carregar os posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Função para extrair texto do conteúdo
  const getExcerpt = (content: any): string => {
    if (!content || !content.content) return '';
    const firstParagraph = content.content.find((item: any) => item.type === 'paragraph');
    if (firstParagraph && firstParagraph.content) {
      return firstParagraph.content.map((textItem: any) => textItem.text).join('').substring(0, 200) + '...';
    }
    return '';
  };

  // Formatar data
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Filtrar posts publicados
  const publishedPosts = posts.filter(post => post.status === 'PUBLISHED');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Blog ({publishedPosts.length} posts)
      </h2>

      {publishedPosts.length === 0 ? (
        <p className="text-gray-500">Nenhum post encontrado.</p>
      ) : (
        <div className="grid gap-6">
          {publishedPosts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header do Post */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">
                  {formatDate(post.publishedAt)}
                </span>
                {post.featured && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Em destaque
                  </span>
                )}
              </div>

              {/* Título */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <a 
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </a>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 mb-4">
                {getExcerpt(post.content)}
              </p>

              {/* Footer com métricas */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {post.views}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {post.likesCount}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {post.commentsCount}
                  </span>
                </div>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ler mais →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// Exportar também uma função para uso server-side
export async function getServerSidePosts() {
  try {
    const response = await fetch('http://localhost:4000/api/v1/posts');
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error('Erro ao buscar posts no server:', error);
    return [];
  }
}
