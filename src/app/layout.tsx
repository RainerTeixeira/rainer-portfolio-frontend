import Link from "next/link";
import "./globals.css"; // Importa os estilos globais

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Portfólio de Rainer Teixeira</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">

        {/* Header */}
        <header className="bg-indigo-600 text-white p-4">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold">Rainer Teixeira</h1>
            <nav>
              <ul className="flex gap-6">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">Sobre</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contato</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">
          {children} {/* Aqui é onde o conteúdo das páginas será renderizado */}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="max-w-screen-xl mx-auto text-center">
            <p>&copy; 2025 Rainer Teixeira. Todos os direitos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

