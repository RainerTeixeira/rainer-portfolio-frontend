"use client";

import React, { useState } from 'react';

interface Subcategory {
    subcategoryId: string;
    name: string;
}

interface Category {
    categoryId: string;
    name: string;
    subcategories: Subcategory[];
}

const mockCategories: Category[] = [
    {
        categoryId: "1",
        name: "Tecnologia",
        subcategories: [
            { subcategoryId: "1-1", name: "Desenvolvimento Web" },
            { subcategoryId: "1-2", name: "Inteligência Artificial" }
        ]
    },
    {
        categoryId: "2",
        name: "Saúde",
        subcategories: [
            { subcategoryId: "2-1", name: "Nutrição" },
            { subcategoryId: "2-2", name: "Exercícios" }
        ]
    }
];

const CategoryAside: React.FC = () => {
    const [categories] = useState<Category[]>(mockCategories);

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