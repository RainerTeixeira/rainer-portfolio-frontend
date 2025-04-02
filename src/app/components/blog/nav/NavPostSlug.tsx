"use client";

import React, { useEffect, useState } from 'react';

interface TocItem {
    text: string;
    id: string;
}

const NavPostSlug = ({ contentHTML }: { contentHTML: string }) => {
    const [toc, setToc] = useState<TocItem[]>([]);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentHTML, 'text/html');
        const headers = Array.from(doc.querySelectorAll('h2, h3, h4'));

        const tocItems = headers.map((header) => ({
            text: header.textContent || '',
            id: header.id || header.textContent?.toLowerCase().replace(/\s+/g, '-'),
        }));

        setToc(tocItems);
    }, [contentHTML]);

    return (
        toc.length > 0 && (
            <nav className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-8 h-fit mb-6">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Conteúdo:</h2>
                <ul className="list-none pl-0">
                    {toc.map((item) => (
                        <li key={item.id} className="mb-2">
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

export default NavPostSlug;