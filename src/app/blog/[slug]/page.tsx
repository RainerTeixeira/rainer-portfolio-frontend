"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import SEO from "@components/blog/seo/Seo";
import CommentSection from "@/app/components/CommentSection/CommentSection";

interface Post {
    title: string;
    description?: string;
    featuredImageURL?: string;
    publishDate: string;
    views: number;
    contentHTML: string;
    postId: string;
}

interface Author {
    name: string;
    socialProof: {
        linkdin?: string;
        github?: string;
        facebook?: string;
    };
}

interface Category {
    name: string;
}

interface PostData {
    post: Post;
    author: Author;
    category: Category;
    subcategory: Category;
}

const PostPage = () => {
    const [postData, setPostData] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const loadPost = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/blog/posts/${slug}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP! status: ${response.status}`);
            }
            const result = await response.json();
            if (!result.success || !result.data?.data) {
                throw new Error("Post não encontrado");
            }
            setPostData(result.data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao carregar o post");
            console.error("Erro ao carregar o post:", err);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        if (slug) loadPost();
    }, [slug, loadPost]);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return "Data inválida";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-2xl text-blue-500">
                    Carregando...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-xl text-center p-4 border rounded-lg bg-red-50">
                    Erro: {error}
                </div>
            </div>
        );
    }

    if (!postData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500 text-xl">Post não encontrado</div>
            </div>
        );
    }

    const { post, author, category, subcategory } = postData;

    return (
        <>
            <SEO
                title={post.title}
                description={post.description || post.title}
                ogImage={post.featuredImageURL || ""}
            />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <article className="bg-white rounded-lg shadow-lg p-6">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                            <div>
                                📅 Publicado: {formatDate(post.publishDate)}
                            </div>
                            <div>👀 {post.views} visualizações</div>
                        </div>
                    </header>

                    <section
                        className="prose lg:prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.contentHTML }}
                    />

                    <footer className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>
                                <strong>Autor:</strong> {author.name}
                            </div>
                            <div>
                                <strong>Categoria:</strong> {category.name}
                            </div>
                            <div>
                                <strong>Subcategoria:</strong> {subcategory.name}
                            </div>
                        </div>

                        <div className="mt-4">
                            <strong>Redes Sociais:</strong>
                            <ul className="list-disc list-inside">
                                <li>
                                    <a
                                        href={author.socialProof.linkdin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={author.socialProof.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={author.socialProof.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </article>

                {/* Adicionando a seção de comentários */}
                <CommentSection postId={post.postId} />
            </main>
        </>
    );
};

export default PostPage;
