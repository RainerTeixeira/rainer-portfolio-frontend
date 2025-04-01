import React from 'react';
import SEO from '@/app/components/blog/seo/Seo';
import CommentSection from "@/app/components/CommentSection/CommentSection";
import TableOfContents from "@/app/components/blog/tableOfContents/TableOfContents";

async function fetchPost(slug: string) {
    const res = await fetch(`http://localhost:4000/blog/posts/${slug}`, { cache: 'no-store' });
    const data = await res.json();

    if (!data.success || !data.data?.data) {
        throw new Error('Post não encontrado');
    }

    return data.data.data;
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
    const post = await fetchPost(params.slug); // Aguarda diretamente o valor de `params.slug`

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return "Data inválida";
        }
    };

    return (
        <>
            <SEO
                title={post.post.title}
                description={post.post.description || post.post.title}
                ogImage={post.post.featuredImageURL || ""}
            />
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <article className="bg-white rounded-lg shadow-lg p-6">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {post.post.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                            <div>
                                📅 Publicado: {formatDate(post.post.publishDate)}
                            </div>
                            <div>👀 {post.post.views} visualizações</div>
                        </div>
                    </header>

                    <div className="flex gap-8">
                        {/* Componente TOC à esquerda */}
                        <TableOfContents contentHTML={post.post.contentHTML} />
                        {/* Conteúdo do Post */}
                        <section
                            className="prose lg:prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.post.contentHTML }}
                        />
                    </div>

                    <footer className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div>
                                <strong>Autor:</strong> {post.author.name}
                            </div>
                            <div>
                                <strong>Categoria:</strong> {post.category.name}
                            </div>
                            <div>
                                <strong>Subcategoria:</strong> {post.subcategory.name}
                            </div>
                        </div>
                        <div className="mt-4">
                            <strong>Redes Sociais:</strong>
                            <ul className="list-disc list-inside">
                                <li>
                                    <a
                                        href={post.author.socialProof.linkdin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={post.author.socialProof.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={post.author.socialProof.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        Facebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                </article>
                <CommentSection postId={post.post.postId} />
            </main>
        </>
    );
};

export default PostPage;

export async function generateStaticParams() {
    try {
        const res = await fetch('http://localhost:4000/blog/posts');
        const data = await res.json();

        const posts = data.data?.data || [];
        if (!data.success || !Array.isArray(posts)) {
            console.warn('Erro ao buscar os posts, retornando array vazio para evitar quebra:', data);
            return [];
        }

        return posts.map((post: any) => ({
            slug: post.slug,
        }));
    } catch (error) {
        console.error("Erro ao buscar os slugs dos posts:", error);
        return [];
    }
}
