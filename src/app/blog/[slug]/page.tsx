// src\app\pages\blog\[...slug]\page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import SEO from "../../components/blog/seo/Seo";
import Image from "next/image";
import AsidePostSlug from "../../components/blog/aside/AsidePostSlug";
import NavPostSlug from "../../components/blog/nav/NavPostSlug";
import { ClockIcon, EyeIcon, CalendarDaysIcon, PencilIcon } from '@heroicons/react/24/outline';

interface PostData {
    title: string;
    description: string;
    featuredImageURL: string;
    canonical: string;
    publishDate: string;
    modifiedDate?: string;
    readingTime: number;
    views: number;
    contentHTML: string;
    categoryId: string;
    subcategoryId: string;
    status: string;
    postId: string;
}

const PostPage = () => {
    const [postData, setPostData] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

    const loadPost = useCallback(async () => {
        if (!slug) {
            setError("Slug do post não encontrado na URL.");
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/blog/posts/${slug}`);
            const result = await response.json();

            if (!response.ok || !result.success || !result.data?.data?.post) {
                const errorMessage = result.data?.message || result.message || `Post não encontrado (Status: ${response.status})`;
                throw new Error(errorMessage);
            }

            const data = result.data.data;
            const post = data.post;

            const mappedPost: PostData = {
                title: post.title || "Título Indisponível",
                description: post.description || "Descrição indisponível",
                featuredImageURL: post.featuredImageURL || "",
                canonical: data.path || `/blog/${slug}`,
                publishDate: post.publishDate,
                modifiedDate: post.modifiedDate,
                readingTime: post.readingTime || 0,
                views: post.views || 0,
                contentHTML: post.contentHTML || "<p>Conteúdo indisponível.</p>",
                categoryId: data.category?.name || "Não categorizado",
                subcategoryId: data.subcategory?.name || "",
                status: post.status || "Desconhecido",
                postId: post.postId || "ID Indisponível",
            };

            setPostData(mappedPost);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido.");
            console.error("Erro:", err);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        loadPost();
    }, [loadPost]);

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return "Data indisponível";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return "Data inválida";
        }
    };

    const isValidImageUrl = (url: string) => {
        return url.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i) !== null;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <div className="text-xl font-semibold text-gray-600">Carregando o post...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <div className="text-red-600 text-center p-8 rounded-lg bg-red-100 shadow-md max-w-lg">
                    <h2 className="text-xl font-semibold mb-4">Erro ao carregar o post</h2>
                    <p className="text-sm mt-3">{error}</p>
                </div>
            </div>
        );
    }

    if (!postData) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                <div className="text-gray-500 text-xl text-center p-8 rounded-lg bg-white shadow-md max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Post não encontrado</h2>
                    <p className="text-sm">Desculpe, o post que você procura não foi encontrado.</p>
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

            <main className="w-full px-4 sm:px-6 py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr_minmax(250px,300px)] gap-10 max-w-[1800px]">
                    {/* Coluna Esquerda - Conteúdo de Navegação */}
                    <aside>
                        <NavPostSlug contentHTML={postData.contentHTML} />
                    </aside>

                    {/* Conteúdo Principal do Artigo */}
                    <article className="bg-white rounded-lg shadow-md p-8 sm:p-10 lg:p-12 min-w-0">
                        <header className="mb-8 text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                                {postData.title}
                            </h1>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:text-base text-gray-600 justify-center mb-8">
                                <span className="flex items-center">
                                    <CalendarDaysIcon className="h-5 w-5 mr-2 text-gray-500" />
                                    {formatDate(postData.publishDate)}
                                </span>
                                {postData.modifiedDate && (
                                    <span className="flex items-center">
                                        <PencilIcon className="h-5 w-5 mr-2 text-gray-500" />
                                        {formatDate(postData.modifiedDate)}
                                    </span>
                                )}
                                <span className="flex items-center">
                                    <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
                                    {postData.readingTime} min
                                </span>
                                <span className="flex items-center">
                                    <EyeIcon className="h-5 w-5 mr-2 text-gray-500" />
                                    {postData.views} visualizações
                                </span>
                            </div>

                            {isValidImageUrl(postData.featuredImageURL) && (
                                <div className="relative w-full h-64 sm:h-80 lg:h-[450px] mb-10 rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={postData.featuredImageURL}
                                        alt={postData.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 80vw"
                                        priority
                                    />
                                </div>
                            )}
                        </header>

                        <section
                            className="prose prose-lg lg:prose-xl max-w-none text-gray-700
                                prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800
                                prose-img:rounded-lg prose-img:shadow-md prose-blockquote:border-l-4
                                prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:px-6"
                            dangerouslySetInnerHTML={{ __html: postData.contentHTML }}
                        />

                        <footer className="mt-12 pt-8 border-t border-gray-200 text-sm sm:text-base text-gray-600">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                                {postData.categoryId && (
                                    <div><strong>Categoria:</strong> {postData.categoryId}</div>
                                )}
                                {postData.subcategoryId && (
                                    <div><strong>Subcategoria:</strong> {postData.subcategoryId}</div>
                                )}
                            </div>
                        </footer>
                    </article>

                    {/* Coluna Direita - Conteúdo Relacionado */}
                    <aside>
                        <AsidePostSlug />
                    </aside>
                </div>
            </main>
        </>
    );
};

export default PostPage;