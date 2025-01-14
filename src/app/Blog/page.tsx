"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import SEO from "./SEO/SEO"; // Importação do componente SEO para meta informações da página
import Tags from "./Tags/Tags"; // Importação do componente Tags para exibição de categorias
import AOS from "aos"; // Biblioteca para animações de rolagem
import "aos/dist/aos.css"; // Importação dos estilos do AOS
import PostCard from "./PostList/PostCard"; // Componente para exibir cada post do blog

const BlogPage = () => {
    // Definindo estados para controle da página e dos posts
    const [posts, setPosts] = useState<any[]>([]); // Armazena os posts carregados
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [error, setError] = useState<string | null>(null); // Estado para armazenar erros
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const postsPerPage = 5; // Número de posts por página
    const totalPosts = 20; // Total de posts disponíveis

    // Inicializando o AOS (animações)
    useEffect(() => {
        const initAos = async () => {
            await import("aos"); // Importando o AOS de forma dinâmica
            AOS.init({
                duration: 1000, // Duração da animação
                easing: "ease", // Tipo de easing
                once: true, // Animação será executada uma vez
                anchorPlacement: "top-center", // Posição da âncora
            });
        };
        initAos();
    }, []); // Apenas inicializa uma vez quando o componente é montado

    // Função para carregar os posts de forma assíncrona
    const loadPosts = async (page: number) => {
        setLoading(true); // Ativando o estado de carregamento
        const loadedPosts = [];
        const start = (page - 1) * postsPerPage + 1; // Índice de início para a página atual
        const end = Math.min(page * postsPerPage, totalPosts); // Índice de fim considerando o total de posts

        try {
            // Tentando carregar os posts da API (simulada por arquivos JSON)
            for (let i = start; i <= end; i++) {
                const response = await fetch(`/Post/post-${i}.json`);
                if (!response.ok) {
                    if (i > totalPosts) break;
                    throw new Error(`Erro ao carregar o post ${i}`);
                }
                const data = await response.json();
                loadedPosts.push(data);
            }

            // Se nenhum post foi carregado e estamos na primeira página
            if (loadedPosts.length === 0 && currentPage === 1) {
                setError("Não há mais posts para carregar.");
            } else {
                // Garantindo que não haja duplicação
                setPosts((prevPosts) => {
                    // Aqui, você pode garantir que apenas posts novos sejam adicionados
                    const newPosts = loadedPosts.filter((newPost) => 
                        !prevPosts.some((existingPost) => existingPost.id === newPost.id)
                    );
                    return [...prevPosts, ...newPosts];
                });
            }
        } catch (err: any) {
            setError(`Falha ao carregar os posts: ${err.message}`);
            console.error(err); // Logando erro no console
        } finally {
            setLoading(false); // Desativando o estado de carregamento
        }
    };

    // Carregar posts quando a página mudar
    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]); // O efeito é executado toda vez que currentPage mudar

    // Exibição de carregamento ou erro
    if (loading && currentPage === 1) {
        return <div className="text-center text-gray-500">Carregando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            {/* Componente SEO para configurar metadados e SEO da página */}
            <SEO
                title="Blog | Rainer Academy"
                description="Explore conteúdos inovadores sobre tecnologia e desenvolvimento."
                keywords="tecnologia, desenvolvimento, blog, inovação, programação"
                ogTitle="Blog Rainer Academy"
                ogDescription="Conteúdos inovadores sobre tecnologia e desenvolvimento."
                ogImage="/images/blog-banner.jpg"
            />

            {/* Cabeçalho do Blog */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6" data-aos="fade-up">
                        Bem-vindo ao Blog
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Explore o universo da tecnologia e desenvolvimento com conteúdos inovadores e insights práticos.
                    </p>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="container mx-auto px-6 py-16 md:py-20">
                <section data-aos="fade-up">
                    {/* Exibindo os posts em um grid responsivo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post, index) => (
                            <PostCard
                                key={index}
                                title={post.title}
                                summary={post.summary}
                                imageUrl={post.imageUrl}
                                postId={post.id.toString()}
                            />
                        ))}
                    </div>
                </section>

                {/* Seção de Categorias */}
                <section className="bg-gray-100 py-16 md:py-20" data-aos="fade-up" data-aos-delay="200">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Explore Categorias</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Tags /> {/* Exibe as categorias/tags dinâmicas */}
                        </div>

                        {/* Botão para carregar mais posts */}
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
