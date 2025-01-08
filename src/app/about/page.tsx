// src/app/about/page-about.tsx

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8 sm:p-16">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-indigo-600">Rainer Oliveira Teixeira</h1>
                <p className="text-xl text-gray-600 mt-2">Profissional de Tecnologia da Informação</p>
                <div className="mt-6 flex justify-center gap-6">
                    <a
                        href="mailto:raineroliveira94@hotmail.com"
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        E-mail: raineroliveira94@hotmail.com
                    </a>
                    <a
                        href="https://linkedin.com/in/rainerteixeira"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Linkedin: linkedin.com/in/rainerteixeira
                    </a>
                </div>
            </header>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-indigo-600">Objetivo</h2>
                <p className="mt-2 text-lg text-gray-700">
                    Busco aplicar meus conhecimentos em TI, focando na resolução de problemas técnicos, otimização de processos e
                    contribuindo para a transformação digital nas empresas por meio de soluções inovadoras e eficientes.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-indigo-600">Formação Acadêmica</h2>
                <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                    <li>Graduação em Sistemas de Informação - Universidade Estácio de Sá (2022)</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-indigo-600">Experiência Profissional</h2>

                {/* Innovus */}
                <div className="mt-4">
                    <h3 className="text-2xl font-semibold text-indigo-600">Analista de Sistemas - Innovus Soluções Inteligentes</h3>
                    <p className="text-lg text-gray-700">12/2022 - 04/2024</p>
                    <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                        <li>Coordenar o suporte ao ERP e administrar bancos de dados empresariais.</li>
                        <li>Implementar estratégias eficazes de otimização de consultas SQL complexas.</li>
                        <li>Gerir migrações seguras de dados críticos com foco em integridade total.</li>
                        <li>Prestar suporte técnico a dispositivos diversos, como celulares e impressoras.</li>
                        <li>Automatizar processos operacionais por meio de scripts personalizados e integrações.</li>
                    </ul>
                </div>

                {/* Digital Informática */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-indigo-600">
                        Analista de Desenvolvimento de Sistemas - Digital Informática
                    </h3>
                    <p className="text-lg text-gray-700">05/2022 - 10/2022</p>
                    <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                        <li>Administrar servidores Windows modernos e gerenciar usuários no Active Directory.</li>
                        <li>Configurar acessos remotos via RDP com segurança e monitorar logs completos.</li>
                        <li>Realizar manutenção preventiva constante e corretiva em hardware e software.</li>
                        <li>Configurar corretamente e gerenciar coletores de dados integrados ao sistema SAP.</li>
                        <li>Monitorar infraestrutura crítica utilizando a ferramenta Zabbix avançada.</li>
                    </ul>
                </div>

                {/* Uniredes Telecomunicações */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-indigo-600">Analista de Suporte Técnico - Uniredes Telecomunicações</h3>
                    <p className="text-lg text-gray-700">09/2019 - 12/2021</p>
                    <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                        <li>Atender chamados técnicos e resolver problemas complexos de nível 2 via Service Desk.</li>
                        <li>Prestar suporte remoto qualificado e manutenção eficiente de sistemas corporativos.</li>
                        <li>Monitorar redes locais constantemente usando a poderosa ferramenta Zabbix Pro.</li>
                    </ul>
                </div>

                {/* Tech Data Informática */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-indigo-600">Técnico de Computador - Tech Data Informática</h3>
                    <p className="text-lg text-gray-700">03/2018 - 08/2019</p>
                    <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                        <li>Prestar suporte técnico especializado em hardware diverso e sistemas operacionais.</li>
                        <li>Realizar configurações completas e gerenciar redes com switches e roteadores.</li>
                        <li>Produzir cabos Ethernet certificados e implementar redes locais robustas.</li>
                        <li>Manter sistemas de impressão operacionais com manutenção preventiva frequente.</li>
                        <li>Gerenciar sistemas de energia UPS eficazes para minimizar quedas de energia.</li>
                    </ul>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-indigo-600">Habilidades Técnicas</h2>
                <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                    <li>Infraestrutura e Monitoramento: Zabbix, Grafana, Docker, administração de servidores Linux e Windows.</li>
                    <li>Desenvolvimento: SQL avançado, JavaScript, automação de processos com scripts personalizados.</li>
                    <li>Servidores Web: Apache, Nginx.</li>
                    <li>Redes e Suporte: Service Desk nível 2, configuração de redes LAN e manutenção de hardware.</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-indigo-600">Cursos Complementares</h2>
                <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
                    <li>Monitoramento e Análise de Desempenho: Zabbix e Grafana.</li>
                    <li>Contêineres: Docker.</li>
                    <li>Versionamento de Códigos: Git.</li>
                    <li>Desenvolvimento Web Avançado: JavaScript e SQL.</li>
                </ul>
            </section>
        </div>
    );
}
