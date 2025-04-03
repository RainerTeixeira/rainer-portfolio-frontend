"use client";

import React, { useEffect, useState, useCallback } from "react";
import PostCard from "@/app/components/blog/postCard/PostCard";
import NavPostList from "@/app/components/blog/nav/NavPostList";
import AsidePostList from "@/app/components/blog/aside/AsidePostList";
import { fetchPosts, Post } from "@/app/lib/api/getPosts";

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextKey, setNextKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadPosts = useCallback(async () => {
        if (loading) return;
        try {
            setLoading(true);
            const { posts: newPosts, nextKey: newNextKey } = await fetchPosts(nextKey);
            setPosts((prev) => [...prev, ...newPosts]);
            setNextKey(newNextKey);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    }, [nextKey, loading]);

    useEffect(() => {
        if (posts.length === 0 && !loading) {
            loadPosts();
        }
    }, [posts.length, loading, loadPosts]);

    return (
        <main className="w-full px-4 sm:px-6 py-8 bg-gray-50 min-h-screen">
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-[minmax(250px,300px)_1fr_minmax(250px,300px)] gap-6 max-w-[1800px]">

                {/* Barra de categorias - rola no mobile, fixa no desktop */}
                <div className="block lg:hidden mb-6">
                    <NavPostList />
                </div>

                <aside className="hidden lg:block sticky top-24 h-fit">
                    <NavPostList />
                </aside>

                {/* Conteúdo principal */}
                <article className="bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-12 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
                        Últimos Posts
                    </h1>

                    {loading && posts.length === 0 && <p>Carregando...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Grid responsivo de posts */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <PostCard
                                key={`${post.postId}-${index}`}
                                title={post.title}
                                summary={post.summary} // Passando a propriedade summary
                                imageUrl={post.featuredImageURL}
                                slug={post.slug}
                            />
                        ))}
                    </div>

                    {/* Botão "Carregar mais" */}
                    {nextKey && !loading && (
                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={loadPosts}
                                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md transition hover:bg-blue-600"
                            >
                                Carregar mais
                            </button>
                        </div>
                    )}

                    {!nextKey && posts.length > 0 && !loading && (
                        <p className="mt-6 text-gray-500 text-center">Fim dos posts</p>
                    )}
                </article>

                {/* Barra lateral direita - Posts relacionados */}
                <aside className="hidden lg:block sticky top-24 h-fit">
                    <AsidePostList />
                </aside>

            </div>
        </main>
    );
};

export default BlogPage;
