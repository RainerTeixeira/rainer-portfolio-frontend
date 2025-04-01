"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const BlogPage = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:4000/blog/posts?limit=10');
                const data = await res.json();
                setPosts(data.data?.data?.data || []);
            } catch (error) {
                console.error('Erro ao buscar posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
                Últimos Posts
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <li key={post.postId} className="border rounded-lg p-4 shadow-md">
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.description}</p>
                        <Link href={`/blog/${post.slug}`}>
                            Leia mais
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogPage;