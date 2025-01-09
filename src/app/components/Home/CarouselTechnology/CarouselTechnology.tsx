import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TechnologyCard from "./CarouselTechnologyCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const PopularTechnologies = () => {
  return (
    <div className='pt-[3rem] pb-[3rem]'>
      {/* Heading */}
      <h1 className='heading'>
        Tecnologias que Utilizo <span>no Meu Currículo</span>
      </h1>
      <div className="w-[80%] mt-[4rem] mx-auto">
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite={true}
          responsive={responsive}
          centerMode={false}
          itemClass="item"
          showDots={false}
        >
          <TechnologyCard title="Zabbix" image="/images/zabbix.png" reviews="10" description="Ferramenta robusta de monitoramento de rede e infraestrutura, ideal para empresas que buscam otimizar a disponibilidade e o desempenho de seus sistemas." />
          <TechnologyCard title="Grafana" image="/images/grafana.png" reviews="8" description="Plataforma de visualização de dados em tempo real, permitindo monitoramento e análise interativa de métricas e logs." />
          <TechnologyCard title="Docker" image="/images/docker.png" reviews="7" description="Tecnologia de contêinerização que facilita o desenvolvimento, o envio e a execução de aplicativos em ambientes isolados e escaláveis." />
          <TechnologyCard title="SQL Avançado" image="/images/sql.png" reviews="9" description="Especialização no uso de SQL para a criação de consultas complexas e na manipulação de grandes volumes de dados em bancos de dados relacionais." />
          <TechnologyCard title="JavaScript" image="/images/javascript.png" reviews="6" description="Linguagem essencial para o desenvolvimento de aplicações web interativas, permitindo uma experiência dinâmica para os usuários." />
          <TechnologyCard title="Apache" image="/images/apache.png" reviews="5" description="Servidor web de alto desempenho e escalável, amplamente utilizado para hospedar sites e aplicações na web." />
          <TechnologyCard title="Nginx" image="/images/nginx.png" reviews="4" description="Servidor web e proxy reverso leve, conhecido por sua eficiência e capacidade de lidar com grandes volumes de tráfego." />
          <TechnologyCard title="Git" image="/images/git.png" reviews="3" description="Sistema de controle de versão distribuído, amplamente utilizado por equipes de desenvolvimento para rastrear mudanças no código-fonte e colaborar eficientemente." />
        </Carousel>
      </div>
    </div>
  );
};

export default PopularTechnologies;
