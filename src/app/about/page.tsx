"use client"; // Marca este arquivo como um componente cliente

import Image from 'next/image';
import { useState } from 'react';

export default function About() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 sm:p-16 flex flex-col items-center">
            {/* Header */}
            <header className="text-center mb-12">
                <div className="w-40 h-40 mx-auto mb-6">
                    <Image
                        src="/images/profile.jpg"
                        alt="Rainer Oliveira Teixeira"
                        width={160}
                        height={160}
                        className="rounded-full shadow-lg"
                    />
                </div>
                <h1 className="text-4xl font-extrabold text-indigo-600">Rainer Oliveira Teixeira</h1>
                <p className="text-xl text-gray-600 mt-2">Profissional de Tecnologia da Informação</p>
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <a
                        href="mailto:raineroliveira94@hotmail.com"
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        raineroliveira94@hotmail.com
                    </a>
                    <a
                        href="https://linkedin.com/in/rainerteixeira"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        linkedin.com/in/rainerteixeira
                    </a>
                </div>
            </header>

            {/* Introdução */}
            <section className="text-center mb-12 max-w-3xl">
                <h2 className="text-2xl font-semibold text-gray-800">Bem-vindo ao meu portfólio!</h2>
                <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    Sou apaixonado por resolver problemas técnicos, otimizar processos e contribuir para a inovação tecnológica nas empresas.
                    Explore minha trajetória profissional, veja meus projetos e baixe meu currículo para mais detalhes.
                </p>
                <button
                    onClick={() => window.open('/Rainer_Teixeira_Curriculo.pdf', '_blank')}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`mt-6 px-6 py-3 text-white rounded-lg transition-all shadow-md ${isHovered ? 'bg-indigo-700' : 'bg-indigo-600'
                        }`}
                >
                    Baixar Currículo
                </button>
            </section>

            {/* Formação e Habilidades */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl">
                <div>
                    <h3 className="text-xl font-semibold text-indigo-600">Formação Acadêmica</h3>
                    <p className="mt-2 text-gray-700">
                        Graduação em Sistemas de Informação - Universidade Estácio de Sá (2022)
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-indigo-600">Habilidades Técnicas</h3>
                    <ul className="list-disc pl-6 mt-2 text-gray-700">
                        <li>Infraestrutura: Zabbix, Grafana, Docker, servidores Linux e Windows.</li>
                        <li>Desenvolvimento: SQL, JavaScript, automação de processos.</li>
                        <li>Servidores Web: Apache, Nginx.</li>
                        <li>Gerenciamento de Projetos: Metodologias ágeis (Scrum).</li>
                    </ul>
                </div>
            </section>

            {/* Projetos Recentes */}
            <section className="text-center max-w-5xl">
                <h3 className="text-xl font-semibold text-indigo-600">Projetos Recentes</h3>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                        <h4 className="text-lg font-semibold text-gray-800">ERP Multiempresas</h4>
                        <p className="mt-2 text-gray-600">
                            Sistema de gestão empresarial, rodando em um servidor Ubuntu Server com MySQL, focado em controle de estoque e movimentação de produtos entre empresas.
                        </p>
                        <a
                            href="#"
                            className="text-sm text-indigo-600 hover:underline mt-4 block"
                        >
                            Ver Mais
                        </a>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                        <h4 className="text-lg font-semibold text-gray-800">Sistema de Controle de Acesso</h4>
                        <p className="mt-2 text-gray-600">
                            Aplicação desenvolvida em Java para controle de permissões de usuários em um ambiente corporativo, integrada ao banco de dados SQLite.
                        </p>
                        <a
                            href="#"
                            className="text-sm text-indigo-600 hover:underline mt-4 block"
                        >
                            Ver Mais
                        </a>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                        <h4 className="text-lg font-semibold text-gray-800">Monitoramento de Redes</h4>
                        <p className="mt-2 text-gray-600">
                            Configuração de monitoramento em tempo real utilizando Zabbix e Grafana para uma infraestrutura corporativa com alta disponibilidade.
                        </p>
                        <a
                            href="#"
                            className="text-sm text-indigo-600 hover:underline mt-4 block"
                        >
                            Ver Mais
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
