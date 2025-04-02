// src\app\components\blog\aside\CategoryAside.tsx
"use client";

import React, { useEffect, useState } from 'react';

interface Subcategory {
    subcategoryId: string;
    name: string;
}

interface Category {
    categoryId: string;
    name: string;
    subcategories: Subcategory[];
}

const CategoryAside: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/blog/category');
                if (!response.ok) throw new Error('Erro ao carregar categorias');
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro desconhecido');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div>Carregando categorias...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (categories.length === 0) {
        return <div>Nenhuma categoria encontrada.</div>;
    }

    return (
        <aside className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Categorias</h3>
            <ul>
                {categories.map((category) => (
                    <li key={category.categoryId} className="mb-2">
                        <a href={`/blog/category/${category.categoryId}`} className="text-blue-600 hover:underline">
                            {category.name}
                        </a>
                        <ul className="ml-4 mt-2">
                            {category.subcategories.map((subcategory) => (
                                <li key={subcategory.subcategoryId}>
                                    <a href={`/blog/category/${category.categoryId}/subcategory/${subcategory.subcategoryId}`} className="text-blue-500 hover:underline">
                                        {subcategory.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default CategoryAside;