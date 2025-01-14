"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Definindo as constantes de configuração
const TOTAL_POSTS = 5; // Número total de posts a serem carregados
const BASE_URL = "/Post/post-"; // URL base para carregar os posts

interface Post {
    id: number;
    title: string;
    summary: string;
}

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadPosts = async () => {
            const loadedPosts: Post[] = [];

            try {
                for (let i = 1; i <= TOTAL_POSTS; i++) {
                    const response = await fetch(`${BASE_URL}${i}.json`);
                    if (!response.ok) {
                        throw new Error(`Erro ao carregar o post ${i}`);
                    }
                    const data: Post = await response.json();
                    loadedPosts.push(data);
                }
                setPosts(loadedPosts);
            } catch (err: any) {
                setError(`Falha ao carregar os posts: ${err.message}. Tente novamente mais tarde.`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const handleClick = (postId: number) => {
        router.push(`/posts/${postId}`);
    };

    if (loading) {
        return <div className="text-center text-gray-500">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Últimos Posts</h2>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <PostItem key={post.id} post={post} onClick={handleClick} />
                ))}
            </ul>
        </div>
    );
};

interface PostItemProps {
    post: Post;
    onClick: (postId: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onClick }) => {
    return (
        <li className="p-4 border rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700 mt-2">{post.summary}</p>
            <button
                onClick={() => onClick(post.id)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Leia o Post
            </button>
        </li>
    );
};

export default PostList;
