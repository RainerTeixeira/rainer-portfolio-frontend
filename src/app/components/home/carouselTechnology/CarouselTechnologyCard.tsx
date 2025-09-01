import React from "react";
import Carousel from "react-multi-carousel"; // Importação do Carousel
import "react-multi-carousel/lib/styles.css"; // Estilos do carousel
import { FaDocker, FaDatabase, FaJsSquare, FaGitAlt, FaReact, FaNodeJs, FaHtml5, FaWindows, FaAws } from "react-icons/fa";
import { SiPython, SiKubernetes, SiUbuntu, SiMongodb, SiGrafana, SiZabbix, SiPowershell } from "react-icons/si";

// Constantes em maiúsculas
const ICON_SIZE = 60;
const CARD_PADDING = "p-6";
const CARD_MARGIN = "m-2";
const CARD_MAX_WIDTH = "max-w-[200px]";
const CARD_MIN_HEIGHT = "min-h-[300px]";
const CARD_TEXT_COLOR = "text-black text-opacity-80";
const HEADING_FONT_SIZE = "text-sm";
const HEADING_MARGIN_TOP = "mt-3";
const HEADING_TEXT_COLOR = "text-black text-opacity-90";
const HEADING_ICON_COLOR = "text-indigo-600";
const ICON_MARGIN_BOTTOM = "mb-2";

// Configuração do carousel com responsividade
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1324 }, items: 4, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1324, min: 764 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 764, min: 0 }, items: 1, slidesToSlide: 1 },
};

// Interface do tipo das props para o TechnologyCard
interface TechnologyCardProps {
  title: string;
  icon: React.ComponentType<{ size: number }>;
  description: string;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({ title, icon: Icon, description }) => (
  <div className={`bg-white ${CARD_PADDING} rounded-lg ${CARD_MARGIN} ${CARD_MAX_WIDTH} w-full shadow-md hover:shadow-lg hover:border-2 hover:border-indigo-300 transform transition-all duration-500 ease-in-out hover:scale-105 ${CARD_MIN_HEIGHT}`}>
    <div className="flex justify-center items-center flex-col">
      <span className={`flex justify-center items-center ${ICON_MARGIN_BOTTOM} ${HEADING_ICON_COLOR}`}>
        <Icon size={ICON_SIZE} />
      </span>
      <h1 className={`${HEADING_MARGIN_TOP} ${HEADING_FONT_SIZE} font-semibold text-center ${HEADING_TEXT_COLOR}`}>
        {title}
      </h1>
      <p className={`mt-3 text-sm text-justify ${CARD_TEXT_COLOR}`}>{description}</p>
    </div>
  </div>
);

const PopularTechnologies: React.FC = () => {
  return (
    <div className="pt-[3rem] pb-[3rem] bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-500">
      <h1 className="heading text-white text-center text-4xl font-bold mb-6">
        Tecnologias que Utilizo <span className="text-yellow-300">no meu trabalho</span>
      </h1>
      <div className="w-[80%] mt-[4rem] mx-auto px-6">
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite={true}
          responsive={responsive}
          centerMode={true}
          itemClass="item mx-2"
          showDots={false}
        >
          <TechnologyCard
            title="Docker"
            icon={FaDocker}
            description="Uso Docker e Docker Compose para padronizar ambientes, criar imagens reprodutíveis e facilitar deploys em desenvolvimento e produção."
          />
          <TechnologyCard
            title="SQL Avançado"
            icon={FaDatabase}
            description="Tuning e otimização de consultas em MySQL/Postgres, modelagem relacional e preparação de dados para relatórios e dashboards."
          />
          <TechnologyCard
            title="JavaScript"
            icon={FaJsSquare}
            description="Desenvolvimento front-end e scripts de automação com JavaScript/TypeScript para interfaces dinâmicas e integrações entre sistemas."
          />
          <TechnologyCard
            title="Git"
            icon={FaGitAlt}
            description="Controle de versão, workflows colaborativos e integração com pipelines (GitHub Actions) para CI/CD."
          />
          <TechnologyCard
            title="React / Next.js"
            icon={FaReact}
            description="Construção de interfaces modernas e performáticas com React e Next.js (SSR/SSG), focando usabilidade e SEO."
          />
          <TechnologyCard
            title="Node.js"
            icon={FaNodeJs}
            description="APIs em Node.js para integração com ERPs, tratamento de dados e orquestração de processos backend."
          />
          <TechnologyCard
            title="Python"
            icon={SiPython}
            description="Automação, scripts para ETL/backup e integração com APIs; uso de Python para tasks operacionais e processamento de dados."
          />
          <TechnologyCard
            title="PowerShell"
            icon={SiPowershell}
            description="Automação administrativa e scripts para administração de Active Directory, backups e tarefas em ambientes Windows."
          />
          <TechnologyCard
            title="AWS Lambda / Serverless"
            icon={FaAws}
            description="Desenvolvimento e deploy de funções serverless (AWS Lambda) e integração com pipelines para soluções escaláveis."
          />
          <TechnologyCard
            title="Zabbix"
            icon={SiZabbix}
            description="Implementação de monitoramento de infraestrutura e serviços críticos com Zabbix para alertas e SLA proativo."
          />
          <TechnologyCard
            title="Grafana"
            icon={SiGrafana}
            description="Dashboards e visualização de métricas para observabilidade, correlacionando dados de desempenho e disponibilidade."
          />
          <TechnologyCard
            title="MongoDB"
            icon={SiMongodb}
            description="Trabalhos com bancos NoSQL para armazenar e consumir conjuntos de dados semi-estruturados em integrações."
          />
          <TechnologyCard
            title="Windows / Active Directory"
            icon={FaWindows}
            description="Administração de servidores Windows, gestão de usuários e políticas via Active Directory, e configuração de acessos remotos seguros."
          />
          <TechnologyCard
            title="Ubuntu"
            icon={SiUbuntu}
            description="Administração de servidores Linux (Ubuntu), manutenção de serviços e automação com scripts shell."
          />
          <TechnologyCard
            title="Kubernetes (básico)"
            icon={SiKubernetes}
            description="Experiência prática para orquestração de contêineres em clusters, deploys escaláveis e gestão de serviços."
          />
        </Carousel>
      </div>
    </div>
  );
};

export default PopularTechnologies;
