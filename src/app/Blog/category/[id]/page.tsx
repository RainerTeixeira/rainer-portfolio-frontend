"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryList from "../../components/CategoryList"; // Certifique-se de que o caminho está correto

const inicio = "Inicio da categoria"; // Definindo a constante no início

interface Category {
    id: number;
    name: string;
}

const CategoryPage = () => {
    const router = useRouter();
    const { id } = router.query; // Pega o ID da categoria da URL
    const [category, setCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // Carregar dados da categoria baseada no ID
            fetch(`/api/categories/${id}`)
                .then((response) => response.json())
                .then((data) => setCategory(data))
                .catch((err) => setError("Erro ao carregar categoria"));
        }
    }, [id]);

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!category) {
        return <div className="text-center text-gray-500">Carregando categoria...</div>;
    }

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <main className="col-span-2">
                    {/* Aqui pode ser carregado o conteúdo principal do blog */}
                    <h1 className="text-3xl font-bold mb-4">{inicio}</h1>
                    {/* Conteúdo relacionado ao ID da categoria */}
                </main>

                <aside className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Categoria: {category?.name}</h2>

                    <CategoryList />

                    {/* Futura seção de tags */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">Tags</h3>
                        <p className="text-gray-500">Em breve, as tags estarão disponíveis.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CategoryPage;
