import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaDocker, FaDatabase, FaJsSquare, FaGitAlt, FaReact, FaNodeJs, FaHtml5, FaWindows } from "react-icons/fa";
import { SiPython, SiKubernetes, SiUbuntu, SiMongodb, SiGrafana } from "react-icons/si";

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

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1324 }, items: 4, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1324, min: 764 }, items: 2, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 764, min: 0 }, items: 1, slidesToSlide: 1 },
};

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
        Tecnologias que Utilizo <span className="text-yellow-300">no Meu Currículo</span>
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
          <TechnologyCard title="Docker" icon={FaDocker} description="Contêinerização para desenvolvimento, deploy e execução de aplicações isoladas e escaláveis." />
          <TechnologyCard title="SQL Avançado" icon={FaDatabase} description="Criação e otimização de consultas complexas em bancos de dados relacionais, gerando relatórios estratégicos." />
          <TechnologyCard title="JavaScript" icon={FaJsSquare} description="Desenvolvimento de aplicações web interativas e modernas, com foco na experiência do usuário." />
          <TechnologyCard title="Git" icon={FaGitAlt} description="Controle de versão distribuído, gerenciamento de código e colaboração eficiente em equipes de desenvolvimento." />
          <TechnologyCard title="React" icon={FaReact} description="Construção de interfaces dinâmicas, reativas e escaláveis para aplicações web." />
          <TechnologyCard title="Node.js" icon={FaNodeJs} description="Execução de JavaScript no servidor, desenvolvimento de APIs e aplicações escaláveis." />
          <TechnologyCard title="HTML5" icon={FaHtml5} description="Estruturação de conteúdo web moderno, semântico e compatível com padrões atuais." />
          <TechnologyCard title="Kubernetes" icon={SiKubernetes} description="Orquestração de contêineres para automação, escalabilidade e gerenciamento de aplicações." />
          <TechnologyCard title="Python" icon={SiPython} description="Automação de processos, scripts personalizados e desenvolvimento de aplicações web." />
          <TechnologyCard title="Windows / PowerShell" icon={FaWindows} description="Automação de tarefas administrativas e gerenciamento de sistemas Windows." />
          <TechnologyCard title="Ubuntu" icon={SiUbuntu} description="Sistema operacional Linux utilizado em servidores e ambientes de desenvolvimento." />
          <TechnologyCard title="MongoDB" icon={SiMongodb} description="Banco de dados NoSQL para armazenamento e manipulação de grandes volumes de dados." />
          <TechnologyCard title="Grafana" icon={SiGrafana} description="Monitoramento e visualização de métricas de infraestrutura e aplicações em tempo real." />
        </Carousel>
      </div>
    </div>
  );
};

export default PopularTechnologies;
