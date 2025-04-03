"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import SEO from "../../components/blog/seo/Seo";
import Image from "next/image";
import AsidePostSlug from "../../components/blog/aside/AsidePostSlug";
import NavPostSlug from "../../components/blog/nav/NavPostSlug";
import { ClockIcon, EyeIcon, CalendarDaysIcon, PencilIcon } from "@heroicons/react/24/outline";
import { getPostBySlug, PostData } from "../../lib/api/getPostBySlug";

// Hook customizado para carregar os dados do post
const usePost = (slug: string | undefined) => {
    const [postData, setPostData] = useState<PostData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = useCallback(async () => {
        if (!slug) {
            setError("Slug não encontrado na URL.");
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const post = await getPostBySlug(slug);
            setPostData(post);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro desconhecido.";
            setError(`Erro ao carregar o post para o slug "${slug}": ${errorMessage}`);
            console.error("Erro:", err);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return { postData, loading, error };
};

// Componente de carregamento
const LoadingIndicator = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
            <svg
                className="animate-spin h-12 w-12 text-blue-500 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-label="Carregando..."
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <div className="text-xl font-semibold text-gray-600">Carregando o post...</div>
        </div>
    </div>
);

// Componente de exibição de erro
const ErrorDisplay = ({ error }: { error: string }) => (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-red-600 text-center p-8 rounded-lg bg-red-100 shadow-md max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Erro ao carregar o post</h2>
            <p className="text-sm mt-3">{error}</p>
        </div>
    </div>
);

// Função de formatação de datas
const formatDate = (dateString: string | undefined): string => {
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

// Validação da URL da imagem
const isValidImageUrl = (url: string): boolean =>
    /\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i.test(url);

const PostPage = () => {
    const { slug } = useParams();
    const { postData, loading, error } = usePost(slug);

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorDisplay error={error} />;
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
                    {/* Coluna Esquerda - Navegação interna */}
                    <aside>
                        <NavPostSlug contentHTML={postData.contentHTML} />
                    </aside>

                    {/* Conteúdo Principal */}
                    <article className="bg-white rounded-lg shadow-md p-8 sm:p-10 lg:p-12">
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
                                    <div>
                                        <strong>Categoria:</strong> {postData.categoryId}
                                    </div>
                                )}
                                {postData.subcategoryId && (
                                    <div>
                                        <strong>Subcategoria:</strong> {postData.subcategoryId}
                                    </div>
                                )}
                            </div>
                        </footer>
                    </article>

                    {/* Coluna Direita - Posts relacionados */}
                    <aside>
                        <AsidePostSlug />
                    </aside>
                </div>
            </main>
        </>
    );
};

export default PostPage;
