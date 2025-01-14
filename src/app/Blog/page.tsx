"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import SEO from "./SEO/SEO"; // Importação do componente SEO para meta informações da página
import Tags from "./Tags/Tags"; // Importação do componente Tags para exibição de categorias
import AOS from "aos"; // Biblioteca para animações de rolagem
import "aos/dist/aos.css"; // Importação dos estilos do AOS
import PostCard from "./PostList/PostCard"; // Componente para exibir cada post do blog

// Tipo para o post
interface Post {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Armazena os posts carregados
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [error, setError] = useState<string | null>(null); // Estado para armazenar erros
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const postsPerPage = 5; // Número de posts por página
    const totalPosts = 20; // Total de posts disponíveis

    // Inicializando o AOS (animações)
    useEffect(() => {
        import("aos").then((AOSModule) => {
            AOSModule.init({
                duration: 1000,
                easing: "ease",
                once: true,
                anchorPlacement: "top-center",
            });
        });
    }, []);

    // Função para carregar os posts de forma assíncrona
    const loadPosts = async (page: number) => {
        setLoading(true);
        const loadedPosts: Post[] = [];
        const start = (page - 1) * postsPerPage + 1;
        const end = Math.min(page * postsPerPage, totalPosts);

        try {
            for (let i = start; i <= end; i++) {
                const response = await fetch(`/Post/post-${i}.json`);
                if (!response.ok) throw new Error(`Erro ao carregar o post ${i}`);
                const data: Post = await response.json();
                loadedPosts.push(data);
            }

            if (loadedPosts.length === 0 && currentPage === 1) {
                setError("Não há mais posts para carregar.");
            } else {
                setPosts((prevPosts) => [
                    ...prevPosts,
                    ...loadedPosts.filter(
                        (newPost) =>
                            !prevPosts.some((existingPost) => existingPost.id === newPost.id)
                    ),
                ]);
            }
        } catch (err) {
            setError("Falha ao carregar os posts.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Carregar posts quando a página mudar
    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);

    if (loading && currentPage === 1) {
        return <div className="text-center text-gray-500">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <SEO
                title="Blog | Rainer Academy"
                description="Explore conteúdos inovadores sobre tecnologia e desenvolvimento."
                keywords="tecnologia, desenvolvimento, blog, inovação, programação"
                ogTitle="Blog Rainer Academy"
                ogDescription="Conteúdos inovadores sobre tecnologia e desenvolvimento."
                ogImage="/images/blog-banner.jpg"
            />

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

            <main className="container mx-auto px-6 py-16 md:py-20">
                <section data-aos="fade-up">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                summary={post.summary}
                                imageUrl={post.imageUrl}
                                postId={post.id.toString()}
                            />
                        ))}
                    </div>
                </section>

                <section
                    className="bg-gray-100 py-16 md:py-20"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                            Explore Categorias
                        </h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Tags />
                        </div>
                        {posts.length < totalPosts && (
                            <button
                                className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                                onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                                disabled={loading}
                            >
                                {loading ? "Carregando..." : "Carregar Mais"}
                            </button>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default BlogPage;
