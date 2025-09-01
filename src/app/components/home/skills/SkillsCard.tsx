import React from "react";
import Image from "next/image";

const SECTION_PADDING_Y = "pt-[5rem] pb-[3rem]";
const TITLE_CLASSES = "heading";
const DESCRIPTION_CLASSES =
  "mt-[1rem] text-gray-600 text-center w-[80%] mx-auto leading-7";
const CARDS_CONTAINER_CLASSES =
  "mt-[5rem] w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-start";

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
        className="rounded-2xl mx-auto object-cover"
      />
      <h3 className="text-[26px] text-gray-800 mt-[1.25rem] font-semibold">
        {name}
      </h3>
      <p className="mt-[0.4rem] mb-[0.4rem] px-3 py-1 bg-green-600 text-white inline-block w-auto font-medium rounded">
        {position}
      </p>
      <p className="text-center md:w-[85%] mx-auto text-gray-600 mt-[1rem] text-sm">
        {Text}
      </p>
    </div>
  );
};

const Team = () => {
  return (
    <section className={SECTION_PADDING_Y} aria-labelledby="skills-title">
      <h2 id="skills-title" className={TITLE_CLASSES}>
        Conheça Minhas <span className="text-red-600">Habilidades</span>
      </h2>

      <p className={DESCRIPTION_CLASSES}>
        Sou especialista em automação, integração de sistemas e infraestrutura
        cloud. Abaixo, algumas áreas de atuação com exemplos práticos do meu
        trabalho (scripts, integrações, monitoramento e aplicações full-stack).
      </p>

      <div className={CARDS_CONTAINER_CLASSES}>
        <div data-aos="fade-left" data-aos-anchor-placement="top-center">
          <SkillsCard
            image="/images/t1.jpg"
            name="Automação & Integração"
            position="Python · PowerShell · JavaScript · APIs"
            Text="Desenvolvo scripts e integrações para ERPs, Active Directory e APIs REST/SOAP, automatizando rotinas operacionais e reduzindo tarefas manuais. Experiência em deploy serverless (AWS Lambda) e pipelines CI/CD para entrega contínua."
          />
        </div>

        <div
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-anchor-placement="top-center"
        >
          <SkillsCard
            image="/images/t2.jpg"
            name="Infraestrutura & Monitoramento"
            position="Docker · Zabbix · Grafana"
            Text="Administro servidores Linux/Windows, configuro redes e implementei monitoramento com Zabbix e dashboards em Grafana para garantir disponibilidade. Uso Docker e Docker Compose para padronizar ambientes e facilitar deploys."
          />
        </div>

        <div
          data-aos="fade-right"
          data-aos-delay="600"
          data-aos-anchor-placement="top-center"
        >
          <SkillsCard
            image="/images/t3.jpg"
            name="Full-Stack & Bancos de Dados"
            position="React · Next.js · Node.js · SQL"
            Text="Crio aplicações full-stack escaláveis com React/Next.js e APIs em Node.js. Trabalho com modelagem e otimização de consultas SQL (MySQL/Postgres) e preparo dados para geração de relatórios e dashboards estratégicos."
          />
        </div>
      </div>
    </section>
  );
};

export default Team;
