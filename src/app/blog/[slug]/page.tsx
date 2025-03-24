"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import SEO from "@components/blog/seo/Seo";
import Image from "next/image";

interface PostData {
    readingTime: number;
    subcategoryId: string;
    status: string;
    slug: string;
    authorId: string;
    views: number;
    modifiedDate: string;
    postId: string;
    categoryId: string;
    categoryId$subcategoryId: string;
    keywords: Record<string, any>;
    canonical: string;
    contentHTML: string;
    publishDate: string;
    description: string;
    tags: Record<string, any>;
    title: string;
    featuredImageURL: string;
}

interface ApiResponse {
    success: boolean;
    data: {
        success: boolean;
        data: PostData;
        timestamp: string;
        path: string;
        statusCode: number;
    };
    timestamp: string;
    path: string;
    statusCode: number;
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
            const response = await fetch(
                `http://localhost:4000/blog/posts/${slug}`
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }

            const result: ApiResponse = await response.json();

            if (!result.success || !result.data?.data) {
                throw new Error(result.data?.message || 'Post não encontrado');
            }

            setPostData(result.data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar o post');
            console.error('Erro ao carregar o post:', err);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        if (slug) loadPost();
    }, [slug, loadPost]);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return 'Data inválida';
        }
    };

    const isValidImageUrl = (url: string) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
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
                <div className="text-gray-500 text-xl">
                    Post não encontrado
                </div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title={postData.title}
                description={postData.description}
                ogImage={postData.featuredImageURL}
                canonical={postData.canonical}
            />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <article className="bg-white rounded-lg shadow-lg p-6">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {postData.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                            <div>
                                📅 Publicado: {formatDate(postData.publishDate)}
                            </div>
                            <div>⏳ {postData.readingTime} min de leitura</div>
                            <div>👀 {postData.views} visualizações</div>
                        </div>

                        {postData.featuredImageURL && isValidImageUrl(postData.featuredImageURL) && (
                            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src={postData.featuredImageURL.startsWith("/") ? postData.featuredImageURL : `/${postData.featuredImageURL}`}
                                    alt={postData.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        )}
                    </header>

                    <section
                        className="prose lg:prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: postData.contentHTML }}
                    />

                    <footer className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>
                                <strong>Autor:</strong> {postData.authorId}
                            </div>
                            <div>
                                <strong>Categoria:</strong> {postData.categoryId}
                            </div>
                            <div>
                                <strong>Subcategoria:</strong> {postData.subcategoryId}
                            </div>
                        </div>
                    </footer>
                </article>
            </main>
        </>
    );
};

export default PostPage;