// src/app/Blog/SEO/SEO.tsx

import React from "react";
import Head from "next/head";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    twitterImage?: string;
    publishedTime?: string;
    author?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords = "blog, post, artigo", // Definindo palavras-chave padrão
    ogTitle,
    ogDescription,
    ogImage,
    ogType = "article", // Tipo padrão para artigos
    twitterImage,
    publishedTime,
    author = "Nome do Autor", // Substitua pelo autor real, se disponível
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph meta tags */}
            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={ogImage || "/images/default-og-image.jpg"} />
            <meta property="og:type" content={ogType} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter Cards meta tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={twitterImage || ogImage || "/images/default-og-image.jpg"} />
        </Head>
    );
};

export default SEO;
