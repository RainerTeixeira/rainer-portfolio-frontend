"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Section {
    heading: string;
    text: string;
}

interface Post {
    id: number;
    title: string;
    summary: string;
    content: string;
    date: string;
    sections: Section[];
}

const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { postId } = router.query;

    const id = Array.isArray(postId) ? postId[0] : postId;
    const jsonUrl = id ? `/Post/post-${id}.json` : null;

    useEffect(() => {
        if (jsonUrl) {
            const loadPost = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(jsonUrl);
                    if (!response.ok) {
                        throw new Error("Erro ao carregar o post.");
                    }
                    const data: Post = await response.json();
                    setPost(data);
                } catch (err: any) {
                    setError("Falha ao carregar o post: " + err.message);
                } finally {
                    setLoading(false);
                }
            };

            loadPost();
        }
    }, [jsonUrl]);

    if (loading) {
        return (
            <div className="text-center text-gray-500">
                <h2 className="text-3xl font-bold mb-6">Carregando Post...</h2>
                <p>Estamos carregando o conteúdo do post. Por favor, aguarde.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <h2 className="text-3xl font-bold mb-6">Erro ao Carregar o Post</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="text-center text-gray-500">
                <h2 className="text-3xl font-bold mb-6">Post Não Encontrado</h2>
                <p>Desculpe, mas não conseguimos encontrar o post solicitado.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">{post.title}</h2>
            <div className="prose mb-6">
                <p>{post.content}</p>
            </div>
            <div className="prose">
                <h3 className="text-2xl font-semibold">Seções:</h3>
                {post.sections.map((section, index) => (
                    <div key={index}>
                        <h4 className="text-xl font-semibold">{section.heading}</h4>
                        <p>{section.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;
