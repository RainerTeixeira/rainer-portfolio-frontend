"use client";

import React from "react";

const AsidePostSlug = () => {
    return (
        <aside className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-8 h-fit hidden lg:block">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Relacionados</h2>
            <div className="space-y-4">
                <a href="#" className="block text-blue-600 hover:underline">Como otimizar seu site para SEO</a>
                <a href="#" className="block text-blue-600 hover:underline">As últimas tendências em marketing digital</a>
                <a href="#" className="block text-blue-600 hover:underline">Guia completo para iniciantes em React</a>
            </div>
        </aside>
    );
};

export default AsidePostSlug;