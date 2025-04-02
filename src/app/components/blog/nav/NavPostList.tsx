// src\app\components\blog\nav\NavPostList.tsx
"use client";

import React from "react";

const NavPostList = () => {
    return (
        <nav className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-8 h-fit">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Filtros</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-md font-semibold mb-2 text-gray-700">Categorias</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Tecnologia</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Design</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Desenvolvimento</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Marketing</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-md font-semibold mb-2 text-gray-700">Posts Recentes</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Novo recurso lançado</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Dicas de produtividade</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline text-sm">Aprenda algo novo hoje</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-md font-semibold mb-2 text-gray-700">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        <a href="#" className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold">React</a>
                        <a href="#" className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold">Next.js</a>
                        <a href="#" className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold">JavaScript</a>
                        <a href="#" className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-3 py-1 text-xs font-semibold">CSS</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavPostList;