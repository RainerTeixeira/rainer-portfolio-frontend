export default function Page() {
  return (
    <div className="text-center mt-10">
      {/* Seção de Boas-Vindas */}
      <h1 className="text-4xl font-bold text-blue-600">Bem-vindo ao meu Portfólio!</h1>
      <p className="mt-4 text-xl">Olá, eu sou Rainer Oliveira Teixeira, um profissional de Tecnologia da Informação com experiência em desenvolvimento de sistemas e infraestrutura de TI.</p>

      {/* Seção sobre o portfólio */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">O que eu faço</h2>
        <p className="mt-4 text-lg">
          Com uma sólida formação acadêmica e experiência prática, meu foco é resolver problemas complexos, otimizar processos e contribuir para a transformação digital das empresas. Confira meus projetos e soluções no meu portfólio.
        </p>
      </div>

      {/* Links de Navegação */}
      <div className="mt-8 space-x-4">
        <a href="#portfolio" className="text-lg text-blue-500 hover:underline">Portfólio</a>
        <a href="#blog" className="text-lg text-blue-500 hover:underline">Blog</a>
        <a href="#sobre" className="text-lg text-blue-500 hover:underline">Sobre</a>
      </div>

      {/* Seção do Portfólio */}
      <div id="portfolio" className="mt-12">
        <h2 className="text-2xl font-semibold">Meus Projetos</h2>
        <p className="mt-4 text-lg">Confira os projetos nos quais estive envolvido, que vão desde sistemas de gestão até soluções em monitoramento de infraestrutura.</p>
        <ul className="mt-4 space-y-2 text-lg">
          <li><a href="#" className="text-blue-500 hover:underline">Sistema de ERP para Empresas</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">Monitoramento com Zabbix e Grafana</a></li>
          <li><a href="#" className="text-blue-500 hover:underline">Automação com Docker e Scripts</a></li>
        </ul>
      </div>

      {/* Seção do Blog */}
      <div id="blog" className="mt-12">
        <h2 className="text-2xl font-semibold">Blog</h2>
        <p className="mt-4 text-lg">Acesse meu blog, onde compartilho artigos sobre tecnologia, automação, monitoramento e outras experiências profissionais.</p>
        <a href="https://meublog.com" className="mt-4 text-blue-500 text-lg hover:underline">Visite meu blog</a>
      </div>

      {/* Seção de Contato */}
      <div id="sobre" className="mt-12">
        <h2 className="text-2xl font-semibold">Sobre Mim</h2>
        <p className="mt-4 text-lg">Sou formado em Sistemas de Informação, com experiência em administração de sistemas, monitoramento de infraestrutura e desenvolvimento de soluções para empresas. Meu objetivo é sempre melhorar processos e resolver problemas com eficiência.</p>
      </div>
    </div>
  );
}
