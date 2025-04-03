export interface Post {
    postId: string;
    title: string;
    description: string;
    publishDate: string;
    slug: string;
    featuredImageURL?: string;
}

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
}

const API_URL = "http://localhost:4000/blog/posts";

export const fetchPosts = async (nextKey: string | null = null, limit: number = 10) => {
    const url = nextKey ? `${API_URL}?limit=${limit}&nextKey=${encodeURIComponent(nextKey)}` : `${API_URL}?limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    const posts = result.data?.data?.data || [];
    const nextKeyResult = result.data?.data?.nextKey;

    return { posts, nextKey: nextKeyResult };
};
