// src/hooks/usePosts.tsx
import { useState, useEffect, useCallback } from "react";

export interface Post {
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

export const usePosts = (limit: number = 10) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextKey, setNextKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = `http://localhost:4000/blog/posts?limit=${limit}`;

    const fetchPosts = useCallback(async () => {
        if (loading) return;
        try {
            setLoading(true);
            const url = nextKey
                ? `${API_URL}&nextKey=${encodeURIComponent(nextKey)}`
                : API_URL;
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Erro HTTP! Status: ${response.status}`);

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
            fetchPosts();
        }
    }, [posts, loading, fetchPosts]);

    return { posts, nextKey, loading, error, fetchPosts };
};
