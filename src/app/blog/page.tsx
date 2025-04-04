"use client";

import React, { useEffect, useState } from "react";
//import { useRouter } from "next/navigation"; // Comentei o useRouter
import PostCard from "@/app/components/blog/postCard/PostCard";

const TOTAL_POSTS = 5;
const BASE_URL = "/Post/post-";

interface Post {
    id: number;
    title: string;
    summary: string;
    imageUrl?: string;
}

const PostListPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    // const router = useRouter(); // Comentei o hook do router

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
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    // const handlePostClick = (postId: number) => { // Comentei o handlePostClick
    //     router.push(`/posts/${postId}`);
    // };

    if (loading) {
        return <div className="text-center text-gray-500">Carregando...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Últimos Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        title={post.title}
                        summary={post.summary}
                        imageUrl={post.imageUrl}
                        postId={String(post.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostListPage;
