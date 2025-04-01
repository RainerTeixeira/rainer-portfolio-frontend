"use client";

import React, { useEffect, useState, useCallback } from "react";
import PostCard from "@/app/components/blog/postCard/PostCard";

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

const PostList: React.FC<{ limit: number }> = ({ limit }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextKey, setNextKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = `http://localhost:4000/blog/posts?limit=${limit}`;

    const loadPosts = useCallback(async () => {
        if (loading || !API_URL) return; // Evitar chamadas repetidas
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
            loadPosts(); // Carregar posts apenas uma vez
        }
    }, [posts.length, loading, loadPosts]);

    return (
        <div>
            {loading && posts.length === 0 && <div>Carregando...</div>}
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
            {!nextKey && !loading && <div className="mt-4 text-gray-500">Fim dos posts</div>}
        </div>
    );
};

export default PostList;