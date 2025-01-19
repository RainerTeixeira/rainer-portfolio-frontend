"use client"; // Necessário para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import SEO from "../../SEO/SEO"; // Componente SEO
import Image from "next/image"; // Importando o componente Image

interface Section {
    heading: string;
    text: string;
}

interface Comment {
    author: string;
    content: string;
    date: string;
}

interface Reference {
    title: string;
    url: string;
}

interface Author {
    name?: string;
    bio?: string;
    profileImage?: string;
}

interface Post {
    id: number;
    title: string;
    summary: string;
    content: string;
    date: string;
    sections: Section[];
    imageUrl?: string;
    tags?: string[];
    author: Author;
    category?: string;
    comments: Comment[];
    references: Reference[];
    seo: {
        keywords?: string[];
        description?: string;
    };
    status?: string;
    readingTime?: string;
    videoEmbed?: string;
}

const PostPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
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
        return <div className="text-center">Carregando post...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!post) {
        return <div className="text-center text-gray-500">Post não encontrado</div>;
    }

    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };
        return new Date(date).toLocaleDateString("pt-BR", options);
    };

    return (
        <>
            <SEO
                title={post.title}
                description={post.summary}
                ogTitle={post.title}
                ogDescription={post.summary}
                ogImage={post.imageUrl || ''}
                publishedTime={post.date}
                author={post.author.name || 'Autor desconhecido'}
            />

            <div className="max-w-3xl mx-auto p-6 space-y-8">
                <div className="relative h-72 bg-gray-100 rounded-lg overflow-hidden">
                    {post.imageUrl ? (
                        <Image
                            src={post.imageUrl}
                            alt={`Imagem de capa para ${post.title}`}
                            className="object-cover w-full h-full"
                            layout="fill" // Garante que a imagem ocupe todo o espaço disponível
                            priority // Prioriza o carregamento desta imagem
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-gray-200">
                            <p className="text-gray-500">Imagem indisponível</p>
                        </div>
                    )}
                </div>

                <h1 className="text-4xl font-extrabold text-gray-800 text-center">{post.title}</h1>
                <p className="text-gray-600 text-center text-lg mt-2">{formatDate(post.date)}</p>
                {post.author.name && <p className="text-center text-lg mt-4">{post.author.name}</p>}
                {post.author.bio && <p className="text-center text-gray-600 mt-2">{post.author.bio}</p>}

                <div className="prose max-w-none">
                    <p>{post.content}</p>
                </div>

                <div>
                    {post.sections.map((section, index) => (
                        <div key={index} className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800">{section.heading}</h2>
                            <p className="text-gray-700 mt-2">{section.text}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    {post.comments.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold">Comentários</h3>
                            {post.comments.map((comment, index) => (
                                <div key={index} className="mt-4">
                                    <p className="font-semibold">{comment.author}</p>
                                    <p>{comment.content}</p>
                                    <p className="text-sm text-gray-500">{formatDate(comment.date)}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    {post.references.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold">Referências</h3>
                            <ul>
                                {post.references.map((reference, index) => (
                                    <li key={index}>
                                        <a href={reference.url} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                            {reference.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {post.videoEmbed && (
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold">Vídeo</h3>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={post.videoEmbed}
                                title="Video Embed"
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PostPage;
