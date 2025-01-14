"use client"; // Habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import SEO from "../../SEO/SEO"; // Componente SEO

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
    imageUrl: string;
}

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    const jsonUrl = id ? `/Post/post-${id}.json` : null;

    const loadPost = useCallback(async () => {
        if (jsonUrl) {
            try {
                setLoading(true);
                const response = await fetch(jsonUrl);
                if (!response.ok) throw new Error("Erro ao carregar o post.");
                const data: Post = await response.json();
                setPost(data);
            } catch {
                setError("Falha ao carregar o post.");
            } finally {
                setLoading(false);
            }
        }
    }, [jsonUrl]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    if (loading) {
        return <div>Carregando post...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Post não encontrado</div>;
    }

    return (
        <>
            <SEO title={post.title} description={post.summary} />
            <div className="max-w-3xl mx-auto p-6">
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="rounded-lg w-full h-64 object-cover mb-6"
                />
                <h1 className="text-4xl font-bold">{post.title}</h1>
                <p>{new Date(post.date).toLocaleDateString("pt-BR")}</p>
                <p>{post.content}</p>
                {post.sections.map((section, index) => (
                    <div key={index}>
                        <h2>{section.heading}</h2>
                        <p>{section.text}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostPage;
