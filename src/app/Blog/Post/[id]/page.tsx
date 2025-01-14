"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Usar useParams para pegar o ID da URL
import SEO from "../../SEO/SEO"; // Importando o componente SEO

interface Section {
    heading: string;
    text: string;
}

interface Post {
    id: number;
    title: string;
    summary: string;
    content: string;
    date: string; // A data vem como string (ISO)
    sections: Section[];
    imageUrl: string;
}

const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams(); // Pegando o ID da URL

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
        return <div>Carregando post...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Post não encontrado</div>;
    }

    // Função para formatar a data no formato brasileiro (DD/MM/AAAA)
    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };
        const formattedDate = new Date(date).toLocaleDateString("pt-BR", options);
        return formattedDate;
    };

    return (
        <>
            {/* SEO Dinâmico */}
            <SEO
                title={post.title}
                description={post.summary}
                ogTitle={post.title}
                ogDescription={post.summary}
                ogImage={post.imageUrl}
                publishedTime={post.date}
                author="Nome do Autor" // Substitua com o nome real do autor
            />

            <div className="max-w-3xl mx-auto p-6 space-y-8">
                {/* Imagem de Capa */}
                <div className="relative h-72 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={post.imageUrl}
                        alt="Imagem de Capa"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                {/* Título do Post */}
                <h1 className="text-4xl font-extrabold text-gray-800 text-center">{post.title}</h1>
                <p className="text-gray-600 text-center text-lg mt-2">{formatDate(post.date)}</p>

                {/* Conteúdo do Post */}
                <div className="prose max-w-none">
                    <p>{post.content}</p>
                </div>

                {/* Seções do Post */}
                <div>
                    {post.sections.map((section, index) => (
                        <div key={index} className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-800">{section.heading}</h2>
                            <p className="text-gray-700 mt-2">{section.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostPage;
