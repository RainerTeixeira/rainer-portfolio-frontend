"use client";

import React from "react";
import PostList from "@/app/blog/PostList/PostList";

/**
 * Componente PostListPage.
 *
 * Página que exibe a listagem paginada dos posts do blog.
 *
 * @returns {JSX.Element} O componente da página renderizado.
 */
const PostListPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                Últimos Posts
            </h2>
            <PostList limit={4} />
        </div>
    );
};

export default PostListPage;
