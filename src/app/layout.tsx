import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "./components/Navigation/ResponsiveNav";
import Footer from "./components/Footer/Footer";

// Configuração da fonte Barlow Condensed
const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Definição dos metadados da página
export const metadata = {
  title: "Rainer Portfolio | Tecnologia e Inovação",
  description:
    "Portfólio profissional de Rainer Oliveira Teixeira, especialista em TI, desenvolvimento de sistemas e automação de processos. Descubra mais sobre suas habilidades e projetos.",
  keywords:
    "Rainer Oliveira Teixeira, TI, Portfólio, Desenvolvimento, Automação, Zabbix, Docker, Sistemas de Informação",
  // Definindo 'authors' com o autor Rainer Teixeira
  authors: [
    {
      name: "Rainer Teixeira",
      url: "https://rainersoft.com.br", // URL de Rainer Teixeira
      affiliation: "Especialista em TI, Desenvolvimento de Sistemas e Automação",
    },
  ], // Passando como um array de objetos
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta
          name="author"
          content={metadata.authors.map((author) => author.name).join(", ")} // Mapeando o nome do autor
        />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:image" content="/path-to-image.jpg" />
        <meta property="og:url" content="https://rainersoft.com.br" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/path-to-image.jpg" />
      </head>
      <body className={`${barlowCondensed.className} bg-gray-50 text-gray-900`}>
        <ResponsiveNav />
        <main className="min-h-screen" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
