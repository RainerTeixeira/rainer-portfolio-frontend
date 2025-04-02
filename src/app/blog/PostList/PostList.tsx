"use client";

import React, { useEffect, useState, useCallback } from "react";
import PostCard from "@/app/components/blog/postCard/PostCard";
import NavPostList from "@/app/components/blog/nav/NavPostList";
import AsidePostList from "@/app/components/blog/aside/AsidePostList";

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

const PostList: React.FC<{ limit?: number }> = ({ limit = 10 }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextKey, setNextKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = `http://localhost:4000/blog/posts?limit=${limit}`;

    const loadPosts = useCallback(async () => {
        if (loading) return;
        try {
            setLoading(true);
            const url = nextKey ? `${API_URL}&nextKey=${encodeURIComponent(nextKey)}` : API_URL;
            const response = await fetch(url);

            if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);

            const result: ApiResponse = await response.json();
            const postsData = result.data?.data?.data || [];
            setPosts((prev) => [...prev, ...postsData]);
            setNextKey(result.data?.data?.nextKey);
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
                <NavPostList />
                <div className="bg-white rounded-lg shadow-md p-8 sm:p-10 lg:p-12 min-w-0">
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">Últimos Posts</h1>
                    {loading && posts.length === 0 && <p>Carregando...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <PostCard key={`${post.postId}-${index}`} {...post} />
                        ))}
                    </div>
                    {nextKey && !loading && (
                        <button onClick={loadPosts} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                            Carregar mais
                        </button>
                    )}
                    {!nextKey && posts.length > 0 && !loading && <p className="mt-4 text-gray-500">Fim dos posts</p>}
                </div>
                <AsidePostList />
            </div>
        </main>
    );
};

export default PostList;