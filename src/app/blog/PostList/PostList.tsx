"use client";

import React, { useEffect, useState, useCallback } from "react";
import PostCard from "@/app/components/blog/postCard/PostCard";
import NavPostList from "@/app/components/blog/nav/NavPostList"; // Importe o novo componente de navegação
import AsidePostList from "@/app/components/blog/aside/AsidePostList"; // Importe o novo componente da barra lateral

interface Post {
    postId: string;
    title: string;
    description: string;
    publishDate: string;
    slug: string;
    featuredImageURL?: string;
}

interface ApiResponse {
    success: boolean;
    data: {
        data: {
            data: Post[];
            total: number;
            hasMore: boolean;
            nextKey: string | null;
        };
        timestamp: string;
        path: string;
        statusCode: number;
    };
}

const PostList: React.FC<{ limit?: number }> = ({ limit = 9 }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextKey, setNextKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = `http://localhost:4000/blog/posts?limit=${limit}`;

    const loadPosts = useCallback(async () => {
        if (loading || !API_URL) return;
        try {
            setLoading(true);
            const url = nextKey ? `${API_URL}&nextKey=${encodeURIComponent(nextKey)}` : API_URL;
            const response = await fetch(url);

            if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);

            const result: ApiResponse = await response.json();
            const postsData = result.data?.data?.data || [];
            const newNextKey = result.data?.data?.nextKey;

            setPosts((prev) => [...prev, ...postsData]);
            setNextKey(newNextKey);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, [loading, nextKey, API_URL]);

    useEffect(() => {
        if (posts.length === 0 && !loading) {
            loadPosts();
        }
    }, [posts.length, loading, loadPosts]);

    return (
        <main className="w-full px-4 sm:px-6 py-12 bg-gray-50 min-h-screen">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr_minmax(250px,300px)] gap-10 max-w-[1800px]">
                {/* Coluna Esquerda - Nav (Filtros) */}
                <NavPostList />

                {/* Conteúdo Principal - Lista de Posts */}
                <div className="bg-white rounded-lg shadow-md p-8 sm:p-10 lg:p-12 min-w-0">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">Últimos Posts</h1>
                    {loading && posts.length === 0 && (
                        <div className="flex flex-col items-center">
                            <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <div className="text-xl font-semibold text-gray-600">Carregando os posts...</div>
                        </div>
                    )}
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <PostCard
                                key={`${post.postId}-${index}`}
                                title={post.title}
                                summary={post.description}
                                imageUrl={post.featuredImageURL || ""}
                                slug={post.slug}
                            />
                        ))}
                    </div>
                    {nextKey && !loading && (
                        <button
                            onClick={loadPosts}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Carregar mais
                        </button>
                    )}
                    {!nextKey && posts.length > 0 && !loading && (
                        <div className="mt-4 text-gray-500">Fim dos posts</div>
                    )}
                </div>

                {/* Coluna Direita - Aside (Destaques) */}
                <AsidePostList />
            </div>
        </main>
    );
};

export default PostList;