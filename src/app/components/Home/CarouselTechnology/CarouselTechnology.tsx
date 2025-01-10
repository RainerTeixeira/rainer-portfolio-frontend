import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TechnologyCard from "./CarouselTechnologyCard";
import {
  FaDocker,
  FaDatabase,
  FaJsSquare,
  FaGitAlt,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaWindows,
} from "react-icons/fa";
import {
  SiPython,
  SiKubernetes,
  SiUbuntu,
  SiJenkins,
  SiTerraform,
} from "react-icons/si";

// Constantes reutilizáveis
const ICON_SIZE = 60;
const CARD_PADDING = "p-6";
const CARD_MARGIN = "m-2"; // Ajuste para margem menor
const CARD_MAX_WIDTH = "max-w-[200px]"; // Reduzindo ainda mais a largura do card
const CARD_MIN_HEIGHT = "min-h-[300px]";
const CARD_TEXT_COLOR = "text-black text-opacity-80"; // Cor mais suave
const DESCRIPTION_MARGIN_TOP = "mt-3";
const HEADING_FONT_SIZE = "text-4xl";
const HEADING_MARGIN_BOTTOM = "mb-6";
const CONTAINER_WIDTH = "w-[80%]";
const CONTAINER_MARGIN_TOP = "mt-[4rem]";
const CONTAINER_PADDING = "px-6";

// Configuração do carousel com itens visíveis em diferentes tamanhos de tela
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4, // 4 cards para desktop
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2, // 2 cards para tablets
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1, // 1 card para celulares
    slidesToSlide: 1,
  },
};

const PopularTechnologies = () => {
  return (
    <div className="pt-[3rem] pb-[3rem] bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-500">
      <h1 className={`heading text-white text-center ${HEADING_FONT_SIZE} font-bold ${HEADING_MARGIN_BOTTOM}`}>
        Tecnologias que Utilizo <span className="text-yellow-300">no Meu Currículo</span>
      </h1>
      <div className={`${CONTAINER_WIDTH} ${CONTAINER_MARGIN_TOP} mx-auto ${CONTAINER_PADDING}`}>
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite={true}
          responsive={responsive}
          centerMode={true}
          itemClass="item mx-2" // Ajuste de margem horizontal
          showDots={false}
        >
          <TechnologyCard
            title="Docker"
            icon={<FaDocker size={ICON_SIZE} />}
            description="Tecnologia de contêinerização que facilita o desenvolvimento, o envio e a execução de aplicativos em ambientes isolados e escaláveis."
          />
          <TechnologyCard
            title="SQL Avançado"
            icon={<FaDatabase size={ICON_SIZE} />}
            description="Especialização no uso de SQL para a criação de consultas complexas e na manipulação de grandes volumes de dados em bancos de dados relacionais."
          />
          <TechnologyCard
            title="JavaScript"
            icon={<FaJsSquare size={ICON_SIZE} />}
            description="Linguagem essencial para o desenvolvimento de aplicações web interativas, permitindo uma experiência dinâmica para os usuários."
          />
          <TechnologyCard
            title="Git"
            icon={<FaGitAlt size={ICON_SIZE} />}
            description="Sistema de controle de versão distribuído, amplamente utilizado por equipes de desenvolvimento para rastrear mudanças no código-fonte e colaborar eficientemente."
          />
          <TechnologyCard
            title="React"
            icon={<FaReact size={ICON_SIZE} />}
            description="Biblioteca JavaScript para construir interfaces de usuário dinâmicas e reativas."
          />
          <TechnologyCard
            title="Node.js"
            icon={<FaNodeJs size={ICON_SIZE} />}
            description="Ambiente de execução para JavaScript no lado do servidor, permitindo a criação de aplicações escaláveis."
          />
          <TechnologyCard
            title="HTML5"
            icon={<FaHtml5 size={ICON_SIZE} />}
            description="A versão mais recente do HTML, que oferece novos recursos para desenvolvimento web."
          />
          <TechnologyCard
            title="Kubernetes"
            icon={<SiKubernetes size={ICON_SIZE} />}
            description="Sistema de orquestração de contêineres para automação de implantação e escalabilidade de aplicativos."
          />
          <TechnologyCard
            title="Python"
            icon={<SiPython size={ICON_SIZE} />}
            description="Linguagem versátil utilizada para automação de processos, scripts personalizados e desenvolvimento web."
          />
          <TechnologyCard
            title="Windows"
            icon={<FaWindows size={ICON_SIZE} />}
            description="Sistema operacional desenvolvido pela Microsoft, amplamente utilizado em servidores e desktops."
          />
          <TechnologyCard
            title="Ubuntu"
            icon={<SiUbuntu size={ICON_SIZE} />}
            description="Sistema operacional baseado em Linux, popular para servidores e ambientes de desenvolvimento."
          />
          <TechnologyCard
            title="Jenkins"
            icon={<SiJenkins size={ICON_SIZE} />}
            description="Plataforma de automação para integração contínua e entrega contínua de software."
          />
          <TechnologyCard
            title="Terraform"
            icon={<SiTerraform size={ICON_SIZE} />}
            description="Ferramenta de infraestrutura como código (IaC) para provisionamento e gerenciamento de recursos em diversas plataformas."
          />
        </Carousel>
      </div>
    </div>
  );
};

export default PopularTechnologies;
