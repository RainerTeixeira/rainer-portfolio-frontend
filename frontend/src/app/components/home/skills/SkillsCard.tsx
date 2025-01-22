import React from "react";
import Image from "next/image";

const SECTION_PADDING_Y = 'pt-[5rem] pb-[3rem]';
const TITLE_CLASSES = 'heading';
const DESCRIPTION_CLASSES = 'mt-[1rem] text-gray-600 text-center w-[80%] mx-auto leading-7';
const CARDS_CONTAINER_CLASSES = 'mt-[5rem] w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-center';

// Definição do tipo para as props do SkillsCard
interface SkillsCardProps {
  image: string;
  name: string;
  position: string;
  Text: string;
}

const SkillsCard = ({ image, name, position, Text }: SkillsCardProps) => {
  return (
    <div className="text-center">
      <Image
        src={image}
        alt={name}
        height={400}
        width={400}
        className="rounded-2xl mx-auto"
      />
      <h1 className="text-[40px] text-gray-800 mt-[1.5rem] font-bold">
        {name}
      </h1>
      <p className="mt-[0.4rem] mb-[0.4rem] px-4 py-1 bg-green-600 text-white mx-auto w-fit font-medium">
        {position}
      </p>
      <p className="text-center md:w-[70%] mx-auto text-gray-600 mt-[1rem]">
        {Text}
      </p>
    </div>
  );
};

const Team = () => {
  return (
    <div className={SECTION_PADDING_Y}>
      <h1 className={TITLE_CLASSES}>
        Conheça Minhas <span className="text-red-600">Habilidades</span>
      </h1>
      <p className={DESCRIPTION_CLASSES}>
        Durante minha trajetória em Tecnologia da Informação, adquiri um conjunto sólido de competências técnicas e práticas que me permitem resolver desafios com eficácia e criar soluções inovadoras. Abaixo, apresento as principais áreas em que me especializei ao longo da minha carreira.
      </p>
      <div className={CARDS_CONTAINER_CLASSES}>
        <div data-aos="fade-left" data-aos-anchor-placement="top-center">
          <SkillsCard
            image="/images/t1.jpg"
            name="Infraestrutura e Monitoramento"
            position="Zabbix, Grafana, Docker"
            Text="Expertise em monitoramento de redes e sistemas com ferramentas avançadas, administração de servidores Linux e Windows, e automação com contêineres Docker para maior eficiência."
          />
        </div>
        <div data-aos="zoom-in" data-aos-delay="300" data-aos-anchor-placement="top-center">
          <SkillsCard
            image="/images/t2.jpg"
            name="Desenvolvimento e SQL"
            position="JavaScript, SQL Avançado"
            Text="Sólida experiência em desenvolvimento web, criação de scripts personalizados e otimização de consultas SQL complexas para melhorar a eficiência de sistemas."
          />
        </div>
        <div data-aos="fade-right" data-aos-delay="600" data-aos-anchor-placement="top-center">
          <SkillsCard
            image="/images/t3.jpg"
            name="Servidores Web e Escalabilidade"
            position="Apache, Nginx"
            Text="Habilidade em configurar, gerenciar e otimizar servidores web, garantindo alta disponibilidade, desempenho e escalabilidade para aplicações corporativas."
          />
        </div>
      </div>
    </div>
  );
};

export default Team;
