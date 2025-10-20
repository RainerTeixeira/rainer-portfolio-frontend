/**
 * Utilitários de SEO
 * 
 * Funções para gerar meta tags e melhorar SEO
 * 
 * @fileoverview SEO utilities
 * @author Rainer Teixeira
 */

import type { Metadata } from "next"
import type { Post, Category, TiptapJSON } from "@/types/database"

interface GenerateMetadataProps {
  title: string
  description: string
  image?: string
  type?: "website" | "article" | "profile"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  canonicalUrl?: string
}

/**
 * Gera metadados completos para SEO
 */
export function generateMetadata({
  title,
  description,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
  canonicalUrl,
}: GenerateMetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rainersoft.com.br"
  const siteName = "Rainer Soft"
  
  const metadata: Metadata = {
    title,
    description,
    
    // Open Graph
    openGraph: {
      title,
      description,
      type,
      locale: "pt_BR",
      url: canonicalUrl || siteUrl,
      siteName,
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }] : undefined,
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
      creator: "@rainerteixeira",
      site: "@rainerteixeira",
    },

    // Canonical
    alternates: canonicalUrl ? {
      canonical: canonicalUrl,
    } : undefined,

    // Keywords
    keywords: tags,

    // Authors
    authors: authors?.map(name => ({ name })),
  }

  // Article specific
  if (type === "article" && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors,
      tags,
    }
  }

  return metadata
}

/**
 * Gera metadados para post do blog
 */
export function generatePostMetadata(post: Post): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rainersoft.com.br"
  const postUrl = `${siteUrl}/blog/${post.slug}`
  
  // Extrair preview do conteúdo
  const description = extractTextFromTiptap(post.content).slice(0, 160) + "..."
  
  return generateMetadata({
    title: post.title,
    description,
    type: "article",
    publishedTime: post.publishedAt?.toISOString(),
    modifiedTime: post.updatedAt.toISOString(),
    authors: ["Rainer Teixeira"], // TODO: Carregar autor com relação
    canonicalUrl: postUrl,
  })
}

/**
 * Gera metadados para categoria
 */
export function generateCategoryMetadata(category: Category): Metadata {
  return generateMetadata({
    title: `${category.name} - Artigos e Tutoriais`,
    description: category.description || `Explore artigos sobre ${category.name}`,
    image: category.coverImage || undefined,
  })
}

/**
 * Extrai texto do JSON do Tiptap
 */
function extractTextFromTiptap(content: TiptapJSON): string {
  if (!content || !content.content) return ""

  let text = ""
  
  function traverse(node: Record<string, unknown>) {
    if ('text' in node && typeof node.text === 'string') {
      text += node.text + " "
    }
    if ('content' in node && Array.isArray(node.content)) {
      node.content.forEach((child) => {
        if (typeof child === 'object' && child !== null) {
          traverse(child as Record<string, unknown>)
        }
      })
    }
  }

  if (content.content) {
    content.content.forEach((child) => {
      if (typeof child === 'object' && child !== null) {
        traverse(child as unknown as Record<string, unknown>)
      }
    })
  }
  
  return text.trim()
}

/**
 * Gera structured data (JSON-LD) para artigo
 */
export function generateArticleStructuredData(post: Post) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rainersoft.com.br"
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: extractTextFromTiptap(post.content).slice(0, 160),
    image: `${siteUrl}/og-image.png`, // TODO: Adicionar imagem do post
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Rainer Teixeira", // TODO: Carregar autor com relação
      url: `${siteUrl}/author/rainer`,
    },
    publisher: {
      "@type": "Organization",
      name: "Rainer Soft",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  }
}

/**
 * Gera structured data (JSON-LD) para breadcrumbs
 */
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rainersoft.com.br"

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

/**
 * Gera sitemap XML
 */
export function generateSitemap(posts: Post[], categories: Category[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rainersoft.com.br"
  const now = new Date().toISOString()

  const urls = [
    // Páginas estáticas
    { loc: "/", priority: "1.0", changefreq: "daily" },
    { loc: "/blog", priority: "0.9", changefreq: "daily" },
    { loc: "/sobre", priority: "0.8", changefreq: "monthly" },
    { loc: "/contato", priority: "0.8", changefreq: "monthly" },

    // Posts
    ...posts.map(post => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updatedAt.toISOString(),
      priority: post.featured ? "0.9" : "0.7",
      changefreq: "weekly",
    })),

    // Categorias
    ...categories.map(category => ({
      loc: `/blog?category=${category.slug}`,
      priority: "0.6",
      changefreq: "weekly",
    })),
  ]

  const xmlUrls = urls
    .map(
      (url) => `
  <url>
    <loc>${siteUrl}${url.loc}</loc>
    ${'lastmod' in url ? `<lastmod>${url.lastmod}</lastmod>` : `<lastmod>${now}</lastmod>`}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`
}

/**
 * Gera robots.txt
 */
export function generateRobotsTxt(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rainersoft.com.br"

  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /dashboard
Disallow: /api

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`
}

