"use client";

import React from "react";
// Corrigir o caminho do import
import PostList from "@/app/blog/PostList/PostList";

const BlogPage: React.FC = () => {
    return (
        <div>
            <PostList limit={10} />
        </div>
    );
};

export default BlogPage;