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
        const headers = Array.from(doc.querySelectorAll('h2, h3, h4'));

        const tocItems = headers.map((header) => ({
            text: header.textContent || '',
            id: header.id || header.textContent?.toLowerCase().replace(/\s+/g, '-'),
        }));

        setToc(tocItems);
    }, [contentHTML]);

    return (
        toc.length > 0 && (
            <nav className="toc"> {/* Removidos todos os estilos */}
                <ul className="list-none pl-0">
                    {toc.map((item) => (
                        <li key={item.id} className="mb-2">
                            <a href={`#${item.id}`}> {/* Removido o estilo do link */}
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