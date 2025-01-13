"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SEO from "./SEO/SEO"; // Componente de SEO
import Tags from "./Tags/Tags"; // Componente de tags
import AOS from "aos"; // Biblioteca de animações
import "aos/dist/aos.css"; // Estilos do AOS

const BlogPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const initAos = async () => {
            await import("aos");
            AOS.init({
                duration: 1000,
                easing: "ease",
                once: true,
                anchorPlacement: "top-center",
            });
        };
        initAos();
    }, []);

    useEffect(() => {
        const loadPosts = async () => {
            const loadedPosts = [];
            const totalPosts = 5; // Supondo que você tenha 5 posts

            try {
                for (let i = 1; i <= totalPosts; i++) {
                    const response = await fetch(`/Post/post-${i}.json`);
                    if (!response.ok) {
                        throw new Error(`Erro ao carregar o post ${i}`);
                    }
                    const data = await response.json();
                    loadedPosts.push(data);
                }
                setPosts(loadedPosts);
            } catch (err: any) {
                setError(`Falha ao carregar os posts: ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const navigateToPost = (postId: number) => {
        router.push(`/posts/${postId}`); // Redireciona para o post pelo ID
    };

    if (loading) {
        return <div className="text-center text-gray-500">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <SEO title="Blog | Rainer Academy" description="Explore conteúdos inovadores sobre tecnologia e desenvolvimento." />
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6" data-aos="fade-up">
                        Bem-vindo ao Blog
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Explore o universo da tecnologia e desenvolvimento com conteúdos inovadores e insights práticos.
                    </p>
                </div>
            </section>
            <section className="container mx-auto px-6 py-16 md:py-20" data-aos="fade-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {posts.map((post, index) => (
                        <div key={index} className="p-6 border rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p className="text-gray-700 mt-2">{post.summary}</p>
                            <button
                                onClick={() => navigateToPost(post.id)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Leia mais
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-gray-100 py-16 md:py-20" data-aos="fade-up" data-aos-delay="200">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8">Explore Categorias</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Tags />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
