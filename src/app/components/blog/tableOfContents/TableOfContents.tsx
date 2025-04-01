"use client";

import React, { useEffect, useState } from 'react';

interface TocItem {
    text: string;
    id: string;
}

const TableOfContents = ({ contentHTML }: { contentHTML: string }) => {
    const [toc, setToc] = useState<TocItem[]>([]);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHTML, 'text/html');
        const headers = Array.from(doc.querySelectorAll('h2, h3, h4')); // Seleciona todos os cabeçalhos

        const tocItems = headers.map((header) => ({
            text: header.textContent || '',
            id: header.id || header.textContent?.toLowerCase().replace(/\s+/g, '-'), // Cria um ID único para cada cabeçalho
        }));

        setToc(tocItems);
    }, [contentHTML]);

    return (
        toc.length > 0 && (
            <nav className="toc w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Conteúdo</h2>
                <ul className="list-inside list-disc">
                    {toc.map((item) => (
                        <li key={item.id}>
                            <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    );
};

export default TableOfContents;
