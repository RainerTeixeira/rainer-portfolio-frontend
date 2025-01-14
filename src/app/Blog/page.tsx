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

const POST_PATH = "/Post/post-";
const CATEGORY_PATH = "/category/category.json";

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePosts, setHasMorePosts] = useState(true); // Controle para verificar se ainda há mais posts
    const [categories, setCategories] = useState<Category[]>([]); // Estado para armazenar as categorias
    const postsPerPage = 5;
    const totalPosts = 20;

    // Estilos constantes
    const STYLES = {
        button: "mt-8 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700",
        loadingMessage: "text-center text-gray-500",
        errorMessage: "text-center text-red-500",
    };

    // Inicializar animações do AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease",
            once: true,
            anchorPlacement: "top-center",
        });
    }, []); // A animação será inicializada apenas uma vez, após o primeiro render

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
                setHasMorePosts(false); // Se nenhum post foi carregado, encerra o carregamento
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
    }, [currentPage]);

    // Carregar as categorias do JSON
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch(CATEGORY_PATH);
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
        return <div className={STYLES.loadingMessage}>Carregando...</div>;
    }

    if (error && !hasMorePosts) {
        return <div className={STYLES.errorMessage}>Fim dos posts.</div>;
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
