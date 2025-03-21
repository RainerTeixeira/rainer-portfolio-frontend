"use client";

import React, { useEffect, useState } from "react";
import PostCard from "@/app/components/blog/postCard/PostCard";

/**
 * Interface que define a estrutura de um post.
 */
interface Post {
    postId: string;
    title: string;
    description: string;
    publishDate: string;
    slug: string;
}

/**
 * Interface que define a estrutura da resposta da API.
 */
interface ApiResponse {
    success: boolean;
    data: {
        data: {
            data: Post[];
            total: number;
            hasMore: boolean;
            nextKey: string | null;
        };
        timestamp: string;
        path: string;
        statusCode: number;
    };
    timestamp: string;
    path: string;
    statusCode: number;
}

/**
 * Propriedades do componente PostList.
 */
interface PostListProps {
    /** Número máximo de posts a serem carregados por requisição. */
    limit: number;
}

/**
 * Componente PostList.
 *
 * Responsável por buscar e exibir os posts do blog de forma paginada.
 * Os posts são carregados inicialmente na montagem do componente e,
 * ao clicar no botão "Carregar mais", novos posts são buscados na API.
 *
 * @param {PostListProps} props - Propriedades do componente.
 * @returns {JSX.Element} A listagem de posts renderizada.
 */
const PostList: React.FC<PostListProps> = ({ limit }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [nextKey, setNextKey] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = `http://localhost:4000/blog/posts?limit=${limit}`;

    /**
     * Busca os posts na API.
     *
     * Esta função é invocada na montagem do componente e ao clicar no botão "Carregar mais".
     * Ela gerencia a paginação através da variável nextKey e trata erros de conexão.
     */
    const loadPosts = async () => {
        if (loading) return; // Evita requisições duplicadas enquanto já está carregando

        try {
            setLoading(true);
            const url = nextKey ? `${API_URL}&nextKey=${nextKey}` : API_URL;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const result: ApiResponse = await response.json();

            // Extrai os posts e a próxima chave para paginação
            const postsData = result?.data?.data?.data;
            const newNextKey = result?.data?.data?.nextKey;

            if (postsData && Array.isArray(postsData)) {
                setPosts((prevPosts) => [...prevPosts, ...postsData]);
                setNextKey(newNextKey);
            } else {
                throw new Error("Resposta da API com dados inválidos.");
            }
        } catch (err) {
            if (err instanceof TypeError) {
                setError("Sem comunicação com o servidor de postagem. Tente novamente mais tarde.");
            } else if (err instanceof Error) {
                setError(`Falha ao carregar os posts: ${err.message}`);
                console.error(err);
            } else {
                setError("Um erro desconhecido ocorreu.");
                console.error(err);
            }
        } finally {
            setLoading(false);
        }
    };

    // Carrega os posts apenas uma vez na montagem do componente
    useEffect(() => {
        loadPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {loading && posts.length === 0 && (
                <div className="text-center text-gray-500">Carregando...</div>
            )}

            {error && (
                <div className="text-center text-red-500 my-4">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard
                        key={post.postId}
                        title={post.title}
                        summary={post.description}
                        postId={post.postId}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                {nextKey ? (
                    <button
                        onClick={loadPosts}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200 ease-in-out"
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : "Carregar mais"}
                    </button>
                ) : (
                    posts.length > 0 && (
                        <div className="text-gray-600 font-medium">Fim das postagens</div>
                    )
                )}
            </div>
        </div>
    );
};

export default PostList;
