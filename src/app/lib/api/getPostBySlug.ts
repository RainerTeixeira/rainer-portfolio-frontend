export interface PostData {
    title: string;
    description: string;
    featuredImageURL: string;
    canonical: string;
    publishDate: string;
    modifiedDate?: string;
    readingTime: number;
    views: number;
    contentHTML: string;
    categoryId: string;
    subcategoryId: string;
    status: string;
    postId: string;
}

export const getPostBySlug = async (slug: string): Promise<PostData> => {
    if (!slug) {
        throw new Error("Slug do post não encontrado.");
    }

    try {
        const response = await fetch(`http://localhost:4000/blog/posts/${slug}`);
        console.log("API Response Status:", response.status);

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Erro na resposta da API:", errorBody);
            throw new Error(`Erro ao buscar o post. Status: ${response.status}. Detalhes: ${errorBody}`);
        }

        const result = await response.json();
        console.log("API Response Body:", result);

        if (!result.success || !result.data?.data?.post) {
            const errorMessage = result.data?.message || result.message || `Post não encontrado para o slug "${slug}".`;
            throw new Error(errorMessage);
        }

        const post = result.data.data.post;
        const category = result.data.data.category;
        const subcategory = result.data.data.subcategory;

        return {
            title: post.title || "Título Indisponível",
            description: post.description || "Descrição indisponível",
            featuredImageURL: post.featuredImageURL || "",
            canonical: result.data.path || `/blog/${slug}`,
            publishDate: post.publishDate,
            modifiedDate: post.modifiedDate,
            readingTime: 0, // Ajuste conforme necessário
            views: post.views || 0,
            contentHTML: post.contentHTML || "<p>Conteúdo indisponível.</p>",
            categoryId: category?.name || "Não categorizado",
            subcategoryId: subcategory?.name || "",
            status: post.status || "Desconhecido",
            postId: post.postId || "ID Indisponível",
        };
    } catch (error) {
        console.error("Erro ao buscar o post:", error);
        throw error;
    }
};
