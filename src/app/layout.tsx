// src/app/layout.tsx
import "./styles/globals.css";
import { Barlow_Condensed } from "next/font/google";
import Footer from "./components/footer/Footer";
import ResponsiveNav from "./components/navigation/ResponsiveNav";

const barlowCondensed = Barlow_Condensed({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata = {
    title: "Rainer Portfolio | Tecnologia e Inovação",
    description:
        "Portfólio profissional de Rainer Oliveira Teixeira, especialista em TI, desenvolvimento de sistemas e automação de processos.",
    keywords:
        "Rainer Oliveira Teixeira, TI, Portfólio, Desenvolvimento, Automação, Zabbix, Docker, Sistemas de Informação.",
    authors: [
        {
            name: "Rainer Teixeira",
            url: "https://rainersoft.com.br",
        },
    ],
    openGraph: {
        title: "Rainer Portfolio | Tecnologia e Inovação",
        description:
            "Portfólio profissional de Rainer Oliveira Teixeira, especialista em TI, desenvolvimento de sistemas e automação de processos.",
        url: "https://rainersoft.com.br",
        type: "website",
        locale: "pt_BR",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={`${barlowCondensed.className} bg-gray-50 text-gray-900`}>
                <ResponsiveNav />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
