"use client"; // Habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import SEO from "./SEO/SEO"; // Componente SEO
import Tags from "./Tags/Tags"; // Componente Tags
import PostCard from "./PostList/PostCard"; // Componente PostCard
import "aos/dist/aos.css"; // Estilos do AOS

// Tipagem para posts
interface Post {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const totalPosts = 20;

    useEffect(() => {
        import("aos").then((AOS) =>
            AOS.init({
                duration: 1000,
                easing: "ease",
                once: true,
                anchorPlacement: "top-center",
            })
        );
    }, []);

    const loadPosts = async (page: number) => {
        setLoading(true);
        const start = (page - 1) * postsPerPage + 1;
        const end = Math.min(page * postsPerPage, totalPosts);
        const loadedPosts: Post[] = [];

        try {
            for (let i = start; i <= end; i++) {
                const response = await fetch(`/Post/post-${i}.json`);
                if (!response.ok) throw new Error(`Erro ao carregar post ${i}`);
                const data: Post = await response.json();
                loadedPosts.push(data);
            }
            setPosts((prev) => [
                ...prev,
                ...loadedPosts.filter(
                    (post) => !prev.some((existing) => existing.id === post.id)
                ),
            ]);
        } catch {
            setError("Erro ao carregar os posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);

    if (loading && currentPage === 1) {
        return <div className="text-center">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <SEO title="Blog | Rainer Academy" description="Explore conteúdos inovadores." />
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6" data-aos="fade-up">
                        Bem-vindo ao Blog
                    </h1>
                    <p
                        className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        Explore o universo da tecnologia e desenvolvimento com conteúdos
                        inovadores e insights práticos.
                    </p>
                </div>
            </header>
            <main className="container mx-auto py-16">
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.id} {...post} postId={post.id.toString()} />
                        ))}
                    </div>
                </section>
                {posts.length < totalPosts && (
                    <button
                        className="mt-8 bg-indigo-600 text-white px-4 py-2"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : "Carregar Mais"}
                    </button>
                )}
            </main>
        </div>
    );
};

export default BlogPage;
