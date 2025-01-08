// app/blog/page.tsx
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function BlogPage() {
    // Exemplo de dados de posts, isso pode vir de um CMS ou banco de dados
    const posts = [
        {
            id: 1,
            title: "Como melhorar a performance de aplicações web",
            summary: "Descubra como otimizar o desempenho de aplicações web com boas práticas e ferramentas.",
            date: "10 de janeiro de 2025",
            author: "Rainer Teixeira",
        },
        {
            id: 2,
            title: "Introdução ao Docker e Contêineres",
            summary: "Aprenda os fundamentos do Docker e como ele pode transformar o desenvolvimento de software.",
            date: "05 de janeiro de 2025",
            author: "Rainer Teixeira",
        },
        {
            id: 3,
            title: "A importância da automação em TI",
            summary: "Entenda como a automação pode melhorar a eficiência e reduzir erros operacionais.",
            date: "01 de janeiro de 2025",
            author: "Rainer Teixeira",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 sm:p-16">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-indigo-600">Blog de Rainer Teixeira</h1>
                <p className="text-xl text-gray-600 mt-2">Insights sobre TI, Desenvolvimento e Automação</p>
            </header>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-indigo-600 mb-8">Últimos Posts</h2>

                {/* Lista de posts */}
                <div className="space-y-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-2xl font-semibold text-indigo-600">{post.title}</h3>
                            <p className="text-gray-700 mt-2">{post.summary}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-gray-500">{post.date}</span>
                                {/* Corrigido o uso do <Link> */}
                                <Link href={`/blog/${post.id}`} className="text-sm text-indigo-600 hover:underline">
                                    Leia mais
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
