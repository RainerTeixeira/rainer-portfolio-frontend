"use client";

import { useState } from "react";
import Link from "next/link";
import "./globals.css"; // Importa os estilos globais

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="pt-BR">
      <head>
        <title>Portfólio de Rainer Teixeira</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900 font-sans">
        {/* Header */}
        <header className="bg-indigo-700 text-white shadow-md">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold tracking-wide">Rainer Teixeira</h1>
            <nav className={isMenuOpen ? "active" : ""}>
              <button onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M3 12h18M3 18h18"></path>
                </svg>
              </button>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">Sobre</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contato</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow py-10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm">&copy; {new Date().getFullYear()} Rainer Teixeira. Todos os direitos reservados.</p>
              <div className="mt-4 sm:mt-0 flex gap-4">
                <Link href="https://linkedin.com/in/rainerteixeira" target="_blank" className="hover:text-white transition-colors">LinkedIn</Link>
                <Link href="mailto:raineroliveira94@hotmail.com" className="hover:text-white transition-colors">E-mail</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
