import { Barlow_Condensed } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "./components/Navigation/ResponsiveNav";
import Footer from "./components/Footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"; // Importando o SpeedInsights

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
    "Rainer Oliveira Teixeira, TI, Portfólio, Desenvolvimento, Automação, Zabbix, Docker, Sistemas de Informação.",
  authors: [
    {
      name: "Rainer Teixeira",
      url: "https://rainersoft.com.br",
      affiliation: "Especialista em TI, Desenvolvimento de Sistemas e Automação",
    },
  ],
  openGraph: {
    title: "Rainer Portfolio | Tecnologia e Inovação",
    description:
      "Portfólio profissional de Rainer Oliveira Teixeira, especialista em TI, desenvolvimento de sistemas e automação de processos.",
    image: "/path-to-image.jpg",
    url: "https://rainersoft.com.br",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rainer Portfolio | Tecnologia e Inovação",
    description:
      "Portfólio profissional de Rainer Oliveira Teixeira, especialista em TI, desenvolvimento de sistemas e automação de processos.",
    image: "/path-to-image.jpg",
  },
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
          content={metadata.authors.map((author) => author.name).join(", ")}
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:url" content={metadata.openGraph.url} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </head>
      <body className={`${barlowCondensed.className} bg-gray-50 text-gray-900`}>
        <SpeedInsights /> {/* Adicionando o SpeedInsights aqui */}
        <ResponsiveNav />
        <main className="min-h-screen" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
