"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import SEO from "./SEO/SEO";
import Tags from "./Tags/Tags";
import AOS from "aos";
import "aos/dist/aos.css";
import PostCard from "./PostList/PostCard";
import Aside from "../components/Aside/AsideBlog";

// Constantes de caminho
const POST_PATH = "/Post/post-";
const CATEGORY_PATH = "/category/category.json";

interface Post {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
}

interface Subcategory {
    id: number;
    name: string;
    description: string;
}

interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePosts, setHasMorePosts] = useState(true); // Controle para verificar se ainda há mais posts
    const [categories, setCategories] = useState<Category[]>([]); // Estado para armazenar as categorias
    const postsPerPage = 5;
    const totalPosts = 20;

    // Inicializar animações do AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease",
            once: true,
            anchorPlacement: "top-center",
        });
    }, []);

    // Função para carregar os posts
    const loadPosts = async (page: number) => {
        setLoading(true);
        setError(null); // Limpa erros anteriores
        const loadedPosts: Post[] = [];
        const start = (page - 1) * postsPerPage + 1;
        const end = Math.min(page * postsPerPage, totalPosts);

        try {
            for (let i = start; i <= end; i++) {
                const response = await fetch(`${POST_PATH}${i}.json`);
                if (!response.ok) {
                    if (response.status === 404) {
                        setHasMorePosts(false);
                        break;
                    }
                    throw new Error(`Erro ao carregar o post ${i}`);
                }
                const data: Post = await response.json();
                loadedPosts.push(data);
            }

            if (loadedPosts.length === 0) {
                setHasMorePosts(false);
            } else {
                setPosts((prevPosts) => [
                    ...prevPosts,
                    ...loadedPosts.filter(
                        (newPost) => !prevPosts.some((existingPost) => existingPost.id === newPost.id)
                    ),
                ]);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Efeito para carregar os posts com base na página atual
    useEffect(() => {
        if (hasMorePosts) {
            loadPosts(currentPage);
        }
    }, [currentPage, hasMorePosts]); // Adicionando 'hasMorePosts' como dependência

    // Carregar as categorias do JSON
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch(CATEGORY_PATH);
                if (!response.ok) {
                    throw new Error("Erro ao carregar as categorias");
                }
                const data: Category[] = await response.json();
                setCategories(data);
            } catch (err) {
                console.error("Erro ao carregar as categorias:", err);
            }
        };
        loadCategories();
    }, []);

    // Renderização de carregamento ou erro
    if (loading && currentPage === 1) {
        return <div className="text-center text-gray-500">Carregando...</div>;
    }

    if (error && !hasMorePosts) {
        return <div className="text-center text-red-500">Erro: {error}</div>;
    }

    return (
        <div className="container mx-auto px-6 py-16 md:py-20">
            {/* Usando SEO para meta tags e título */}
            <SEO title="Blog" description="Blog de Tecnologia com posts sobre diversas categorias" />

            <div className="flex flex-col md:flex-row gap-12">
                {/* Seção Principal de Posts */}
                <main className="flex-1">
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

                    <section className="bg-gray-100 py-16 md:py-20" data-aos="fade-up" data-aos-delay="200">
                        <div className="container mx-auto px-6 text-center">
                            {!hasMorePosts && (
                                <div className="mt-8 text-gray-500 text-lg">Fim dos posts.</div>
                            )}

                            {hasMorePosts && (
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

                {/* Seção Aside à direita */}
                <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Categorias</h3>
                    <p className="text-gray-700 mb-6">
                        Encontre os posts organizados por categoria para explorar mais sobre o que você gosta!
                    </p>
                    <Aside categories={categories} />

                    {/* Usando Tags para exibir tags relevantes */}
                    <Tags />
                </aside>
            </div>
        </div>
    );
};

export default BlogPage;
